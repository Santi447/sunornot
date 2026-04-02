export function weatherCodeToIcon(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code <= 49) return "🌫️";
  if (code <= 59) return "🌦️";
  if (code <= 69) return "🌧️";
  if (code <= 79) return "🌨️";
  if (code <= 84) return "🌧️";
  if (code <= 94) return "⛈️";
  return "🌩️";
}

export function tempIconFromTemperature(temp: number, unit: string): string {
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
