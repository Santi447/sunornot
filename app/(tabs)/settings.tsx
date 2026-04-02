import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Svg, { Path, Circle, Line, Polyline } from "react-native-svg";

import SettingsSection from "../../components/settings_screen/settings_section";
import SettingsRow from "../../components/settings_screen/settingsrow";
import Toggle from "../../components/settings_screen/toggle";
import SegmentControl from "../../components/settings_screen/segments_control";
import { TempUnit, TimeFormat, useSettings, WindUnit } from "../../components/settings_screen/settings_context";


const IconBack = () => (
  <Svg width={10} height={16} viewBox="0 0 10 16" fill="none">
    <Path d="M8.5 1.5L1.5 8L8.5 14.5" stroke="#22c7a0" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const IconUser = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={8} r={4} stroke="#9ca3af" strokeWidth={2} />
    <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#9ca3af" strokeWidth={2} />
  </Svg>
);

const IconLocation = () => (
  <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      stroke="#22c7a0" strokeWidth={2} />
    <Circle cx={12} cy={9} r={2.5} stroke="#22c7a0" strokeWidth={2} />
  </Svg>
);

const IconGPS = () => (
  <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={3} stroke="#22c7a0" strokeWidth={2} />
    <Path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#22c7a0" strokeWidth={2} />
    <Circle cx={12} cy={12} r={9} stroke="#22c7a0" strokeWidth={2} strokeDasharray="2 2" />
  </Svg>
);

const IconThermo = () => (
  <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
    <Path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26A4.5 4.5 0 1014 14.76z"
      stroke="#f87171" strokeWidth={2} />
  </Svg>
);

const IconWind = () => (
  <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
    <Path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1013 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"
      stroke="#60a5fa" strokeWidth={2} />
  </Svg>
);

const IconClock = () => (
  <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke="#a78bfa" strokeWidth={2} />
    <Path d="M12 6v6l4 2" stroke="#a78bfa" strokeWidth={2} />
  </Svg>
);

const IconBell = () => (
  <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
    <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#fbbf24" strokeWidth={2} />
    <Path d="M13.73 21a2 2 0 01-3.46 0" stroke="#fbbf24" strokeWidth={2} />
  </Svg>
);

const IconAlert = () => (
  <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
    <Path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
      stroke="#f87171" strokeWidth={2} />
    <Line x1={12} y1={9} x2={12} y2={13} stroke="#f87171" strokeWidth={2} />
    <Line x1={12} y1={17} x2={12.01} y2={17} stroke="#f87171" strokeWidth={2} />
  </Svg>
);

const IconInfo = () => (
  <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke="#6b7280" strokeWidth={2} />
    <Line x1={12} y1={8} x2={12} y2={12} stroke="#6b7280" strokeWidth={2} />
    <Line x1={12} y1={16} x2={12.01} y2={16} stroke="#6b7280" strokeWidth={2} />
  </Svg>
);

const IconShield = () => (
  <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
    <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#6b7280" strokeWidth={2} />
  </Svg>
);

const IconExternal = () => (
  <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
    <Path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
      stroke="#4b5563" strokeWidth={2} />
    <Polyline points="15,3 21,3 21,9" stroke="#4b5563" strokeWidth={2} />
    <Line x1={10} y1={14} x2={21} y2={3} stroke="#4b5563" strokeWidth={2} />
  </Svg>
);

// ─────────────────────────────────────────────────────────────────────────────

export default function SettingsScreen() {
const {
  settings,
  setTempUnit,
  setWindUnit,
  setTimeFormat,
  setDailyForecast,
  setSevereAlerts,
  setUseCurrentLocation,
} = useSettings();

const { tempUnit, windUnit, timeFormat, dailyForecast, severeAlerts, useCurrentLocation } = settings;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.headerLeft} activeOpacity={0.7}>
            <IconBack />
            <Text style={styles.headerTitle}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarBtn} activeOpacity={0.7}>
            <IconUser />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

          <SettingsSection label="Location">
            <SettingsRow
              icon={<IconLocation />}
              iconBg="#1a2e27"
              title="Default Location"
              subtitle="Calgary, AB"
              right={<Text style={styles.editBtn}>Edit</Text>}
            />
            <SettingsRow
              icon={<IconGPS />}
              iconBg="#1a2e27"
              title="Use current location"
              subtitle="Access GPS for real-time weather data"
              right={<Toggle value={useCurrentLocation} onChange={setUseCurrentLocation} />}
              last
            />
          </SettingsSection>

          <SettingsSection label="Atmospheric Units">
            <SettingsRow
              icon={<IconThermo />}
              iconBg="#2e1a1a"
              title="Temperature"
              right={<SegmentControl options={["°C", "°F"]} value={tempUnit} onChange={(v) => setTempUnit(v as TempUnit)} />}
            />
            <SettingsRow
              icon={<IconWind />}
              iconBg="#1a1f2e"
              title="Wind Speed"
              right={<SegmentControl options={["mph", "km/h"]} value={windUnit} onChange={(v) => setWindUnit(v as WindUnit)} />}
            />
            <SettingsRow
              icon={<IconClock />}
              iconBg="#231a2e"
              title="Time Format"
              right={<SegmentControl options={["12hr", "24hr"]} value={timeFormat} onChange={(v) => setTimeFormat(v as TimeFormat)} />}
              last
            />
          </SettingsSection>

          <SettingsSection label="Notifications">
            <SettingsRow
              icon={<IconBell />}
              iconBg="#2e251a"
              title="Daily Forecast"
              subtitle="Briefing at 7:00 AM"
              right={<Toggle value={dailyForecast} onChange={setDailyForecast} />}
            />
            <SettingsRow
              icon={<IconAlert />}
              iconBg="#2e1a1a"
              title="Severe Weather Alerts"
              subtitle="Immediate warning for storms"
              right={<Toggle value={severeAlerts} onChange={setSevereAlerts} />}
              last
            />
          </SettingsSection>

          <SettingsSection label="Information">
            <SettingsRow
              icon={<IconInfo />}
              iconBg="#1e2028"
              title="App Version"
              right={<Text style={styles.versionText}>v4.2.0 (Stable)</Text>}
            />
            <SettingsRow
              icon={<IconShield />}
              iconBg="#1e2028"
              title="Privacy Policy"
              right={<IconExternal />}
              last
              onPress={() => {
                // TODO: Linking.openURL("https://yourapp.com/privacy")
              }}
            />
          </SettingsSection>

        </ScrollView>

        {/* <BottomNavBar activeTab={activeTab} onTabPress={setActiveTab} /> */}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0f1117",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.3,
    color: "#ffffff",
  },
  avatarBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2a2d35",
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    paddingBottom: 16,
  },
  editBtn: {
    color: "#22c7a0",
    fontSize: 14,
    fontWeight: "500",
  },
  versionText: {
    fontSize: 14,
    color: "#6b7280",
  },
});