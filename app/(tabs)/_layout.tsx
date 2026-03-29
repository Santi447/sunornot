import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="forecast"
        options={{
          sceneStyle: { backgroundColor: "#0A1E25"}, 
          title: 'Forecast',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cloud" color={color} />,
          tabBarStyle: { backgroundColor: "#0A1E25", opacity: 0.95 },
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
