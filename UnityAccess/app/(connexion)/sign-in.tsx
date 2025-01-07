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
import { useRouter } from "expo-router";
import { useAuth } from "@/components/AuthContext";
import { API_URL } from "@/constants/ApiUrl";

export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    try {
      setLoading(true);
      console.log("API_URL", API_URL + "/auth/login");
      console.log("email", JSON.stringify({ email, password }));
      // Appel API
      const response = await fetch(API_URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("data", response);

      if (response.status !== 201) {
        console.log("error", response);
        throw new Error("Identifiants incorrects.");
      }

      const userData = {
        uid: data.uid, // Par exemple : "12345"
        email: data.email, // Par exemple : "user@example.com"
        token: data.token, // Jeton renvoyé par l'API
      };
      await login(userData);

      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Erreur", error.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Se connecter avec une adresse e-mail</Text>

        <Text style={styles.textContent}>E-mail</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#6B7280"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.textContent}>Mot de passe</Text>

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          autoCapitalize="none"
          placeholderTextColor="#6B7280"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.signInButton, loading && { opacity: 0.7 }]}
        onPress={handleSignIn}
        disabled={loading}
      >
        <Text style={styles.signInButtonText}>
          {loading ? "Connexion..." : "Se connecter →"}
        </Text>
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
  textContent: {
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
    marginBottom: 12,
    fontSize: 16,
    width: "100%",
  },
  forgotPasswordButton: {
    marginTop: 16,
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#3D4D7A",
    width: "100%",
    borderRadius: 25,
  },
  forgotPasswordText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  signInButton: {
    backgroundColor: "#5a67d8",
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 40,
    width: "100%",
  },
  signInButtonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
});
