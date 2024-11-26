import React, { useState } from "react";
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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    // Vérification de base
    if (!email) {
      Alert.alert("Erreur", "Veuillez entrer une adresse e-mail.");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Erreur", "Veuillez entrer une adresse e-mail valide.");
      return;
    }

    // Simuler l'envoi du lien de réinitialisation
    Alert.alert(
      "Lien envoyé",
      "Un lien de réinitialisation du mot de passe a été envoyé à " + email
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Mot de passe oublié</Text>
        <Text style={styles.subtitle}>
          Entrez votre adresse mail, et nous vous enverrons un lien pour
          réinitialiser votre mot de passe.
        </Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="email@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#6B7280"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleResetPassword}
      >
        <Text style={styles.buttonText}>Réinitialiser le mot de passe</Text>
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
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 32,
    color: "#2E3A59",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2E3A59",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    width: "100%",
    marginBottom: 20,
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
});
