import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function LogPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>C'est parti !</Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => {
          router.push("/sign-up");
        }}
      >
        <Text style={styles.primaryButtonText}>Commencez !</Text>
      </TouchableOpacity>

      <View style={styles.separator}>
        <Text style={styles.separatorText}>OU</Text>
      </View>

      <TouchableOpacity style={styles.socialButtonFacebook}>
        <FontAwesome name="facebook" size={24} color="white" />
        <Text style={styles.socialButtonText}>Continuez avec Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButtonGoogle}>
        <FontAwesome name="google" size={24} />
        <Text style={styles.socialButtonTextGoogle}>Continuez avec Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButtonApple}>
        <FontAwesome name="apple" size={24} color="white" />
        <Text style={styles.socialButtonText}>Continuez avec Apple</Text>
      </TouchableOpacity>

      <Text style={styles.policyText}>
        Conditions d'utilisation et Politique de confidentialité
      </Text>

      <TouchableOpacity>
        <Text
          style={styles.footerText}
          onPress={() => {
            router.push("/(tabs)");
          }}
        >
          S'inscrire après
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f7fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3b3b3b",
  },
  primaryButton: {
    backgroundColor: "#5a67d8",
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 20,
    width: "100%",
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  separatorText: {
    color: "#3b3b3b",
    marginHorizontal: 10,
  },
  socialButtonFacebook: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1877f2",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
    width: "100%",
  },
  socialButtonGoogle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
    width: "100%",
  },
  socialButtonApple: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
    width: "100%",
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  socialButtonTextGoogle: {
    marginLeft: 10,
    fontSize: 16,
    color: "Black",
    textAlign: "center",
  },
  policyText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  footerText: {
    color: "#3b3b3b",
    fontWeight: "bold",
    fontSize: 14,
  },
});
