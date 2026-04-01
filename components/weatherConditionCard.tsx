import { View, Text, StyleSheet } from "react-native";
import { weatherConditionProps } from "../types/weatherConditionTypes";

export default function WeatherConditionCard({
  icon,
  label,
  value,
  unit,
}: weatherConditionProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    minHeight: 120,
    backgroundColor: "rgba(19, 40, 51, 0.9)",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 16,
    justifyContent: "center",
  },
  icon: {
    fontSize: 24,
    color: "#39D8FF",
    marginBottom: 6,
  },
  label: {
    color: "#D9EDF3",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 14,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  value: {
    color: "#F1FAFD",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 24,
  },
  unit: {
    color: "#D9EDF3",
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 4,
    marginBottom: 1,
  },
});