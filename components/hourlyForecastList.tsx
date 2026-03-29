import { View, Text, FlatList, StyleSheet } from "react-native";
import HourlyForecastCard from "./hourlyForecastCardItem";

const hourlyData = [
  { id: "1", time: "Now", temperature: 25, weatherCode: 1000 },
  { id: "2", time: "2 PM", temperature: 28, weatherCode: 1003 },
  { id: "3", time: "3 PM", temperature: 30, weatherCode: 1003 },
  { id: "4", time: "4 PM", temperature: 31, weatherCode: 1003 },
];

export default function HourlyForecastList() {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Hourly Forecast</Text>
        <Text style={styles.linkText}>View full graph</Text>
      </View>

      <FlatList
        data={hourlyData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <HourlyForecastCard
            timeLabel={item.time}
            temperature={item.temperature}
            weatherCode={item.weatherCode}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },
  headerRow: {
    paddingHorizontal: 20,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#EAF7FB",
    fontSize: 20,
    fontWeight: "600",
  },
  linkText: {
    color: "#37D7FF",
    fontSize: 13,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingRight: 32,
  },
  separator: {
    width: 14,
  },
});