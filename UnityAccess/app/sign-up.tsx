import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function SignUp() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const ref_input2 = useRef<any>(null);
  const ref_input3 = useRef<any>(null);
  const ref_input4 = useRef<any>(null);
  const ref_input5 = useRef<any>(null);

  // const handleSignUp = () => {
  //   // Vérification de base
  //   if (!firstName || !lastName || !email || !password || !confirmPassword) {
  //     Alert.alert("Erreur", "Tous les champs doivent être remplis.");
  //     return;
  //   }

  //   if (password.length < 8) {
  //     Alert.alert(
  //       "Erreur",
  //       "Le mot de passe doit contenir au moins 8 caractères."
  //     );
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
  //     return;
  //   }

  //   // Ici, vous pouvez appeler une API pour enregistrer l'utilisateur
  //   console.log("Utilisateur inscrit :", {
  //     firstName,
  //     lastName,
  //     email,
  //     password,
  //   });

  //   // Exemple : navigation après l'inscription réussie
  //   Alert.alert("Succès", "Votre compte a été créé.");
  //   router.replace("/(tabs)"); // Navigue vers la page principale
  // };
  const handleSignUp = () => {
    router.push("/email-confirm");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Continuer avec une adresse e-mail</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 8 }]}
          placeholder="Prénom"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#6B7280"
          onSubmitEditing={() => ref_input2.current?.focus()}
        />
        <TextInput
          id="lastNameInput"
          style={[styles.input, { flex: 1 }]}
          placeholder="Nom"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#6B7280"
          onSubmitEditing={() => ref_input3.current?.focus()}
          ref={ref_input2}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#6B7280"
        onSubmitEditing={() => ref_input4.current?.focus()}
        ref={ref_input3}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#6B7280"
        onSubmitEditing={() => ref_input5.current?.focus()}
        ref={ref_input4}
      />
      <Text style={styles.passwordHint}>Minimum 8 caractères</Text>

      <TextInput
        style={styles.input}
        placeholder="Confirmation mot de passe"
        secureTextEntry
        autoCapitalize="none"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#6B7280"
        ref={ref_input5}
      />

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Déjà utilisateur ?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Suivant →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
    color: "#2E3A59",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  passwordHint: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 12,
  },
  link: {
    color: "#6366F1",
    textAlign: "center",
    marginVertical: 12,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
