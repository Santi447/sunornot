import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface SegmentControlProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SegmentControl({ options, value, onChange }: SegmentControlProps) {
  return (
    <View style={styles.container}>
      {options.map((opt) => {
        const isActive = value === opt;
        return (
          <TouchableOpacity
            key={opt}
            onPress={() => onChange(opt)}
            style={[styles.btn, isActive && styles.btnActive]}
            activeOpacity={0.7}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {opt}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#2a2d35",
    borderRadius: 8,
    padding: 2,
    gap: 2,
  },
  btn: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnActive: {
    backgroundColor: "#22c7a0",
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#9ca3af",
  },
  labelActive: {
    color: "#0f1117",
  },
});