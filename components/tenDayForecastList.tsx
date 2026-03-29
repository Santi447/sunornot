import { View, Text, FlatList, StyleSheet } from "react-native";
import DayForecast from "./dayForecast";

const forecastData = [
  { id: "1", day: "Today", icon: "⛅", high: 32, low: 18, weatherCode: 1000 },
  { id: "2", day: "Tuesday", icon: "🌧️", high: 26, low: 14, weatherCode: 1001 },
  { id: "3", day: "Wednesday", icon: "❄️", high: 22, low: 10, weatherCode: 1002 },
  { id: "4", day: "Thursday", icon: "☁️", high: 24, low: 12, weatherCode: 1003 },
];

export default function TenDayForecastList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>10-Day Forecast</Text>

      <View style={styles.card}>
        <FlatList
          data={forecastData}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <DayForecast
              day={item.day}
              icon={item.icon}
              high={item.high}
              low={item.low}
              weatherCode={item.weatherCode}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    color: "#EAF7FB",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 14,
  },
  card: {
    backgroundColor: "rgba(19, 40, 51, 0.9)",
    borderRadius: 24,
    overflow: "hidden",
  },
  listContent: {
    paddingVertical: 10,
  },
  separator: {
    height: 12,
  },
});