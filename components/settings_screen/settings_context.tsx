import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type TempUnit = "°C" | "°F";
export type WindUnit = "km/h" | "mph";
export type TimeFormat = "12hr" | "24hr";

interface Settings {
  tempUnit: TempUnit;
  windUnit: WindUnit;
  timeFormat: TimeFormat;
  dailyForecast: boolean;
  severeAlerts: boolean;
  useCurrentLocation: boolean;
}

interface SettingsContextValue {
  settings: Settings;
  setTempUnit: (unit: TempUnit) => void;
  setWindUnit: (unit: WindUnit) => void;
  setTimeFormat: (format: TimeFormat) => void;
  setDailyForecast: (value: boolean) => void;
  setSevereAlerts: (value: boolean) => void;
  setUseCurrentLocation: (value: boolean) => void;
}

const DEFAULT_SETTINGS: Settings = {
  tempUnit: "°C",
  windUnit: "km/h",
  timeFormat: "12hr",
  dailyForecast: true,
  severeAlerts: true,
  useCurrentLocation: true,
};

const STORAGE_KEY = "user_settings";


const SettingsContext = createContext<SettingsContextValue | null>(null);


export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(raw) });
        } catch {
        }
      }
    });
  }, []);

  const save = (updated: Settings) => {
    setSettings(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setTempUnit: (tempUnit) => save({ ...settings, tempUnit }),
        setWindUnit: (windUnit) => setSettings(prev => {
  const updated = { ...prev, windUnit };
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}),
        setTimeFormat: (timeFormat) => save({ ...settings, timeFormat }),
        setDailyForecast: (dailyForecast) => save({ ...settings, dailyForecast }),
        setSevereAlerts: (severeAlerts) => save({ ...settings, severeAlerts }),
        setUseCurrentLocation: (useCurrentLocation) => save({ ...settings, useCurrentLocation }),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside <SettingsProvider>");
  return ctx;
}