import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const OpenBudget = () => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false); 
  const router = useRouter();

  const handleCreateBudget = async () => {
    if (!description || !value) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      await axios.post('http://192.168.1.13:3000/api/budgets', {
        description,
        value: parseFloat(value),
      });

      Alert.alert('Sucesso', 'Orçamento criado com sucesso!');
      setDescription('');
      setValue('');
      setIsFormVisible(false); 
    } catch (error) {
      console.error('Erro ao criar orçamento:', error);
      Alert.alert('Erro', 'Não foi possível criar o orçamento.');
    }
  };

  const handleCancel = () => {
    setDescription('');
    setValue('');
    setIsFormVisible(false);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Button title={isFormVisible ? "Fechar Formulário" : "Criar Orçamento"} onPress={() => setIsFormVisible(!isFormVisible)} />
      {isFormVisible && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Criar Orçamento</Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor"
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
          />
          <View style={styles.buttonContainer}>
            <Button title="Criar Orçamento" onPress={handleCreateBudget} />
            <Button title="Cancelar" onPress={handleCancel} color="red" />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default OpenBudget;