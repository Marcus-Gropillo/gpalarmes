import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompanyManagement = () => {
  const [isRegistrationVisible, setRegistrationVisible] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [inputValue, setInputValue] = useState('');
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
    setRegistrationVisible(false);
  };

  const handleStoreData = async () => {
    try {
      const jsonValue = JSON.stringify(inputValue);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
      Alert.alert('Sucesso', 'Dados armazenados com sucesso!');
      setInputValue('');
    } catch (e) {
      console.error('Erro ao armazenar dados:', e);
      Alert.alert('Erro', 'Erro ao armazenar dados.');
    }
  };

  const handleGetData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      setStoredValue(value);
    } catch (e) {
      console.error('Erro ao recuperar dados:', e);
      Alert.alert('Erro', 'Erro ao recuperar dados.');
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key');
      Alert.alert('Sucesso', 'Dados removidos com sucesso!');
      setStoredValue(null);
    } catch (e) {
      console.error('Erro ao remover dados:', e);
      Alert.alert('Erro', 'Erro ao remover dados.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Cadastrar Empresa" onPress={() => setRegistrationVisible(true)} />

      {isRegistrationVisible && (
        <View style={styles.registrationForm}>
          <Text>Nome da Empresa:</Text>
          <TextInput
            value={companyName}
            onChangeText={setCompanyName}
            style={styles.input}
          />
          <Text>Nome do Responsável:</Text>
          <TextInput
            value={responsibleName}
            onChangeText={setResponsibleName}
            style={styles.input}
          />
          <Text>Telefone:</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />
          <Text>E-mail:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <Text>CNPJ:</Text>
          <TextInput
            value={cnpj}
            onChangeText={setCnpj}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
          <Button title="Salvar" onPress={handleRegisterCompany} />
          <Button title="Cancelar" onPress={() => setRegistrationVisible(false)} color="red" />
          </View>
        </View>
      )}

      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Digite algo para armazenar"
      />
      <Button title="Armazenar Dados" onPress={handleStoreData} />
      <Button title="Recuperar Dados" onPress={handleGetData} />
      <Button title="Remover Dados" onPress={removeData} />
      {storedValue && <Text style={styles.result}>Valor armazenado: {storedValue}</Text>}
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
  registrationForm: {
    marginTop: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CompanyManagement;