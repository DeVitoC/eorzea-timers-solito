import { DripsyProvider, makeTheme } from 'dripsy';

const theme = makeTheme({
  // https://www.dripsy.xyz/usage/theming/create
  text: {
    p: {
      fontSize: 16,
    },
  },
  colors: {
    // Main App color pallege
    $appTeal: '#4cd4cb',
    $appMagenta: '#92374d',
    $appPlum: '#8c5383',
    $appSilver: '#c1b2ab',
    $appWhite: '#fffbfe',
    // Additional app colors
    $systemBlue: '#007AFF',
    $backgroundWhite: '#fff',
    $inputBackground: '#f0f0f0',
    // Text Colors
    $textWhite: '#fff',
    $textBlack: '#090909',
    // Alert Colors
    $alertOrange: '#FFAC00',
    $alertRed: '#FF2800',
    $alertBlue: 'blue',
    // Background and misc Colors
    $transparent: 'rgba(0,0,0,0)',
    $lightSkyBlue: '#EBF0FF',
    $skyBlue: '#ABFBFF',
    $darkBlue: '#2F398A',
    $lightGreen: '#A7F3D0',
    $lightestGray: '#f0f0f0',
    $veryLightGray: '#E5E7EB',
    $lightGray: '#D3D3D3',
    $mediumGray: '#6B7280',
    $gray: '#2C2C2C',
    $grayWithOpacity: '#2c2c2ccc',
    $darkGray: '#222222',
    $black: '#090909',
  },
  fontSize: {
    $ms: 14, // mobile small
    $ds: 16, // desktop small
    $mh: 18, // mobile header
    $dh: 24, // desktop header
    $ml: 42, // mobile large
    $dl: 54, // desktop large
  },
  space: {
    $standardMargin: 16,
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 12,
    $4: 16,
    $5: 20,
    $6: 24,
    $7: 28,
    $8: 32,
    $9: 36,
    $10: 40,
    $10half: 42,
    $11: 44,
    $12: 48,
    $13: 52,
    $14: 56,
    $15: 60,
    $18: 72,
    $30: 120,
  },
  breakpoints: ['440px', '640px', '880px', '1024px'],
});

export function Dripsy({ children }: { children: React.ReactNode }) {
  return (
    <DripsyProvider
      theme={theme}
      // this disables SSR, since react-native-web doesn't have support for it (yet)
      ssr
    >
      {children}
    </DripsyProvider>
  );
}
