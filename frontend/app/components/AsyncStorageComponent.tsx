import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageComponent = () => {
  const [companyName, setCompanyName] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [storedValue, setStoredValue] = useState<string | null>(null);

  const handleRegisterCompany = async () => {
    const companyData = {
      companyName,
      responsibleName,
      phone,
      email,
      cnpj,
    };

    try {
      const existingData = await AsyncStorage.getItem('@company_data');
      const allCompanyData = existingData ? JSON.parse(existingData) : [];

      allCompanyData.push(companyData);
      await AsyncStorage.setItem('@company_data', JSON.stringify(allCompanyData));
      Alert.alert('Sucesso', 'Dados da empresa armazenados com sucesso!');
    } catch (error) {
      console.error('Erro ao armazenar dados da empresa:', error);
      Alert.alert('Erro', 'Erro ao armazenar dados da empresa.');
    }

    setCompanyName('');
    setResponsibleName('');
    setPhone('');
    setEmail('');
    setCnpj('');
  };

  const handleGetData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@company_data');
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      setStoredValue(value);
    } catch (e) {
      console.error('Erro ao recuperar dados:', e);
      Alert.alert('Erro', 'Erro ao recuperar dados.');
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('@company_data');
      Alert.alert('Sucesso', 'Dados removidos com sucesso!');
      setStoredValue(null);
    } catch (e) {
      console.error('Erro ao remover dados:', e);
      Alert.alert('Erro', 'Erro ao remover dados.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome da Empresa"
        value={companyName}
        onChangeText={setCompanyName}
        style={styles.input}
      />
      <TextInput
        placeholder="Nome do Responsável"
        value={responsibleName}
        onChangeText={setResponsibleName}
        style={styles.input}
      />
      <TextInput
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="CNPJ"
        value={cnpj}
        onChangeText={setCnpj}
        style={styles.input}
      />
      <Button title="Cadastrar Empresa" onPress={handleRegisterCompany} />
      <Button title="Recuperar Dados" onPress={handleGetData} />
      <Button title="Remover Dados" onPress={removeData} />
      {storedValue && <Text style={styles.result}>Valor armazenado: {JSON.stringify(storedValue)}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AsyncStorageComponent;