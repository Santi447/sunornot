import {hourlyForecastItem} from '../types/hourlyForecast';
import { View, Text, StyleSheet } from 'react-native';
export default function HourlyForecastCard({ timeLabel, temperature, icon,weatherCode }: hourlyForecastItem) {
 return (
    <View style={styles.card}>
      <Text style={styles.time}>{timeLabel}</Text>

      <View style={styles.iconWrapper}>
        {typeof icon === "string" ? (
          <Text style={styles.iconText}>{icon}</Text>
        ) : (
          icon
        )}
      </View>

      <Text style={styles.temperature}>{temperature}°F</Text>
    </View>
  );

}

const styles = StyleSheet.create({
    card: {
    width: 74,
    minHeight: 136,
    backgroundColor: "rgba(19, 40, 51, 0.92)",
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  time: {
    color: "#EAF7FB",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  iconWrapper: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 24,
  },
  temperature: {
    color: "#EAF7FB",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});