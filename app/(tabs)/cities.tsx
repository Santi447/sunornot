import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AddCityModal from "@/components/addCityModal";
import CityCard from "@/components/cityCard";
import { DEFAULT_CITIES } from "@/data/cities";
import { getWeatherForecast } from "@/services/weatherApi";
import { City, CityWeather } from "@/types/city";

export default function Cities() {
  const router = useRouter();
  const [cities, setCities] = useState<City[]>(DEFAULT_CITIES);
  const [cityWeathers, setCityWeathers] = useState<CityWeather[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Initialise cityWeathers skeleton whenever cities list changes
  useEffect(() => {
    setCityWeathers((prev) => {
      const existingMap = new Map(prev.map((cw) => [cw.city.id, cw]));
      return cities.map(
        (city) =>
          existingMap.get(city.id) ?? {
            city,
            temperature: null,
            high: null,
            low: null,
            weatherCode: null,
            unit: "°F",
            loading: true,
            error: false,
          },
      );
    });
  }, [cities]);

  // Fetch weather for any city that is still loading
  const fetchWeatherForCity = useCallback(async (city: City) => {
    try {
      const data = await getWeatherForecast(city.latitude, city.longitude);
      setCityWeathers((prev) =>
        prev.map((cw) =>
          cw.city.id === city.id
            ? {
                ...cw,
                temperature: Math.round(data.current.temperature_2m),
                high: Math.round(data.daily.temperature_2m_max[0]),
                low: Math.round(data.daily.temperature_2m_min[0]),
                weatherCode: data.current.weather_code,
                unit: data.current_units.temperature_2m,
                loading: false,
                error: false,
              }
            : cw,
        ),
      );
    } catch {
      setCityWeathers((prev) =>
        prev.map((cw) =>
          cw.city.id === city.id ? { ...cw, loading: false, error: true } : cw,
        ),
      );
    }
  }, []);

  // Trigger fetches whenever cityWeathers has new loading entries
  useEffect(() => {
    cityWeathers
      .filter((cw) => cw.loading)
      .forEach((cw) => fetchWeatherForCity(cw.city));
  }, [cityWeathers, fetchWeatherForCity]);

  function handleAddCity(city: City) {
    setCities((prev) => [...prev, city]);
    setModalVisible(false);
  }

  function handleRemoveCity(cityId: string) {
    Alert.alert("Remove City", "Remove this city from your list?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          setCities((prev) => prev.filter((c) => c.id !== cityId));
          setCityWeathers((prev) => prev.filter((cw) => cw.city.id !== cityId));
        },
      },
    ]);
  }

  function handleCityPress(cityWeather: CityWeather) {
    router.push({
      pathname: "/(tabs)/forecast",
      params: {
        lat: cityWeather.city.latitude.toString(),
        lon: cityWeather.city.longitude.toString(),
        city: cityWeather.city.name,
      },
    });
  }

  const existingIds = cities.map((c) => c.id);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <LinearGradient
        colors={["#3d7a8a", "#234E5B", "#0A1E25"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.2 }}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft} />
          <Text style={styles.headerTitle}>My Cities</Text>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.addButton}
            hitSlop={10}
          >
            <Feather name="plus" size={28} color="#39D8FF" />
          </Pressable>
        </View>

        {/* City list */}
        <FlatList
          data={cityWeathers}
          keyExtractor={(item) => item.city.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🌍</Text>
              <Text style={styles.emptyTitle}>No cities yet</Text>
              <Text style={styles.emptySubtitle}>
                Tap the + button to add cities
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <CityCard
              cityWeather={item}
              onPress={() => handleCityPress(item)}
              onLongPress={() => handleRemoveCity(item.city.id)}
            />
          )}
        />

        {/* Hint text */}
        {cityWeathers.length > 0 && (
          <Text style={styles.hintText}>Long press a city to remove it</Text>
        )}
      </LinearGradient>

      {/* Add City Modal */}
      <AddCityModal
        visible={modalVisible}
        existingIds={existingIds}
        onAdd={handleAddCity}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A1E25",
  },
  container: {
    flex: 1,
  },
  header: {
    height: 72,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(19, 40, 51, 0.9)",
  },
  headerLeft: {
    width: 36,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#EAF7FB",
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
  },
  addButton: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  separator: {
    height: 14,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 100,
  },
  emptyIcon: {
    fontSize: 52,
    marginBottom: 16,
  },
  emptyTitle: {
    color: "#EAF7FB",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  emptySubtitle: {
    color: "#9DC8D4",
    fontSize: 15,
    fontWeight: "500",
  },
  hintText: {
    color: "#5A8A96",
    fontSize: 12,
    textAlign: "center",
    paddingBottom: 12,
  },
});
