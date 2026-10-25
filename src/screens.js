import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COURSES, TEAM } from './data';
import { C, SH, fmtDate, glow, tint } from './theme';
import { useTheme } from './ThemeContext';
import {
  AnimatedGlowCard,
  AnimatedProgressBar,
  Btn,
  Card,
  DateField,
  Diamond,
  Field,
  H2,
  HUDStat,
  PulsingBeacon,
  Ring,
  SettingsButton,
  Sub,
} from './ui';
import { CourseLogo, ModuleImageFrame } from './illustrations';
import { downloadCertificate } from './certificate';
import PHOTOS from '../assets/photos';

const L = 'ABC';
const shuffle = (a) => {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/* ==========================================================================
   1. LOGIN
   ========================================================================== */
export function Login({ initialCedula, onLogin, onRegister }) {
  const [cedula, setCedula] = useState(initialCedula || '');
  const [pass, setPass] = useState('');
  const [roleTab, setRoleTab] = useState('user'); // 'user' | 'admin'
  const { colors } = useTheme();

  const isAdminTab = roleTab === 'admin';

  return (
    <View>
      {/* Botón de configuración: modo claro / oscuro */}
      <View style={{ alignItems: 'flex-end', marginTop: 8 }}>
        <SettingsButton />
      </View>
      <Diamond />
      <Text style={[s.brand, { color: colors.ink }]}>PrevenApp</Text>
      <Text style={[s.brandSub, { color: colors.blue }]}>SISTEMA DE GESTIÓN Y PREVENCIÓN DE RIESGOS</Text>
      <Sub style={{ marginTop: 6, marginBottom: 16 }}>
        {'Capacitación certificada en Seguridad Industrial,\nPrimeros Auxilios, Incendios, Ergonomía y Químicos.'}
      </Sub>

      <Card glowColor={isAdminTab ? C.neonAmber : C.cyan} style={{ marginTop: 4 }}>
        {/* Selector de modo de ingreso: Colaborador o Administrador */}
        <View style={s.roleTabsRow}>
          <Pressable
            onPress={() => {
              setRoleTab('user');
              setCedula('');
              setPass('');
            }}
            style={[s.roleTab, !isAdminTab && s.roleTabActiveUser]}
            accessibilityRole="tab"
            accessibilityLabel="Ingreso como Colaborador"
          >
            <Text style={[s.roleTabTxt, !isAdminTab && s.roleTabTxtActiveUser]}>
              Colaborador
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setRoleTab('admin');
              setCedula('');
              setPass('');
            }}
            style={[s.roleTab, isAdminTab && s.roleTabActiveAdmin]}
            accessibilityRole="tab"
            accessibilityLabel="Ingreso como Administrador"
          >
            <Text style={[s.roleTabTxt, isAdminTab && s.roleTabTxtActiveAdmin]}>
              Administrador
            </Text>
          </Pressable>
        </View>

        <Field
          label={isAdminTab ? 'Identificación Administrador' : 'Identificación (cédula)'}
          value={cedula}
          onChangeText={setCedula}
          glowColor={isAdminTab ? C.neonAmber : C.cyan}
          keyboardType={isAdminTab ? 'default' : 'number-pad'}
          autoCorrect={false}
          placeholder={isAdminTab ? 'Ingresa usuario administrador' : 'Ej: 1045238491'}
        />
        <Field
          label={isAdminTab ? 'Contraseña Administrador' : 'Contraseña de acceso'}
          value={pass}
          onChangeText={setPass}
          glowColor={isAdminTab ? C.neonAmber : C.cyan}
          secureTextEntry
          autoCapitalize="none"
          placeholder="••••••••"
        />
        <Btn
          title={isAdminTab ? 'Ingresar como Administrador' : 'Ingresar al Sistema'}
          glowColor={isAdminTab ? C.neonAmber : C.cyan}
          onPress={() => onLogin(cedula.trim(), pass)}
        />
        {!isAdminTab && <Btn alt title="Crear nueva cuenta" onPress={onRegister} />}
      </Card>

      {/* Resumen de oferta de cursos al pie */}
      <View style={[s.pillsRow, { marginTop: 18 }]}>
        {['5 CURSOS ACTIVOS', 'EVALUACIÓN SST', 'AUDITORÍA'].map((txt) => (
          <View key={txt} style={[s.pill, { borderColor: colors.line, backgroundColor: colors.badgeBg }]}>
            <Text style={[s.pillTxt, { color: colors.cyan }]}>{txt}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

/* ==========================================================================
   2. REGISTRO
   ========================================================================== */
const EMPTY = {
  cedula: '',
  fexp: '',
  lexp: '',
  nombres: '',
  apellidos: '',
  pass: '',
  fnac: '',
  lnac: '',
  dir: '',
  tel: '',
  mail: '',
  motivo: '',
  obs: '',
};

export function Register({ initialCedula, onSubmit, onBack, toast }) {
  const { width } = useWindowDimensions();
  const wide = width >= 700;
  const [f, setF] = useState({ ...EMPTY, cedula: initialCedula || '' });
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));
  const half = wide ? { width: '48.5%' } : null;

  const submit = () => {
    const req = [
      'cedula',
      'fexp',
      'lexp',
      'nombres',
      'apellidos',
      'pass',
      'fnac',
      'lnac',
      'dir',
      'tel',
      'mail',
      'motivo',
    ];
    if (req.some((k) => !String(f[k]).trim())) return toast('Completa todos los campos obligatorios.');
    if (f.pass.length < 4) return toast('La contraseña debe tener mínimo 4 caracteres.');
    if (!/^\S+@\S+\.\S+$/.test(f.mail.trim())) return toast('Escribe un correo electrónico válido.');
    onSubmit({ ...f, cedula: f.cedula.trim() });
  };

  return (
    <View>

      <H2 style={{ marginTop: 12 }}>Registro de Participante</H2>
      <Text style={[s.brandSub, { marginBottom: 12 }]}>INFORMACIÓN DE CONTROL Y PERMISO SST</Text>
      <Card glowColor={C.blue} style={wide && { padding: 22 }}>
        <View
          style={[
            { gap: wide ? 14 : 12 },
            wide && { flexDirection: 'row', flexWrap: 'wrap', columnGap: 16 },
          ]}
        >
          <Field
            style={half}
            label="Identificación (cédula)"
            value={f.cedula}
            onChangeText={set('cedula')}
            keyboardType="number-pad"
          />
          <DateField style={half} label="Fecha de expedición" value={f.fexp} onChange={set('fexp')} />
          <Field style={half} label="Lugar de expedición" value={f.lexp} onChangeText={set('lexp')} />
          <Field style={half} label="Nombres" value={f.nombres} onChangeText={set('nombres')} />
          <Field style={half} label="Apellidos" value={f.apellidos} onChangeText={set('apellidos')} />
          <Field
            style={half}
            label="Contraseña de acceso"
            value={f.pass}
            onChangeText={set('pass')}
            secureTextEntry
            autoCapitalize="none"
          />
          <DateField style={half} label="Fecha de nacimiento" value={f.fnac} onChange={set('fnac')} />
          <Field style={half} label="Lugar de nacimiento" value={f.lnac} onChangeText={set('lnac')} />
          <Field style={half} label="Dirección de residencia" value={f.dir} onChangeText={set('dir')} />
          <Field style={half} label="Teléfono de contacto" value={f.tel} onChangeText={set('tel')} keyboardType="phone-pad" />
          <Field
            style={half}
            label="Correo electrónico"
            value={f.mail}
            onChangeText={set('mail')}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Field style={half} label="Motivo de visita / Puesto" value={f.motivo} onChangeText={set('motivo')} />
          <Field
            style={wide && { width: '100%' }}
            label="Observaciones médicas / alergias"
            value={f.obs}
            onChangeText={set('obs')}
            multiline
            numberOfLines={3}
          />
        </View>
        <Btn title="Confirmar Registro" glowColor={C.cyan} onPress={submit} />
        <Btn alt title="Volver al inicio" onPress={onBack} />
      </Card>
    </View>
  );
}

/* ==========================================================================
   3. CATÁLOGO / PANEL GENERAL DE CURSOS (Dashboard Multi-curso)
   ========================================================================== */
export function CoursesCatalog({ user, allProg, onSelectCourse, go }) {
  const { width } = useWindowDimensions();
  const { colors, dark } = useTheme();

  // Calcular métricas generales
  let totalMods = 0;
  let totalDone = 0;
  COURSES.forEach((c) => {
    totalMods += c.modules.length;
    const cp = allProg[c.id] || {};
    totalDone += c.modules.filter((_, i) => cp[i] === 'done').length;
  });
  const overallPct = totalMods > 0 ? Math.round((totalDone / totalMods) * 100) : 0;

  return (
    <View>

      {/* Saludo con estilo táctico */}
      <View style={{ marginTop: 12, marginBottom: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <Text style={[s.hello, { color: colors.ink }]}>
              {`Bienvenido, ${user?.isAdmin ? 'Administrador' : (user?.nombres?.split(' ')[0] || 'Participante')}`}
            </Text>
            {user?.isAdmin && (
              <View style={s.adminPill}>
                <Text style={s.adminPillTxt}>⚡ MODO ADMINISTRADOR</Text>
              </View>
            )}
          </View>
          {/* Botón de configuración: modo claro / oscuro */}
          <SettingsButton />
        </View>
        <Text style={[s.subHeader, { color: colors.sub }]}>
          {user?.isAdmin
            ? 'Panel de control maestro SST. Acceso completo y directo a todos los módulos y evaluaciones.'
            : 'Selecciona un curso de formación para acceder a sus módulos técnicos, diagramas y evaluación.'}
        </Text>
      </View>

      {/* HUD de Estadísticas Rápidas */}
      <View style={s.hudGrid}>
        <HUDStat label="Cursos" value={COURSES.length} color={C.cyan} glowColor={C.cyan} />
        <HUDStat label="Módulos" value={`${totalDone}/${totalMods}`} color={C.neonGreen} glowColor={C.neonGreen} />
        <HUDStat label="Progreso" value={`${overallPct}%`} color={C.neonAmber} glowColor={C.neonAmber} />
      </View>

      {/* Título de la sección de cursos */}
      <View style={s.sectionHeader}>
        <H2 style={{ marginVertical: 0 }}>Cursos Disponibles</H2>
        <View style={s.badgeTech}>
          <Text style={s.badgeTechTxt}>NORMATIVA SST</Text>
        </View>
      </View>

      {/* Listado de tarjetas de cursos con resplandor y logos */}
      <View style={{ gap: 14, marginTop: 10 }}>
        {COURSES.map((course) => {
          const prog = allProg[course.id] || {};
          const done = course.modules.filter((_, i) => prog[i] === 'done').length;
          const pct = Math.round((done / course.modules.length) * 100);
          const isComplete = done === course.modules.length && done > 0;

          return (
            <Pressable
              key={course.id}
              onPress={() => onSelectCourse(course)}
              style={({ pressed }) => [
                s.courseCard,
                {
                  backgroundColor: colors.card,
                  borderLeftColor: course.color,
                  borderColor: pressed ? course.glowColor : dark ? colors.cardBorder : colors.line,
                },
                glow(course.glowColor, pressed ? 0.6 : 0.25, 10),
              ]}
            >
              {/* Encabezado de la tarjeta con Logo, Código y Badges */}
              <View style={s.courseCardTop}>
                <CourseLogo
                  type={course.logoType}
                  size={50}
                  color={course.color}
                  glowColor={course.glowColor}
                />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <View style={s.codeRow}>
                    <Text style={[s.courseCode, { color: course.color }]}>{course.code}</Text>
                    <View style={[s.levelBadge, { borderColor: course.color }]}>
                      <Text style={[s.levelTxt, { color: course.color }]}>{course.level}</Text>
                    </View>
                    <Text style={[s.durationTxt, { color: colors.sub }]}>{course.duration}</Text>
                  </View>
                  <Text style={[s.courseTitle, { color: colors.ink }]}>{course.title}</Text>
                </View>
              </View>

              {/* Descripción breve */}
              <Text style={[s.courseTagline, { color: colors.sub }]}>{course.tagline}</Text>

              {/* Barra de progreso animada */}
              <View style={{ marginTop: 10, gap: 4 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={[s.progLabel, { color: colors.sub }]}>
                    {`${done} de ${course.modules.length} módulos completados`}
                  </Text>
                  <Text style={[s.progPct, { color: course.color }]}>{pct}%</Text>
                </View>
                <AnimatedProgressBar
                  progress={pct}
                  color={course.color}
                  glowColor={course.glowColor}
                  height={6}
                />
              </View>

              {/* Botón de acción integrado */}
              <View style={[s.courseCardAction, { borderTopColor: colors.line }]}>
                <View
                  style={[
                    s.chipState,
                    { backgroundColor: colors.badgeBg, borderColor: colors.line },
                    isComplete && { backgroundColor: dark ? 'rgba(0,230,118,0.12)' : '#DDF3E8', borderColor: colors.grn },
                  ]}
                >
                  <Text
                    style={[
                      s.chipStateTxt,
                      { color: colors.badgeTxt },
                      isComplete && { color: dark ? colors.neonGreen : '#145C3B' },
                    ]}
                  >
                    {isComplete ? '✓ CERTIFICADO LISTO' : done > 0 ? 'EN CURSO' : 'SIN EMPEZAR'}
                  </Text>
                </View>
                <View style={s.enterBtnRow}>
                  <Text style={[s.enterBtnTxt, { color: course.color }]}>
                    {isComplete ? 'Revisar temario ►' : done > 0 ? 'Continuar ►' : 'Iniciar curso ►'}
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Botones inferiores de navegación general */}
      <View style={[s.grid2, { gap: 10, marginTop: 22 }]}>
        <Btn alt title="Auditoría / Intentos" style={{ flex: 1 }} onPress={() => go('audit')} />
        <Btn alt title="Cómo usar" style={{ flex: 1 }} onPress={() => go('help')} />
        <Btn alt title="Créditos" style={{ flex: 1 }} onPress={() => go('credits')} />
      </View>
    </View>
  );
}

/* ==========================================================================
   4. MENÚ / ÍNDICE DEL CURSO SELECCIONADO
   ========================================================================== */
export function Menu({ user, course, prog, unlocked, onMod, onExam, onBackCourses, go }) {
  const { width } = useWindowDimensions();
  const small = width <= 520;
  const done = course.modules.filter((_, i) => prog[i] === 'done').length;
  const pct = Math.round((done / course.modules.length) * 100);

  const label = (st) => (st === 'done' ? '✓ Completado' : st === 'doing' ? 'En curso' : 'Sin empezar');

  return (
    <View>
      {/* Botón de retorno al catálogo general de cursos */}
      <Pressable onPress={onBackCourses} style={s.backBar}>
        <Text style={s.backBarTxt}>◄ Volver a todos los cursos</Text>
      </Pressable>

      {/* Banner Principal del Curso con su Logo */}
      <View style={[s.courseHeaderBanner, { borderLeftColor: course.color }, glow(course.glowColor, 0.35, 12)]}>
        <CourseLogo
          type={course.logoType}
          size={small ? 54 : 64}
          color={course.color}
          glowColor={course.glowColor}
        />
        <View style={{ flex: 1, minWidth: 0 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={[s.courseCode, { color: course.color }]}>{course.code}</Text>
            <Text style={s.courseLevelBadge}>{course.badge}</Text>
          </View>
          <Text style={s.courseBannerTitle}>{course.title}</Text>
          <Text style={s.courseBannerSub}>{course.tagline}</Text>
        </View>
      </View>

      {/* Indicador de módulos */}
      <View style={s.idxHead}>
        <H2 style={{ marginVertical: 4 }}>Módulos del Curso</H2>
        <View style={[s.countBadge, { backgroundColor: course.color }]}>
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 13 }}>
            {`${done} / ${course.modules.length} completados`}
          </Text>
        </View>
      </View>

      {/* Listado de módulos con slots para diagramas e imágenes */}
      <View style={{ gap: 10, marginTop: 8 }}>
        {course.modules.map((m, i) => {
          const st = prog[i] || 'new';
          return (
            <Pressable
              key={i}
              onPress={() => onMod(i)}
              style={({ pressed }) => [
                s.idxRow,
                { borderLeftColor: m.c, borderColor: pressed ? course.glowColor : C.line },
                glow(m.c, pressed ? 0.5 : 0.15, 6),
              ]}
            >
              <View style={[s.modNumBox, { borderColor: m.c, backgroundColor: tint(m.c, 0.08) }]}>
                <Text style={[s.modNumTxt, { color: m.c }]}>
                  {String(i + 1).padStart(2, '0')}
                </Text>
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={s.txtStrong}>{m.t}</Text>
                <Text style={s.txtSmall} numberOfLines={2}>
                  {m.desc || m.p || 'Contenido técnico y procedimientos de seguridad.'}
                </Text>
                {/* Etiqueta indicadora de figura técnica */}
                <View style={s.figTag}>
                  <Text style={s.figTagTxt}>ESQUEMA TÉCNICO INCLUIDO</Text>
                </View>
              </View>
              <Chip st={st} small={small}>
                {label(st)}
              </Chip>
            </Pressable>
          );
        })}

        {/* Fila de Examen Final */}
        <Pressable
          onPress={onExam}
          style={({ pressed }) => [
            s.idxRow,
            {
              borderLeftColor: course.color,
              backgroundColor: unlocked ? '#F0F7FF' : '#F8FAFC',
              borderColor: unlocked ? course.color : C.line,
            },
            unlocked && glow(course.glowColor, pressed ? 0.7 : 0.4, 10),
          ]}
        >
          <View
            style={[
              s.modNumBox,
              {
                borderColor: course.color,
                backgroundColor: tint(course.color, 0.1),
              },
            ]}
          >
            <Text style={[s.modNumTxt, { color: course.color }]}>EX</Text>
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={[s.txtStrong, { color: unlocked ? course.color : C.ink }]}>
              Evaluación Final Certificada
            </Text>
            <Text style={s.txtSmall}>
              {unlocked
                ? `10 preguntas aleatorias de ${course.title}. Apruebas con 80% o más.`
                : `Se desbloquea al finalizar los ${course.modules.length} módulos.`}
            </Text>
          </View>
          <Chip st={unlocked ? 'doing' : 'new'} small={small}>
            {unlocked ? 'DISPONIBLE' : 'BLOQUEADO'}
          </Chip>
        </Pressable>
      </View>

      {/* Accesos directos a Auditoría, Guía y Créditos */}
      <View style={[s.grid2, { gap: 10, marginTop: 18 }]}>
        <Btn alt title="Auditoría" style={{ flex: 1 }} onPress={() => go('audit')} />
        <Btn alt title="Cómo usar" style={{ flex: 1 }} onPress={() => go('help')} />
        <Btn alt title="Créditos" style={{ flex: 1 }} onPress={() => go('credits')} />
      </View>
    </View>
  );
}

/* ==========================================================================
   5. MÓDULO CON ESPACIO PARA IMAGEN Y DIAGRAMAS TÉCNICOS
   ========================================================================== */
export function Module({ course, i, onPrev, onNext, onBackMenu }) {
  const m = course.modules[i];

  return (
    <View>
      {/* Botón de retorno al temario del curso */}
      <Pressable onPress={onBackMenu} style={s.backBar}>
        <Text style={s.backBarTxt}>◄ Volver al temario del curso</Text>
      </Pressable>

      {/* Encabezado del módulo */}
      <View style={[s.moduleHeader, { borderLeftColor: m.c }, glow(m.c, 0.35, 8)]}>
        <Text style={[s.moduleSuper, { color: m.c }]}>
          {`MÓDULO 0${i + 1} // ${course.title.toUpperCase()}`}
        </Text>
        <Text style={s.moduleTitle}>{m.t}</Text>
      </View>

      {/* ESPACIO PARA IMAGEN / DIAGRAMA TÉCNICO NORMALIZADO (Requerimiento específico) */}
      <ModuleImageFrame
        imgType={m.imgType}
        imgTitle={m.imgTitle || `FIGURA TÉCNICA 0${i + 1} // PROTOCOLO NORMALIZADO`}
        imgCaption={m.imgCaption || `Esquema de referencia para ${m.t}`}
        color={m.c}
        glowColor={course.glowColor}
      />

      {/* Párrafo explicativo del módulo si existe */}
      {m.p ? (
        <View style={s.descBox}>
          <Text style={s.descBoxTxt}>{m.p}</Text>
        </View>
      ) : null}

      {/* Especificaciones y especificaciones técnicas */}
      <View style={{ marginTop: 8 }}>
        <Text style={s.sectionSubTitle}>Puntos Clave y Criterios Operativos:</Text>
        {m.r.map((r, k) => {
          const c = r[2] || m.c;
          return (
            <View key={k} style={[s.row, { borderLeftColor: c }, glow(c, 0.15, 4)]}>
              <View style={[s.badge, { borderColor: c, backgroundColor: tint(c, 0.12) }]}>
                <Text style={{ color: c, fontSize: 15, fontWeight: '800', textAlign: 'center' }}>
                  {r[0]}
                </Text>
              </View>
              <Text style={[s.p, { flex: 1, marginVertical: 0 }]}>{r[1]}</Text>
            </View>
          );
        })}
      </View>

      {/* Controles de navegación de módulos */}
      <View style={[s.grid2, { marginTop: 22, gap: 12 }]}>
        <Btn alt title="◄ Anterior" disabled={i === 0} onPress={onPrev} style={{ flex: 1 }} />
        <Btn
          title={i === course.modules.length - 1 ? 'Ir al Examen Final ►' : 'Siguiente Módulo ►'}
          glowColor={course.glowColor}
          onPress={onNext}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

/* ==========================================================================
   6. EXAMEN
   ========================================================================== */
export function Exam({ course, onFinish, onBackMenu, toast }) {
  // Tomar 10 preguntas aleatorias del banco de este curso
  const ids = useMemo(() => {
    const totalQ = course.bank.length;
    const count = Math.min(10, totalQ);
    return shuffle(course.bank.map((_, i) => i)).slice(0, count);
  }, [course]);

  const [ans, setAns] = useState({});

  const finish = () => {
    if (ids.some((_, n) => ans[n] === undefined)) {
      return toast('Por favor responde todas las preguntas antes de finalizar.');
    }
    onFinish(ids, ans, course);
  };

  return (
    <View>
      <Pressable onPress={onBackMenu} style={s.backBar}>
        <Text style={s.backBarTxt}>◄ Cancelar y volver al curso</Text>
      </Pressable>

      <View style={[s.examHeader, { borderLeftColor: course.color }]}>
        <Text style={[s.examCourseCode, { color: course.color }]}>{course.code}</Text>
        <H2 style={{ marginVertical: 2 }}>{`Examen: ${course.title}`}</H2>
        <Sub style={{ textAlign: 'left' }}>
          {`${ids.length} preguntas técnicas. Calificación mínima aprobatoria: 80%.`}
        </Sub>
      </View>

      <View style={{ marginTop: 14 }}>
        {ids.map((id, n) => {
          const q = course.bank[id];
          return (
            <View key={id} style={[s.fieldset, glow(course.color, 0.15, 6)]}>
              <View style={s.questionHeader}>
                <Text style={s.questionNumber}>{`PREGUNTA 0${n + 1}`}</Text>
                <Text style={s.questionPoints}>10 PTS</Text>
              </View>
              <Text style={s.questionText}>{q[0]}</Text>

              <View style={{ gap: 8, marginTop: 10 }}>
                {q[1].map((o, k) => {
                  const on = ans[n] === k;
                  return (
                    <Pressable
                      key={k}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: on }}
                      onPress={() => setAns((p) => ({ ...p, [n]: k }))}
                      style={[
                        s.opt,
                        on && {
                          backgroundColor: '#EAF3FF',
                          borderColor: course.color,
                          borderWidth: 2,
                        },
                        on && glow(course.glowColor, 0.35, 6),
                      ]}
                    >
                      {/* Casilla de opción cuadrada sin bordes redondeados */}
                      <View style={[s.squareRadio, on && { borderColor: course.color }]}>
                        {on && <View style={[s.squareRadioDot, { backgroundColor: course.color }]} />}
                      </View>
                      <Text style={[s.optText, on && { fontWeight: '700', color: C.ink }]}>
                        {`${L[k]}) ${o}`}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>

      <Btn
        title="Finalizar y Calificar Examen"
        glowColor={course.glowColor}
        onPress={finish}
        style={{ marginTop: 10 }}
      />
    </View>
  );
}

/* ==========================================================================
   7. RESULTADO
   ========================================================================== */
export function Result({ r, onRetry, go, onBackCourses, toast }) {
  const [busy, setBusy] = useState(false);
  if (!r) return null;

  const getCert = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await downloadCertificate(r.cert);
    } catch (e) {
      toast?.('No se pudo generar el certificado: ' + (e?.message || 'error'));
    } finally {
      setBusy(false);
    }
  };

  const col = r.aprobada ? C.grn : C.red;
  const glowCol = r.aprobada ? C.neonGreen : C.neonRed;

  return (
    <View>
      <Card glowColor={glowCol} style={{ gap: 4, marginTop: 16 }}>
        <Text style={[s.bigScore, { color: col }]}>{r.nota} %</Text>
        <H2 style={{ textAlign: 'center', color: col, marginTop: 0 }}>
          {r.aprobada ? '¡EVALUACIÓN APROBADA!' : 'EVALUACIÓN NO APROBADA'}
        </H2>
        <Sub style={{ textAlign: 'center' }}>
          {`${r.ok} aciertos de 10 preguntas evaluadas.`}
        </Sub>
        <View style={s.resultDivider} />
        <View style={s.resultRow}>
          <Text style={s.resultMeta}>Intento registrado:</Text>
          <Text style={s.resultMetaVal}>N.º {r.n}</Text>
        </View>
        <View style={s.resultRow}>
          <Text style={s.resultMeta}>Nota más alta obtenida:</Text>
          <Text style={[s.resultMetaVal, { color: C.blue }]}>{r.best} %</Text>
        </View>
        {r.courseTitle && (
          <View style={s.resultRow}>
            <Text style={s.resultMeta}>Curso evaluado:</Text>
            <Text style={[s.resultMetaVal, { fontWeight: '800' }]}>{r.courseTitle}</Text>
          </View>
        )}
      </Card>

      {r.aprobada && r.cert && (
        <Btn
          title={busy ? 'Generando PDF…' : 'Descargar Certificado (PDF)'}
          glowColor={C.neonGreen}
          disabled={busy}
          onPress={getCert}
          style={{ marginTop: 18 }}
        />
      )}

      <View style={[s.grid2, { gap: 12, marginTop: 12 }]}>
        <Btn title="Reintentar Examen" onPress={onRetry} style={{ flex: 1 }} />
        <Btn alt title="Ver Auditoría" onPress={() => go('audit')} style={{ flex: 1 }} />
      </View>
      <Btn alt title="Ir al Catálogo de Cursos" onPress={onBackCourses} style={{ marginTop: 10 }} />
    </View>
  );
}

/* ==========================================================================
   8. AUDITORÍA DE INTENTOS (Filtrable por curso y cédula)
   ========================================================================== */
const COLS = [105, 120, 160, 48, 65, 95];

export function Audit({ user, attempts, onOpen, onBackCourses }) {
  const [q, setQ] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('all');

  const best = {};
  attempts.forEach((a) => {
    const key = `${a.cedula}_${a.courseId || 'seguridad'}`;
    best[key] = Math.max(best[key] || 0, a.nota);
  });

  const filtered = attempts
    .filter((a) => {
      const matchQ = !q.trim() || a.cedula.includes(q.trim());
      const matchC = selectedCourseId === 'all' || (a.courseId || 'seguridad') === selectedCourseId;
      return matchQ && matchC;
    })
    .reverse();

  const head = ['Cédula', 'Curso', 'Fecha y hora', 'N.º', 'Nota', 'Estado'];

  return (
    <View>
      {onBackCourses && (
        <Pressable onPress={onBackCourses} style={s.backBar}>
          <Text style={s.backBarTxt}>◄ Volver a Cursos</Text>
        </Pressable>
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
        <H2 style={{ marginVertical: 0 }}>Auditoría de Evaluaciones</H2>
        {user?.isAdmin && (
          <View style={s.adminPill}>
            <Text style={s.adminPillTxt}>⚡ SUPERVISIÓN GLOBAL</Text>
          </View>
        )}
      </View>
      <Sub style={{ textAlign: 'left', marginBottom: 12 }}>
        {user?.isAdmin
          ? 'Supervisión general del historial y estado de evaluaciones de todos los participantes.'
          : 'Registro histórico de intentos por participante y curso evaluado.'}
      </Sub>

      {/* Filtro por Cédula */}
      <Field
        label="Filtrar por identificación (cédula)"
        value={q}
        onChangeText={setQ}
        keyboardType="number-pad"
        placeholder="Escribe la cédula..."
      />

      {/* Selector de Curso */}
      <View style={{ marginTop: 10 }}>
        <Text style={s.labT}>Filtrar por curso:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingVertical: 4 }}>
          <Pressable
            onPress={() => setSelectedCourseId('all')}
            style={[s.courseTab, selectedCourseId === 'all' && s.courseTabActive]}
          >
            <Text style={[s.courseTabTxt, selectedCourseId === 'all' && s.courseTabTxtActive]}>
              TODOS ({attempts.length})
            </Text>
          </Pressable>
          {COURSES.map((c) => {
            const count = attempts.filter((a) => (a.courseId || 'seguridad') === c.id).length;
            const active = selectedCourseId === c.id;
            return (
              <Pressable
                key={c.id}
                onPress={() => setSelectedCourseId(c.id)}
                style={[s.courseTab, active && [s.courseTabActive, { borderColor: c.color }]]}
              >
                <Text style={[s.courseTabTxt, active && { color: c.color, fontWeight: '800' }]}>
                  {c.code} ({count})
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Tabla con scroll horizontal */}
      <View style={[s.scrollTable, { marginTop: 12 }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator>
          <View>
            <View style={{ flexDirection: 'row', backgroundColor: C.ink }}>
              {head.map((h, i) => (
                <Text key={h} style={[s.td, s.th, { width: COLS[i] }]}>
                  {h}
                </Text>
              ))}
            </View>
            {filtered.length ? (
              filtered.map((a, i) => {
                const key = `${a.cedula}_${a.courseId || 'seguridad'}`;
                const isBest = a.nota === best[key];
                const crs = COURSES.find((c) => c.id === (a.courseId || 'seguridad'));
                return (
                  <Pressable
                    key={i}
                    onPress={() => onOpen(a)}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: isBest ? '#FFFBE6' : i % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                    }}
                  >
                    <Text style={[s.td, { width: COLS[0], fontWeight: '700' }]}>{a.cedula}</Text>
                    <Text style={[s.td, { width: COLS[1], color: crs?.color || C.blue, fontWeight: '700' }]}>
                      {crs?.code || 'SEG-101'}
                    </Text>
                    <Text style={[s.td, { width: COLS[2], fontSize: 12 }]}>{fmtDate(a.fecha)}</Text>
                    <Text style={[s.td, { width: COLS[3], textAlign: 'center' }]}>{a.intento}</Text>
                    <Text style={[s.td, { width: COLS[4], fontWeight: '800', color: a.nota >= 80 ? C.grn : C.red }]}>
                      {a.nota} %
                    </Text>
                    <Text style={[s.td, { width: COLS[5], fontWeight: '700', color: a.nota >= 80 ? C.grn : C.red }]}>
                      {a.estado}
                    </Text>
                  </Pressable>
                );
              })
            ) : (
              <Text style={[s.td, { width: COLS.reduce((x, y) => x + y, 0), padding: 16, textAlign: 'center' }]}>
                No hay intentos registrados con los filtros seleccionados.
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
      <Sub style={{ marginTop: 10, textAlign: 'center' }}>
        Toca cualquier fila para ver el desglose detallado de respuestas.
      </Sub>
    </View>
  );
}

/* ==========================================================================
   9. DETALLE DEL INTENTO
   ========================================================================== */
export function Detail({ a, go }) {
  if (!a) return null;
  return (
    <View>
      <H2>{`Intento n.º ${a.intento} · ${a.nota} %`}</H2>
      <Sub style={{ textAlign: 'left' }}>
        {`Identificación ${a.cedula} · ${fmtDate(a.fecha)} · ${a.estado}\nCurso: ${a.courseTitle || 'Seguridad Industrial'}`}
      </Sub>
      <View style={{ marginTop: 14 }}>
        {a.d.map((x) => (
          <View key={x.n} style={[s.qa, { borderLeftColor: x.acierto === 'Ganada' ? C.grn : C.red }]}>
            <Text style={s.qaT}>
              <Text style={{ fontWeight: '800' }}>{`${x.n}. (Pregunta ${x.qid}) `}</Text>
              {x.pregunta}
              {'\n\n'}
              {`Respuesta elegida: ${x.opcion}\n`}
              <Text style={{ fontWeight: '800', color: x.acierto === 'Ganada' ? C.grn : C.red }}>
                {`Valoración: ${x.acierto.toUpperCase()}`}
              </Text>
            </Text>
          </View>
        ))}
      </View>
      <Btn alt title="Volver al Listado" onPress={() => go('audit')} />
    </View>
  );
}

/* ==========================================================================
   10. AYUDA
   ========================================================================== */
const STEPS = [
  'Ingresa con tu cédula y contraseña. Si es tu primera vez, crea tu cuenta en el botón "Crear cuenta".',
  'En el Panel General, selecciona cualquiera de los 5 cursos técnicos disponibles (Seguridad, Primeros Auxilios, Incendios, Ergonomía, Químicos).',
  'Dentro de cada módulo encontrarás esquemas técnicos, diagramas operativos y criterios normalizados.',
  'Navega entre módulos usando "Anterior" y "Siguiente" o el menú desplegable ☰.',
  'Al completar todos los módulos del curso, se habilitará la Evaluación Final Certificada.',
  'Cada examen consta de 10 preguntas aleatorias del banco normativo. Apruebas con 80% o más.',
  'Puedes repetir la evaluación las veces necesarias; el sistema conserva tu calificación más alta.',
  'En la sección Auditoría puedes consultar el historial detallado de intentos y respuestas.',
];

export function Help({ onBackCourses }) {
  return (
    <View>
      {onBackCourses && (
        <Pressable onPress={onBackCourses} style={s.backBar}>
          <Text style={s.backBarTxt}>◄ Volver a Cursos</Text>
        </Pressable>
      )}
      <H2 style={{ marginTop: 8 }}>Cómo usar PrevenApp</H2>
      <Sub style={{ textAlign: 'left', marginBottom: 14 }}>
        Flujo de inducción, capacitación modular y evaluación técnica.
      </Sub>
      {STEPS.map((t, i) => (
        <View key={i} style={s.step}>
          <View style={s.stepN}>
            <Text style={{ color: '#fff', fontWeight: '800', fontSize: 14 }}>{i + 1}</Text>
          </View>
          <Text style={[s.p, { marginVertical: 0 }]}>{t}</Text>
        </View>
      ))}
    </View>
  );
}

/* ==========================================================================
   11. CRÉDITOS
   ========================================================================== */
export function Credits({ onBackCourses }) {
  const { width } = useWindowDimensions();
  const wide = width >= 700;

  return (
    <View>
      {onBackCourses && (
        <Pressable onPress={onBackCourses} style={s.backBar}>
          <Text style={s.backBarTxt}>◄ Volver a Cursos</Text>
        </Pressable>
      )}
      <H2 style={{ marginTop: 8 }}>Créditos del Proyecto</H2>
      <Sub style={{ textAlign: 'left', marginBottom: 14 }}>
        {'Centro INCA Ltda. · Desarrollo de Aplicaciones Móviles\nInstructor: Ing. Audis Alberto Munive Rojas'}
      </Sub>

      <View
        style={[
          { gap: 12 },
          wide && { flexDirection: 'row', flexWrap: 'wrap', columnGap: 12 },
        ]}
      >
        {TEAM.map((t, i) => (
          <View key={i} style={[s.dev, wide && { width: '48.5%' }, glow(C.cyan, 0.2, 6)]}>
            {/* Foto o iniciales cuadradas (CERO BORDES REDONDEADOS) */}
            <LinearGradient
              colors={[C.blue, C.ink]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={s.avSquare}
            >
              {/* Iniciales de respaldo debajo */}
              <Text style={{ color: '#fff', fontWeight: '800', fontSize: 18 }}>{t[1]}</Text>

              {PHOTOS[i] ? (
                <Image
                  source={PHOTOS[i]}
                  accessibilityLabel={'Foto de ' + t[0]}
                  style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]}
                  resizeMode="cover" // Puedes cambiar a "contain" si prefieres ver la foto completa sin recortes
                />
              ) : null}
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '800', fontSize: 15, color: C.ink }}>{t[0]}</Text>
              <Text style={{ fontSize: 13, color: C.sub }}>Desarrollador de Software SST</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

/* ==========================================================================
   COMPONENTES INTERNOS AUXILIARES
   ========================================================================== */
const Chip = ({ st, small, children }) => (
  <View style={[s.chip, small && { paddingVertical: 3, paddingHorizontal: 6 }, CHIP[st]?.box]}>
    <Text style={[{ fontWeight: '800', fontSize: small ? 9.5 : 10.5 }, CHIP[st]?.txt]}>
      {children}
    </Text>
  </View>
);
/* ==========================================================================
   12. CONFIGURACIÓN — Tema y preferencias
   ========================================================================== */

// Extracted to module level to avoid component-in-render anti-pattern
function SettingRow({ label, desc, card, line, cyan, ink, sub, children }) {
  return (
    <View
      style={{
        backgroundColor: card,
        borderWidth: 1.5,
        borderColor: line,
        borderLeftWidth: 5,
        borderLeftColor: cyan,
        padding: 14,
        marginBottom: 10,
        borderRadius: 0,
        gap: 6,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: '800', fontSize: 15, color: ink }}>{label}</Text>
          {desc ? (
            <Text style={{ fontSize: 12.5, color: sub, marginTop: 2 }}>{desc}</Text>
          ) : null}
        </View>
        {children}
      </View>
    </View>
  );
}

function DarkToggle({ value, onToggle, activeColor, line, sub }) {
  return (
    <Pressable
      onPress={onToggle}
      style={[
        {
          width: 52,
          height: 28,
          borderRadius: 0,
          borderWidth: 1.5,
          borderColor: value ? activeColor : line,
          backgroundColor: value ? `${activeColor}22` : 'rgba(128,128,128,0.08)',
          justifyContent: 'center',
          alignItems: value ? 'flex-end' : 'flex-start',
          paddingHorizontal: 3,
        },
        value && glow(activeColor, 0.4, 6),
      ]}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 0,
          backgroundColor: value ? activeColor : sub,
        }}
      />
    </Pressable>
  );
}

function SettingsSectionLabel({ title, badgeBg, cyan }) {
  return (
    <View
      style={{
        backgroundColor: badgeBg,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
        borderLeftWidth: 3,
        borderLeftColor: cyan,
        borderRadius: 0,
      }}
    >
      <Text style={{ fontSize: 10, fontWeight: '900', color: cyan, letterSpacing: 1 }}>
        {title}
      </Text>
    </View>
  );
}

const SETTINGS_SWATCHES_KEYS = [
  { label: 'Acento', key: 'cyan' },
  { label: 'Éxito', key: 'neonGreen' },
  { label: 'Alerta', key: 'neonAmber' },
  { label: 'Error', key: 'neonRed' },
];

export function Configuracion({ onBack }) {
  const { dark, colors, toggleDark } = useTheme();

  const { bg, ink, sub, card, cyan, line, badgeBg } = colors;

  return (
    <View style={{ backgroundColor: bg }}>
      <Pressable onPress={onBack} style={s.backBar}>
        <Text style={s.backBarTxt}>◄ Volver</Text>
      </Pressable>

      <H2 style={{ marginTop: 8, color: ink }}>Configuración</H2>
      <Sub style={{ textAlign: 'left', marginBottom: 18, color: sub }}>
        Personaliza la apariencia de PrevenApp.
      </Sub>

      <SettingsSectionLabel title="APARIENCIA" badgeBg={badgeBg} cyan={cyan} />

      <SettingRow
        label={dark ? 'Modo Oscuro' : 'Modo Claro'}
        desc={
          dark
            ? 'Fondo oscuro · Ideal para uso nocturno'
            : 'Fondo claro · Ideal para uso con luz ambiental'
        }
        card={card}
        line={line}
        cyan={cyan}
        ink={ink}
        sub={sub}
      >
        <DarkToggle
          value={dark}
          onToggle={toggleDark}
          activeColor={cyan}
          line={line}
          sub={sub}
        />
      </SettingRow>

      {/* Muestra de paleta activa */}
      <View
        style={{
          backgroundColor: card,
          borderWidth: 1.5,
          borderColor: line,
          padding: 14,
          marginBottom: 10,
          borderRadius: 0,
          gap: 10,
        }}
      >
        <Text style={{ fontWeight: '800', fontSize: 14, color: ink }}>Paleta Activa</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {SETTINGS_SWATCHES_KEYS.map((sw) => (
            <View key={sw.label} style={{ alignItems: 'center', gap: 4 }}>
              <View
                style={[
                  { width: 40, height: 40, backgroundColor: colors[sw.key], borderRadius: 0 },
                  glow(colors[sw.key], 0.5, 6),
                ]}
              />
              <Text style={{ fontSize: 9, fontWeight: '700', color: sub }}>{sw.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <SettingsSectionLabel title="ACERCA DE" badgeBg={badgeBg} cyan={cyan} />

      <View
        style={{
          backgroundColor: card,
          borderWidth: 1.5,
          borderColor: line,
          padding: 14,
          borderRadius: 0,
          gap: 6,
        }}
      >
        {[
          ['Aplicación', 'PrevenApp SST'],
          ['Versión', '1.0.0'],
          ['Plataforma', 'Expo / React Native'],
          ['Centro', 'Centro INCA Ltda.'],
        ].map(([k, v]) => (
          <View
            key={k}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
              borderBottomWidth: 1,
              borderBottomColor: line,
            }}
          >
            <Text style={{ fontSize: 13, color: sub, fontWeight: '600' }}>{k}</Text>
            <Text style={{ fontSize: 13, color: ink, fontWeight: '700' }}>{v}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const CHIP = {
  new: { box: { backgroundColor: '#EEF1F6', borderColor: C.line }, txt: { color: '#4B5A72' } },
  doing: { box: { backgroundColor: '#FFF4D1', borderColor: C.yel }, txt: { color: '#7A5A00' } },
  done: { box: { backgroundColor: '#DDF3E8', borderColor: C.grn }, txt: { color: '#145C3B' } },
};

/* ==========================================================================
   HOJA DE ESTILOS (CERO BORDES REDONDEADOS EN TODA LA APP)
   ========================================================================== */
const s = StyleSheet.create({
  brand: {
    textAlign: 'center',
    fontSize: 34,
    fontWeight: '900',
    color: C.ink,
    letterSpacing: -0.5,
  },
  brandSub: {
    textAlign: 'center',
    fontSize: 10.5,
    fontWeight: '800',
    color: C.blue,
    letterSpacing: 1.2,
    marginTop: 2,
  },
  hello: {
    fontWeight: '900',
    fontSize: 20,
    color: C.ink,
    letterSpacing: -0.2,
  },
  subHeader: {
    color: C.sub,
    fontSize: 13.5,
    lineHeight: 19,
    marginTop: 4,
  },
  pillsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  pill: {
    backgroundColor: 'rgba(11, 92, 173, 0.08)',
    borderWidth: 1,
    borderColor: C.line,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 0,
  },
  pillTxt: {
    fontSize: 9.5,
    fontWeight: '800',
    color: C.blue,
    letterSpacing: 0.6,
  },
  hudGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  badgeTech: {
    backgroundColor: '#0C1628',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: C.cyan,
    borderRadius: 0,
  },
  badgeTechTxt: {
    color: C.cyan,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderLeftWidth: 6,
    padding: 14,
    gap: 8,
    borderRadius: 0, // CERO BORDES REDONDEADOS
  },
  courseCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  courseCode: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  levelBadge: {
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 0,
  },
  levelTxt: {
    fontSize: 9,
    fontWeight: '800',
  },
  durationTxt: {
    fontSize: 10,
    color: C.sub,
    fontWeight: '600',
  },
  courseTitle: {
    fontSize: 16.5,
    fontWeight: '800',
    color: C.ink,
    lineHeight: 21,
  },
  courseTagline: {
    fontSize: 13,
    color: C.sub,
    lineHeight: 18,
  },
  progLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: C.sub,
  },
  progPct: {
    fontSize: 12,
    fontWeight: '900',
  },
  courseCardAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F6',
  },
  chipState: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: C.line,
    backgroundColor: '#F1F5F9',
    borderRadius: 0,
  },
  chipStateTxt: {
    fontSize: 9.5,
    fontWeight: '800',
    color: C.sub,
    letterSpacing: 0.5,
  },
  enterBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  enterBtnTxt: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  backBar: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: '#0C1628',
    borderWidth: 1,
    borderColor: C.blue,
    alignSelf: 'flex-start',
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 0,
  },
  backBarTxt: {
    color: '#00D4FF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  courseHeaderBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#0B1528',
    borderWidth: 1.5,
    borderLeftWidth: 6,
    padding: 12,
    marginBottom: 14,
    borderRadius: 0,
  },
  courseLevelBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#FFF',
    fontSize: 9,
    fontWeight: '700',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 0,
  },
  courseBannerTitle: {
    color: '#FFFFFF',
    fontSize: 16.5,
    fontWeight: '900',
    lineHeight: 20,
  },
  courseBannerSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  idxHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  countBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 0,
  },
  idxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 74,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderLeftWidth: 6,
    borderRadius: 0, // CERO BORDES REDONDEADOS
  },
  num: {
    fontSize: 24,
    fontWeight: '900',
    minWidth: 32,
  },
  ico: {
    fontSize: 24,
  },
  txtStrong: {
    fontWeight: '800',
    fontSize: 15.5,
    color: C.ink,
  },
  txtSmall: {
    color: C.sub,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 1,
  },
  figTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginTop: 3,
    borderRadius: 0,
  },
  figTagTxt: {
    fontSize: 8.5,
    fontWeight: '800',
    color: C.blue,
  },
  roleTabsRow: {
    flexDirection: 'row',
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: '#091222',
    borderRadius: 0,
  },
  roleTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  roleTabActiveUser: {
    backgroundColor: 'rgba(0, 212, 255, 0.12)',
    borderBottomWidth: 2,
    borderBottomColor: C.cyan,
  },
  roleTabActiveAdmin: {
    backgroundColor: 'rgba(255, 179, 0, 0.15)',
    borderBottomWidth: 2,
    borderBottomColor: C.neonAmber,
  },
  roleTabTxt: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  roleTabTxtActiveUser: {
    color: C.cyan,
  },
  roleTabTxtActiveAdmin: {
    color: C.neonAmber,
  },
  adminCard: {
    backgroundColor: '#151308',
    borderWidth: 1.5,
    borderColor: C.neonAmber,
    padding: 12,
    marginTop: 12,
    borderRadius: 0,
    gap: 4,
  },
  adminBadge: {
    color: C.neonAmber,
    fontSize: 9.5,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  adminAction: {
    color: '#FCD34D',
    fontSize: 11,
    fontWeight: '800',
  },
  adminCredsBold: {
    fontWeight: '800',
    color: '#FDE047',
  },
  adminPill: {
    backgroundColor: 'rgba(255, 179, 0, 0.15)',
    borderWidth: 1,
    borderColor: C.neonAmber,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 0,
  },
  adminPillTxt: {
    color: C.neonAmber,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  demoCard: {
    backgroundColor: '#0A1424',
    borderWidth: 1.5,
    borderColor: C.cyan,
    padding: 12,
    marginTop: 10,
    borderRadius: 0,
    gap: 4,
  },
  demoCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  demoBadge: {
    color: C.cyan,
    fontSize: 9.5,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  demoAction: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
  },
  demoTitle: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '700',
  },
  demoCreds: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  demoCredsBold: {
    fontWeight: '800',
    color: '#00E676',
  },
  modNumBox: {
    width: 36,
    height: 36,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  modNumTxt: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  chip: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderWidth: 1,
    borderRadius: 0,
  },
  moduleHeader: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderLeftWidth: 6,
    padding: 12,
    marginBottom: 14,
    borderRadius: 0,
  },
  moduleSuper: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  moduleTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: C.ink,
  },
  descBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: C.line,
    borderLeftWidth: 4,
    borderLeftColor: C.blue,
    padding: 12,
    marginBottom: 12,
    borderRadius: 0,
  },
  descBoxTxt: {
    fontSize: 14.5,
    lineHeight: 22,
    color: C.ink,
  },
  sectionSubTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: C.ink,
    letterSpacing: 0.3,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: C.line,
    borderLeftWidth: 5,
    padding: 11,
    marginBottom: 9,
    borderRadius: 0,
  },
  badge: {
    minWidth: 54,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 2,
    justifyContent: 'center',
    borderRadius: 0,
  },
  p: {
    fontSize: 14.5,
    lineHeight: 22,
    color: C.ink,
  },
  grid2: {
    flexDirection: 'row',
  },
  examHeader: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderLeftWidth: 6,
    padding: 12,
    marginBottom: 12,
    borderRadius: 0,
  },
  examCourseCode: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  fieldset: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: C.line,
    padding: 14,
    marginBottom: 14,
    borderRadius: 0,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  questionNumber: {
    backgroundColor: C.ink,
    color: '#FFF',
    fontSize: 10,
    fontWeight: '900',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 0,
  },
  questionPoints: {
    fontSize: 10,
    fontWeight: '800',
    color: C.sub,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '700',
    color: C.ink,
    lineHeight: 23,
    marginBottom: 6,
  },
  opt: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    minHeight: 46,
    borderWidth: 1.5,
    borderColor: C.line,
    backgroundColor: '#FFFFFF',
    borderRadius: 0, // CERO BORDES REDONDEADOS
  },
  squareRadio: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#7E8B9F',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0, // CERO BORDES REDONDEADOS
  },
  squareRadioDot: {
    width: 8,
    height: 8,
    borderRadius: 0, // CERO BORDES REDONDEADOS
  },
  optText: {
    flex: 1,
    fontSize: 14.5,
    lineHeight: 21,
    color: C.ink,
  },
  bigScore: {
    fontSize: 54,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -1,
  },
  resultDivider: {
    height: 1,
    backgroundColor: C.line,
    marginVertical: 12,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
  },
  resultMeta: {
    fontSize: 13.5,
    color: C.sub,
    fontWeight: '600',
  },
  resultMetaVal: {
    fontSize: 14,
    color: C.ink,
    fontWeight: '700',
  },
  courseTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: C.line,
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
  },
  courseTabActive: {
    backgroundColor: '#0C1628',
    borderColor: C.cyan,
  },
  courseTabTxt: {
    fontSize: 11.5,
    fontWeight: '700',
    color: C.sub,
  },
  courseTabTxtActive: {
    color: '#00D4FF',
    fontWeight: '800',
  },
  scrollTable: {
    borderWidth: 1.5,
    borderColor: C.line,
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
  },
  td: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.line,
    fontSize: 13,
    color: C.ink,
  },
  th: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
    borderBottomColor: C.ink,
  },
  qa: {
    padding: 12,
    marginBottom: 9,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: C.line,
    borderLeftWidth: 5,
    borderRadius: 0,
  },
  qaT: {
    fontSize: 14,
    lineHeight: 21,
    color: C.ink,
  },
  step: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: C.line,
    paddingVertical: 12,
    paddingRight: 12,
    paddingLeft: 54,
    marginBottom: 9,
    borderRadius: 0,
  },
  stepN: {
    position: 'absolute',
    left: 12,
    top: 12,
    width: 28,
    height: 28,
    backgroundColor: C.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0, // CERO BORDES REDONDEADOS
  },
  dev: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: C.line,
    padding: 12,
    borderRadius: 0,
  },
  avSquare: {
    width: 68,
    height: 68,
    borderWidth: 1.5,
    borderColor: C.line,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 0, // CERO BORDES REDONDEADOS
  },
  labT: {
    fontWeight: '700',
    fontSize: 13,
    color: C.ink,
    marginBottom: 4,
  },
});
