import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { City } from "../types/city";
import { SEARCHABLE_CITIES } from "../data/cities";

type AddCityModalProps = {
  visible: boolean;
  existingIds: string[];
  onAdd: (city: City) => void;
  onClose: () => void;
};

export default function AddCityModal({
  visible,
  existingIds,
  onAdd,
  onClose,
}: AddCityModalProps) {
  const [query, setQuery] = useState("");

  const results = SEARCHABLE_CITIES.filter(
    (c) =>
      !existingIds.includes(c.id) &&
      c.name.toLowerCase().startsWith(query.toLowerCase())
  );

  function handleAdd(city: City) {
    onAdd(city);
    setQuery("");
  }

  function handleClose() {
    setQuery("");
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Add City</Text>
            <Pressable onPress={handleClose} hitSlop={10}>
              <Feather name="x" size={24} color="#9DC8D4" />
            </Pressable>
          </View>

          {/* Search input */}
          <View style={styles.searchRow}>
            <Feather name="search" size={18} color="#9DC8D4" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Search city..."
              placeholderTextColor="#5A8A96"
              value={query}
              onChangeText={setQuery}
              autoFocus
              autoCapitalize="words"
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery("")} hitSlop={10}>
                <Feather name="x-circle" size={18} color="#5A8A96" />
              </Pressable>
            )}
          </View>

          {/* Results */}
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            style={styles.list}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                {query.length > 0 ? "No cities found." : "Start typing to search…"}
              </Text>
            }
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.resultRow,
                  pressed && styles.resultPressed,
                ]}
                onPress={() => handleAdd(item)}
              >
                <View>
                  <Text style={styles.resultCity}>{item.name}</Text>
                  <Text style={styles.resultCountry}>{item.country}</Text>
                </View>
                <Feather name="plus-circle" size={22} color="#37D7FF" />
              </Pressable>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#0F2D39",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    color: "#EAF7FB",
    fontSize: 20,
    fontWeight: "700",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(19, 40, 51, 0.9)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(55, 215, 255, 0.15)",
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#EAF7FB",
    fontSize: 16,
    padding: 0,
  },
  list: {
    flexGrow: 0,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(55, 215, 255, 0.07)",
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  resultPressed: {
    opacity: 0.6,
  },
  resultCity: {
    color: "#EAF7FB",
    fontSize: 17,
    fontWeight: "600",
  },
  resultCountry: {
    color: "#9DC8D4",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginTop: 2,
  },
  emptyText: {
    color: "#5A8A96",
    textAlign: "center",
    marginTop: 30,
    fontSize: 15,
  },
});
