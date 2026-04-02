import { View, Text, FlatList, StyleSheet } from "react-native";
import HourlyForecastCard from "./hourlyForecastCardItem";
import { hourlyForecastListProps } from "@/types/hourlyForecast";


export default function HourlyForecastList({ data }: hourlyForecastListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Hourly Forecast</Text>
      </View>

      <FlatList
        data={ data}
        nestedScrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <HourlyForecastCard
            id={item.id}
            timeLabel={item.timeLabel}
            temperature={item.temperature}
            weatherCode={item.weatherCode}
            icon={item.icon}
            unit={item.unit}
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