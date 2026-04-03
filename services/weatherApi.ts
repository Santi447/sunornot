import axios from "axios";
import { WeatherResponse } from "../types/weather";
import { useSettings } from "@/components/settings_screen/settings_context";



const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export const getWeatherForecast = async (
  latitude: number,
  longitude: number,
  tempUnit: string,
  windUnit: string,
): Promise<WeatherResponse> => {
  try {
    const response = await axios.get<WeatherResponse>(BASE_URL, {
      params: {
        latitude,
        longitude,
        current: [
          "temperature_2m",
          "relative_humidity_2m",
          "apparent_temperature",
          "weather_code",
          "wind_speed_10m",
          "visibility",
        ].join(","),
        hourly: ["temperature_2m", "weather_code"].join(","),
        daily: [
          "weather_code",
          "temperature_2m_max",
          "temperature_2m_min",
          "uv_index_max",
        ].join(","),
        temperature_unit: tempUnit,
        wind_speed_unit: windUnit,
        timezone: "auto",
        forecast_days: 10,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};