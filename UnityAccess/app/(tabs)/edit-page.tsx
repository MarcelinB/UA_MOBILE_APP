import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

const countryCodes = [
  { label: "+1 (USA)", value: "+1" },
  { label: "+33 (France)", value: "+33" },
  { label: "+44 (UK)", value: "+44" },
  { label: "+49 (Germany)", value: "+49" },
  { label: "+91 (India)", value: "+91" },
];

const ProfileEditPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+33"); // Default France
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const loadProfileData = async () => {
      const savedFirstName = await AsyncStorage.getItem("firstName");
      const savedLastName = await AsyncStorage.getItem("lastName");
      const savedEmail = await AsyncStorage.getItem("email");
      const savedPhoneNumber = await AsyncStorage.getItem("phoneNumber");
      const savedCountryCode = await AsyncStorage.getItem("countryCode");
      const savedProfileImage = await AsyncStorage.getItem("profileImage");

      if (savedFirstName) setFirstName(savedFirstName);
      if (savedLastName) setLastName(savedLastName);
      if (savedEmail) setEmail(savedEmail);
      if (savedPhoneNumber) setPhoneNumber(savedPhoneNumber);
      if (savedCountryCode) setCountryCode(savedCountryCode);
      if (savedProfileImage) setProfileImage(savedProfileImage);
    };

    loadProfileData();
  }, []);

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem("firstName", firstName);
      await AsyncStorage.setItem("lastName", lastName);
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("phoneNumber", phoneNumber);
      await AsyncStorage.setItem("countryCode", countryCode);
      await AsyncStorage.setItem("profileImage", profileImage);

      Alert.alert("Succès", "Votre profil a été sauvegardé.");
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue lors de la sauvegarde.");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission requise",
        "L'application a besoin d'accéder à votre caméra pour prendre une photo."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
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
          <Text style={styles.title}>Modifier le profil</Text>
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../../assets/images/default-profile.png")
            }
            style={styles.profileImage}
          />
          <View style={styles.imageButtonsContainer}>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Text style={styles.imageButtonText}>Choisir une photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
              <Text style={styles.imageButtonText}>Prendre une photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Prénom</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={[styles.inputContainer, { marginLeft: 10 }]}>
            <Text style={styles.label}>Nom</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.inputContainer, { flex: 0.4 }]}>
            <Text style={styles.label}>Indicatif</Text>
            <RNPickerSelect
              onValueChange={(value) => setCountryCode(value)}
              items={countryCodes}
              value={countryCode}
              placeholder={{ label: "Choisir un indicatif", value: null }}
              style={pickerStyles}
            />
          </View>
          <View style={[styles.inputContainer, { flex: 0.6, marginLeft: 10 }]}>
            <Text style={styles.label}>Numéro de téléphone</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveButtonText}>Sauvegarder</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const pickerStyles = {
  inputIOS: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    color: "black",
  },
  inputAndroid: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    color: "black",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  scrollContainer: {
    marginTop: 50,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
    marginBottom: 20,
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
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  imageButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: "#5067C5",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  imageButtonText: {
    color: "white",
    fontSize: 14,
  },
  rowContainer: {
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
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
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  saveButton: {
    backgroundColor: "#5067C5",
    borderRadius: 25,
    padding: 20,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileEditPage;
