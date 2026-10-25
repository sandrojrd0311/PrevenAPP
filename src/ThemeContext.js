import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* ─── Paleta Modo Claro ───────────────────────────────────── */
export const LIGHT = {
  bg: '#F0F3F8',
  card: '#FFFFFF',
  cardBorder: '#CFD7E4',
  ink: '#101B2E',
  sub: '#3D4B66',
  line: '#CFD7E4',
  inputBg: '#FFFFFF',
  inputBorder: '#CBD5E1',
  hdrBg: '#091222',
  hdrBorder: 'rgba(0, 212, 255, 0.25)',
  ddBg: '#0B1426',
  badgeBg: '#F1F5F9',
  badgeTxt: '#475569',
  cyan: '#00D4FF',
  blue: '#0B5CAD',
  grn: '#1E8E5A',
  red: '#C62828',
  yel: '#E0A800',
  neonGreen: '#00E676',
  neonAmber: '#FFB300',
  neonRed: '#FF2A4B',
  neonPurple: '#B336FF',
  navy: '#0B1630',
  dark: '#080E1C',
  cardDark: '#121C30',
  gridLine: 'rgba(11, 92, 173, 0.15)',
};

/* ─── Paleta Modo Oscuro ──────────────────────────────────── */
export const DARK = {
  bg: '#080E1C',
  card: '#111827',
  cardBorder: 'rgba(0,212,255,0.15)',
  ink: '#E2E8F0',
  sub: '#94A3B8',
  line: 'rgba(255,255,255,0.12)',
  inputBg: '#0D1B2E',
  inputBorder: 'rgba(0,212,255,0.25)',
  hdrBg: '#050B17',
  hdrBorder: 'rgba(0, 212, 255, 0.35)',
  ddBg: '#050B17',
  badgeBg: 'rgba(0,212,255,0.08)',
  badgeTxt: '#94A3B8',
  cyan: '#00D4FF',
  blue: '#1A80FF',
  grn: '#00E676',
  red: '#FF2A4B',
  yel: '#FFB300',
  neonGreen: '#00E676',
  neonAmber: '#FFB300',
  neonRed: '#FF2A4B',
  neonPurple: '#B336FF',
  navy: '#0B1630',
  dark: '#080E1C',
  cardDark: '#0D1526',
  gridLine: 'rgba(0,212,255,0.08)',
};

/* ─── Context ─────────────────────────────────────────────── */
const ThemeCtx = createContext({
  dark: false,
  colors: LIGHT,
  toggleDark: () => {},
  setDarkMode: () => {},
});

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('dark_mode').then((v) => {
      if (v === 'true') setDark(true);
    });
  }, []);

  const toggleDark = useCallback(() => {
    setDark((d) => {
      const next = !d;
      AsyncStorage.setItem('dark_mode', String(next));
      return next;
    });
  }, []);

  const setDarkMode = useCallback((isDark) => {
    const next = Boolean(isDark);
    setDark(next);
    AsyncStorage.setItem('dark_mode', String(next));
  }, []);

  return (
    <ThemeCtx.Provider value={{ dark, colors: dark ? DARK : LIGHT, toggleDark, setDarkMode }}>
      {children}
    </ThemeCtx.Provider>
  );
}

/** Hook para consumir el tema en cualquier componente */
export const useTheme = () => useContext(ThemeCtx);