import React from "react";
import { Switch } from "react-native";

interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function Toggle({ value, onChange }: ToggleProps) {
  return (
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ false: "#374151", true: "#22c7a0" }}
      thumbColor="#ffffff"
      ios_backgroundColor="#374151"
    />
  );
}