import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface SettingsRowProps {
  icon: ReactNode;
  iconBg?: string;
  title: string;
  subtitle?: string;
  right?: ReactNode;
  last?: boolean;       
  onPress?: () => void;
}

export default function SettingsRow({
  icon,
  iconBg,
  title,
  subtitle,
  right,
  last = false,
  onPress,
}: SettingsRowProps) {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.row, !last && styles.rowBorder]}
    >
      {/* Icon badge */}
      <View style={[styles.iconBadge, { backgroundColor: iconBg ?? "#2a2d35" }]}>
        {icon}
      </View>

      {/* Text content */}
      <View style={styles.textContent}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {/* Right control */}
      {right && <View style={styles.right}>{right}</View>}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    color: "#f1f5f9",
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
    lineHeight: 16,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexShrink: 0,
  },
});