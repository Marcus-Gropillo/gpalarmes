import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CompanyData } from '../types';

const CompanyList = () => {
  const [companies, setCompanies] = useState<CompanyData[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const existingData = await AsyncStorage.getItem('@company_data');
        const allCompanyData: CompanyData[] = existingData ? JSON.parse(existingData) : [];
        setCompanies(allCompanyData);
      } catch (error) {
        console.error('Erro ao recuperar dados da empresa:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const renderItem = ({ item }: { item: CompanyData }) => (
    <View style={styles.companyItem}>
      <Text style={styles.companyName}>{item.companyName}</Text>
      <Text>{item.responsibleName}</Text>
      <Text>{item.phone}</Text>
      <Text>{item.email}</Text>
      <Text>{item.cnpj}</Text>
    </View>
  );

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <FlatList
      data={companies}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  companyItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
  companyName: {
    fontWeight: 'bold',
  },
});

export default CompanyList;