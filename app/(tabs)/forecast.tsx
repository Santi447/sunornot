import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentCondition from "@/components/currentCondition";
import HourlyForecastList from "@/components/hourlyForecastList";
import TenDayForecastList from "@/components/tenDayForecastList";
import { LinearGradient } from "expo-linear-gradient";

export default function Forecast() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <LinearGradient
        colors={["#3d7a8a", "#234E5B", "#0A1E25"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.2 }}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <CurrentCondition
              city="New York"
              temperature={75}
              condition="Sunny"
            />
          </View>

          <HourlyForecastList />
          <TenDayForecastList />
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