import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { CompanyData } from '../types';

interface CompanyFormProps {
  onRegister: (company: CompanyData) => void;
  onCancel: () => void;
  initialData?: CompanyData | null; 
}

const CompanyForm: React.FC<CompanyFormProps> = ({ onRegister, onCancel, initialData }) => {
  const [companyName, setCompanyName] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');

  useEffect(() => {
    if (initialData) {
      setCompanyName(initialData.companyName);
      setResponsibleName(initialData.responsibleName);
      setAddress(initialData.address || '');
      setPhone(initialData.phone);
      setEmail(initialData.email);
      setCnpj(initialData.cnpj);
    }
  }, [initialData]);

  const handleSubmit = () => {
    const companyData: CompanyData = { 
      id: Date.now(), 
      companyName, 
      responsibleName, 
      address, 
      phone, 
      email, 
      cnpj 
    };
    onRegister(companyData); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <Text>Endereço:</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <Text>Telefone:</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />
      <Text>Email:</Text>
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
        <Button title="Salvar" onPress={handleSubmit} />
        <Button title="Cancelar" onPress={onCancel} color="red" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default CompanyForm;