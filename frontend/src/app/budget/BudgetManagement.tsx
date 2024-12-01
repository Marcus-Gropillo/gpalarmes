import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BudgetManagement = () => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const handleCreateBudget = async () => {
    if (!description || !value) {
      Alert.alert('Erro', 'Descrição e valor são obrigatórios.');
      return;
    }

    const budgetData = {
      description,
      value: parseFloat(value),
    };

    try {
      const existingBudgets = await AsyncStorage.getItem('@budgets_data');
      const allBudgets = existingBudgets ? JSON.parse(existingBudgets) : [];
      allBudgets.push(budgetData);
      await AsyncStorage.setItem('@budgets_data', JSON.stringify(allBudgets));
      Alert.alert('Sucesso', 'Orçamento criado com sucesso!');

      setDescription('');
      setValue('');
    } catch (error) {
      console.error('Erro ao armazenar orçamento:', error);
      Alert.alert('Erro', 'Erro ao armazenar orçamento.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Descrição do Orçamento:</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Text>Valor do Orçamento:</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={styles.input}
        keyboardType="numeric"
        placeholder="R$ 0,00"
      />
      <Button title="Criar Orçamento" onPress={handleCreateBudget} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default BudgetManagement;