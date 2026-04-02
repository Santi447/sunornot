import { City } from "../types/city";

export const DEFAULT_CITIES: City[] = [
  { id: "1", name: "Calgary", country: "CA", latitude: 51.0447, longitude: -114.0719 },
  { id: "2", name: "Toronto", country: "CA", latitude: 43.6532, longitude: -79.3832 },
  { id: "3", name: "Vancouver", country: "CA", latitude: 49.2827, longitude: -123.1207 },
  { id: "4", name: "New York", country: "US", latitude: 40.7128, longitude: -74.006 },
  { id: "5", name: "London", country: "GB", latitude: 51.5074, longitude: -0.1278 },
  { id: "6", name: "Tokyo", country: "JP", latitude: 35.6762, longitude: 139.6503 },
];

export const SEARCHABLE_CITIES: City[] = [
  ...DEFAULT_CITIES,
  { id: "7",  name: "Paris",    country: "FR", latitude: 48.8566,  longitude: 2.3522   },
  { id: "8",  name: "Sydney",   country: "AU", latitude: -33.8688, longitude: 151.2093 },
  { id: "9",  name: "Dubai",    country: "AE", latitude: 25.2048,  longitude: 55.2708  },
  { id: "10", name: "Chicago",  country: "US", latitude: 41.8781,  longitude: -87.6298 },
  { id: "11", name: "Berlin",   country: "DE", latitude: 52.52,    longitude: 13.405   },
  { id: "12", name: "Mumbai",   country: "IN", latitude: 19.076,   longitude: 72.8777  },
  { id: "13", name: "Montreal", country: "CA", latitude: 45.5017,  longitude: -73.5673 },
  { id: "14", name: "Seattle",  country: "US", latitude: 47.6062,  longitude: -122.3321},
  { id: "15", name: "Bangkok",  country: "TH", latitude: 13.7563,  longitude: 100.5018 },
  { id: "16", name: "Rome",     country: "IT", latitude: 41.9028,  longitude: 12.4964  },
  { id: "17", name: "Madrid",   country: "ES", latitude: 40.4168,  longitude: -3.7038  },
  { id: "18", name: "Singapore",country: "SG", latitude: 1.3521,   longitude: 103.8198 },
  { id: "19", name: "Los Angeles", country: "US", latitude: 34.0522, longitude: -118.2437 },
  { id: "20", name: "Miami",    country: "US", latitude: 25.7617,  longitude: -80.1918 },
];
