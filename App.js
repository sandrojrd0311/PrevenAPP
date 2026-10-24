import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COURSES } from './src/data';
import { Store } from './src/store';
import { C, glow } from './src/theme';
import { Ring, Toast } from './src/ui';
import {
  Audit,
  CoursesCatalog,
  Credits,
  Detail,
  Exam,
  Help,
  Login,
  Menu,
  Module,
  Register,
  Result,
} from './src/screens';
import { CourseLogo } from './src/illustrations';

const LOCK_EXAM = true;
const L = 'ABC';

export default function App() {
  return (
    <SafeAreaProvider>
      <Root />
    </SafeAreaProvider>
  );
}

function Root() {
  const ins = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [screen, setScreen] = useState('login');
  const [user, setUser] = useState(null);

  // Estado multi-curso
  const [currentCourse, setCurrentCourse] = useState(COURSES[0]);
  const [allProg, setAllProg] = useState({});
  const progRef = useRef({});

  const [mod, setMod] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [examKey, setExamKey] = useState(0);
  const [result, setResult] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [detail, setDetail] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  const [prefill, setPrefill] = useState('');

  const toast = useCallback((m) => setToastMsg({ m, k: Date.now() }), []);

  // Progreso del curso actualmente seleccionado
  const currentProg = allProg[currentCourse.id] || {};

  const unlocked = () =>
    !LOCK_EXAM ||
    currentCourse.modules.every((_, i) => (progRef.current[currentCourse.id] || {})[i] === 'done');

  const show = async (id) => {
    if (id === 'exam') setExamKey((k) => k + 1);
    if (id === 'audit') setAttempts(await Store.attempts());
    setNavOpen(false);
    setScreen(id);
  };

  const markModule = async (courseId, i, st) => {
    const courseP = { ...(progRef.current[courseId] || {}) };
    if (courseP[i] === 'done' && st !== 'done') return;
    courseP[i] = st;
    progRef.current = { ...progRef.current, [courseId]: courseP };
    setAllProg({ ...progRef.current });
    await Store.saveProgress(user.cedula, courseId, courseP);
  };

  const selectCourse = (course) => {
    setCurrentCourse(course);
    setMod(0);
    show('menu');
  };

  const goExam = () => {
    if (!unlocked()) {
      return toast(
        `Completa los ${currentCourse.modules.length} módulos de ${currentCourse.title} para habilitar la evaluación.`
      );
    }
    show('exam');
  };

  const logout = () => {
    setUser(null);
    progRef.current = {};
    setAllProg({});
    setPrefill('');
    show('login');
  };

  const openMod = (i) => {
    setMod(i);
    markModule(currentCourse.id, i, 'doing');
    show('courseModule');
  };

  /* ---- Login / Registro ---- */
  const doLogin = async (c, pass) => {
    const found = await Store.find(c);
    if (!found) {
      setPrefill(c);
      toast('Ese usuario no existe. Regístrate para iniciar tus cursos.');
      return show('register');
    }
    const u = await Store.login(c, pass);
    if (!u) return toast('Contraseña incorrecta. Inténtalo de nuevo.');

    // Cargar progreso de todos los cursos para este usuario
    const courseIds = COURSES.map((cr) => cr.id);
    const p = await Store.getAllCoursesProgress(u.cedula, courseIds);
    progRef.current = p;
    setAllProg(p);
    setUser(u);
    show('courses');
  };

  const doRegister = async (u) => {
    try {
      await Store.register(u);
      setPrefill(u.cedula);
      toast('Registro completado con éxito. Ya puedes ingresar.');
      show('login');
    } catch (err) {
      toast(err.message);
    }
  };

  /* ---- Evaluación / Examen ---- */
  const finishExam = async (ids, ans, course) => {
    const allAttempts = await Store.attempts();
    const prev = allAttempts.filter(
      (a) => a.cedula === user.cedula && (a.courseId || 'seguridad') === course.id
    );

    let ok = 0;
    const d = ids.map((id, n) => {
      const q = course.bank[id];
      const k = ans[n];
      const hit = k === q[2];
      if (hit) ok++;
      return {
        n: n + 1,
        qid: id + 1,
        pregunta: q[0],
        opcion: L[k] + ') ' + q[1][k],
        acierto: hit ? 'Ganada' : 'Equivocada',
      };
    });

    const nota = Math.round((ok / ids.length) * 100);
    const aprobada = nota >= 80;

    await Store.saveAttempt({
      cedula: user.cedula,
      courseId: course.id,
      courseTitle: course.title,
      fecha: new Date().toISOString(),
      intento: prev.length + 1,
      nota,
      estado: aprobada ? 'Aprobada' : 'Reprobada',
      d,
    });

    setResult({
      nota,
      aprobada,
      ok,
      n: prev.length + 1,
      courseTitle: course.title,
      best: Math.max(nota, ...prev.map((a) => a.nota)),
    });
    show('result');
  };

  /* ---- Botón atrás físico de Android ---- */
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (screen === 'login') return false;
      if (screen === 'register') show('login');
      else if (screen === 'detail') show('audit');
      else if (screen === 'courseModule') show('menu');
      else if (screen === 'exam') show('menu');
      else if (screen === 'menu') show('courses');
      else if (screen !== 'courses') show('courses');
      else return false;
      return true;
    });
    return () => sub.remove();
  });

  const showBar = screen !== 'login' && screen !== 'register';
  const doneMods = currentCourse.modules.filter((_, i) => currentProg[i] === 'done').length;
  const pct = Math.round((doneMods / currentCourse.modules.length) * 100);
  const u = unlocked();

  const a =
    screen === 'courseModule'
      ? 'm' + mod
      : screen === 'menu'
        ? 'menu'
        : screen === 'courses'
          ? 'courses'
          : ['exam', 'result'].includes(screen)
            ? 'exam'
            : ['audit', 'detail'].includes(screen)
              ? 'audit'
              : '';

  const initials = user
    ? (user.nombres[0] + (user.apellidos ? user.apellidos[0] : '')).toUpperCase()
    : 'OP';
  const maxW = width >= 700 ? 780 : 540;

  let body = null;
  switch (screen) {
    case 'login':
      body = (
        <Login
          initialCedula={prefill}
          onLogin={doLogin}
          onRegister={() => show('register')}
        />
      );
      break;

    case 'register':
      body = (
        <Register
          initialCedula={prefill}
          onSubmit={doRegister}
          onBack={() => show('login')}
          toast={toast}
        />
      );
      break;

    case 'courses':
      body = (
        <CoursesCatalog
          user={user}
          allProg={allProg}
          onSelectCourse={selectCourse}
          go={show}
        />
      );
      break;

    case 'menu':
      body = (
        <Menu
          user={user}
          course={currentCourse}
          prog={currentProg}
          unlocked={u}
          onMod={openMod}
          onExam={goExam}
          onBackCourses={() => show('courses')}
          go={show}
        />
      );
      break;

    case 'courseModule':
      body = (
        <Module
          course={currentCourse}
          i={mod}
          onPrev={() => openMod(mod - 1)}
          onNext={async () => {
            await markModule(currentCourse.id, mod, 'done');
            mod === currentCourse.modules.length - 1 ? goExam() : openMod(mod + 1);
          }}
          onBackMenu={() => show('menu')}
        />
      );
      break;

    case 'exam':
      body = (
        <Exam
          key={examKey}
          course={currentCourse}
          onFinish={finishExam}
          onBackMenu={() => show('menu')}
          toast={toast}
        />
      );
      break;

    case 'result':
      body = (
        <Result
          r={result}
          onRetry={() => show('exam')}
          go={show}
          onBackCourses={() => show('courses')}
        />
      );
      break;

    case 'audit':
      body = (
        <Audit
          attempts={attempts}
          onOpen={(at) => {
            setDetail(at);
            show('detail');
          }}
          onBackCourses={() => show('courses')}
        />
      );
      break;

    case 'detail':
      body = <Detail a={detail} go={show} />;
      break;

    case 'help':
      body = <Help onBackCourses={() => show('courses')} />;
      break;

    case 'credits':
      body = <Credits onBackCourses={() => show('courses')} />;
      break;

    default:
  }

  const NavBtn = ({ on, lock, onPress, children }) => (
    <Pressable
      onPress={onPress}
      style={[s.nb, on && s.nbOn, lock && { opacity: 0.5 }]}
    >
      {children}
    </Pressable>
  );

  const nt = (on) => [s.nbT, on && { color: currentCourse.color || C.blue }];

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <StatusBar style={showBar ? 'light' : 'dark'} />
      {showBar ? (
        <>
          <View style={[s.hdrWrap, { paddingTop: ins.top }]}>
            <View style={s.hdr}>
              <Pressable
                style={s.burger}
                onPress={() => setNavOpen((o) => !o)}
                accessibilityLabel="Abrir menú de navegación"
                accessibilityState={{ expanded: navOpen }}
              >
                <Text style={{ color: '#fff', fontSize: 19 }}>☰</Text>
              </Pressable>

              <Pressable
                style={s.logo}
                onPress={() => show('courses')}
                accessibilityLabel="Ir al catálogo de cursos"
              >
                <Ring
                  pct={pct}
                  size={40}
                  color={currentCourse.color}
                  glowColor={currentCourse.glowColor}
                />
                <View>
                  <Text style={s.logoT}>PrevenApp</Text>
                  <Text style={s.logoS}>
                    {screen === 'courses' ? 'Sistema Integral SST' : currentCourse.code}
                  </Text>
                </View>
              </Pressable>

              {/* Avatar Cuadrado con bordes afilados y glow */}
              <Pressable
                style={[s.avatar, glow(C.cyan, 0.4, 6)]}
                onPress={logout}
                accessibilityLabel="Cerrar sesión del operador"
              >
                <Text style={{ color: C.cyan, fontWeight: '900', fontSize: 13 }}>
                  {initials}
                </Text>
              </Pressable>
            </View>

            {/* Menú Desplegable con bordes rectos y glow */}
            {navOpen && (
              <View style={[s.dd, glow(C.cyan, 0.45, 12)]}>
                <ScrollView
                  style={{ maxHeight: height - 70 - ins.top }}
                  contentContainerStyle={{ padding: 10, gap: 4 }}
                >
                  <NavBtn on={a === 'courses'} onPress={() => show('courses')}>
                    <Text style={nt(a === 'courses')}>Todos los Cursos</Text>
                  </NavBtn>

                  <View style={s.ddDivider} />
                  <Text style={s.ddSectionHeader}>
                    {`CURSO: ${currentCourse.title.toUpperCase()}`}
                  </Text>

                  <NavBtn on={a === 'menu'} onPress={() => show('menu')}>
                    <Text style={nt(a === 'menu')}>Temario del Curso</Text>
                  </NavBtn>

                  {currentCourse.modules.map((m, i) => (
                    <NavBtn key={i} on={a === 'm' + i} onPress={() => openMod(i)}>
                      <View
                        style={[
                          s.n,
                          currentProg[i] === 'doing' && { backgroundColor: currentCourse.color },
                          currentProg[i] === 'done' && { backgroundColor: C.grn },
                        ]}
                      >
                        <Text style={{ color: '#fff', fontWeight: '800', fontSize: 11 }}>
                          {i + 1}
                        </Text>
                      </View>
                      <Text style={[nt(a === 'm' + i), { flex: 1 }]} numberOfLines={1}>
                        {m.t}
                      </Text>
                    </NavBtn>
                  ))}

                  <NavBtn on={a === 'exam'} lock={!u} onPress={goExam}>
                    <Text style={nt(a === 'exam')}>Evaluación Certificada</Text>
                    {!u && (
                      <View style={s.lockBadge}>
                        <Text style={s.lockBadgeTxt}>BLOQUEADO</Text>
                      </View>
                    )}
                  </NavBtn>

                  <View style={s.ddDivider} />

                  <NavBtn on={a === 'audit'} onPress={() => show('audit')}>
                    <Text style={nt(a === 'audit')}>Auditoría / Progreso</Text>
                  </NavBtn>
                  <NavBtn onPress={() => show('help')}>
                    <Text style={nt(false)}>Cómo usar</Text>
                  </NavBtn>
                  <NavBtn onPress={() => show('credits')}>
                    <Text style={nt(false)}>Créditos</Text>
                  </NavBtn>
                  <NavBtn onPress={logout}>
                    <Text style={[nt(false), { color: C.red }]}>Cerrar Sesión</Text>
                  </NavBtn>
                </ScrollView>
              </View>
            )}
          </View>

          {/* Línea inferior de resplandor neón según el curso activo */}
          <View
            style={[
              { height: 3.5, backgroundColor: currentCourse.color || C.cyan },
              glow(currentCourse.glowColor || C.cyan, 0.7, 8),
            ]}
          />
        </>
      ) : (
        <View style={{ height: ins.top }} />
      )}

      {/* Contenedor desplazable principal */}
      <ScrollView
        key={screen + currentCourse.id + (screen === 'courseModule' ? mod : '') + examKey}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          width: '100%',
          maxWidth: maxW,
          alignSelf: 'center',
          paddingTop: width >= 700 ? 24 : 16,
          paddingHorizontal: 16,
          paddingBottom: 36 + ins.bottom + 40,
        }}
      >
        {body}
      </ScrollView>

      <Toast toast={toastMsg} />
    </View>
  );
}

const s = StyleSheet.create({
  hdrWrap: {
    backgroundColor: '#091222',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 212, 255, 0.25)',
    zIndex: 25,
    elevation: 20,
    borderRadius: 0,
  },
  hdr: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  burger: {
    minWidth: 42,
    minHeight: 42,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,.3)',
    backgroundColor: '#0F1A2E',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0, // CERO BORDES REDONDEADOS
  },
  logo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoT: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 17.5,
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  logoS: {
    color: '#00D4FF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  avatar: {
    width: 38,
    height: 38,
    borderWidth: 1.5,
    borderColor: C.cyan,
    backgroundColor: '#0C1628',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0, // CERO BORDES REDONDEADOS
  },
  dd: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '100%',
    backgroundColor: '#0B1426',
    borderBottomWidth: 2,
    borderBottomColor: C.cyan,
    elevation: 24,
    zIndex: 35,
    borderRadius: 0, // CERO BORDES REDONDEADOS
  },
  ddDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 4,
  },
  ddSectionHeader: {
    fontSize: 10,
    fontWeight: '900',
    color: '#64748B',
    letterSpacing: 0.8,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  nb: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 44,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    borderRadius: 0, // CERO BORDES REDONDEADOS
  },
  nbOn: {
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderColor: C.cyan,
  },
  nbT: {
    fontWeight: '800',
    fontSize: 14.5,
    color: '#E2E8F0',
  },
  n: {
    width: 24,
    height: 24,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0, // CERO BORDES REDONDEADOS
  },
  lockBadge: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 0,
    marginLeft: 'auto',
  },
  lockBadgeTxt: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
});
