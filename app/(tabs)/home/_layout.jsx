import { Stack } from 'expo-router';

export default function Homelayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: 'home', headerShown: false }} />;
    </Stack>
  );
}
