import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Continuer avec une adresse e-mail</Text>

        <View style={styles.textRow}>
          <Text style={[styles.textContent, { flex: 1 }]}>Prénom</Text>
          <Text style={[styles.textContent, { flex: 1 }]}>Nom</Text>
        </View>
        <View style={[styles.inputRow, { marginBottom: 1 }]}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="Prénom"
            value={firstName}
            onChangeText={setFirstName}
            placeholderTextColor="#6B7280"
            onSubmitEditing={() => ref_input2.current?.focus()}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Nom"
            value={lastName}
            onChangeText={setLastName}
            placeholderTextColor="#6B7280"
            onSubmitEditing={() => ref_input3.current?.focus()}
            ref={ref_input2}
          />
        </View>

        <Text style={styles.textContent}>E-mail</Text>
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
        <Text style={[styles.textContent, { marginBottom: 3 }]}>
          Mot de passe
        </Text>
        <Text style={styles.passwordHint}>Minimum 8 caractères</Text>
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
        <Text style={styles.textContent}>Confirmation de mot de passe</Text>

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

        <TouchableOpacity onPress={() => router.push("/sign-in")}>
          <Text style={styles.link}>Déjà utilisateur ?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Suivant →</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    justifyContent: "space-between",
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 32,
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
  textRow: {
    flexDirection: "row",
    marginBottom: 1,
  },
  passwordHint: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 5,
  },
  link: {
    color: "#6366F1",
    textAlign: "center",
    marginVertical: 12,
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: "#5a67d8",
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 40,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  textContent: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2E3A59",
    marginBottom: 8,
  },
});
