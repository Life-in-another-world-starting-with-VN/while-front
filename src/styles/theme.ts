export const colors = {
  // Primary colors
  main: '#fca1c7',

  // Sub colors
  sub1: 'rgba(255, 176, 176, 0.7)', // #ffb0b0b2
  sub2: '#fcbec2',
  sub3: '#f8e6e6',

  // Background
  background: '#fff7f7',

  // Text colors
  text: '#111111',
  grayText: '#c2c2c2',
  unselected: '#a8a8a8',
  white: '#ffffff',

  // Gradients
  gradient: {
    primary: 'linear-gradient(90deg, #9fd8fe 0%, #c6e7ff 43.5%, #f9edf2 98%)',
    hover: 'linear-gradient(180deg, #b1def7 0%, #e4e8eb 100%)',
  },
} as const;

export const typography = {
  fontFamily: "'OneStoreMobilePop', sans-serif",

  sizes: {
    title: '70px',      // 제목 텍스트
    option: '40px',     // 옵션 텍스트
    subOption: '35px',  // 하위 옵션 텍스트
    button: '25px',     // 버튼 텍스트
    body: '20px',       // 기본 텍스트
    label: '14px',      // 라벨 텍스트
  },

  weights: {
    regular: 400,
  },

  lineHeight: {
    normal: 'normal',
    auto: 'auto',
  },
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
  xxxl: '64px',
} as const;

export const borderRadius = {
  sm: '8px',
  md: '16px',
  lg: '20px',
  xl: '32px',
} as const;

export const shadows = {
  card: '0px 2px 32px 0px rgba(0, 0, 0, 0.1)',
} as const;

export const slider = {
  trackColor: colors.sub1,
  thumbColor: colors.sub3,
  height: '25px',
  thumbSize: '10px',
  borderRadius: borderRadius.lg,
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  slider,
} as const;

export type Theme = typeof theme;