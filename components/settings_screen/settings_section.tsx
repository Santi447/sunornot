import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

interface SettingsSectionProps {
  label: string;
  children?: ReactNode;
}

export default function SettingsSection({ label, children }: SettingsSectionProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 28,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "#6b7280",
    paddingLeft: 20,
    paddingBottom: 10,
  },
  card: {
    backgroundColor: "#1c1f27",
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: "hidden",
  },
});