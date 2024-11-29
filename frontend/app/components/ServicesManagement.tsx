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
        return prev.map(s => s.id === serviceId ? { ...s, quantity: quantityNumber } : s);
      } else {
        return [...prev, { id: serviceId, quantity: quantityNumber }];
      }
    });
    calculateTotal();
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
          Alert.alert('Sucesso', 'Orçamento criado com sucesso!');

          await AsyncStorage.setItem('@budget_id', String(budgetId + 1));
    
          setBudgetId(prevId => prevId + 1);

          setSelectedServices([]);
          setTotal(0);
        } catch (error) {
          console.error('Erro ao criar orçamento:', error);
          Alert.alert('Erro', 'Não foi possível criar o orçamento.');
        } finally {
          setIsSubmitting(false);
        }
      };
    
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Gerenciamento de Serviços</Text>
          
          {services.map(service => (
            <View key={service.id} style={styles.serviceItem}>
              <Text>{service.description}</Text>
              <Text>R$ {service.basePrice.toFixed(2)}</Text>
              <TextInput
                placeholder="Quantidade"
                keyboardType="numeric"
                onChangeText={(text) => handleServiceQuantityChange(service.id, text)}
              />
            </View>
          ))}
    
          <View style={styles.marginContainer}>
            <Text>Taxa de Imposto (%):</Text>
            <TextInput
              keyboardType="numeric"
              value={String(taxRate * 100)}
              onChangeText={(text) => setTaxRate(parseFloat(text) / 100)}
            />
          </View>
    
          <View style={styles.marginContainer}>
            <Text>Margem (%):</Text>
            <TextInput
              keyboardType="numeric"
              value={String(marginRate * 100)}
              onChangeText={(text) => setMarginRate(parseFloat(text) / 100)}
            />
          </View>
    
          <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
    
          <Button title="Criar Orçamento" onPress={handleBudgetCreation} disabled={isSubmitting} />
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      serviceItem: {
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
      },
      marginContainer: {
        marginVertical: 10,
      },
      total: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
      },
    });
    
    export default ServicesManagement;