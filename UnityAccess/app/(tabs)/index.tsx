import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useAuth } from "@/components/AuthContext";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MapScreen: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const initialRegion: Region = {
    latitude: 43.6047, // Toulouse coordinates
    longitude: 1.4442,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const { logout } = useAuth();

  function handleLogout() {
    logout();
    router.replace("/(connexion)/log-page");
  }

  function handleSos() {
    router.push("/sos-page");
  }

  const loadFilters = async () => {
    try {
      const storedFilters = await AsyncStorage.getItem("selectedFilters");
      if (storedFilters) {
        setSelectedFilters(JSON.parse(storedFilters));
        console.log("Filtres chargés :", JSON.parse(storedFilters));
      }
    } catch (error) {
      console.error("Erreur lors du chargement des filtres :", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      loadFilters();
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Map View */}
          <MapView style={styles.map} initialRegion={initialRegion} />

          {/* Hamburger Menu */}
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => router.push("/filters-page")}
          >
            <Feather name="menu" size={30} color="black" />
          </TouchableOpacity>

          {/* SOS Button */}
          <TouchableOpacity style={styles.sosButton} onPress={handleSos}>
            <FontAwesome name="phone" size={24} color="white" />
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>

          {/* Warning Button */}
          <TouchableOpacity style={styles.warningButton}>
            <FontAwesome name="exclamation-triangle" size={24} color="white" />
          </TouchableOpacity>

          {/* Fond bleu et barre de recherche */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Feather name="search" size={20} color="black" />
              <TextInput
                style={styles.searchInput}
                placeholder="Rechercher un lieu ou une ville"
                placeholderTextColor="black"
                returnKeyType="done"
              />
              <Feather name="mic" size={20} color="black" />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  menuButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "white",
    borderRadius: 25,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  sosButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "red",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  sosText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
  warningButton: {
    position: "absolute",
    bottom: 130,
    right: 20,
    backgroundColor: "#FFA500",
    borderRadius: 25,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  searchBar: {
    backgroundColor: "white",
    borderRadius: 40,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  searchContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#5067C5", // Couleur de fond bleu
    paddingTop: 10,
    paddingBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "black",
  },
});

export default MapScreen;
