import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Icon } from "react-native-elements/dist/icons/Icon";

export default function EmailConfirmationSuccess() {
  const router = useRouter();

  const handleContinue = () => {
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <View>
          <Image
            resizeMode="contain"
            style={{ height: 250, width: 250 }}
            source={require("../../assets/images/taddaaa_image.png")}
          />
        </View>

        <Text style={styles.title}>
          Votre adresse mail a été vérifiée avec succès !
        </Text>
        <Text style={styles.subtitle}>
          Félicitations, votre adresse mail a été vérifiée. Vous pouvez
          commencer à utiliser l'application.
        </Text>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continuer →</Text>
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
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 16,
    color: "#2E3A59",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  continueButton: {
    backgroundColor: "#5a67d8",
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 40,
    width: "100%",
  },
  continueButtonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
});
