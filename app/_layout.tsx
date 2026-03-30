import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="index"
          options={{ animationEnabled: false }}
        />
        <Stack.Screen
          name="(auth)"
          options={{ animationEnabled: false }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ animationEnabled: false }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
