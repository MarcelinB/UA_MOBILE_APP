import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const SettingsPage: React.FC = () => {
  function goBack() {
    router.back();
  }

  return (
    <View style={styles.container}>
      {/* Header avec bouton retour */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color="gray" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
      </View>

      {/* Contenu scrollable */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Section Général */}
        <Text style={styles.sectionTitle}>Général</Text>
        <View style={styles.groupContainer}>
          <TouchableOpacity style={[styles.settingItem, styles.noBorder]}>
            <Image
              source={require("../../assets/images/Icon.png")}
              style={styles.icon}
            />
            <Text style={styles.settingText}>Modifier le profil</Text>
            <Feather name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingItem, styles.noBorder]}>
            <Image
              source={require("../../assets/images/Medical.png")}
              style={styles.icon}
            />
            <Text style={styles.settingText}>Fiche médicale</Text>
            <Feather name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Image
              source={require("../../assets/images/Wheelchair.png")}
              style={styles.icon}
            />
            <Text style={styles.settingText}>Accessibilité</Text>
            <Feather name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.groupContainer}>
          <TouchableOpacity style={styles.settingItem}>
            <Image
              source={require("../../assets/images/bell.png")}
              style={styles.icon}
            />
            <Text style={styles.settingText}>Notifications</Text>
            <Feather name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Section Paramètres supplémentaires */}
        <Text style={styles.sectionTitle}>Paramètres supplémentaires</Text>
        <View style={styles.groupContainer}>
          <TouchableOpacity style={[styles.settingItem, styles.noBorder]}>
            <Image
              source={require("../../assets/images/Globe.png")}
              style={styles.icon}
            />
            <Text style={styles.settingText}>Langue</Text>
            <Feather name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingItem, styles.noBorder]}>
            <Image
              source={require("../../assets/images/Shield.png")}
              style={styles.icon}
            />
            <Text style={styles.settingText}>Sécurité</Text>
            <Feather name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingItem, styles.noBorder]}>
            <Image
              source={require("../../assets/images/Lock.png")}
              style={styles.icon}
            />
            <Text style={styles.settingText}>Confidentialité</Text>
            <Feather name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingItem, styles.noBorder]}>
            <Image
              source={require("../../assets/images/Info.png")}
              style={styles.icon}
            />
            <Text style={styles.settingText}>Utilisation des données</Text>
            <Feather name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Image
              source={require("../../assets/images/Help.png")}
              style={styles.icon}
            />
            <Text style={styles.settingText}>Aide</Text>
            <Feather name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version</Text>
          <Text style={styles.versionNumber}>1.0</Text>
        </View>

        {/* Déconnexion */}
        <TouchableOpacity style={styles.logoutButton}>
          <Image
            source={require("../../assets/images/Exit.png")}
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#F8F9FB",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    flex: 1,
    marginEnd: 40,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginStart: 25,
    marginTop: 20,
    marginBottom: 10,
  },
  groupContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderBottomColor: "#E0E0E0",
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  icon: {
    width: 20, // Réduction de la taille des icônes
    height: 20,
    marginRight: 15,
  },
  settingText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  versionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 20,
  },
  versionText: {
    fontSize: 14,
    color: "#333",
  },
  versionNumber: {
    fontSize: 14,
    color: "#666",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Alignement à gauche
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },
  logoutIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  logoutText: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
});

export default SettingsPage;
