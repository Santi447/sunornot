type DayForecastProps = {
  id: string;
  day: string;
  icon: string;
  high: number;
  low: number;
  weatherCode: number;
};
type TenDayForecastListProps = {
  data: DayForecastProps[];
};

export type { DayForecastProps, TenDayForecastListProps };