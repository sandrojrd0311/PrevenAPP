import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Svg, { Rect, Polygon, Line } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import { C, SH, glow, glowIntense, tint } from './theme';
import { useTheme } from './ThemeContext';

export const H2 = ({ children, style, glowColor }) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        s.h2,
        { color: colors.ink },
        glowColor && glow(glowColor, 0.4, 6),
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export const Sub = ({ children, style }) => {
  const { colors } = useTheme();
  return <Text style={[s.sub, { color: colors.sub }, style]}>{children}</Text>;
};

/* Tarjeta moderna con acento de resplandor (Glow) y CERO BORDES REDONDEADOS */
export const Card = ({ children, style, glowColor, borderLeftColor }) => {
  const { colors, dark } = useTheme();
  return (
    <View
      style={[
        s.card,
        {
          backgroundColor: colors.card,
          borderColor: dark ? 'rgba(0, 212, 255, 0.2)' : colors.line,
        },
        borderLeftColor && { borderLeftWidth: 5, borderLeftColor },
        glowColor ? glow(glowColor, dark ? 0.5 : 0.45, 10) : SH,
        style,
      ]}
    >
      {/* Indicador táctico en la esquina superior derecha */}
      {glowColor && (
        <View style={[s.cardAccent, { backgroundColor: glowColor }]} />
      )}
      {children}
    </View>
  );
};

/* Tarjeta con animación pulsante de resplandor para elementos activos o destacados */
export function AnimatedGlowCard({ children, style, glowColor = C.cyan, active = true }) {
  const anim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    if (!active) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 0.9,
          duration: 1400,
          useNativeDriver: false,
        }),
        Animated.timing(anim, {
          toValue: 0.4,
          duration: 1400,
          useNativeDriver: false,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim, active]);

  return (
    <Animated.View
      style={[
        s.card,
        {
          borderColor: glowColor,
          borderWidth: 2,
        },
        glow(glowColor, 0.6, 12),
        style,
      ]}
    >
      <View style={[s.cardAccent, { backgroundColor: glowColor }]} />
      {children}
    </Animated.View>
  );
}

/* Botón cibernético moderno con resplandor intenso y bordes afilados */
export function Btn({ title, onPress, alt, disabled, style, textStyle, glowColor, icon }) {
  const { colors, dark } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  };

  const activeGlow = glowColor || (alt ? colors.line : C.blue);

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        accessibilityRole="button"
        style={({ pressed }) => [
          s.btn,
          alt && [
            s.btnAlt,
            {
              backgroundColor: colors.card,
              borderColor: dark ? 'rgba(0, 212, 255, 0.25)' : colors.line,
            },
          ],
          pressed && { backgroundColor: alt ? (dark ? '#1A2740' : '#E3ECF8') : '#084887' },
          disabled && { opacity: 0.4 },
          !alt && !disabled && glowIntense(activeGlow),
        ]}
      >
        <View style={s.btnContent}>
          {icon ? <Text style={s.btnIcon}>{icon}</Text> : null}
          <Text
            style={[
              s.btnT,
              alt && { color: dark ? colors.cyan : C.blue },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

/* Campo de entrada de texto moderno con foco iluminado */
export function Field({ label, style, glowColor = C.cyan, ...p }) {
  const { colors, dark } = useTheme();
  const [focused, setFocused] = useState(false);
  return (
    <View style={[s.lab, style]}>
      <Text style={[s.labT, { color: colors.ink }]}>{label}</Text>
      <TextInput
        {...p}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={dark ? '#64748B' : '#8C9BB2'}
        style={[
          s.input,
          {
            backgroundColor: colors.inputBg,
            borderColor: focused ? glowColor : (dark ? 'rgba(0, 212, 255, 0.25)' : colors.inputBorder),
            color: colors.ink,
          },
          focused && [s.inputF, glow(glowColor, 0.5, 8)],
          p.multiline && { minHeight: 90, textAlignVertical: 'top' },
        ]}
      />
    </View>
  );
}

const iso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function DateField({ label, value, onChange, style }) {
  const [open, setOpen] = useState(false);
  const [tmp, setTmp] = useState(null);
  const d = value ? new Date(value + 'T00:00:00') : new Date(2000, 0, 1);

  // 1. Si estamos en Web / PC, renderizamos un campo de texto directo
  if (Platform.OS === 'web') {
    return (
      <View style={[s.lab, style]}>
        <Text style={s.labT}>{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="AAAA-MM-DD"
          placeholderTextColor="#8C9BB2"
          style={s.input}
          maxLength={10}
        />
      </View>
    );
  }

  // 2. En Android / iOS, mantenemos el comportamiento con DateTimePicker
  return (
    <View style={[s.lab, style]}>
      <Text style={s.labT}>{label}</Text>
      <Pressable
        onPress={() => {
          setTmp(d);
          setOpen(true);
        }}
        style={s.input}
      >
        <Text style={{ fontSize: 15, color: value ? C.ink : '#8C9BB2', fontWeight: value ? '600' : '400' }}>
          {value || 'AAAA-MM-DD'}
        </Text>
      </Pressable>

      {open && Platform.OS === 'android' && (
        <DateTimePicker
          value={d}
          mode="date"
          onChange={(e, sel) => {
            setOpen(false);
            if (e.type === 'set' && sel) onChange(iso(sel));
          }}
        />
      )}

      {Platform.OS === 'ios' && (
        <Modal transparent animationType="slide" visible={open} onRequestClose={() => setOpen(false)}>
          <View style={s.sheetBg}>
            <View style={s.sheet}>
              <DateTimePicker
                value={tmp || d}
                mode="date"
                display="spinner"
                onChange={(e, sel) => sel && setTmp(sel)}
              />
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Btn alt title="Cancelar" style={{ flex: 1 }} onPress={() => setOpen(false)} />
                <Btn
                  title="Listo"
                  style={{ flex: 1 }}
                  onPress={() => {
                    onChange(iso(tmp || d));
                    setOpen(false);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

/* Indicador de progreso angular (Reemplazo moderno de Ring con CERO BORDES REDONDEADOS) */
export function Ring({ pct, size = 44, color = C.grn, glowColor = C.neonGreen }) {
  const sSize = size;
  return (
    <View
      style={[
        {
          width: sSize,
          height: sSize,
          backgroundColor: '#081224',
          borderWidth: 2,
          borderColor: color,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 0,
        },
        glow(glowColor, 0.5, 6),
      ]}
    >
      <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '800' }}>{pct}%</Text>
      {/* Barra de progreso inferior interna */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: `${pct}%`,
          height: 3,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

/* Barra de progreso lineal animada con brillo en la punta y esquinas rectas */
export function AnimatedProgressBar({ progress = 0, color = C.blue, glowColor = C.cyan, height = 8 }) {
  const animWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animWidth, {
      toValue: Math.min(100, Math.max(0, progress)),
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progress, animWidth]);

  return (
    <View style={[s.progressTrack, { height, borderColor: C.line }]}>
      <Animated.View
        style={[
          s.progressBar,
          {
            backgroundColor: color,
            width: animWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
          glow(glowColor, 0.7, 8),
        ]}
      />
    </View>
  );
}

/* HUD Métricas Rápidas (Cajas de estadísticas tácticas) */
export function HUDStat({ label, value, icon, color = C.blue, glowColor = C.cyan }) {
  const { colors } = useTheme();
  return (
    <View style={[s.hudBox, { backgroundColor: colors.card, borderColor: color }, glow(glowColor, 0.35, 6)]}>
      <View style={s.hudRow}>
        <Text style={[s.hudVal, { color }]}>{value}</Text>
        <Text style={s.hudIcon}>{icon}</Text>
      </View>
      <Text style={[s.hudLab, { color: colors.sub }]}>{label}</Text>
    </View>
  );
}

/* Baliza intermitente de estado en vivo */
export function PulsingBeacon({ color = C.neonGreen, size = 10 }) {
  const pulse = useRef(new Animated.Value(0.4)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        opacity: pulse,
        borderRadius: 0,
      }}
    />
  );
}

/* Ticker animado de estado del sistema */
export function CyberTicker({ text = '// PREVENAPP SISTEMA SST • CAPACITACIÓN INDUSTRIAL EN LÍNEA //' }) {
  return (
    <View style={s.tickerWrap}>
      <PulsingBeacon color={C.neonGreen} size={8} />
      <Text numberOfLines={1} style={s.tickerText}>
        {text}
      </Text>
      <Text style={s.tickerBadge}>ACTIVO</Text>
    </View>
  );
}

/* Rombo NFPA 704 con animación Spring y esquinas afiladas con glow */
export function Diamond() {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(a, { toValue: 1, friction: 5, useNativeDriver: true }).start();
  }, [a]);
  const scale = a.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] });
  const rotate = a.interpolate({ inputRange: [0, 1], outputRange: ['-20deg', '0deg'] });

  const Cell = ({ bg, color, txt, small }) => (
    <View style={[s.cell, { backgroundColor: bg }]}>
      <Text style={{ transform: [{ rotate: '-45deg' }], fontSize: small ? 16 : 26, fontWeight: '800', color }}>
        {txt}
      </Text>
    </View>
  );

  return (
    <Animated.View
      accessibilityLabel="Rombo NFPA 704"
      style={[
        {
          width: 170,
          height: 170,
          alignSelf: 'center',
          marginTop: 18,
          marginBottom: 24,
          opacity: a,
          transform: [{ scale }, { rotate }],
        },
        glow(C.cyan, 0.45, 12),
      ]}
    >
      <View style={s.dia}>
        <Cell bg="#1565C0" color="#fff" txt="2" />
        <Cell bg="#C8102E" color="#fff" txt="4" />
        <Cell bg={C.yel} color={C.ink} txt="3" />
        <Cell bg="#FFFFFF" color={C.ink} txt="W/OX" small />
      </View>
    </Animated.View>
  );
}

/* Notificación flotante con acento de resplandor */
export function Toast({ toast }) {
  const [show, setShow] = useState(false);
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!toast) return undefined;
    setShow(true);
    a.setValue(0);
    Animated.spring(a, { toValue: 1, friction: 7, useNativeDriver: true }).start();
    const t = setTimeout(() => setShow(false), 3600);
    return () => clearTimeout(t);
  }, [toast, a]);

  if (!show || !toast) return null;

  return (
    <Animated.View
      accessibilityLiveRegion="polite"
      style={[
        s.toast,
        glow(C.neonAmber, 0.6, 12),
        {
          opacity: a,
          transform: [
            {
              translateY: a.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }),
            },
          ],
        },
      ]}
    >
      <Text style={s.toastText}>{toast.m}</Text>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  h2: {
    fontSize: 22,
    fontWeight: '800',
    color: C.ink,
    marginTop: 4,
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  sub: {
    color: C.sub,
    textAlign: 'center',
    fontSize: 14.5,
    lineHeight: 22,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: C.line,
    padding: 16,
    gap: 12,
    position: 'relative',
    borderRadius: 0, // CERO BORDES REDONDEADOS
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: 4,
    borderRadius: 0,
  },
  btn: {
    minHeight: 48,
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: C.blue,
    backgroundColor: C.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0, // CERO BORDES REDONDEADOS
  },
  btnAlt: {
    backgroundColor: '#FFFFFF',
    borderColor: C.line,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnIcon: {
    fontSize: 16,
  },
  btnT: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15.5,
    letterSpacing: 0.3,
  },
  lab: {
    gap: 5,
  },
  labT: {
    fontWeight: '700',
    fontSize: 13.5,
    color: C.ink,
    letterSpacing: 0.2,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: C.line,
    backgroundColor: '#FFFFFF',
    fontSize: 15.5,
    color: C.ink,
    borderRadius: 0, // CERO BORDES REDONDEADOS
  },
  inputF: {
    borderColor: C.blue,
  },
  dia: {
    width: 120,
    height: 120,
    margin: 25,
    transform: [{ rotate: '45deg' }],
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    backgroundColor: C.ink,
    borderWidth: 1.5,
    borderColor: C.line,
    borderRadius: 0,
  },
  cell: {
    width: 57,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  progressTrack: {
    width: '100%',
    backgroundColor: 'rgba(11,92,173,0.1)',
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 0,
  },
  progressBar: {
    height: '100%',
    borderRadius: 0,
  },
  hudBox: {
    flex: 1,
    backgroundColor: '#0C1628',
    borderWidth: 1.5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 0,
  },
  hudRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hudVal: {
    fontSize: 20,
    fontWeight: '800',
  },
  hudIcon: {
    fontSize: 16,
  },
  hudLab: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  tickerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#091222',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,212,255,0.3)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 8,
  },
  tickerText: {
    flex: 1,
    fontSize: 10.5,
    color: '#94A3B8',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  tickerBadge: {
    backgroundColor: 'rgba(0,230,118,0.15)',
    color: C.neonGreen,
    fontSize: 9,
    fontWeight: '800',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: C.neonGreen,
    borderRadius: 0,
  },
  toast: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 20,
    maxWidth: 480,
    alignSelf: 'center',
    width: '95%',
    backgroundColor: '#091222',
    padding: 14,
    paddingHorizontal: 16,
    borderLeftWidth: 6,
    borderLeftColor: C.neonAmber,
    borderWidth: 1,
    borderColor: 'rgba(255,179,0,0.4)',
    zIndex: 99,
    elevation: 14,
    borderRadius: 0, // CERO BORDES REDONDEADOS
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  sheetBg: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  sheet: {
    backgroundColor: '#fff',
    padding: 16,
    gap: 12,
    borderRadius: 0,
  },
});


/* Botón de configuración (⚙) con selector Modo Claro / Modo Oscuro.
   Autónomo: no depende de la navegación, sirve en Login y en Cursos. */
function ThemeOption({ label, icon, active, onPress, colors }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected: active }}
      style={[
        {
          flex: 1,
          paddingVertical: 14,
          alignItems: 'center',
          gap: 4,
          borderWidth: 1.5,
          borderColor: active ? colors.cyan : colors.line,
          backgroundColor: active ? tint(colors.cyan, 0.12) : 'transparent',
        },
        active && glow(colors.cyan, 0.4, 6),
      ]}
    >
      <Text style={{ fontSize: 22, color: active ? colors.cyan : colors.sub }}>{icon}</Text>
      <Text style={{ fontWeight: '800', fontSize: 12.5, color: active ? colors.cyan : colors.sub }}>
        {label}
      </Text>
    </Pressable>
  );
}

export function SettingsButton({ style }) {
  const { colors, dark, setDarkMode } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel="Abrir configuración"
        hitSlop={8}
        style={({ pressed }) => [
          {
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1.5,
            borderColor: colors.cyan,
            backgroundColor: pressed ? tint(colors.cyan, 0.2) : colors.card,
          },
          glow(colors.cyan, 0.35, 6),
          style,
        ]}
      >
        <Text style={{ fontSize: 20, color: colors.cyan }}>⚙</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable
          onPress={() => setOpen(false)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          {/* Pressable interno: evita cerrar al tocar dentro del panel */}
          <Pressable
            onPress={() => {}}
            style={[
              {
                backgroundColor: colors.card,
                borderWidth: 1.5,
                borderColor: colors.cyan,
                padding: 18,
                gap: 14,
                maxWidth: 420,
                width: '100%',
                alignSelf: 'center',
              },
              glow(colors.cyan, 0.5, 12),
            ]}
          >
            <Text style={{ fontSize: 17, fontWeight: '900', color: colors.ink }}>Configuración</Text>
            <Text style={{ fontSize: 10, fontWeight: '900', letterSpacing: 1, color: colors.cyan }}>
              APARIENCIA
            </Text>
            <View style={{ flexDirection: 'row', gap: 10 }} accessibilityRole="radiogroup">
              <ThemeOption
                label="Modo Claro"
                icon="☀"
                active={!dark}
                onPress={() => setDarkMode(false)}
                colors={colors}
              />
              <ThemeOption
                label="Modo Oscuro"
                icon="☾"
                active={dark}
                onPress={() => setDarkMode(true)}
                colors={colors}
              />
            </View>
            <Btn alt title="Cerrar" onPress={() => setOpen(false)} />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
