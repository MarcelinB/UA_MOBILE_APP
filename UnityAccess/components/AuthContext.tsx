import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  uid: string;
  email: string;
  token: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean; // l'authentification est en cours
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Par défaut, en cours de chargement

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    checkAuth();
  }, []);

  const login = async (userData: User) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Erreur lors du stockage des données utilisateur :", error);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error(
        "Erreur lors de la suppression des données utilisateur :",
        error
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
