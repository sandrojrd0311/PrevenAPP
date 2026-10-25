/* Banco de datos multi-curso para PrevenApp */

export const COURSES = [
  {
    id: 'seguridad',
    code: 'SEG-101',
    title: 'Seguridad Industrial & Control de Riesgos',
    tagline: 'Rombo NFPA 704, clasificación de materiales peligrosos y protección EPP.',
    color: '#0B5CAD',
    glowColor: '#00D4FF',
    badge: 'Obligatorio',
    level: 'Nivel I',
    duration: '4 Horas',
    icon: '',
    logoType: 'security',
    modules: [
      {
        t: 'Control de riesgos y Rombo NFPA 704',
        c: '#C8102E',
        icon: '',
        desc: 'El rombo NFPA 704: qué significan sus colores y escala de 0 a 4.',
        imgType: 'nfpa_diamond',
        imgTitle: 'ESQUEMA NFPA 704: CÓDIGO DE COLORES',
        imgCaption: 'Fig. 1.1: Rombo normativo estándar para identificación de peligros inmediatos en materiales.',
        p: 'El rombo NFPA 704 resume tres riesgos fundamentales con colores y una escala de severidad de 0 (mínimo) a 4 (extremo), más una sección blanca para peligros específicos.',
        r: [
          ['Azul', 'Riesgo para la salud humana y toxicidad inmediata.', '#1565C0'],
          ['Rojo', 'Riesgo de inflamabilidad y punto de ignición térmica.', '#C8102E'],
          ['Amarillo', 'Riesgo por reactividad química e inestabilidad explosiva.', '#B88A00'],
          ['Blanco', 'Peligro específico: OX (oxidante), W (reactivo al agua), SA (gas asfixiante).', '#455A64'],
          ['Nivel A-D', 'Escala de trajes y niveles de protección personal según el riesgo.', '#111'],
          ['Color', 'Selección de filtros para respiradores según código normalizado.', '#555']
        ]
      },
      {
        t: 'Riesgo para la salud (Cuadrante Azul)',
        c: '#1565C0',
        icon: '',
        desc: 'Niveles 0 a 4: desde sin peligro residual hasta riesgo mortal inmediato.',
        imgType: 'health_hazard',
        imgTitle: 'ESCALA DE TOXICIDAD Y SALUD (0-4)',
        imgCaption: 'Fig. 1.2: Clasificación de daños biológicos según tiempo de exposición y letalidad.',
        r: [
          ['4', 'Mortal: Una exposición muy corta puede causar la muerte o daño permanente irreversible.'],
          ['3', 'Severo: Exposición corta puede causar lesiones temporales o permanentes de gravedad.'],
          ['2', 'Moderado: Exposición intensa o continuada causa incapacidad temporal sin atención médica rápida.'],
          ['1', 'Ligero: Exposición produce irritación leve y solo daños residuales menores.'],
          ['0', 'Mínimo: Sin peligro para la salud en condiciones ordinarias o de incendio.']
        ]
      },
      {
        t: 'Riesgo de inflamabilidad (Cuadrante Rojo)',
        c: '#C8102E',
        icon: '',
        desc: 'Facilidad de ignición y temperaturas críticas de autoignición.',
        imgType: 'fire_hazard',
        imgTitle: 'PUNTOS DE INFLAMABILIDAD SEGÚN NORMA',
        imgCaption: 'Fig. 1.3: Comportamiento de vapores y líquidos combustibles ante fuentes de calor.',
        r: [
          ['4', 'Extremadamente inflamable: Se vaporiza por completo y arde a temperatura ambiente (< 23°C).'],
          ['3', 'Inflamable severo: Líquidos y sólidos que encienden bajo casi cualquier clima (< 38°C).'],
          ['2', 'Combustible moderado: Requiere precalentamiento moderado antes de iniciar ignición (< 93°C).'],
          ['1', 'Combustible ligero: Debe ser calentado intensamente para entrar en ignición (> 93°C).'],
          ['0', 'Incombustible: Materiales estables que no arden aún sometidos a fuego directo.']
        ]
      },
      {
        t: 'Riesgo por reactividad (Cuadrante Amarillo)',
        c: '#B88A00',
        icon: '',
        desc: 'Inestabilidad química y violencia de reacción con agua o calor.',
        imgType: 'reactivity_hazard',
        imgTitle: 'ENERGÍA DE ACTIVACIÓN E INESTABILIDAD',
        imgCaption: 'Fig. 1.4: Riesgo de descomposición violenta, detonación y liberación masiva de energía.',
        r: [
          ['4', 'Detonante inmediato: Capaz de explotar a temperatura y presión estándar por sí mismo.'],
          ['3', 'Detonable con fuente: Puede explotar ante un fuerte choque o calor en confinamiento.'],
          ['2', 'Cambio violento: Sufre cambios químicos violentos a alta temperatura o reacciona con agua.'],
          ['1', 'Inestable con calor: Estable en condiciones normales pero susceptible a presión y calor.'],
          ['0', 'Estable total: No reacciona con agua ni descompone bajo exposición al fuego.']
        ]
      },
      {
        t: 'Protección personal: Niveles A y B',
        c: '#111',
        icon: '',
        desc: 'Máxima protección química encapsulada y equipos de aire autónomo SCBA.',
        imgType: 'ppe_ab',
        imgTitle: 'EQUIPOS AUTÓNOMOS DE MÁXIMA CONTENCIÓN',
        imgCaption: 'Fig. 1.5: Trajes estancos de barrera total ante atmósferas con peligro IDLH.',
        r: [
          ['A', 'Máxima protección total: Traje completamente encapsulado hermético a vapores y gases, equipo de respiración autónoma (SCBA) de presión positiva, guantes químicos dobles y botas resistentes.'],
          ['B', 'Máxima protección respiratoria (SCBA) con menor protección dérmica: Traje contra salpicaduras no encapsulado. Nivel mínimo exigido para evaluar atmósferas con contaminantes desconocidos.']
        ]
      },
      {
        t: 'Protección personal: Niveles C y D',
        c: '#111',
        icon: '',
        desc: 'Protección intermedia con filtros canister y uniforme operativo de planta.',
        imgType: 'ppe_cd',
        imgTitle: 'PROTECCIÓN FILTRANTE Y ROPA ESTÁNDAR',
        imgCaption: 'Fig. 1.6: Selección de mascarillas filtrantes cuando la concentración de oxígeno es superior a 19.5%.',
        r: [
          ['C', 'Misma protección dérmica que B con respirador purificador de aire por cartuchos o canister. Requiere concentración de oxígeno mínima certificada del 19.5% y contaminantes identificados.'],
          ['D', 'Protección estándar básica de faena: Casco reglamentario, calzado con puntera de seguridad, gafas con protección lateral y guantes según requerimiento operativo.']
        ]
      },
      {
        t: 'Respiradores por código de color',
        c: '#555',
        icon: '',
        desc: 'Código normalizado OSHA/NIOSH para cartuchos y filtros químicos.',
        imgType: 'cartridges',
        imgTitle: 'GUÍA CROMÁTICA DE FILTROS NIOSH / OSHA',
        imgCaption: 'Fig. 1.7: Código cromático universal para absorción de vapores, gases y aerosoles.',
        r: [
          ['Negro', 'Vapores orgánicos (solventes, hidrocarburos, pinturas y barnices).', '#111'],
          ['Blanco', 'Gases ácidos (cloro, dióxido de azufre, ácido clorhídrico).', '#888'],
          ['Verde', 'Amoníaco y derivados gaseosos de aminas.', '#1B7F3B'],
          ['Amarillo', 'Gases ácidos combinados con vapores orgánicos de amplio espectro.', '#B88A00'],
          ['Rojo', 'Filtro universal para polvos, humos metálicos y aerosoles tóxicos.', '#C8102E'],
          ['Azul', 'Monóxido de carbono e intrusiones de humos de fundición.', '#1565C0'],
          ['Marrón', 'Compuestos de gases ácidos + vapores orgánicos + gas amoníaco.', '#6D4C41'],
          ['Violeta', 'Filtro HEPA / P100 para material particulado radiactivo y polvos de alta toxicidad.', '#6A1B9A']
        ]
      },
      {
        t: 'Gerencia de seguridad y trabajos de alto riesgo',
        c: '#0F1B2D',
        icon: '',
        desc: 'Equipos EPP, prevención en alturas, señalética y permisos de trabajo PT.',
        imgType: 'safety_management',
        imgTitle: 'MATRIZ DE JERARQUÍA DE CONTROL DE RIESGOS',
        imgCaption: 'Fig. 1.8: Eliminación, sustitución, controles de ingeniería, señalización y protección EPP.',
        p: 'La gestión de seguridad se basa en jerarquizar los controles: eliminar el peligro en origen antes de depender exclusivamente del equipo de protección personal.',
        r: [
          ['EPP', 'Uso obligatorio y certificado de casco dieléctrico, guantes de nitrilo/cuero, gafas antivaho y calzado con suela antideslizante.', '#0F1B2D'],
          ['Altura', 'A partir de 1.50 m: Arnés integral de cuerpo entero de 4 puntos, línea de vida con absorbedor de impacto y punto de anclaje certificado a 5000 lb.', '#0F1B2D'],
          ['Señales', 'Reconocimiento inmediato de señalización: Rojo (Prohibición/Fuego), Amarillo (Peligro/Advertencia), Azul (Obligación) y Verde (Evacuación y Salvamento).', '#0F1B2D']
        ]
      }
    ],
    bank: [
      ["¿Qué color del rombo NFPA 704 indica el riesgo para la salud?", ["Azul", "Rojo", "Amarillo"], 0],
      ["¿Qué color del rombo indica el riesgo de inflamabilidad?", ["Azul", "Rojo", "Amarillo"], 1],
      ["¿Qué color indica el riesgo por reactividad (inestabilidad)?", ["Rojo", "Azul", "Amarillo"], 2],
      ["¿Qué escala de niveles usa el rombo NFPA 704?", ["De 0 a 2", "De 0 a 4", "De 1 a 10"], 1],
      ["¿Qué significa el nivel 4 en cualquiera de los riesgos?", ["Riesgo severo", "Riesgo mínimo", "Sin riesgo"], 0],
      ["¿Qué significa el nivel 0 de inflamabilidad?", ["Se enciende fácilmente", "Se vaporiza rápido", "Materiales que no se queman"], 2],
      ["Salud nivel 4: una exposición muy corta puede causar…", ["Irritación leve", "Muerte o daño permanente", "Ningún daño"], 1],
      ["Salud nivel 1: la exposición causa…", ["Irritación con daños residuales menores", "Muerte inmediata", "Incapacidad permanente"], 0],
      ["Inflamabilidad nivel 3: son materiales que…", ["No se queman", "Deben precalentarse mucho", "Pueden encenderse en casi todas las temperaturas ambientales"], 2],
      ["Inflamabilidad nivel 1: son materiales que…", ["Deben precalentarse antes de que ocurra la ignición", "Se vaporizan al instante", "Explotan solos"], 0],
      ["Reactividad nivel 4: son materiales que…", ["Son totalmente estables", "Pueden explotar o detonar a temperatura y presión normales", "Solo reaccionan con agua tibia"], 1],
      ["Reactividad nivel 0: son materiales que…", ["Detonan con calor", "Son inestables", "Son estables aun en incendio y no reaccionan con el agua"], 2],
      ["¿Qué nivel ofrece la mayor protección respiratoria y de la piel?", ["Nivel A", "Nivel B", "Nivel D"], 0],
      ["El equipo del Nivel A incluye…", ["Solo casco y botas", "Respirador autocontenido y vestido encapsulado resistente a químicos", "Ropa de trabajo ordinaria"], 1],
      ["¿Qué diferencia al Nivel B del Nivel A?", ["No usa respirador", "Misma protección respiratoria pero menos protección de la piel", "Es el nivel más bajo"], 1],
      ["El Nivel C se usa cuando los contaminantes…", ["Son desconocidos", "Están identificados y medidos y un canister puede removerlos", "No existen"], 1],
      ["¿Qué nivel corresponde a ropa de trabajo ordinaria sin riesgo químico conocido?", ["Nivel A", "Nivel C", "Nivel D"], 2],
      ["¿Cuál es el mínimo de oxígeno en la atmósfera para usar respirador con filtro?", ["19.5 %", "5 %", "50 %"], 0],
      ["El Nivel D NO es adecuado cuando hay…", ["Ropa uniforme", "Salpicaduras, inmersión o inhalación potencial de químicos", "Zapatos de seguridad"], 1],
      ["¿Qué nivel es el mínimo recomendado para entrar a un sitio con riesgo no identificado?", ["Nivel D", "Nivel C", "Nivel B"], 2],
      ["Color del respirador para vapores orgánicos:", ["Negro", "Verde", "Violeta"], 0],
      ["Color del respirador para gases de amoníaco:", ["Blanco", "Verde", "Azul"], 1],
      ["Color del respirador para gases ácidos:", ["Blanco", "Marrón", "Rojo"], 0],
      ["Color del respirador para gases ácidos + gases orgánicos:", ["Amarillo", "Negro", "Verde"], 0],
      ["El respirador rojo (universal) protege contra…", ["Solo amoníaco", "Polvos, humos y aerosoles", "Solo vapores orgánicos"], 1],
      ["El respirador azul protege contra…", ["Monóxido de carbono y humos metálicos", "Polvos radiactivos", "Gases de amoníaco"], 0],
      ["El respirador violeta se usa para…", ["Gases ácidos", "Materiales radiactivos y polvos tóxicos", "Vapores orgánicos"], 1],
      ["¿Qué elemento protege la cabeza?", ["Guantes", "Casco de seguridad", "Gafas"], 1],
      ["En trabajos en altura una protección colectiva es…", ["Barandillas y redes", "Gafas oscuras", "Ropa de algodón"], 0],
      ["Para trabajos en altura el trabajador debe usar…", ["Arnés y línea de vida", "Solo casco", "Ninguna protección"], 0],
      ["Antes de entrar a un área de riesgo debes…", ["Entrar rápido", "Identificar las señales y el nivel de protección requerido", "Quitarte los guantes"], 1]
    ]
  },
  {
    id: 'primeros-auxilios',
    code: 'PAX-201',
    title: 'Primeros Auxilios y Soporte Vital Básico',
    tagline: 'Protocolo PAS, reanimación cardiopulmonar RCP, atragantamiento y heridas críticas.',
    color: '#C62828',
    glowColor: '#FF2A4B',
    badge: 'Soporte Vital',
    level: 'Nivel I',
    duration: '6 Horas',
    icon: '',
    logoType: 'first_aid',
    modules: [
      {
        t: 'Protocolo P.A.S. y Valoración Primaria ABCDE',
        c: '#C62828',
        icon: '',
        desc: 'Proteger, Avisar y Socorrer ante cualquier incidente laboral.',
        imgType: 'pas_protocol',
        imgTitle: 'PROTOCOLO DE ACTUACIÓN SECUENCIAL P.A.S.',
        imgCaption: 'Fig. 2.1: Cadena de decisión inmediata para asegurar la escena y activar sistemas SEM.',
        p: 'La regla de oro en emergencias es P.A.S.: Proteger al accidentado y a uno mismo, Avisar a los servicios médicos con información clara, y Socorrer manteniendo la calma.',
        r: [
          ['Proteger', 'Asegurar el entorno eliminando fuentes eléctricas, fugas o tráfico antes de tocar al paciente.', '#C62828'],
          ['Avisar', 'Llamar al número de emergencia (123 / Cruz Roja) indicando ubicación exacta, número de afectados y estado consciente/inconsciente.', '#1565C0'],
          ['Socorrer', 'Aplicar soporte sin mover la columna cervical si se sospecha trauma por impacto o caída.', '#1E8E5A'],
          ['ABCDE', 'A: Vía aérea con control cervical; B: Ventilación; C: Circulación y pulso; D: Déficit neurológico; E: Exposición.', '#E0A800']
        ]
      },
      {
        t: 'Reanimación Cardiopulmonar (RCP) y DEA',
        c: '#B71C1C',
        icon: '',
        desc: 'Compresiones torácicas de alta calidad y uso del desfibrilador.',
        imgType: 'cpr_technique',
        imgTitle: 'RITMO Y POSICIÓN EN COMPRESIONES RCP',
        imgCaption: 'Fig. 2.2: Manos entrelazadas en el tercio medio esternal a ritmo de 100-120 cpm y profundidad de 5 cm.',
        r: [
          ['Ritmo', 'Compresiones a una frecuencia ininterrumpida de 100 a 120 por minuto en el centro del pecho.'],
          ['Profundidad', 'Comprimir con los brazos rectos al menos 5 cm en adultos, permitiendo la reexpansión total del tórax.'],
          ['Relación', 'Ciclos de 30 compresiones seguidas de 2 insuflaciones, o solo compresiones continuas si no hay mascarilla.'],
          ['DEA', 'Encender el Desfibrilador Externo Automático tan pronto llegue y seguir estrictamente sus instrucciones por voz.']
        ]
      },
      {
        t: 'Obstrucción de Vía Aérea (Maniobra de Heimlich)',
        c: '#D32F2F',
        icon: '',
        desc: 'Técnica de desobstrucción por atragantamiento en adultos conscientes.',
        imgType: 'heimlich_maneuver',
        imgTitle: 'APLICACIÓN DE EMPUJES ABDOMINALES HEIMLICH',
        imgCaption: 'Fig. 2.3: Puño cerrado entre el ombligo y el apéndice xifoides con impulso hacia adentro y arriba.',
        r: [
          ['Signo', 'La víctima se lleva las manos al cuello, presenta incapacidad para hablar, toser o respirar con cianosis facial.'],
          ['Postura', 'Colocarse de pie detrás de la víctima, inclinándola ligeramente hacia adelante para facilitar la salida del objeto.'],
          ['Empujes', 'Colocar el puño con el pulgar hacia el abdomen entre el ombligo y el tórax, impulsando con fuerza hacia arriba y atrás.'],
          ['Inconsciente', 'Si la persona pierde el conocimiento, tenderla suavemente sobre el suelo e iniciar de inmediato ciclos de RCP.']
        ]
      },
      {
        t: 'Control de Hemorragias Severas y Torniquete',
        c: '#880E4F',
        icon: '',
        desc: 'Presión directa, vendajes compresivos y torniquetes tácticos.',
        imgType: 'tourniquet_guide',
        imgTitle: 'CONTENCIÓN DE SANGannotation EXANGUINANTE',
        imgCaption: 'Fig. 2.4: Colocación de torniquete táctico CAT 5-7 cm por encima de la herida en extremidades.',
        r: [
          ['Presión directa', 'Cubrir la herida con gasas o paño limpio y presionar con ambas manos firmemente sin levantar.'],
          ['Torniquete', 'En hemorragias arteriales que amenacen la vida en brazos o piernas, colocar torniquete 5-7 cm por encima de la herida.'],
          ['Registro', 'Anotar la hora exacta de colocación en la cinta del torniquete; NUNCA aflojarlo hasta llegar al centro asistencial.']
        ]
      },
      {
        t: 'Atención a Quemaduras Térmicas y Químicas',
        c: '#E65100',
        icon: '',
        desc: 'Enfriamiento con agua corriente y neutralización de sustancias.',
        imgType: 'burn_care',
        imgTitle: 'ENFRIAMIENTO Y PROTECCIÓN DE TEJIDO DÉRMICO',
        imgCaption: 'Fig. 2.5: Irrigación con agua a temperatura ambiente por 15-20 min. No aplicar hielo ni ungüentos.',
        r: [
          ['Agua limpia', 'Irrigar la zona afectada con agua templada o fresca corriente durante mínimo 15 a 20 minutos ininterrumpidos.'],
          ['Prohibido', 'No aplicar hielo directo, cremas, aceites, pasta dental ni romper ampollas (flictenas) formadas.'],
          ['Químicos', 'Quitar la ropa impregnada rápidamente cuidando no rozar los ojos y lavar con abundante agua continua por 30 minutos.']
        ]
      },
      {
        t: 'Botiquín de Primeros Auxilios y Triage START',
        c: '#1B5E20',
        icon: '',
        desc: 'Dotación reglamentaria y clasificación rápida de múltiples víctimas.',
        imgType: 'triage_system',
        imgTitle: 'CÓDIGO DE COLORES TRIAGE START',
        imgCaption: 'Fig. 2.6: Clasificación inmediata por tarjetas: Rojo (Prioridad I), Amarillo (II), Verde (III) y Negro (Fallecido).',
        r: [
          ['Rojo', 'Prioridad I: Lesión crítica con riesgo de muerte que requiere intervención quirúrgica inmediata.'],
          ['Amarillo', 'Prioridad II: Lesión moderada que puede demorar su atención sin peligro inminente para la vida.'],
          ['Verde', 'Prioridad III: Pacientes ambulatorios con lesiones leves capaces de caminar.'],
          ['Negro', 'Prioridad 0: Pacientes sin pulso ni respiración tras maniobra de apertura de vía aérea.']
        ]
      }
    ],
    bank: [
      ["¿Qué significan las siglas del protocolo P.A.S.?", ["Proteger, Avisar, Socorrer", "Prevenir, Actuar, Sanar", "Parar, Analizar, Salvar"], 0],
      ["En RCP para adultos, ¿cuál es la frecuencia adecuada de compresiones por minuto?", ["60 a 80 cpm", "100 a 120 cpm", "150 a 180 cpm"], 1],
      ["¿Cuál es la profundidad recomendada de las compresiones torácicas en adultos?", ["Al menos 5 cm", "Máximo 2 cm", "10 cm"], 0],
      ["¿Hacia dónde debe dirigirse la presión en la maniobra de Heimlich?", ["Hacia abajo y afuera", "Hacia adentro y arriba", "Hacia los costados"], 1],
      ["Ante una hemorragia arterial grave en un brazo, ¿qué técnica se aplica si la presión no basta?", ["Poner hielo", "Torniquete 5-7 cm por encima de la herida", "Colocar agua caliente"], 1],
      ["¿Qué se debe hacer de inmediato tras colocar un torniquete?", ["Aflojarlo cada 5 minutos", "Registrar la hora exacta de colocación", "Cubrirlo con vendas apretadas"], 1],
      ["¿Cómo debe enfriarse una quemadura térmica de primer o segundo grado?", ["Con hielo directo", "Con agua fresca o templada corriente por 15 a 20 minutos", "Con mantequilla o aceite"], 1],
      ["¿Por qué NUNCA se deben reventar las ampollas de una quemadura?", ["Porque protegen contra infecciones", "Porque aumentan la temperatura", "Porque duelen menos al reventarlas"], 0],
      ["En el método de triage START, ¿qué color identifica la máxima prioridad quirúrgica?", ["Verde", "Rojo", "Negro"], 1],
      ["Si una persona atragantada pierde la conciencia, ¿cuál es la acción inmediata?", ["Darle agua rápidamente", "Iniciar ciclos de RCP inmediatamente", "Golpearle la espalda acostado"], 1],
      ["¿Qué se debe verificar primero antes de tocar a una persona electrocutada?", ["Su pulso", "Que la fuente de energía esté cortada y el área sea segura", "Sus pupilas"], 1],
      ["¿Cuántas compresiones y respiraciones componen el ciclo clásico de RCP?", ["30 compresiones y 2 respiraciones", "15 compresiones y 5 respiraciones", "50 compresiones continuas"], 0]
    ]
  },
  {
    id: 'incendios',
    code: 'INC-301',
    title: 'Prevención y Combate de Incendios',
    tagline: 'Física del fuego, extintores portátiles A-B-C-D-K y táctica de combate con técnica TAPE.',
    color: '#E65100',
    glowColor: '#FF9100',
    badge: 'Brigada Activa',
    level: 'Nivel II',
    duration: '5 Horas',
    icon: '',
    logoType: 'fire',
    modules: [
      {
        t: 'Física y Química del Fuego: El Tetraedro',
        c: '#E65100',
        icon: '',
        desc: 'Combustible, comburente, calor y reacción en cadena.',
        imgType: 'tetrahedron',
        imgTitle: 'TETRAEDRO DEL FUEGO Y ENLACE QUÍMICO',
        imgCaption: 'Fig. 3.1: Los 4 componentes necesarios para que exista combustión continua autosostenida.',
        p: 'Para que el fuego exista y se mantenga se requieren 4 factores interconectados: Combustible, Comburente (oxígeno), Calor (energía de activación) y Reacción química en cadena.',
        r: [
          ['Combustible', 'Cualquier materia sólida, líquida o gaseosa capaz de oxidarse rápidamente.'],
          ['Comburente', 'El agente oxidante, comúnmente el oxígeno del aire (mínimo 16% para combustión con llama).'],
          ['Calor', 'Temperatura requerida para emitir vapores inflamables que alcancen el punto de ignición.'],
          ['Reacción en cadena', 'Mecanismo de radicales libres que transfiere calor a nuevas moléculas de combustible.']
        ]
      },
      {
        t: 'Clasificación de Incendios según la NFPA 10',
        c: '#BF360C',
        icon: '',
        desc: 'Clases normalizadas A, B, C, D y K según el material involucrado.',
        imgType: 'fire_classes',
        imgTitle: 'CLASIFICACIÓN DE FUEGOS SEGÚN SU NATURALEZA',
        imgCaption: 'Fig. 3.2: Símbolos geométricos y letras oficiales para rápida identificación en emergencias.',
        r: [
          ['Clase A', 'Materiales sólidos combustibles comunes: madera, papel, telas, cartón y plásticos.', '#2E7D32'],
          ['Clase B', 'Líquidos inflamables y gases: gasolina, ACPM, solventes, pinturas y gas propano.', '#C62828'],
          ['Clase C', 'Equipos e instalaciones energizadas: tableros eléctricos, motores, computadores y servidores.', '#1565C0'],
          ['Clase D', 'Metales combustibles reactivos: magnesio, sodio, titanio, circonio y potasio.', '#F57F17'],
          ['Clase K', 'Aceites y grasas de origen vegetal o animal en cocinas industriales y freidoras.', '#4A148C']
        ]
      },
      {
        t: 'Agentes Extintores y Técnica T.A.P.E. / P.A.S.S.',
        c: '#D84315',
        icon: '',
        desc: 'Operación correcta del extintor portátil para fuegos incipientes.',
        imgType: 'extinguisher_operation',
        imgTitle: 'MÉTODO DE DESCARGA T.A.P.E. / P.A.S.S.',
        imgCaption: 'Fig. 3.3: Tirar el pasador, Apuntar a la base de la llama, Presionar la manija y Esparcir en zigzag.',
        r: [
          ['T - Tirar', 'Romper el precinto de plástico y extraer el pasador de seguridad metálico con un giro firme.'],
          ['A - Apuntar', 'Posicionarse a favor del viento a 2-3 metros y apuntar la boquilla a la BASE de las llamas, no al humo.'],
          ['P - Presionar', 'Apretar firmemente la palanca de accionamiento superior para liberar el agente extintor comprimido.'],
          ['E - Esparcir', 'Mover la manguera de lado a lado en abanico o zigzag horizontal cubriendo toda el área incendiada.']
        ]
      },
      {
        t: 'Inspección de Extintores y Manómetros',
        c: '#FF6D00',
        icon: '',
        desc: 'Presión en verde, manguera sin fisuras y collarín de mantenimiento.',
        imgType: 'manometer_check',
        imgTitle: 'CRITERIOS DE INSPECCIÓN MENSUAL NFPA 10',
        imgCaption: 'Fig. 3.4: Indicador de aguja en la franja verde, pasador precintado y tarjeta de vigencia.',
        r: [
          ['Aguja manómetro', 'Debe situarse exactamente en la zona verde (presurizado). Si está a la izquierda requiere recarga urgente.'],
          ['Ubicación', 'Altura máxima de 1.50 m del suelo a la manija, libre de obstáculos en un radio de 1 metro y señalizado.'],
          ['Vigencia', 'Revisión anual obligatoria por taller certificado con prueba hidrostática cada 5 años.']
        ]
      },
      {
        t: 'Evacuación Táctica y Brigada de Emergencia',
        c: '#37474F',
        icon: '',
        desc: 'Plan de escape, punto de encuentro y contención de humo.',
        imgType: 'evacuation_map',
        imgTitle: 'RUTA DE SALIDA Y PUNTO DE ENCUENTRO',
        imgCaption: 'Fig. 3.5: Salidas de emergencia libres de cerrojos, señalética fotoluminiscente y conteo de personal.',
        r: [
          ['Caminar agachado', 'Si hay humo denso, avanzar a gatas cerca del suelo donde el aire es más limpio y la temperatura menor.'],
          ['Puertas calientes', 'Tocar las puertas con el dorso de la mano antes de abrirlas; si está caliente, buscar una ruta alterna.'],
          ['Punto de encuentro', 'Evacuar sin regresar por pertenencias y esperar el censo de brigadistas en la zona segura designada.']
        ]
      }
    ],
    bank: [
      ["¿Cuáles son los 4 elementos del tetraedro del fuego?", ["Combustible, Oxígeno, Calor y Reacción en cadena", "Fuego, Viento, Humo y Ceniza", "Agua, Aceite, Gas y Chispa"], 0],
      ["¿Qué material caracteriza un fuego Clase A?", ["Grasas de cocina", "Sólidos comunes como madera, papel y tela", "Equipos eléctricos con corriente"], 1],
      ["¿Por qué NUNCA se debe usar agua en un fuego eléctrico Clase C?", ["Porque apaga el fuego muy rápido", "Porque el agua conduce la electricidad y provoca electrocución", "Porque mancha los equipos"], 1],
      ["¿Qué significan las siglas de la técnica T.A.P.E. para usar extintores?", ["Tocar, Abrir, Parar, Esperar", "Tirar, Apuntar a la base, Presionar la manija, Esparcir en abanico", "Trasladar, Activar, Proteger, Evacuar"], 1],
      ["¿Hacia dónde se debe dirigir el chorro del extintor?", ["A la punta de las llamas", "Al humo más denso", "A la base misma del fuego"], 2],
      ["En el manómetro de un extintor presurizado, ¿dónde debe apuntar la aguja para estar operativo?", ["En la franja roja izquierda", "En la franja verde central", "Fuera de la escala"], 1],
      ["¿Para qué tipo de fuego está diseñado específicamente el extintor Clase K?", ["Aceites y grasas de cocina industrial", "Magnesio y titanio", "Madera y cartón"], 0],
      ["Al evacuar un edificio con presencia de humo denso, ¿cuál es la mejor postura?", ["Caminar de pie rápido", "Avanzar a gatas cerca del piso", "Correr con los ojos cerrados"], 1],
      ["¿Con qué parte de la mano se debe tantear una puerta antes de abrirla en un incendio?", ["Con la palma abierta", "Con el dorso de la mano", "Con los nudillos"], 1],
      ["Una vez en el punto de encuentro tras la evacuación, ¿qué debe hacerse?", ["Regresar por el celular", "Permanecer agrupados para el conteo de la brigada", "Entrar a apagar el fuego"], 1]
    ]
  },
  {
    id: 'ergonomia',
    code: 'ERG-102',
    title: 'Ergonomía Laboral e Higiene Postural',
    tagline: 'Prevención de lesiones musculoesqueléticas, levantamiento de cargas hasta 25 kg y pantallas PVD.',
    color: '#00897B',
    glowColor: '#1DE9B6',
    badge: 'Salud Postural',
    level: 'Nivel I',
    duration: '3 Horas',
    icon: '',
    logoType: 'ergonomics',
    modules: [
      {
        t: 'Biomecánica y Levantamiento Manual de Cargas',
        c: '#00897B',
        icon: '',
        desc: 'Límite normativo de 25 kg para hombres y 12.5 kg para mujeres en condiciones ideales.',
        imgType: 'lifting_ergonomics',
        imgTitle: 'TÉCNICA DE LEVANTAMIENTO BIOMECÁNICO',
        imgCaption: 'Fig. 4.1: Pies separados, flexión de rodillas a 90°, espalda recta y carga pegada al cuerpo.',
        p: 'El levantamiento incorrecto multiplica la presión intra-discal lumbar hasta por 10 veces. La fuerza debe realizarse con las piernas (cuádriceps) y nunca con los músculos de la espalda baja.',
        r: [
          ['Peso límite', 'Carga máxima individual recomendada: 25 kg en varones y 12.5 kg en mujeres en tareas regulares.'],
          ['Aproximación', 'Mantener la carga lo más cercana posible al centro de gravedad corporal para reducir el brazo de palanca.'],
          ['Flexión de piernas', 'Doblar siempre las rodillas manteniendo la espalda erguida; nunca flexionar la cintura con piernas rectas.'],
          ['Evitar torsiones', 'Girar con todo el cuerpo moviendo los pies; jamás realizar giros de tronco mientras se sostiene peso.']
        ]
      },
      {
        t: 'Ergonomía en Pantallas de Visualización de Datos (PVD)',
        c: '#00695C',
        icon: '',
        desc: 'Alineación de monitor, altura de silla, apoyo lumbar y regla 20-20-20.',
        imgType: 'desk_ergonomics',
        imgTitle: 'POSTURA NEUTRAL EN PUESTO INFORMATIZADO',
        imgCaption: 'Fig. 4.2: Ángulos de 90° en codos y rodillas, monitor a la altura de los ojos a 50-70 cm de distancia.',
        r: [
          ['Borde del monitor', 'El tercio superior de la pantalla debe quedar al mismo nivel horizontal de los ojos.'],
          ['Ángulos a 90°', 'Codos, caderas y rodillas deben formar ángulos de 90° con los pies apoyados planos en el suelo o reposapiés.'],
          ['Regla 20-20-20', 'Cada 20 minutos de pantalla, mirar un objeto a 20 pies (6 metros) de distancia durante al menos 20 segundos.']
        ]
      },
      {
        t: 'Pausas Activas y Compensación Muscular',
        c: '#004D40',
        icon: '',
        desc: 'Rutinas breves de estiramiento para reactivar circulación y relajar tendones.',
        imgType: 'stretching_routine',
        imgTitle: 'SECUENCIA DE ELONGACIÓN MUSCULAR CORTA',
        imgCaption: 'Fig. 4.3: Estiramientos controlados de cuello, antebrazos, zona lumbar y gemelos (5 a 8 min por jornada).',
        r: [
          ['Frecuencia', 'Realizar al menos dos pausas activas al día de 5 a 10 minutos cada una.'],
          ['Extensores de muñeca', 'Estirar el brazo al frente y llevar suavemente los dedos hacia atrás durante 15 segundos.'],
          ['Zona cervical', 'Inclinar suavemente la cabeza hacia los hombros sin forzar giros bruscos ni rebotes.']
        ]
      },
      {
        t: 'Prevención de Desórdenes Musculoesqueléticos (DME)',
        c: '#00796B',
        icon: '',
        desc: 'Detección temprana del síndrome del túnel carpiano, tendinitis y lumbalgia.',
        imgType: 'dme_prevention',
        imgTitle: 'ZONAS DE VULNERABILIDAD POR MOVIMIENTOS REPETITIVOS',
        imgCaption: 'Fig. 4.4: Síntomas iniciales: adormecimiento nocturno, pérdida de fuerza de agarre y ardor tendinoso.',
        r: [
          ['Túnel carpiano', 'Compresión del nervio mediano por flexión repetida de muñeca; se previene con mouse ergonómico vertical.'],
          ['Lumbalgia', 'Dolor en la zona baja de la columna originado por posturas estáticas prolongadas o cargas mal ejecutadas.']
        ]
      }
    ],
    bank: [
      ["¿Cuál es el peso máximo recomendado para levantamiento manual individual en condiciones ideales?", ["25 kg para hombres y 12.5 kg para mujeres", "50 kg para todos", "100 kg"], 0],
      ["Al levantar una carga pesada del suelo, ¿qué parte del cuerpo debe realizar la mayor fuerza?", ["Los músculos de la espalda baja", "Los cuádriceps y piernas con la espalda recta", "Los brazos estirados"], 1],
      ["¿Qué movimiento debe evitarse estrictamente al cargar un objeto pesado?", ["Respirar hondo", "Girar el tronco sin mover los pies", "Caminar despacio"], 1],
      ["¿A qué altura debe situarse el borde superior del monitor en un escritorio?", ["Al nivel de los ojos del usuario", "Muy por encima de la cabeza", "Al nivel de las rodillas"], 0],
      ["¿Qué ángulo aproximado deben formar los codos y las rodillas en una postura sentada correcta?", ["45 grados", "90 grados", "180 grados"], 1],
      ["¿En qué consiste la regla visual 20-20-20?", ["Trabajar 20 horas seguidas", "Cada 20 min, mirar a 20 pies (6 m) durante 20 segundos", "Dormir 20 minutos"], 1],
      ["¿Cuál es el propósito principal de las pausas activas durante la jornada?", ["Perder tiempo", "Romper la monotonía postural y mejorar la circulación muscular", "Aumentar el cansancio"], 1],
      ["¿Qué estructura nerviosa se ve comprometida en el síndrome del túnel carpiano?", ["El nervio ciático", "El nervio mediano de la muñeca", "El nervio óptico"], 1],
      ["Si una carga supera los 25 kg en el trabajo, ¿cuál es la medida obligatoria?", ["Cargarla rápido con impulso", "Pedir ayuda entre dos personas o usar ayuda mecánica", "Empujarla con la cabeza"], 1],
      ["¿Cómo deben colocarse los pies frente a una carga antes de levantarla?", ["Juntos y pegados", "Separados al ancho de los hombros para dar base de sustentación", "Uno detrás de otro en puntas"], 1]
    ]
  },
  {
    id: 'quimicos',
    code: 'SGA-202',
    title: 'Manejo Seguro de Sustancias Químicas (SGA / GHS)',
    tagline: 'Sistema Globalmente Armonizado, pictogramas de peligro, matriz de almacenamiento y hojas FDS.',
    color: '#7B1FA2',
    glowColor: '#B336FF',
    badge: 'Química Industrial',
    level: 'Nivel II',
    duration: '5 Horas',
    icon: '',
    logoType: 'chemical',
    modules: [
      {
        t: 'Introducción al Sistema Globalmente Armonizado (SGA)',
        c: '#7B1FA2',
        icon: '',
        desc: 'Criterios unificados de la ONU para clasificar peligros físicos, a la salud y al ambiente.',
        imgType: 'ghs_overview',
        imgTitle: 'SISTEMA GLOBALMENTE ARMONIZADO (GHS / SGA)',
        imgCaption: 'Fig. 5.1: Etiqueta estandarizada: palabras de advertencia (Peligro / Atención) y consejos de prudencia.',
        p: 'El SGA fue creado por las Naciones Unidas para sustituir normas locales dispares por un solo lenguaje visual comprensible a nivel planetario en el transporte y uso de productos químicos.',
        r: [
          ['Etiqueta SGA', 'Debe contener: Identificador del producto, Pictogramas de peligro, Palabra de advertencia, Indicaciones de peligro (Frases H) y Consejos de prudencia (Frases P).'],
          ['Palabras clave', '"PELIGRO" se reserva para las categorías más severas, mientras que "ATENCIÓN" se usa para riesgos de menor gravedad.']
        ]
      },
      {
        t: 'Los 9 Pictogramas de Peligro del SGA',
        c: '#6A1B9A',
        icon: '',
        desc: 'Rombo de borde rojo con fondo blanco y símbolo negro central.',
        imgType: 'ghs_pictograms',
        imgTitle: 'MATRIZ DE PICTOGRAMAS UNIVERSALES SGA',
        imgCaption: 'Fig. 5.2: Corrosión, toxicidad aguda (calavera), peligro para la salud (estrella torácica), inflamable y oxidante.',
        r: [
          ['Bomba explotando', 'Sustancias explosivas, autorreactivas y peróxidos orgánicos.', '#B71C1C'],
          ['Llama', 'Líquidos, sólidos y gases inflamables, pirofóricos y reactivos al agua.', '#E65100'],
          ['Calavera con tibias', 'Toxicidad aguda severa: riesgo letal o envenenamiento por ingestión, piel o inhalación.', '#111'],
          ['Peligro para la salud', 'Carcinogenicidad, mutagenicidad, toxicidad reproductiva y sensibilización respiratoria.', '#4A148C'],
          ['Corrosión', 'Sustancias que atacan metales y causan quemaduras graves irreversibles en piel y ojos.', '#455A64'],
          ['Medio ambiente', 'Toxicidad aguda y crónica para organismos y ecosistemas acuáticos.', '#1B5E20']
        ]
      },
      {
        t: 'Ficha de Datos de Seguridad (FDS / SDS - 16 Secciones)',
        c: '#4A148C',
        icon: '',
        desc: 'Estructura normativa de 16 capítulos que detalla propiedades y primeros auxilios.',
        imgType: 'sds_sheet',
        imgTitle: 'ESTRUCTURA NORMALIZADA DE 16 SECCIONES FDS',
        imgCaption: 'Fig. 5.3: Sección 1 (Identificación) a Sección 16 (Otras informaciones técnicas y toxicológicas).',
        r: [
          ['Sección 1 a 4', '1: Identificación química; 2: Identificación de peligros; 3: Composición; 4: Primeros auxilios inmediatos.'],
          ['Sección 5 a 8', '5: Medidas de lucha contra incendios; 6: Medidas en fugas o derrames; 7: Manipulación y almacenamiento; 8: Controles de exposición y EPP.'],
          ['Acceso libre', 'Todo operario debe tener acceso inmediato y físico a las FDS en su idioma de trabajo sin barreras.']
        ]
      },
      {
        t: 'Matriz de Incompatibilidad y Control de Derrames',
        c: '#311B92',
        icon: '',
        desc: 'Separación segura de químicos y uso de kits antiderrames con absorbentes.',
        imgType: 'spill_kit',
        imgTitle: 'MATRIZ DE COMPATIBILIDAD Y CONFINAMIENTO',
        imgCaption: 'Fig. 5.4: Nunca almacenar ácidos con bases ni oxidantes con solventes orgánicos inflamables.',
        r: [
          ['Incompatibilidad', 'Ácidos y bases deben estar separados físicamente para evitar reacciones exotérmicas violentas.'],
          ['Kit de derrames', 'Dotado con cordones absorbentes, almohadillas de polipropileno, pala antichispas y bolsas rojas de residuos peligrosos (RESPEL).']
        ]
      }
    ],
    bank: [
      ["¿Cuál es la forma y colores reglamentarios de los pictogramas del SGA?", ["Cuadrado apoyado en un vértice (rombo) con borde rojo, fondo blanco y símbolo negro", "Círculo azul con borde amarillo", "Triángulo verde con letras blancas"], 0],
      ["¿Qué palabra de advertencia indica mayor gravedad en el etiquetado SGA?", ["CUIDADO", "PELIGRO", "INFORMACIÓN"], 1],
      ["¿Qué representa el pictograma con una silueta humana y una estrella en el pecho?", ["Excelente condición física", "Peligro grave para la salud (carcinógeno, mutágeno o toxicidad respiratoria)", "Solo irritación de piel"], 1],
      ["¿Cuántas secciones obligatorias contiene una Ficha de Datos de Seguridad (FDS / SDS)?", ["10 secciones", "16 secciones", "5 secciones"], 1],
      ["¿En qué sección de la FDS se consultan los primeros auxilios inmediatos?", ["En la sección 4", "En la sección 16", "En la sección 1"], 0],
      ["¿Qué clase de peligro representa el pictograma de la calavera y tibias cruzadas?", ["Toxicidad aguda severa (mortal o tóxico)", "Material corrosivo leve", "Gas inerte"], 0],
      ["¿Por qué NUNCA se deben almacenar juntos ácidos concentrados y bases fuertes?", ["Porque no caben en el estante", "Porque reaccionan exotérmicamente liberando calor violento y vapores", "Porque cambian de color"], 1],
      ["¿Qué elemento fundamental compone un kit para control de derrames químicos?", ["Un trapero de algodón usado", "Cordones absorbentes, paños inertes y pala antichispas", "Un ventilador de pared"], 1],
      ["¿Qué significa el pictograma de corrosión que muestra tubos de ensayo vertiendo líquido en una mano y metal?", ["Líquido hidratante", "Corrosivo para metales y destrucción irreversible de piel y ojos", "Solución jabonosa"], 1],
      ["¿Dónde deben estar ubicadas las FDS en la empresa?", ["Bajo llave en la oficina central", "En el lugar de trabajo, accesibles a todos los operarios en cualquier turno", "En internet solamente"], 1]
    ]
  }
];

// Compatibilidad con código previo que accede directamente a MODULES o BANK
export const MODULES = COURSES[0].modules;
export const BANK = COURSES[0].bank;
export const ICON = COURSES[0].modules.map((_, i) => String(i + 1));
export const DESC = COURSES[0].modules.map((m) => m.desc || m.t);

export const TEAM = [
  ["Alessandro José Rodríguez Díaz", "I1", "../assets/dev1.jpg"],
  ["Luis Enrique Rodríguez Seba", "I2", "../assets/dev2.jpg"],
  ["Ángel López Pinzón", "I3", "../assets/dev3.jpg"],
  ["Alexander Mendoza Román", "I4", "../assets/dev4.jpg"]
];