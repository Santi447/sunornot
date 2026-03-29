import { View, Text, StyleSheet } from 'react-native';
import {currentConditionProps} from '../types/currentConditionTypes';
export default function CurrentCondition({ tempIcon, city, temperature, condition, high, low, windText, humidity }: currentConditionProps ) {
  return(
    <View style={styles.container}>
      <Text style={styles.cityText}>{city}</Text>

      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{tempIcon}</Text>
        </View>

        <View style={styles.textContent}>
          <Text style={styles.label}>CURRENT CONDITIONS</Text>
          <Text style={styles.temperature}>{temperature}°F</Text>
        </View>
      </View>

      <Text style={styles.condition}>{condition}</Text>
      <Text style={styles.summary}>
        High of {high}°F. Low of {low}°F. Winds from the {windText}. Humidity at{" "}
        {humidity}%.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 20,
  },
  cityText: {
    color: "",
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
    marginBottom: 22,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  iconContainer: {
    width: 56,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 2,
  },
  iconText: {
    fontSize: 36,
  },
  textContent: {
    flex: 1,
  },
  label: {
    color: "#9DC8D4",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.5,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  temperature: {
    color: "#4ED8FF",
    fontSize: 46,
    fontWeight: "700",
    lineHeight: 50,
    marginBottom: 6,
  },
  condition: {
    color: "#EAFBFF",
    fontSize: 30,
    fontWeight: "300",
    lineHeight: 34,
    marginBottom: 8,
  },
  summary: {
    color: "#D6EEF5",
    fontSize: 16,
    lineHeight: 24,
    maxWidth: "92%",
  },
});
