import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

interface OpenBudgetProps {
  onBudgetCreated: () => void; 
}

const OpenBudget: React.FC<OpenBudgetProps> = ({ onBudgetCreated }) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const handleCreateBudget = async () => {
    if (!description || !value) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.13:3000/api/budgets', {
        description,
        value: parseFloat(value), 
      });

      Alert.alert('Sucesso', 'Orçamento criado com sucesso!');
      onBudgetCreated(); 
      setDescription('');
      setValue('');
    } catch (error) {
      console.error('Erro ao criar orçamento:', error);
      Alert.alert('Erro', 'Não foi possível criar o orçamento.');
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
});

export default OpenBudget;