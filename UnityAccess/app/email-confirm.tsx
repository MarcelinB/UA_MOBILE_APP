import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function EmailConfirmation() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]); // État pour les 4 chiffres
  const inputRefs = useRef<any>([]); // Références pour chaque champ

  const handleInputChange = (text: string, index: number) => {
    // Mettre à jour la valeur dans le tableau
    const newCode = [...code];
    newCode[index] = text.slice(-1); // Garde uniquement le dernier caractère
    setCode(newCode);

    // Passer automatiquement au champ suivant si un chiffre est saisi
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Si le champ est vide, revenir au champ précédent
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = () => {
    if (code.join("").length === 4) {
      Alert.alert("Succès", "Votre code a été validé !");
      router.replace("/(tabs)"); // Naviguer vers la page principale après succès
      console.log("Code de confirmation :", code.join(""));
    } else {
      Alert.alert("Erreur", "Veuillez entrer un code de 4 chiffres.");
    }
  };

  const handleResendCode = () => {
    Alert.alert(
      "Code renvoyé",
      "Un nouveau code a été envoyé à votre adresse e-mail."
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmation adresse mail</Text>
      <Text style={styles.subtitle}>
        Confirmez votre compte en entrant le code de 4 chiffres que nous vous
        envoyons sur votre adresse mail ab****@gmail.com
      </Text>

      <View style={styles.codeInputContainer}>
        {code.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)} // Associer chaque champ à une référence
            style={styles.codeInput}
            keyboardType="numeric"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleInputChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && !value && index > 0) {
                inputRefs.current[index - 1]?.focus(); // Retour au champ précédent
              }
            }}
          />
        ))}
      </View>

      <TouchableOpacity onPress={handleResendCode}>
        <Text style={styles.resendText}>Renvoyer le code</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirmer →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E3A59",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  codeInput: {
    width: 50,
    height: 50,
    marginHorizontal: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  resendText: {
    fontSize: 14,
    color: "#4F46E5",
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
