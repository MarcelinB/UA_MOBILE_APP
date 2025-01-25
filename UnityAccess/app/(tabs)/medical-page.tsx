import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const MedicalRecordPage: React.FC = () => {
  const [birthDate, setBirthDate] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activities, setActivities] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("Toulouse");
  const [allergies, setAllergies] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [medications, setMedications] = useState("");
  const [emergencyCode, setEmergencyCode] = useState("+33");
  const [emergencyContact, setEmergencyContact] = useState("");

  const bloodTypes = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
  ];

  const saveMedicalRecord = () => {
    Alert.alert("Succès", "Votre fiche médicale a été sauvegardée.");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="chevron-left" size={24} color="gray" />
          </TouchableOpacity>
          <Text style={styles.title}>Fiche médicale</Text>
        </View>

        {/* Informations personnelles */}
        <Text style={styles.sectionTitle}>Informations personnelles</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date de naissance</Text>
          <TextInput
            style={styles.input}
            value={birthDate}
            onChangeText={setBirthDate}
            placeholder="01 / 01 / 2000"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Groupe sanguin</Text>
          <RNPickerSelect
            style={{
              inputAndroid: styles.input,
              inputIOS: styles.input,
            }}
            onValueChange={(value) => setBloodType(value)}
            items={bloodTypes}
            placeholder={{ label: "Choisir le groupe sanguin", value: null }}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Taille</Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              placeholder="Taille en cm"
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.inputContainer, { marginLeft: 10 }]}>
            <Text style={styles.label}>Poids</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              placeholder="Poids en kg"
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Activités physiques</Text>
          <TextInput
            style={styles.input}
            value={activities}
            onChangeText={setActivities}
            placeholder="Listez vos activités physiques"
          />
        </View>

        {/* Adresse */}
        <Text style={styles.sectionTitle}>Adresse du domicile</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Adresse Postale</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Code Postal</Text>
            <TextInput
              style={styles.input}
              value={postalCode}
              onChangeText={setPostalCode}
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.inputContainer, { marginLeft: 10 }]}>
            <Text style={styles.label}>Ville</Text>
            <TextInput style={styles.input} value={city} editable={false} />
          </View>
        </View>

        {/* Conditions physiques */}
        <Text style={styles.sectionTitle}>Conditions physiques / mentales</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Allergies</Text>
          <TextInput
            style={styles.input}
            value={allergies}
            onChangeText={setAllergies}
            placeholder="Entrez les allergies"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Conditions médicales</Text>
          <TextInput
            style={styles.input}
            value={medicalConditions}
            onChangeText={setMedicalConditions}
            placeholder="Entrez vos conditions médicales"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Médicaments</Text>
          <TextInput
            style={styles.input}
            value={medications}
            onChangeText={setMedications}
            placeholder="Entrez vos médicaments / traitements"
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Numéro d'urgence à contacter</Text>
            <View style={styles.rowContainer}>
              <TextInput
                style={[styles.input, { width: "20%", marginRight: 10 }]}
                value={emergencyCode}
                onChangeText={setEmergencyCode}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={emergencyContact}
                onChangeText={setEmergencyContact}
                placeholder="06 00 00 00 00"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bouton Sauvegarder */}
      <TouchableOpacity style={styles.saveButton} onPress={saveMedicalRecord}>
        <Text style={styles.saveButtonText}>Sauvegarder</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    marginTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginRight: 30,
  },
  backButton: {
    fontSize: 18,
    color: "#5067C5",
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#5067C5",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MedicalRecordPage;
