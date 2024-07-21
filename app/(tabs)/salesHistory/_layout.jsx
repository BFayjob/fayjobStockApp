import { Stack } from 'expo-router';

export default function SalesHistoryLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: 'SalesHistory', headerShown: false }} />;
    </Stack>
  );
}
