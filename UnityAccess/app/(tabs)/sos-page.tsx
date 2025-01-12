import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  Alert,
  Linking,
} from "react-native";
import MapView, { Marker, Region, PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";

const { width, height } = Dimensions.get("window");

const SOSPage = () => {
  const mapRef = useRef<MapView | null>(null);
  const initialRegion: Region = {
    latitude: 43.6047, // Toulouse coordinates
    longitude: 1.4442,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  const icon_phone = require("../../assets/images/icon_phone.png");
  const ringbell = require("../../assets/images/ringbell.png");
  const round_cancel = require("../../assets/images/roundcancel.png");
  const [location, setLocation] = useState(initialRegion);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      let region: Region = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setLocation(region);
      mapRef.current?.animateToRegion(region, 1000);
    })();
  }, []);

  const handleCallEmergency = () => {
    setShowEmergencyModal(true);
  };

  const confirmEmergencyCall = () => {
    const emergencyNumber = "tel:112";
    Linking.openURL(emergencyNumber).catch((err) =>
      Alert.alert("Error", "Unable to make the call. Please try again.")
    );
  };

  const handleRequestHelp = () => {
    setShowHelpModal(true);
  };

  const confirmHelpRequest = () => {
    Alert.alert("Help Requested", "Your request for help has been sent.", [
      { text: "OK" },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <MapView
        style={styles.map}
        initialRegion={location}
        provider={PROVIDER_DEFAULT}
        ref={mapRef}
        customMapStyle={[
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ]}
      >
        {location && <Marker coordinate={location} title="Your Location" />}
      </MapView>

      {/* Coordonnées de l'utilisateur */}
      <View style={styles.coordinatesContainer}>
        <Text style={styles.coordinatesText}>
          Latitude : {location.latitude.toFixed(6)}
        </Text>
        <Text style={styles.coordinatesText}>
          Longitude : {location.longitude.toFixed(6)}
        </Text>
      </View>

      {/* Boutons principaux */}
      <TouchableOpacity
        style={styles.buttonEmergency}
        onPress={handleCallEmergency}
      >
        <Image source={icon_phone} style={styles.icon} />
        <Text style={styles.buttonText}>Appeler les secours</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonHelp} onPress={handleRequestHelp}>
        <Image source={ringbell} style={styles.icon} />
        <Text style={styles.buttonText}>Demander de l'aide</Text>
      </TouchableOpacity>

      {/* Modales pour "Appeler les secours" et "Demander de l'aide" */}
      <Modal
        visible={showEmergencyModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowEmergencyModal(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.emergencyContainer}>
            <TouchableOpacity
              style={styles.emergencyButton}
              onPress={confirmEmergencyCall}
            >
              <Image source={icon_phone} style={styles.iconLarge} />
              <Text style={styles.emergencyButtonText}>
                Appeler les secours
              </Text>
            </TouchableOpacity>
            <Text style={styles.confirmText}>
              Confirmer pour appeler les secours
            </Text>
          </View>
          <View style={styles.cancelContainer}>
            <TouchableOpacity onPress={() => setShowEmergencyModal(false)}>
              <Image source={round_cancel} style={styles.cancelImage} />
            </TouchableOpacity>
            <Text style={styles.cancelText}>Annuler</Text>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showHelpModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowHelpModal(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.emergencyContainer}>
            <TouchableOpacity
              style={[styles.emergencyButton, { backgroundColor: "green" }]}
              onPress={confirmHelpRequest}
            >
              <Image source={ringbell} style={styles.iconLarge} />
              <Text style={styles.emergencyButtonText}>Demander de l'aide</Text>
            </TouchableOpacity>
            <Text style={styles.confirmText}>
              Confirmer pour demander de l'aide
            </Text>
          </View>
          <View style={styles.cancelContainer}>
            <TouchableOpacity onPress={() => setShowHelpModal(false)}>
              <Image source={round_cancel} style={styles.cancelImage} />
            </TouchableOpacity>
            <Text style={styles.cancelText}>Annuler</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  map: {
    width: width,
    height: height * 0.5,
    padding: 20,
  },
  coordinatesContainer: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
  coordinatesText: {
    fontSize: 16,
    color: "#333",
  },
  buttonEmergency: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonHelp: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emergencyContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  emergencyButton: {
    backgroundColor: "red",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginTop: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  emergencyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    marginLeft: 10,
  },
  confirmText: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
  },
  cancelContainer: {
    position: "absolute",
    bottom: 40,
    alignItems: "center",
  },
  cancelImage: {
    width: 75,
    height: 75,
  },
  cancelText: {
    marginTop: 5,
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  iconLarge: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
  },
});

export default SOSPage;
