import { supabase } from '../supabase.js';

export const DEMO_USER = {
  cedula: '12345678',
  passPlain: '1234',
  nombres: 'Usuario Demo',
  apellidos: 'SST',
  fexp: '2022-01-15',
  lexp: 'Bogotá D.C.',
  fnac: '1992-06-20',
  lnac: 'Bogotá D.C.',
  dir: 'Sede Industrial Principal',
  tel: '3109876543',
  mail: 'demo@prevenapp.com',
  motivo: 'Capacitación General SST',
  obs: 'Cuenta demo para evaluación y navegación general.',
};

export const ADMIN_USER = {
  cedula: '6769411221',
  passPlain: 'TheRealChaplainFromChapChap',
  nombres: 'Administrador',
  apellidos: 'SST Master',
  fexp: '2023-01-01',
  lexp: 'Bogotá D.C.',
  fnac: '1988-05-15',
  lnac: 'Bogotá D.C.',
  dir: 'Dirección General de Seguridad SST',
  tel: '3100000000',
  mail: 'admin@prevenapp.app',
  motivo: 'Supervisión y Control General del Sistema SST',
  obs: 'Superusuario Administrador de PrevenApp con acceso total.',
  role: 'admin',
  isAdmin: true,
};

const DUP = 'Esa cédula ya está registrada.';
const NET = 'No se pudo conectar con el servidor. Revisa tu internet.';

// Supabase Auth pide email y mínimo 6 caracteres: se derivan de cédula y clave.
const toEmail = (c) => `${String(c).trim()}@prevenapp.app`;
const toPass = (p) => `${p}#PrevenApp`;

const PROFILE_FIELDS = [
  'cedula', 'nombres', 'apellidos', 'fexp', 'lexp',
  'fnac', 'lnac', 'dir', 'tel', 'mail', 'motivo', 'obs', 'role',
];
const pick = (u) =>
  Object.fromEntries(PROFILE_FIELDS.map((k) => [k, k === 'cedula' ? String(u[k]).trim() : u[k] ?? '']));

const userId = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.id ?? null;
};

async function profileById(id) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', id).maybeSingle();
  return error ? null : data;
}

/* ¿Existe la cédula? (funciona sin sesión gracias a la función SQL) */
async function find(cedula) {
  const c = String(cedula).trim();
  if (c === DEMO_USER.cedula) return { cedula: c };
  if (c === ADMIN_USER.cedula) return { cedula: c };
  const { data, error } = await supabase.rpc('cedula_exists', { p_cedula: c });
  if (error) throw new Error(NET);
  return data ? { cedula: c } : null;
}

async function signUp(u) {
  const { data, error } = await supabase.auth.signUp({
    email: toEmail(u.cedula),
    password: toPass(u.pass),
    options: { data: pick(u) },
  });
  if (error) {
    if (/registered|database error|duplicate/i.test(error.message)) throw new Error(DUP);
    throw new Error(error.message);
  }
  return data;
}

export const Store = {
  find,
  DEMO_USER,
  ADMIN_USER,

  async register(u) {
    if (await find(u.cedula)) throw new Error(DUP);
    await signUp(u);
    await supabase.auth.signOut(); // el usuario entra luego por el login
  },

  async login(cedula, pass) {
    const c = String(cedula).trim();
    const cleanPass = String(pass || '').trim();

    // Verificación especial para Administrador
    if (c === ADMIN_USER.cedula) {
      if (cleanPass !== ADMIN_USER.passPlain) {
        return null; // Clave incorrecta
      }

      const attempt = () =>
        supabase.auth.signInWithPassword({
          email: toEmail(c),
          password: toPass(cleanPass),
        });

      try {
        let { data, error } = await attempt();

        if (error) {
          try {
            await signUp({ ...ADMIN_USER, pass: ADMIN_USER.passPlain });
          } catch (_) {
            /* ya existía */
          }
          ({ data, error } = await attempt());
        }

        if (!error && data?.user?.id) {
          const prof = await profileById(data.user.id);
          return {
            ...(prof || ADMIN_USER),
            id: data.user.id,
            isAdmin: true,
            role: 'admin',
          };
        }
      } catch (_) {
        /* Continuar con sesión local */
      }

      return {
        ...ADMIN_USER,
        id: 'admin-master-session',
        isAdmin: true,
        role: 'admin',
      };
    }

    const attempt = () =>
      supabase.auth.signInWithPassword({ email: toEmail(c), password: toPass(pass) });

    let { data, error } = await attempt();

    // Cuenta demo: se crea sola la primera vez
    if (error && c === DEMO_USER.cedula && cleanPass === DEMO_USER.passPlain) {
      try {
        await signUp({ ...DEMO_USER, pass: DEMO_USER.passPlain });
      } catch (e) {
        /* ya existía o la crea otro: se reintenta abajo */
      }
      ({ data, error } = await attempt());
    }

    if (error) {
      if (error.status === 400 || /invalid login/i.test(error.message)) return null;
      if (/confirm/i.test(error.message)) {
        throw new Error('Desactiva "Confirm email" en Supabase → Authentication.');
      }
      if (c === DEMO_USER.cedula && cleanPass === DEMO_USER.passPlain) {
        return { ...DEMO_USER, id: 'demo-local-session' };
      }
      throw new Error(NET);
    }
    const profile = await profileById(data.user.id);
    return profile || (c === DEMO_USER.cedula ? { ...DEMO_USER, id: data.user.id } : null);
  },

  async logout() {
    await supabase.auth.signOut();
  },

  async saveAttempt(a) {
    const id = await userId();
    if (!id) {
      console.warn('saveAttempt: sin sesión remota activa');
      return;
    }
    const { error } = await supabase.from('attempts').insert({
      user_id: id,
      cedula: a.cedula,
      course_id: a.courseId,
      course_title: a.courseTitle,
      fecha: a.fecha,
      intento: a.intento,
      nota: a.nota,
      estado: a.estado,
      details: a.d,
    });
    if (error) console.warn('saveAttempt error:', error.message);
  },

  async attempts(isAdmin = false) {
    const id = await userId();
    if (!id && !isAdmin) return [];
    try {
      let query = supabase.from('attempts').select('*');
      if (!isAdmin && id) {
        query = query.eq('user_id', id);
      }
      const { data, error } = await query.order('fecha', { ascending: true });
      if (!error && data) {
        return data.map((r) => ({
          cedula: r.cedula,
          courseId: r.course_id,
          courseTitle: r.course_title,
          fecha: r.fecha,
          intento: r.intento,
          nota: r.nota,
          estado: r.estado,
          d: r.details,
        }));
      }
      if (isAdmin && id) {
        const { data: ownData } = await supabase
          .from('attempts')
          .select('*')
          .eq('user_id', id)
          .order('fecha', { ascending: true });
        if (ownData) {
          return ownData.map((r) => ({
            cedula: r.cedula,
            courseId: r.course_id,
            courseTitle: r.course_title,
            fecha: r.fecha,
            intento: r.intento,
            nota: r.nota,
            estado: r.estado,
            d: r.details,
          }));
        }
      }
    } catch (_) {}
    return [];
  },

  async progress(_cedula, courseId = 'seguridad') {
    const id = await userId();
    if (!id) return {};
    const { data, error } = await supabase
      .from('progress')
      .select('modules')
      .eq('user_id', id)
      .eq('course_id', courseId)
      .maybeSingle();
    return error || !data ? {} : data.modules || {};
  },

  async saveProgress(_cedula, courseId = 'seguridad', p) {
    const id = await userId();
    if (!id) return;
    const { error } = await supabase.from('progress').upsert(
      { user_id: id, course_id: courseId, modules: p, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,course_id' }
    );
    if (error) console.warn('saveProgress:', error.message);
  },

  async getAllCoursesProgress(_cedula, courseIds = []) {
    const res = {};
    courseIds.forEach((cid) => (res[cid] = {}));
    const id = await userId();
    if (!id) return res;
    const { data, error } = await supabase
      .from('progress')
      .select('course_id, modules')
      .eq('user_id', id)
      .in('course_id', courseIds);
    if (!error && data) data.forEach((r) => (res[r.course_id] = r.modules || {}));
    return res;
  },
};
