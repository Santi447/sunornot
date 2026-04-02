import { Stack } from 'expo-router';
import { SettingsProvider } from '@/components/settings_screen/settings_context';

export default function Layout() {
  return (
    <SettingsProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SettingsProvider>
  );
}