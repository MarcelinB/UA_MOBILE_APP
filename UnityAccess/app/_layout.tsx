import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { AuthProvider, useAuth } from "@/components/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AuthHandler>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(connexion)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </AuthHandler>
      </ThemeProvider>
    </AuthProvider>
  );
}

// Gère la redirection d'authentification
function AuthHandler({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      console.log("isAuthenticated", isAuthenticated);
      if (!isAuthenticated) {
        router.replace("/(connexion)/log-page");
      }
    }
  }, [isAuthenticated, loading]);

  // Tant que l'authentification est en cours, ne rien rendre
  if (loading) {
    return null; // Ou afficher un écran de chargement
  }

  return <>{children}</>;
}
