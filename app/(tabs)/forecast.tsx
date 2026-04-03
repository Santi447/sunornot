import CurrentCondition from "@/components/currentCondition";
import ForecastHeader from "@/components/forecastHeader";
import HourlyForecastList from "@/components/hourlyForecastList";
import TenDayForecastList from "@/components/tenDayForecastList";
import WeatherConditionList from "@/components/weatherConditionList";
import { getWeatherForecast } from "@/services/weatherApi";
import { WeatherResponse } from "@/types/weather";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { LogBox, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  weatherCodeToIcon,
  weatherCodeToDescription,
} from "@/utils/weatherHelpers";
import { useSettings } from "@/components/settings_screen/settings_context";

function formatDayLabel(dateString: string, index: number): string {
  if (index === 0) return "Today";

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "America/Edmonton",
  });
}

function formatHourLabel(
  dateString: string,
  index: number,
  timeFormat: string,
): string {
  if (index === 0) return "Now";

  const hour = Number(dateString.split("T")[1].split(":")[0]);

  if (timeFormat === "24hr") return `${String(hour).padStart(2, "0")}:00`;
  if (hour === 0) return "12 AM";
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return "12 PM";
  return `${hour - 12} PM`;
}

function toDisplayTemp(celsius: number, unit: string): number {
  if (unit === "°F") return Math.round((celsius * 9) / 5 + 32);
  return Math.round(celsius);
}

function toDisplayWind(kmh: number, unit: string): number {
  if (unit === "mph") return Math.round(kmh * 0.621371);
  return Math.round(kmh);
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

  const { settings } = useSettings();
  const unit = settings.tempUnit;
  const windUnit = settings.windUnit;
  const timeFormat = settings.timeFormat;

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
      icon: weatherCodeToIcon(weather.daily.weather_code[index]),
      high: toDisplayTemp(weather.daily.temperature_2m_max[index], unit),
      low: toDisplayTemp(weather.daily.temperature_2m_min[index], unit),
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
          timeLabel: formatHourLabel(time, index, timeFormat),
          temperature: toDisplayTemp(
            weather.hourly.temperature_2m[actualIndex],
            unit,
          ),
          weatherCode: weather.hourly.weather_code[actualIndex],
          icon: weatherCodeToIcon(weather.hourly.weather_code[actualIndex]),
          unit,
        };
      }) ?? [];

  const currentConditionData = weather
    ? {
        city: cityName,
        temperature: toDisplayTemp(weather.current.temperature_2m, unit),
        tempIcon: weatherCodeToIcon(weather.current.weather_code),
        condition: weatherCodeToDescription(weather.current.weather_code),
        high: toDisplayTemp(weather.daily.temperature_2m_max[0], unit),
        low: toDisplayTemp(weather.daily.temperature_2m_min[0], unit),
        windText: `${toDisplayWind(weather.current.wind_speed_10m, windUnit)} ${windUnit}`,
        humidity: weather.current.relative_humidity_2m,
        unit,
      }
    : null;

  const weatherConditionData = weather
    ? [
        {
          id: "1",
          icon: "🌀",
          label: "Wind",
          value: toDisplayWind(weather.current.wind_speed_10m, windUnit),
          unit: windUnit,
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
            onPressSearch={() => router.push("/(tabs)/cities")}
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