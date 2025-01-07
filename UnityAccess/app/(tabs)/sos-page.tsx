import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";

const SOSPage: React.FC = () => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const initialRegion: Region = {
    latitude: 43.604652,
    longitude: 1.444209,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleCallEmergency = () => {
    // Le numéro d'urgence en France est le 112
    Linking.openURL(`tel:0695106415`);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion} />
      <Text style={styles.coordinates}>Latitude: {initialRegion.latitude}</Text>
      <Text style={styles.coordinates}>
        Longitude: {initialRegion.longitude}
      </Text>

      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => setShowHelpModal(true)}
      >
        <Text style={styles.buttonText}>Demander de l'aide</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => setShowEmergencyModal(true)}
      >
        <Text style={styles.buttonText}>Appeler les secours</Text>
      </TouchableOpacity>

      <Modal visible={showHelpModal} transparent={true} animationType="fade">
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setShowHelpModal(false)}
          >
            <Text style={styles.buttonText}>Confirmer demande d'aide</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        visible={showEmergencyModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleCallEmergency}
          >
            <Text style={styles.buttonText}>Confirmer appel aux secours</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "80%",
  },
  coordinates: {
    fontSize: 16,
    margin: 10,
  },
  helpButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  emergencyButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalButton: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
  },
});

export default SOSPage;
