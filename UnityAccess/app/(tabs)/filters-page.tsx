import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const FiltersPage: React.FC = () => {
  // Liste des filtres disponibles
  const filters = [
    {
      id: "parking",
      label: "Parking",
      icon: require("../../assets/images/parking.png"),
    },
    {
      id: "schools",
      label: "Écoles",
      icon: require("../../assets/images/school.png"),
    },
    {
      id: "restaurant",
      label: "Restaurant",
      icon: require("../../assets/images/restaurant.png"),
    },
    {
      id: "mairie",
      label: "Mairie",
      icon: require("../../assets/images/mairie.png"),
    },
  ];

  // État pour les filtres sélectionnés
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Gérer la sélection ou désélection d'un filtre
  const toggleFilter = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      setSelectedFilters(selectedFilters.filter((id) => id !== filterId));
    } else {
      setSelectedFilters([...selectedFilters, filterId]);
    }
  };

  // Retourner à la page précédente
  function goBack() {
    router.back();
  }

  // Sauvegarder les filtres sélectionnés et transmettre à la page principale
  const saveFilters = () => {
    router.push({
      pathname: "/index",
      params: { selectedFilters: JSON.stringify(selectedFilters) }, // Transmettre les filtres sous forme de paramètre
    });
  };

  return (
    <View style={styles.container}>
      {/* Bouton retour */}
      <TouchableOpacity style={styles.closeButton} onPress={goBack}>
        <Feather name="x" size={24} color="gray" />
      </TouchableOpacity>

      {/* Section profil */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/80" }} // Remplacez par l'image de votre utilisateur
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Alexandre Gabriel</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileButtonText}>Voir le profil</Text>
        </TouchableOpacity>
      </View>

      {/* Ligne de séparation */}
      <View style={styles.divider} />

      {/* Section filtres */}
      <ScrollView contentContainerStyle={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>Filtres</Text>
        <View style={styles.filtersGrid}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterItem,
                selectedFilters.includes(filter.id) && styles.filterSelected, // Ajouter un style si sélectionné
              ]}
              onPress={() => toggleFilter(filter.id)}
            >
              <Image source={filter.icon} style={styles.filterIcon} />
              <Text style={styles.filterText}>{filter.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Boutons Réinitialiser et Enregistrer */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setSelectedFilters([])} // Réinitialiser les filtres sélectionnés
        >
          <Text style={styles.resetButtonText}>Réinitialiser</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveFilters}>
          <Text style={styles.saveButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profileButton: {
    marginTop: 10,
    backgroundColor: "#5067C5",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  profileButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  filtersContainer: {
    paddingHorizontal: 20,
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  filtersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  filterItem: {
    width: "22%",
    alignItems: "center",
    padding: 5,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 10,
  },
  filterSelected: {
    borderColor: "#5067C5", // Ajouter un cadre bleu pour les filtres sélectionnés
  },
  filterIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  filterText: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  resetButton: {
    borderWidth: 1,
    borderColor: "#5067C5",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  resetButtonText: {
    color: "#5067C5",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#5067C5",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FiltersPage;
