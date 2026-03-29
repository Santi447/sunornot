import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="forecast"
        options={{
          title: 'Forecast',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cloud" color={color} />,
        }}
      />
    </Tabs>
  );
}
