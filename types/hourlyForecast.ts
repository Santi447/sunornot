type hourlyForecastItem = {
  id: string;
  timeLabel?: string;
  icon?: string;
  temperature?: number;
  unit: string;
  weatherCode?: number;
};
type hourlyForecastListProps = {
  data?: hourlyForecastItem[];
};
export type {hourlyForecastItem, hourlyForecastListProps};