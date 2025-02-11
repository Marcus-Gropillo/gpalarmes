// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';


// interface Budget {
//   description: string;
//   value: number; 
// }

// interface BudgetManagerProps {
//   handleConsultBudgets: () => Promise<Budget[]>; 
// }

// const BudgetManager: React.FC<BudgetManagerProps> = ({ handleConsultBudgets }) => {
//   const [budgets, setBudgets] = useState<Budget[]>([]); 

//   const fetchBudgets = async () => {
//     try {
//       const fetchedBudgets = await handleConsultBudgets(); 
//       setBudgets(fetchedBudgets);
//     } catch (error) {
//       console.error('Erro ao consultar orçamentos:', error);
//       Alert.alert('Erro', 'Não foi possível consultar os orçamentos.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Consultar Orçamentos" onPress={fetchBudgets} />
//       <FlatList
//         data={budgets}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.budgetItem}>
//             <Text>Descrição: {item.description || 'Descrição não disponível'}</Text>
//             <Text>Valor: {item.value || 'Valor não disponível'}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   budgetItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
// });

// export default BudgetManager;