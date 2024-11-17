import { Provider } from 'app/provider';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'dripsy';
import { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

const MainLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
};

export default function Root() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  });
  return (
    <Provider>
      <MainLayout />
    </Provider>
  );
}
