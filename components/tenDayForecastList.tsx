import { View, Text, FlatList, StyleSheet } from "react-native";
import DayForecast from "./dayForecast";
import {TenDayForecastListProps} from "../types/dayForecast";

const forecastData = [
  { id: "1", day: "Today", icon: "⛅", high: 32, low: 18, weatherCode: 1000 },
  { id: "2", day: "Tuesday", icon: "🌧️", high: 26, low: 14, weatherCode: 1001 },
  { id: "3", day: "Wednesday", icon: "❄️", high: 22, low: 10, weatherCode: 1002 },
  { id: "4", day: "Thursday", icon: "☁️", high: 24, low: 12, weatherCode: 1003 },
  { id: "5", day: "Friday", icon: "⛅", high: 32, low: 18, weatherCode: 1000 },
  { id: "6", day: "Saturday", icon: "🌧️", high: 26, low: 14, weatherCode: 1001 },
  { id: "7", day: "Sunday", icon: "❄️", high: 22, low: 10, weatherCode: 1002 },
  { id: "8", day: "Monday", icon: "☁️", high: 24, low: 12, weatherCode: 1003 },
  { id: "9", day: "Tuesday", icon: "⛅", high: 32, low: 18, weatherCode: 1000 },
  { id: "10", day: "Wednesday", icon: "🌧️", high: 26, low: 14, weatherCode: 1001 },
];

export default function TenDayForecastList({ data }: TenDayForecastListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>10-Day Forecast</Text>

      <View style={styles.card}>
        <FlatList
          data={data}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <DayForecast
              id={item.id}
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
    height: 320,
  },
  listContent: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  separator: {
    height: 12,
  },
});
