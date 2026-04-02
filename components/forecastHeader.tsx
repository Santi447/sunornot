import Feather from "@expo/vector-icons/Feather";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ForecastHeaderProps } from "../types/forecastHeaderTypes";

export default function forecastHeader({
  city,
  onPressSearch,
}: ForecastHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPressSearch} style={styles.sideSlot} hitSlop={10}>
        <Feather name="search" size={28} color="#39D8FF" />
      </Pressable>

      <Text style={styles.cityText} numberOfLines={1}>
        {city}
      </Text>

      <View style={styles.sideSlot} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 72,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(19, 40, 51, 0.9)",
  },
  sideSlot: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  cityText: {
    flex: 1,
    textAlign: "center",
    color: "#EAF7FB",
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 12,
  },
});
