import { StyleSheet, Text, View } from "react-native";
import { DayForecastProps } from "../types/dayForecast";
export default function DayForecast({ day, icon, high, low, weatherCode, unit }: DayForecastProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.dayText}>{day}</Text>

      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>

      <View style={styles.temperatureGroup}>
        <Text style={styles.temperatureText}>{high}{unit}</Text>
        <View style={styles.dot} />
        <Text style={styles.lowText}>{low}{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  dayText: {
    color: "#EAF7FB",
    fontSize: 15,
    fontWeight: "600",
    minWidth: 78,
  },
  iconContainer: {
    width: 28,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  iconText: {
    fontSize: 22,
    color: "#42D9FF",
  },
  temperatureGroup: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  temperatureText: {
    color: "#EAF7FB",
    fontSize: 15,
    fontWeight: "700",
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#36D8FF",
    marginHorizontal: 12,
  },
  lowText: {
    color: "#D4E8EE",
    fontSize: 15,
    fontWeight: "600",
  },
});