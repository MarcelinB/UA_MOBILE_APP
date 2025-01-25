import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const FiltersPage: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("Alexandre");
  const [lastName, setLastName] = useState("Gabriel");
  const [profileImage, setProfileImage] = useState<string>(
    "https://via.placeholder.com/80"
  );

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

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const savedFirstName = await AsyncStorage.getItem("firstName");
        const savedLastName = await AsyncStorage.getItem("lastName");
        const savedProfileImage = await AsyncStorage.getItem("profileImage");
        const storedFilters = await AsyncStorage.getItem("selectedFilters");

        if (savedFirstName) setFirstName(savedFirstName);
        if (savedLastName) setLastName(savedLastName);
        if (savedProfileImage) setProfileImage(savedProfileImage);
        if (storedFilters) setSelectedFilters(JSON.parse(storedFilters));
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    loadProfileData();
  }, []);

  const saveFilters = async () => {
    try {
      await AsyncStorage.setItem(
        "selectedFilters",
        JSON.stringify(selectedFilters)
      );
      router.back(); // Retourner à la page précédente
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des filtres :", error);
    }
  };

  const toggleFilter = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      setSelectedFilters(selectedFilters.filter((id) => id !== filterId));
    } else {
      setSelectedFilters([...selectedFilters, filterId]);
    }
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  return (
    <View style={styles.container}>
      {/* Bouton retour */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Feather name="x" size={24} color="gray" />
      </TouchableOpacity>

      {/* Section profil */}
      <View style={styles.headerContainer}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require("../../assets/images/default-profile.png")
          }
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {firstName} {lastName}
          </Text>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={handleSettings}
          >
            <Text style={styles.profileButtonText}>Voir le profil</Text>
          </TouchableOpacity>
        </View>
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
                selectedFilters.includes(filter.id) && styles.filterSelected,
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
          onPress={() => setSelectedFilters([])}
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginTop: 80,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 15,
    justifyContent: "center",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  profileButton: {
    backgroundColor: "#5067C5",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 15,
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
    borderColor: "#5067C5",
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
