import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "@/components/AuthContext";
import { router } from "expo-router";

const MapScreen: React.FC = () => {
  // Initial region configuration for the map
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
    logout();
    router.push("/sos-page");
  }

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView style={styles.map} initialRegion={initialRegion} />

      {/* Hamburger Menu */}
      <TouchableOpacity style={styles.menuButton}>
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

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Feather name="search" size={24} color="black" />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un lieu ou une ville"
          placeholderTextColor="black"
        />
        <Feather name="mic" size={24} color="black" />
      </View>
    </View>
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
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#D0D6F9",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "black",
  },
});

export default MapScreen;
