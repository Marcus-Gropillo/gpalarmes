import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Budget {
  description: string;
  value: string;
}

interface BudgetManagementProps {
  budgetDescription: string;
  setBudgetDescription: (value: string) => void;
  budgetValue: string;
  setBudgetValue: (value: string) => void;
  handleCreateBudget: () => Promise<void>;
  handleConsultBudgets: () => Promise<void>; 
}

const BudgetManagement: React.FC<BudgetManagementProps> = ({
  budgetDescription,
  setBudgetDescription,
  budgetValue,
  setBudgetValue,
  handleCreateBudget,
  handleConsultBudgets,
}) => {
  
  return (
    <View style={styles.budgetSection}>
      <Text>Descrição do Orçamento:</Text>
      <TextInput
        value={budgetDescription}
        onChangeText={setBudgetDescription}
        style={styles.input}
      />
      <Text>Valor do Orçamento:</Text>
      <TextInput
        value={budgetValue}
        onChangeText={setBudgetValue}
        style={styles.input}
        keyboardType="numeric"
        placeholder="R$ 0,00"
      />
      <View style={styles.buttonContainer}>
        <Button title="Criar Orçamento" onPress={handleCreateBudget} />
        <Button title="Consultar Orçamentos" onPress={handleConsultBudgets} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  budgetSection: {
    marginTop: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default BudgetManagement;