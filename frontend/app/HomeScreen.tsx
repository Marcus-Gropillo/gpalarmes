import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import BudgetManager from "./components/BudgetManager";
import UserManagement from "./components/UserManagement"; // Importando o UserManagement
import { Budget } from "./types";

const HomeScreen = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://192.168.1.13:3000/api/budgets")
      .then((response) => {
        setBudgets(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar orçamentos:", error);
        setError("Erro ao buscar orçamentos");
      });
  }, []);

  const handleConsultBudgets = async () => {
    return budgets; 
  };

  return (
    <View style={styles.container}>
      {error && <Text>{error}</Text>}
      <BudgetManager handleConsultBudgets={handleConsultBudgets} />
      <UserManagement /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
});

export default HomeScreen;