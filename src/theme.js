import { Platform } from 'react-native';

// Variables y paleta corporativa / cyber-industrial moderna
export const C = {
  ink: '#101B2E',
  red: '#C62828',
  yel: '#E0A800',
  blue: '#0B5CAD',
  grn: '#1E8E5A',
  line: '#CFD7E4',
  bg: '#F0F3F8',
  sub: '#3D4B66',
  navy: '#0B1630',
  dark: '#080E1C',
  cardDark: '#121C30',
  cyan: '#00D4FF',
  neonGreen: '#00E676',
  neonOrange: '#FF6D00',
  neonRed: '#FF2A4B',
  neonPurple: '#B336FF',
  neonAmber: '#FFB300',
  gridLine: 'rgba(11, 92, 173, 0.15)',
};

// Sombra base suave sin bordes redondeados
export const SH = Platform.select({
  ios: {
    shadowColor: '#101828',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  android: { elevation: 2 },
  default: {
    shadowColor: '#101828',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
});

// Función de resplandor / GLOW moderno
export const glow = (color = C.cyan, intensity = 0.5, radius = 10) =>
  Platform.select({
    ios: {
      shadowColor: color,
      shadowOpacity: intensity,
      shadowRadius: radius,
      shadowOffset: { width: 0, height: 0 },
    },
    android: {
      elevation: 6,
    },
    default: {
      shadowColor: color,
      shadowOpacity: intensity,
      shadowRadius: radius,
      shadowOffset: { width: 0, height: 0 },
    },
  });

// Resplandor intenso para botones y llamadas a la acción
export const glowIntense = (color = C.blue) =>
  Platform.select({
    ios: {
      shadowColor: color,
      shadowOpacity: 0.7,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 0 },
    },
    android: { elevation: 8 },
    default: {
      shadowColor: color,
      shadowOpacity: 0.7,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 0 },
    },
  });

// Equivalente a color-mix(in srgb, c a%, #fff)
export const tint = (hex, a = 0.1) => {
  if (!hex) return `rgba(11,92,173,${a})`;
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  const n = parseInt(h, 16);
  if (isNaN(n)) return `rgba(11,92,173,${a})`;
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

export const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleString('es-CO');
  } catch (e) {
    return iso;
  }
};

