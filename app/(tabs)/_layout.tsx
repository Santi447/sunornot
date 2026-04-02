import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";

const TAB_BAR_STYLE = {
  backgroundColor: "#0A1E25",
  opacity: 0.95 as const,
};

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#37D7FF" }}>
      <Tabs.Screen
        name="forecast"
        options={{
          sceneStyle: { backgroundColor: "#0A1E25" },
          title: "Forecast",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="weather-partly-cloudy"
              size={30}
              color={focused ? "#37D7FF" : "gray"}
            />
          ),
          tabBarStyle: TAB_BAR_STYLE,
          tabBarLabel: "Forecast",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="cities"
        options={{
          sceneStyle: { backgroundColor: "#0A1E25" },
          title: "Cities",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="map-pin"
              size={26}
              color={focused ? "#37D7FF" : "gray"}
            />
          ),
          tabBarStyle: TAB_BAR_STYLE,
          tabBarLabel: "Cities",
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          sceneStyle: { backgroundColor: "#0A1E25" },
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="cog"
              size={30}
              color={focused ? "#37D7FF" : "gray"}
            />
          ),
          tabBarStyle: { backgroundColor: "#0A1E25", opacity: 0.95 },
          tabBarLabel: "Settings",
          headerShown: false,
        }}
      />

    </Tabs>

    
  );
}
