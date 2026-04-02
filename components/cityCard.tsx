import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { CityWeather } from "../types/city";
import { weatherCodeToIcon } from "../utils/weatherHelpers";

type CityCardProps = {
  cityWeather: CityWeather;
  onPress: () => void;
  onLongPress: () => void;
};

export default function CityCard({ cityWeather, onPress, onLongPress }: CityCardProps) {
  const { city, temperature, high, low, weatherCode, unit, loading, error } = cityWeather;

  const icon =
    weatherCode !== null ? weatherCodeToIcon(weatherCode) : "🌡️";

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      {/* Left: city info */}
      <View style={styles.leftSection}>
        <Text style={styles.cityName}>{city.name}</Text>
        <Text style={styles.country}>{city.country}</Text>
        {!loading && !error && high !== null && low !== null && (
          <Text style={styles.highLow}>
            H:{high}
            {unit}  L:{low}
            {unit}
          </Text>
        )}
        {error && <Text style={styles.errorText}>Unavailable</Text>}
      </View>

      {/* Right: temp + icon */}
      <View style={styles.rightSection}>
        {loading ? (
          <ActivityIndicator size="small" color="#37D7FF" />
        ) : (
          <>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.temperature}>
              {temperature !== null ? `${temperature}${unit}` : "--"}
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(19, 40, 51, 0.9)",
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(55, 215, 255, 0.08)",
  },
  cardPressed: {
    opacity: 0.75,
  },
  leftSection: {
    flex: 1,
    marginRight: 16,
  },
  cityName: {
    color: "#EAF7FB",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 2,
  },
  country: {
    color: "#9DC8D4",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  highLow: {
    color: "#9DC8D4",
    fontSize: 13,
    fontWeight: "500",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 13,
  },
  rightSection: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 72,
  },
  icon: {
    fontSize: 30,
    marginBottom: 4,
    textAlign: "center",
  },
  temperature: {
    color: "#4ED8FF",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },
});
