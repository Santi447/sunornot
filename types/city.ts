export type City = {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type CityWeather = {
  city: City;
  temperature: number | null;
  high: number | null;
  low: number | null;
  weatherCode: number | null;
  unit: string;
  loading: boolean;
  error: boolean;
};
