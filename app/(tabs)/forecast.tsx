import CurrentCondition from "@/components/currentCondition";
import ForecastHeader from "@/components/forecastHeader";
import HourlyForecastList from "@/components/hourlyForecastList";
import TenDayForecastList from "@/components/tenDayForecastList";
import WeatherConditionList from "@/components/weatherConditionList";
import { getWeatherForecast } from "@/services/weatherApi";
import { WeatherResponse } from "@/types/weather";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { LogBox, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function formatDayLabel(dateString: string, index: number): string {
  if (index === 0) return "Today";

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "America/Edmonton",
  });
}
function formatHourLabel(dateString: string, index: number): string {
  if (index === 0) return "Now";

  const hour = Number(dateString.split("T")[1].split(":")[0]);

  if (hour === 0) return "12 AM";
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return "12 PM";
  return `${hour - 12} PM`;
}
function tempIconfromTemperature(temp: number, unit: string) {
  if (unit === "°C") {
    if (temp <= 0) return "❄️";
    if (temp <= 15) return "🌤️";
    if (temp <= 25) return "⛅";
    return "☀️";
  } else {
    if (temp <= 32) return "❄️";
    if (temp <= 59) return "🌤️";
    if (temp <= 77) return "⛅";
    return "☀️";
  }
}

export default function Forecast() {
  const params = useLocalSearchParams<{
    lat?: string;
    lon?: string;
    city?: string;
  }>();

  const parsedLat = Number(params.lat);
  const parsedLon = Number(params.lon);
  const latitude = Number.isFinite(parsedLat) ? parsedLat : 51.0447;
  const longitude = Number.isFinite(parsedLon) ? parsedLon : -114.0719;
  const cityName = params.city ?? "Calgary";

  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await getWeatherForecast(latitude, longitude);
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
        setWeather(data);
      } catch (error) {
        console.log("Failed to load weather:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [latitude, longitude]);
  const tenDayForecastData =
    weather?.daily.time.map((day, index) => ({
      id: index.toString(),
      day: formatDayLabel(day, index),
      icon: tempIconfromTemperature(
        weather.daily.temperature_2m_max[index],
        weather.current_units.temperature_2m,
      ),
      high: Math.round(weather.daily.temperature_2m_max[index]),
      low: Math.round(weather.daily.temperature_2m_min[index]),
      weatherCode: weather.daily.weather_code[index],
    })) ?? [];
  const currentHourKey = weather?.current.time.slice(0, 13);
  const currentHourIndex =
    weather && currentHourKey
      ? weather.hourly.time.findIndex(
          (time) => time.slice(0, 13) === currentHourKey,
        )
      : -1;

  const safeStartIndex = currentHourIndex >= 0 ? currentHourIndex : 0;

  const hourlyForecastData =
    weather?.hourly.time
      .slice(safeStartIndex, safeStartIndex + 8)
      .map((time, index) => {
        const actualIndex = safeStartIndex + index;

        return {
          id: actualIndex.toString(),
          timeLabel: formatHourLabel(time, index),
          temperature: Math.round(weather.hourly.temperature_2m[actualIndex]),
          weatherCode: weather.hourly.weather_code[actualIndex],
          icon: tempIconfromTemperature(
            weather.hourly.temperature_2m[actualIndex],
            weather.current_units.temperature_2m,
          ),
          unit: weather.current_units.temperature_2m,
        };
      }) ?? [];

  const currentConditionData = weather
    ? {
        city: cityName,
        temperature: Math.round(weather.current.temperature_2m),
        tempIcon: tempIconfromTemperature(
          weather.current.temperature_2m,
          weather.current_units.temperature_2m,
        ),
        condition: "Cloudy",
        high: Math.round(weather.daily.temperature_2m_max[0]),
        low: Math.round(weather.daily.temperature_2m_min[0]),
        windText: `${Math.round(weather.current.wind_speed_10m)} ${weather.current_units.wind_speed_10m}`,
        humidity: weather.current.relative_humidity_2m,
        unit: weather.current_units.temperature_2m,
      }
    : null;
  const weatherConditionData = weather
    ? [
        {
          id: "1",
          icon: "🌀",
          label: "Wind",
          value: Math.round(weather.current.wind_speed_10m),
          unit: weather.current_units.wind_speed_10m,
        },
        {
          id: "2",
          icon: "💧",
          label: "Humidity",
          value: weather.current.relative_humidity_2m,
          unit: weather.current_units.relative_humidity_2m,
        },
        {
          id: "3",
          icon: "☀️",
          label: "UV Index",
          value: Math.round(weather.daily.uv_index_max[0]),
          unit: "",
        },
        {
          id: "4",
          icon: "👁",
          label: "Visibility",
          value: Math.round(weather.current.visibility / 1000),
          unit: weather.current_units.visibility,
        },
      ]
    : [];
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
            city={cityName}
            onPressSearch={() => console.log("Search pressed")}
            onPressCalendar={() => console.log("Calendar pressed")}
          />
          <View>
            {!loading && currentConditionData && (
              <CurrentCondition {...currentConditionData} />
            )}
          </View>
          <WeatherConditionList data={weatherConditionData} />
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
