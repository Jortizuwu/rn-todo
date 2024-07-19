import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/shared/hooks/useThemeColor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const theme = useThemeColor();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={theme}>
        <Stack
          screenOptions={{
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 26,
            },
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen
            name='index'
            options={{
              title: 'My Todo',

              headerLeft: () => (
                <TouchableOpacity>
                  <Entypo name='menu' size={30} color={theme.colors.text} />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity>
                  <Entypo
                    name='notification'
                    size={24}
                    color={theme.colors.text}
                  />
                </TouchableOpacity>
              ),
            }}
          />

          <Stack.Screen
            name='(create)'
            options={{
              title: 'Create Todo',
              presentation: 'modal',
            }}
          />
          <Stack.Screen name='+not-found' />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
