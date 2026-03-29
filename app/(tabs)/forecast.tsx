import { View, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentCondition from "@/components/currentCondition";
import HourlyForecastList from "@/components/hourlyForecastList";
import TenDayForecastList from "@/components/tenDayForecastList";
import WeatherConditionList from "@/components/weatherConditionList";
import ForecastHeader from "@/components/forecastHeader";
import { LinearGradient } from "expo-linear-gradient";
import { getWeatherForecast } from "@/services/weatherApi";
import { WeatherResponse } from "@/types/weather";

function formatDayLabel(dateString: string, index: number): string {
  if (index === 0) return "Today";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}
function formatHourLabel(dateString: string, index: number): string {
  if (index === 0) return "Now";

  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
}

export default function Forecast() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await getWeatherForecast(51.0447, -114.0719);
        setWeather(data);
      } catch (error) {
        console.log("Failed to load weather:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, []);
  const tenDayForecastData =
    weather?.daily.time.map((day, index) => ({
      id: index.toString(),
      day: formatDayLabel(day, index),
      icon: "☁️",
      high: Math.round(weather.daily.temperature_2m_max[index]),
      low: Math.round(weather.daily.temperature_2m_min[index]),
      weatherCode: weather.daily.weather_code[index],
    })) ?? [];

const hourlyForecastData =
  weather?.hourly.time.slice(0, 8).map((time, index) => ({
    id: index.toString(),
    timeLabel: formatHourLabel(time, index),
    temperature: Math.round(weather.hourly.temperature_2m[index]),
    weatherCode: weather.hourly.weather_code[index],
    icon: "☁️",
  })) ?? [];

const currentConditionData = weather
  ? {
      city: "Calgary",
      temperature: Math.round(weather.current.temperature_2m),
      tempIcon: "☁️",
      condition: "Cloudy",
      high: Math.round(weather.daily.temperature_2m_max[0]),
      low: Math.round(weather.daily.temperature_2m_min[0]),
      windText: `${Math.round(weather.current.wind_speed_10m)} mph`,
      humidity: weather.current.relative_humidity_2m,
    }
  : null;
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <LinearGradient
        colors={["#3d7a8a", "#234E5B", "#0A1E25"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.2 }}
        style={styles.container}
      >
        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ForecastHeader
            city="Calgary"
            onPressSearch={() => console.log("Search pressed")}
            onPressCalendar={() => console.log("Calendar pressed")}
          />
          <View>
          {!loading && currentConditionData && (
            <CurrentCondition {...currentConditionData} />
          )}
          </View>
          <WeatherConditionList />
          {!loading && <HourlyForecastList data={hourlyForecastData} />}
          {!loading && <TenDayForecastList data={tenDayForecastData} />}
        </ScrollView>
      </LinearGradient>
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
  scrollContent: {
    paddingBottom: 24,
  },
});
