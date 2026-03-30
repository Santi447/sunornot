import { View, FlatList, StyleSheet } from "react-native";
import WeatherConditionCard from "./weatherConditionCard";
import { weatherConditionListProps } from "../types/weatherConditionTypes";

const weatherConditionData = [
  { id: "1", icon: "🌀", label: "Wind", value: 18, unit: "mph" },
  { id: "2", icon: "💧", label: "Humidity", value: 62, unit: "%" },
  { id: "3", icon: "☀️", label: "UV Index", value: 1, unit: "Low" },
  { id: "4", icon: "👁", label: "Visibility", value: 8, unit: "mi" },
];

export default function WeatherConditionList({
  data,
}: weatherConditionListProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={data || weatherConditionData}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <WeatherConditionCard
            id={item.id}
            icon={item.icon}
            label={item.label}
            value={item.value}
            unit={item.unit}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    paddingHorizontal: 24,
  },
  listContent: {
    paddingBottom: 4,
  },
  row: {
    justifyContent: "space-between",
  },
  separator: {
    height: 18,
  },
});
