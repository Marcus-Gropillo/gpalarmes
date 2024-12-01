import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const services = [
  {
    id: 1,
    description: 'Mão de obra para instalação de ponto (por ponto)',
    basePrice: 70.00,
  },
  {
    id: 2,
    description: 'Mão de obra para cabeamento e instalação de ponto (por ponto)',
    basePrice: 140.00,
  },
  {
    id: 3,
    description: 'Mão de obra para infraestrutura, cabeamento e instalação (por ponto)',
    basePrice: 232.00,
  },
  {
    id: 4,
    description: 'Mão de obra para cabeamento e instalação fornecendo cabeamento (por ponto)',
    basePrice: 189.00,
  },
  {
    id: 5,
    description: 'Mão de obra para infraestrutura, cabeamento e instalação, fornecendo infraestrutura e cabeamento (por ponto)',
    basePrice: 340.00,
  },
  {
    id: 6,
    description: 'Start-up sistema',
    basePrice: 1412.00,
  },
  {
    id: 7,
    description: 'Correção sistema',
    basePrice: 1412.00,
  },
  {
    id: 8,
    description: 'Visita técnica (cortesia)',
    basePrice: 0.00,
  },
  {
    id: 9,
    description: 'Visita técnica',
    basePrice: 353.00,
  },
];

const ServicesManagement = () => {
  const [selectedServices, setSelectedServices] = useState<{ id: number; quantity: number }[]>([]);
  const [total, setTotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0.06);
  const [marginRate, setMarginRate] = useState(0.30); 
  const [budgetId, setBudgetId] = useState(1); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateTotal = () => {
    let subtotal = 0;

    selectedServices.forEach(service => {
      const serviceData = services.find(s => s.id === service.id);
      if (serviceData) {
        subtotal += serviceData.basePrice * service.quantity;
      }
    });

    const tax = subtotal * taxRate;
    const margin = subtotal * marginRate;
    const finalTotal = subtotal + tax + margin;

    setTotal(finalTotal);
  };

  const handleServiceQuantityChange = (serviceId: number, quantity: string) => {
    const quantityNumber = parseInt(quantity) || 0;
    setSelectedServices(prev => {
      const existingService = prev.find(s => s.id === serviceId);
      if (existingService) {
        const updatedServices = prev.map(s => s.id === serviceId ? { ...s, quantity: quantityNumber } : s);
        calculateTotal(); // Atualiza o total após a modificação
        return updatedServices;
      } else {
        const newService = { id: serviceId, quantity: quantityNumber };
        const updatedServices = [...prev, newService];
        calculateTotal(); // Atualiza o total após a adição
        return updatedServices;
      }
    });
  };

  const handleBudgetCreation = async () => {
    if (selectedServices.length === 0) {
      Alert.alert('Erro', 'Por favor, selecione pelo menos um serviço.');
      return;
    }

    if (taxRate < 0 || taxRate > 1) {
      Alert.alert('Erro', 'A taxa de imposto deve estar entre 0 e 1.');
      return;
    }

    if (marginRate < 0 || marginRate > 1) {
      Alert.alert('Erro', 'A margem deve estar entre 0 e 1.');
      return;
    }

    setIsSubmitting(true); 

    try {
      const response = await axios.post('http://192.168.1.13:3000/api/budgets', {
        id: budgetId, 
        total,
        services: selectedServices,
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Orçamento criado com sucesso!');
        
        // Salvar o orçamento no Async Storage
        const budgetData = {
          id: budgetId,
          total,
          services: selectedServices };

        await AsyncStorage.setItem(`budget_${budgetId}`, JSON.stringify(budgetData));

        // Verificar se o orçamento foi salvo corretamente
        const savedBudget = await AsyncStorage.getItem(`budget_${budgetId}`);
        if (savedBudget) {
          console.log('Orçamento salvo com sucesso:', JSON.parse(savedBudget));
        } else {
          console.error('Falha ao salvar o orçamento.');
        }

        setSelectedServices([]);
        setTotal(0);
      } else {
        Alert.alert('Erro', 'Falha ao criar orçamento. Tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao criar o orçamento. Verifique sua conexão e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [selectedServices, taxRate, marginRate]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Serviços</Text>
      {services.map(service => (
        <View key={service.id} style={styles.serviceContainer}>
          <Text>{service.description} - R$ {service.basePrice.toFixed(2)}</Text>
          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            keyboardType="numeric"
            onChangeText={quantity => handleServiceQuantityChange(service.id, quantity)}
          />
        </View>
      ))}
      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
      <Button title="Criar Orçamento" onPress={handleBudgetCreation} disabled={isSubmitting} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  serviceContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default ServicesManagement;