// components/BottomNavBar.tsx
// Bottom navigation bar with three tabs.
// For full navigation wiring, use @react-navigation/bottom-tabs instead.

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path, Circle, Polyline } from "react-native-svg";

export type TabId = "forecast" | "cities" | "settings";

interface BottomNavBarProps {
  activeTab: TabId;
  onTabPress: (tab: TabId) => void;
}

// ─── Nav Icons ────────────────────────────────────────────────────────────────

const IconForecast = ({ active }: { active?: boolean }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17.5 19H9a7 7 0 116.71-9h1.79a4.5 4.5 0 010 9z"
      stroke={active ? "#22c7a0" : "#6b7280"}
      strokeWidth={2}
    />
  </Svg>
);

const IconCities = ({ active }: { active?: boolean }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
      stroke={active ? "#22c7a0" : "#6b7280"}
      strokeWidth={2}
    />
    <Polyline
      points="9,22 9,12 15,12 15,22"
      stroke={active ? "#22c7a0" : "#6b7280"}
      strokeWidth={2}
    />
  </Svg>
);

const IconSettingsNav = ({ active }: { active?: boolean }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={3} stroke={active ? "#22c7a0" : "#6b7280"} strokeWidth={2} />
    <Path
      d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
      stroke={active ? "#22c7a0" : "#6b7280"}
      strokeWidth={2}
    />
  </Svg>
);

// ─────────────────────────────────────────────────────────────────────────────

const NAV_ITEMS: { id: TabId; label: string; Icon: React.FC<{ active?: boolean }> }[] = [
  { id: "forecast", label: "Forecast", Icon: IconForecast },
  { id: "cities",   label: "Cities",   Icon: IconCities },
  { id: "settings", label: "Settings", Icon: IconSettingsNav },
];

export default function BottomNavBar({ activeTab, onTabPress }: BottomNavBarProps) {
  return (
    <View style={styles.container}>
      {NAV_ITEMS.map(({ id, label, Icon }) => {
        const active = activeTab === id;
        return (
          <TouchableOpacity
            key={id}
            onPress={() => onTabPress(id)}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <Icon active={active} />
            <Text style={[styles.label, { color: active ? "#22c7a0" : "#6b7280" }]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#14171e",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(255,255,255,0.07)",
    paddingTop: 10,
    paddingBottom: 20,  // increase if using SafeAreaView
  },
  tab: {
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontWeight: "600",
  },
});