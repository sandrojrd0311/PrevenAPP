import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, {
  Rect,
  Path,
  Polygon,
  G,
  Line,
  Defs,
  LinearGradient as SvgGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
import { C, glow } from './theme';



export function CourseLogo({ type, size = 52, color = C.blue, glowColor = C.cyan }) {
  const s = size;
  return (
    <View
      style={[
        {
          width: s,
          height: s,
          backgroundColor: '#0A1222',
          borderWidth: 2,
          borderColor: color,
          alignItems: 'center',
          justifyContent: 'center',
        },
        glow(glowColor, 0.6, 8),
      ]}
    >
      {/* Esquinas tácticas */}
      <View style={[styles.cornerTL, { borderColor: glowColor }]} />
      <View style={[styles.cornerBR, { borderColor: glowColor }]} />

      <Svg width={s * 0.75} height={s * 0.75} viewBox="0 0 48 48">
        <Defs>
          <SvgGradient id={`grad_${type}`} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor={glowColor} />
            <Stop offset="100%" stopColor={color} />
          </SvgGradient>
        </Defs>

        {type === 'security' && (
          <G>
            {/* Escudo industrial con rombo NFPA en el centro */}
            <Polygon
              points="24,4 42,10 42,28 24,44 6,28 6,10"
              fill="none"
              stroke={`url(#grad_${type})`}
              strokeWidth="2.5"
            />
            {/* Mini rombo interior */}
            <Polygon points="24,14 31,21 24,28 17,21" fill="#C62828" />
            <Polygon points="24,28 31,21 38,28 31,35" fill="#E0A800" />
            <Polygon points="17,21 24,28 17,35 10,28" fill="#1565C0" />
            <Polygon points="24,28 31,35 24,42 17,35" fill="#FFFFFF" />
            {/* Cruz/signo central */}
            <Line x1="10" y1="28" x2="38" y2="28" stroke="#0A1222" strokeWidth="1.2" />
            <Line x1="24" y1="14" x2="24" y2="42" stroke="#0A1222" strokeWidth="1.2" />
          </G>
        )}

        {type === 'first_aid' && (
          <G>
            {/* Cruz de emergencia táctica con onda de pulso ECG */}
            <Polygon
              points="19,6 29,6 29,19 42,19 42,29 29,29 29,42 19,42 19,29 6,29 6,19 19,19"
              fill={`url(#grad_${type})`}
            />
            <Path
              d="M4 24 L14 24 L17 17 L21 31 L25 12 L29 33 L32 24 L44 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </G>
        )}

        {type === 'fire' && (
          <G>
            {/* Silueta de llama con escudo térmico */}
            <Polygon
              points="24,3 41,12 41,36 24,45 7,36 7,12"
              fill="none"
              stroke={`url(#grad_${type})`}
              strokeWidth="2"
            />
            {/* Llama estilizada */}
            <Path
              d="M24 10 C25 15 31 18 31 25 C31 32 26 37 24 37 C22 37 17 32 17 25 C17 19 23 15 24 10 Z"
              fill="#FF6D00"
            />
            <Path
              d="M24 20 C25 23 28 25 28 29 C28 33 25 35 24 35 C23 35 20 33 20 29 C20 25 23 23 24 20 Z"
              fill="#FFD600"
            />
          </G>
        )}

        {type === 'ergonomics' && (
          <G>
            {/* Columna vertebral y ángulo biomecánico 90° */}
            <Rect x="8" y="8" width="32" height="32" fill="none" stroke={`url(#grad_${type})`} strokeWidth="2" />
            <Line x1="16" y1="16" x2="32" y2="16" stroke="#00E676" strokeWidth="2.5" />
            <Line x1="16" y1="24" x2="32" y2="24" stroke="#00E676" strokeWidth="2.5" />
            <Line x1="16" y1="32" x2="32" y2="32" stroke="#00E676" strokeWidth="2.5" />
            <Line x1="24" y1="10" x2="24" y2="38" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="2,2" />
            <Polygon points="30,12 36,16 30,20" fill="#00E676" />
          </G>
        )}

        {type === 'chemical' && (
          <G>
            {/* Matraz químico con rombo de peligro SGA */}
            <Path
              d="M20 8 L28 8 L28 18 L38 34 L38 38 L10 38 L10 34 L20 18 Z"
              fill="none"
              stroke={`url(#grad_${type})`}
              strokeWidth="2"
            />
            {/* Líquido reactivo con burbujas */}
            <Polygon points="13,34 35,34 31,27 17,27" fill="#B336FF" opacity="0.8" />
            <Rect x="20" y="22" width="8" height="8" fill="#FF1744" transform="rotate(45 24 26)" />
          </G>
        )}
      </Svg>
    </View>
  );
}


export function TechnicalDiagram({ type, color = C.blue }) {
  const w = 320;
  const h = 180;

  switch (type) {
    case 'nfpa_diamond':
      return (
        <Svg width={w} height={h} viewBox="0 0 320 180">
          <Rect width={w} height={h} fill="#0A1222" />
          {/* Rejilla técnica */}
          <Path d="M0 45 H320 M0 90 H320 M0 135 H320 M80 0 V180 M160 0 V180 M240 0 V180" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

          {/* Rombo central */}
          <G transform="translate(160, 90) rotate(45)">
            {/* Salud: Azul (Izquierda en rombo estándar, aquí transformado) */}
            <Rect x="-44" y="-44" width="42" height="42" fill="#1565C0" stroke="#0A1222" strokeWidth="2" />
            {/* Inflamabilidad: Rojo (Arriba) */}
            <Rect x="2" y="-44" width="42" height="42" fill="#C8102E" stroke="#0A1222" strokeWidth="2" />
            {/* Reactividad: Amarillo (Derecha) */}
            <Rect x="2" y="2" width="42" height="42" fill="#E0A800" stroke="#0A1222" strokeWidth="2" />
            {/* Específico: Blanco (Abajo) */}
            <Rect x="-44" y="2" width="42" height="42" fill="#FFFFFF" stroke="#0A1222" strokeWidth="2" />
          </G>

          {/* Textos de los cuadrantes sin rotar */}
          <SvgText x="133" y="96" fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle">2</SvgText>
          <SvgText x="160" y="68" fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle">4</SvgText>
          <SvgText x="187" y="96" fill="#101B2E" fontSize="16" fontWeight="bold" textAnchor="middle">3</SvgText>
          <SvgText x="160" y="123" fill="#101B2E" fontSize="12" fontWeight="bold" textAnchor="middle">W / OX</SvgText>

          {/* Etiquetas laterales técnicas */}
          <SvgText x="20" y="30" fill="#1565C0" fontSize="11" fontWeight="bold">◄ AZUL: SALUD</SvgText>
          <SvgText x="20" y="160" fill="#E0A800" fontSize="11" fontWeight="bold">◄ AMARILLO: REACTIVIDAD</SvgText>
          <SvgText x="300" y="30" fill="#C8102E" fontSize="11" fontWeight="bold" textAnchor="end">ROJO: INFLAMABILIDAD ►</SvgText>
          <SvgText x="300" y="160" fill="#D8DEE8" fontSize="11" fontWeight="bold" textAnchor="end">BLANCO: ESPECÍFICO ►</SvgText>
        </Svg>
      );

    case 'health_hazard':
      return (
        <Svg width={w} height={h} viewBox="0 0 320 180">
          <Rect width={w} height={h} fill="#0A1222" />
          <SvgText x="160" y="26" fill="#00D4FF" fontSize="12" fontWeight="bold" textAnchor="middle">
            ESCALA DE SEVERIDAD BIOLÓGICA (NFPA 704)
          </SvgText>
          {[
            { lvl: '4', desc: 'MORTAL: Exposición letal inmediata', col: '#D32F2F', y: 44 },
            { lvl: '3', desc: 'SEVERO: Daño irreversible mayor', col: '#F57C00', y: 70 },
            { lvl: '2', desc: 'MODERADO: Incapacidad temporal', col: '#FBC02D', y: 96 },
            { lvl: '1', desc: 'LIGERO: Irritación menor tratable', col: '#388E3C', y: 122 },
            { lvl: '0', desc: 'SIN RIESGO: Inerte biológicamente', col: '#1976D2', y: 148 },
          ].map((item, idx) => (
            <G key={idx}>
              <Rect x="24" y={item.y} width="32" height="20" fill={item.col} />
              <SvgText x="40" y={item.y + 15} fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
                {item.lvl}
              </SvgText>
              <Rect x="60" y={item.y} width="236" height="20" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <SvgText x="70" y={item.y + 14} fill="#E2E8F0" fontSize="10" fontWeight="bold">
                {item.desc}
              </SvgText>
            </G>
          ))}
        </Svg>
      );

    case 'fire_hazard':
    case 'tetrahedron':
      return (
        <Svg width={w} height={h} viewBox="0 0 320 180">
          <Rect width={w} height={h} fill="#0A1222" />
          <SvgText x="160" y="24" fill="#FF9100" fontSize="12" fontWeight="bold" textAnchor="middle">
            TETRAEDRO DEL FUEGO: REACCIÓN EN CADENA
          </SvgText>
          {/* Pirámide / Tetraedro isométrico */}
          <Polygon points="160,40 250,140 70,140" fill="none" stroke="#FF6D00" strokeWidth="2.5" />
          <Line x1="160" y1="40" x2="160" y2="120" stroke="#FFD600" strokeWidth="2" strokeDasharray="3,3" />
          <Line x1="70" y1="140" x2="160" y2="120" stroke="#FFD600" strokeWidth="2" strokeDasharray="3,3" />
          <Line x1="250" y1="140" x2="160" y2="120" stroke="#FFD600" strokeWidth="2" strokeDasharray="3,3" />

          {/* Nodos rotulados */}
          <Rect x="135" y="32" width="50" height="18" fill="#C62828" />
          <SvgText x="160" y="45" fill="#FFF" fontSize="9" fontWeight="bold" textAnchor="middle">CALOR</SvgText>

          <Rect x="20" y="132" width="75" height="18" fill="#1565C0" />
          <SvgText x="57" y="145" fill="#FFF" fontSize="9" fontWeight="bold" textAnchor="middle">OXÍGENO</SvgText>

          <Rect x="225" y="132" width="80" height="18" fill="#2E7D32" />
          <SvgText x="265" y="145" fill="#FFF" fontSize="9" fontWeight="bold" textAnchor="middle">COMBUSTIBLE</SvgText>

          <Rect x="105" y="112" width="110" height="16" fill="#F57F17" />
          <SvgText x="160" y="124" fill="#101B2E" fontSize="8" fontWeight="bold" textAnchor="middle">REACCIÓN EN CADENA</SvgText>
        </Svg>
      );

    case 'pas_protocol':
      return (
        <Svg width={w} height={h} viewBox="0 0 320 180">
          <Rect width={w} height={h} fill="#0A1222" />
          <SvgText x="160" y="24" fill="#FF2A4B" fontSize="12" fontWeight="bold" textAnchor="middle">
            SECUENCIA OPERATIVA P.A.S. (PRIMEROS AUXILIOS)
          </SvgText>

          {/* 3 Bloques tácticos con flechas */}
          {[
            { step: '1', title: 'PROTEGER', desc: 'Asegurar la zona', col: '#C62828', x: 20 },
            { step: '2', title: 'AVISAR', desc: 'Llamar al 123 / SEM', col: '#0B5CAD', x: 120 },
            { step: '3', title: 'SOCORRER', desc: 'Atención primaria', col: '#1E8E5A', x: 220 },
          ].map((item, idx) => (
            <G key={idx}>
              <Rect x={item.x} y="44" width="80" height="90" fill="#111C30" stroke={item.col} strokeWidth="2" />
              <Rect x={item.x} y="44" width="80" height="24" fill={item.col} />
              <SvgText x={item.x + 40} y="60" fill="#FFF" fontSize="11" fontWeight="bold" textAnchor="middle">
                {item.title}
              </SvgText>
              <SvgText x={item.x + 40} y="90" fill={item.col} fontSize="22" fontWeight="bold" textAnchor="middle">
                {item.step}
              </SvgText>
              <SvgText x={item.x + 40} y="115" fill="#94A3B8" fontSize="8" fontWeight="bold" textAnchor="middle">
                {item.desc}
              </SvgText>
              {idx < 2 && (
                <SvgText x={item.x + 90} y="95" fill="#00D4FF" fontSize="16" fontWeight="bold" textAnchor="middle">
                  ►
                </SvgText>
              )}
            </G>
          ))}
          <SvgText x="160" y="160" fill="#64748B" fontSize="9" fontWeight="bold" textAnchor="middle">
            // NUNCA INTERVENIR SIN HABER ASEGURADO LA ESCENA PREVIAMENTE //
          </SvgText>
        </Svg>
      );

    case 'cpr_technique':
      return (
        <Svg width={w} height={h} viewBox="0 0 320 180">
          <Rect width={w} height={h} fill="#0A1222" />
          <SvgText x="160" y="24" fill="#FF2A4B" fontSize="12" fontWeight="bold" textAnchor="middle">
            PARÁMETROS CRÍTICOS EN RCP PARA ADULTOS
          </SvgText>

          {/* Indicador de compresión torácica */}
          <Rect x="24" y="44" width="125" height="105" fill="#111C30" stroke="#FF2A4B" strokeWidth="1.5" />
          <SvgText x="86" y="65" fill="#FF2A4B" fontSize="11" fontWeight="bold" textAnchor="middle">FRECUENCIA</SvgText>
          <SvgText x="86" y="102" fill="#FFFFFF" fontSize="24" fontWeight="bold" textAnchor="middle">100-120</SvgText>
          <SvgText x="86" y="125" fill="#94A3B8" fontSize="10" textAnchor="middle">compresiones / min</SvgText>

          <Rect x="171" y="44" width="125" height="105" fill="#111C30" stroke="#00D4FF" strokeWidth="1.5" />
          <SvgText x="233" y="65" fill="#00D4FF" fontSize="11" fontWeight="bold" textAnchor="middle">PROFUNDIDAD</SvgText>
          <SvgText x="233" y="102" fill="#FFFFFF" fontSize="24" fontWeight="bold" textAnchor="middle">≥ 5 cm</SvgText>
          <SvgText x="233" y="125" fill="#94A3B8" fontSize="10" textAnchor="middle">Reexpansión total</SvgText>
          <SvgText x="160" y="165" fill="#FACC15" fontSize="9" fontWeight="bold" textAnchor="middle">
            CICLO: 30 COMPRESIONES × 2 INSUFLACIONES (O COMPRESIÓN CONTINUA)
          </SvgText>
        </Svg>
      );

    case 'extinguisher_operation':
      return (
        <Svg width={w} height={h} viewBox="0 0 320 180">
          <Rect width={w} height={h} fill="#0A1222" />
          <SvgText x="160" y="22" fill="#FF9100" fontSize="12" fontWeight="bold" textAnchor="middle">
            OPERACIÓN DE EXTINTOR: TÉCNICA T.A.P.E.
          </SvgText>

          {[
            { l: 'T', w: 'TIRAR', sub: 'Pasador / precinto', col: '#FF6D00', x: 18 },
            { l: 'A', w: 'APUNTAR', sub: 'A base del fuego', col: '#0B5CAD', x: 92 },
            { l: 'P', w: 'PRESIONAR', sub: 'Palanca superior', col: '#C62828', x: 166 },
            { l: 'E', w: 'ESPARCIR', sub: 'Movimiento abanico', col: '#00E676', x: 240 },
          ].map((item, i) => (
            <G key={i}>
              <Rect x={item.x} y="40" width="64" height="100" fill="#111C30" stroke={item.col} strokeWidth="1.5" />
              <Rect x={item.x} y="40" width="64" height="22" fill={item.col} />
              <SvgText x={item.x + 32} y="55" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">
                {item.w}
              </SvgText>
              <SvgText x={item.x + 32} y="95" fill={item.col} fontSize="28" fontWeight="bold" textAnchor="middle">
                {item.l}
              </SvgText>
              <SvgText x={item.x + 32} y="125" fill="#94A3B8" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                {item.sub}
              </SvgText>
            </G>
          ))}
          <SvgText x="160" y="162" fill="#E2E8F0" fontSize="9" textAnchor="middle">
            DISTANCIA DE SEGURIDAD: 2 A 3 METROS A FAVOR DEL VIENTO
          </SvgText>
        </Svg>
      );

    case 'lifting_ergonomics':
      return (
        <Svg width={w} height={h} viewBox="0 0 320 180">
          <Rect width={w} height={h} fill="#0A1222" />
          <SvgText x="160" y="24" fill="#00E676" fontSize="12" fontWeight="bold" textAnchor="middle">
            BIOMECÁNICA: LEVANTAMIENTO MANUAL SEGURO
          </SvgText>

          {/* Figura esquemática correcta */}
          <Rect x="24" y="44" width="125" height="110" fill="#111C30" stroke="#00E676" strokeWidth="2" />
          <Rect x="24" y="44" width="125" height="22" fill="#00897B" />
          <SvgText x="86" y="59" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">✓ CORRECTO</SvgText>
          <SvgText x="86" y="85" fill="#00E676" fontSize="11" fontWeight="bold" textAnchor="middle">Espalda recta</SvgText>
          <SvgText x="86" y="105" fill="#00E676" fontSize="11" fontWeight="bold" textAnchor="middle">Rodillas 90°</SvgText>
          <SvgText x="86" y="125" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">Carga pegada</SvgText>
          <SvgText x="86" y="142" fill="#94A3B8" fontSize="9" textAnchor="middle">Fuerza en piernas</SvgText>

          {/* Figura esquemática incorrecta */}
          <Rect x="171" y="44" width="125" height="110" fill="#111C30" stroke="#C62828" strokeWidth="2" />
          <Rect x="171" y="44" width="125" height="22" fill="#C62828" />
          <SvgText x="233" y="59" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">✗ PROHIBIDO</SvgText>
          <SvgText x="233" y="85" fill="#FF5252" fontSize="11" fontWeight="bold" textAnchor="middle">Espalda doblada</SvgText>
          <SvgText x="233" y="105" fill="#FF5252" fontSize="11" fontWeight="bold" textAnchor="middle">Piernas rectas</SvgText>
          <SvgText x="233" y="125" fill="#FF5252" fontSize="11" fontWeight="bold" textAnchor="middle">Giro con carga</SvgText>
          <SvgText x="233" y="142" fill="#94A3B8" fontSize="9" textAnchor="middle">Riesgo hernia discal</SvgText>
          <SvgText x="160" y="170" fill="#FACC15" fontSize="9" fontWeight="bold" textAnchor="middle">
            LÍMITE MÁXIMO INDIVIDUAL RECOMENDADO: 25 KG
          </SvgText>
        </Svg>
      );

    case 'desk_ergonomics':
      return (
        <Svg width={w} height={h} viewBox="0 0 320 180">
          <Rect width={w} height={h} fill="#0A1222" />
          <SvgText x="160" y="24" fill="#00E676" fontSize="12" fontWeight="bold" textAnchor="middle">
            ERGONOMÍA PVD: POSTURA NEUTRA A 90°
          </SvgText>

          <G transform="translate(30, 45)">
            {/* Escritorio esquemático */}
            <Rect x="120" y="50" width="120" height="6" fill="#475569" />
            <Line x1="220" y1="56" x2="220" y2="105" stroke="#475569" strokeWidth="4" />
            {/* Monitor */}
            <Rect x="190" y="10" width="8" height="40" fill="#00D4FF" />
            <Line x1="194" y1="50" x2="194" y2="54" stroke="#00D4FF" strokeWidth="4" />
            {/* Silla */}
            <Rect x="60" y="60" width="40" height="6" fill="#334155" />
            <Rect x="55" y="25" width="6" height="40" fill="#334155" />
            <Line x1="80" y1="66" x2="80" y2="105" stroke="#334155" strokeWidth="4" />

            {/* Puntos de ángulo */}
            <SvgText x="85" y="20" fill="#FACC15" fontSize="9" fontWeight="bold">◄ Ojos al borde superior</SvgText>
            <SvgText x="95" y="55" fill="#00E676" fontSize="9" fontWeight="bold">Codos a 90° ►</SvgText>
            <SvgText x="5" y="85" fill="#00D4FF" fontSize="9" fontWeight="bold">Apoyo lumbar ►</SvgText>
            <SvgText x="85" y="105" fill="#00E676" fontSize="9" fontWeight="bold">◄ Pies planos al piso</SvgText>
          </G>
        </Svg>
      );

    case 'ghs_pictograms':
    case 'ghs_overview':
      return (
        <Svg width={w} height={h} viewBox="0 0 320 180">
          <Rect width={w} height={h} fill="#0A1222" />
          <SvgText x="160" y="24" fill="#B336FF" fontSize="12" fontWeight="bold" textAnchor="middle">
            SISTEMA GLOBALMENTE ARMONIZADO (SGA / GHS)
          </SvgText>

          {/* Matriz de rombos rojos SGA */}
          {[
            { t: 'LLAMA', sub: 'Inflamable', x: 45, y: 55 },
            { t: 'CALAVERA', sub: 'Tóxico agudo', x: 120, y: 55 },
            { t: 'CORROSIÓN', sub: 'Ácidos/Bases', x: 195, y: 55 },
            { t: 'SALUD', sub: 'Carcinógeno', x: 270, y: 55 },
          ].map((item, i) => (
            <G key={i}>
              <Rect
                x={item.x - 20}
                y={item.y - 20}
                width="40"
                height="40"
                fill="#FFFFFF"
                stroke="#C62828"
                strokeWidth="3.5"
                transform={`rotate(45 ${item.x} ${item.y})`}
              />
              <SvgText x={item.x} y={item.y + 4} fill="#101B2E" fontSize="11" fontWeight="900" textAnchor="middle">
                !
              </SvgText>
              <SvgText x={item.x} y={item.y + 38} fill="#E2E8F0" fontSize="8" fontWeight="bold" textAnchor="middle">
                {item.t}
              </SvgText>
              <SvgText x={item.x} y={item.y + 48} fill="#94A3B8" fontSize="7" textAnchor="middle">
                {item.sub}
              </SvgText>
            </G>
          ))}
          <SvgText x="160" y="165" fill="#B336FF" fontSize="9" fontWeight="bold" textAnchor="middle">
            PALABRAS DE ADVERTENCIA: «PELIGRO» (MÁXIMO) / «ATENCIÓN» (MODERADO)
          </SvgText>
        </Svg>
      );

    case 'cartridges':
      return (
        <Svg width={w} height={h} viewBox="0 0 320 180">
          <Rect width={w} height={h} fill="#0A1222" />
          <SvgText x="160" y="22" fill="#00D4FF" fontSize="12" fontWeight="bold" textAnchor="middle">
            CÓDIGO DE COLORES PARA RESPIRADORES (NIOSH)
          </SvgText>
          {[
            { col: '#111111', txt: 'NEGRO: Vapores Orgánicos (Solventes)', border: '#555', y: 38 },
            { col: '#E0E0E0', txt: 'BLANCO: Gases Ácidos (Cloro / SO2)', border: '#FFF', txtCol: '#111', y: 62 },
            { col: '#1B7F3B', txt: 'VERDE: Amoníaco y Aminas', border: '#1B7F3B', y: 86 },
            { col: '#E0A800', txt: 'AMARILLO: Gases Ácidos + Orgánicos', border: '#E0A800', txtCol: '#111', y: 110 },
            { col: '#C8102E', txt: 'ROJO: Universal (Humos / Aerosoles)', border: '#C8102E', y: 134 },
          ].map((item, i) => (
            <G key={i}>
              <Rect x="20" y={item.y} width="35" height="18" fill={item.col} stroke={item.border} strokeWidth="1" />
              <SvgText x="65" y={item.y + 13} fill="#E2E8F0" fontSize="10" fontWeight="bold">
                {item.txt}
              </SvgText>
            </G>
          ))}
          <SvgText x="160" y="172" fill="#64748B" fontSize="8.5" textAnchor="middle">
            VERIFICAR SIEMPRE SELLO FACIAL PRESIÓN POSITIVA Y NEGATIVA
          </SvgText>
        </Svg>
      );

    default:
      return (
        <Svg width={w} height={h} viewBox="0 0 320 180">
          <Rect width={w} height={h} fill="#0A1222" />
          {/* Gráfico técnico genérico de ingeniería */}
          <Path d="M0 45 H320 M0 90 H320 M0 135 H320 M80 0 V180 M160 0 V180 M240 0 V180" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <Rect x="40" y="30" width="240" height="120" fill="none" stroke={color} strokeWidth="2" strokeDasharray="6,4" />
          <Line x1="40" y1="30" x2="280" y2="150" stroke={color} strokeWidth="1" opacity="0.4" />
          <Line x1="280" y1="30" x2="40" y2="150" stroke={color} strokeWidth="1" opacity="0.4" />
          <Rect x="110" y="75" width="100" height="30" fill="#111C30" stroke={color} strokeWidth="1.5" />
          <SvgText x="160" y="94" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
            FICHA TÉCNICA
          </SvgText>
          <SvgText x="160" y="130" fill="#94A3B8" fontSize="9" textAnchor="middle">
            // ESQUEMA OPERATIVO SST CERTIFICADO //
          </SvgText>
        </Svg>
      );
  }
}

/* ==========================================================================
   ESPACIO PARA IMÁGENES EN LOS MÓDULOS (Con marco cibernético sin bordes redondeados)
   ========================================================================== */

export function ModuleImageFrame({
  imgType,
  imgTitle = 'ESQUEMA TÉCNICO OPERATIVO',
  imgCaption = 'Figura de referencia normativa oficial',
  color = C.blue,
  glowColor = C.cyan,
}) {
  return (
    <View style={[styles.frameContainer, { borderColor: color }, glow(glowColor, 0.45, 12)]}>
      {/* Barra superior con encabezado técnico */}
      <View style={[styles.frameHeader, { backgroundColor: '#0B1528', borderBottomColor: color }]}>
        <View style={styles.indicatorDot} />
        <Text style={[styles.frameTitle, { color: glowColor }]}>
          {imgTitle}
        </Text>
        <Text style={styles.frameBadge}>NORMA SST</Text>
      </View>

      {/* Área del diagrama técnico */}
      <View style={styles.diagramArea}>
        <TechnicalDiagram type={imgType} color={color} />

        {/* Esquinas reticulares tácticas (sharp corners) */}
        <View style={[styles.cornerTL, { borderColor: glowColor }]} />
        <View style={[styles.cornerTR, { borderColor: glowColor }]} />
        <View style={[styles.cornerBL, { borderColor: glowColor }]} />
        <View style={[styles.cornerBR, { borderColor: glowColor }]} />
      </View>

      {/* Pie del espacio de imagen con metadatos y leyenda técnica */}
      <View style={[styles.frameFooter, { backgroundColor: '#0A1222' }]}>
        <Text style={styles.captionText}>
          {imgCaption}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>ID: SST-REF-IMG</Text>
          <Text style={[styles.metaStatus, { color: C.neonGreen }]}>VERIFICADO ✓</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cornerTL: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    zIndex: 10,
  },
  cornerTR: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    zIndex: 10,
  },
  cornerBL: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    width: 8,
    height: 8,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    zIndex: 10,
  },
  cornerBR: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 8,
    height: 8,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    zIndex: 10,
  },
  frameContainer: {
    backgroundColor: '#070D18',
    borderWidth: 2,
    marginBottom: 16,
    overflow: 'hidden',
    // CERO BORDES REDONDEADOS
    borderRadius: 0,
  },
  frameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderBottomWidth: 1.5,
    gap: 8,
  },
  indicatorDot: {
    width: 7,
    height: 7,
    backgroundColor: C.neonGreen,
    // Cero bordes redondeados
    borderRadius: 0,
  },
  frameTitle: {
    flex: 1,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  frameBadge: {
    backgroundColor: 'rgba(0,212,255,0.15)',
    color: '#00D4FF',
    fontSize: 9.5,
    fontWeight: '700',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#00D4FF',
    borderRadius: 0,
  },
  diagramArea: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A1222',
    position: 'relative',
    minHeight: 180,
  },
  frameFooter: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    gap: 4,
  },
  captionText: {
    fontSize: 12.5,
    color: '#CBD5E1',
    lineHeight: 18,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  metaLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  metaStatus: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
