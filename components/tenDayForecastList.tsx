import { View, Text, FlatList, StyleSheet } from "react-native";
import DayForecast from "./dayForecast";
import {TenDayForecastListProps} from "../types/dayForecast";


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
              unit={item.unit}
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
