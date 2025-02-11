// // app/_layout.tsx
// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";
// import axios from "axios";
// import BudgetManager from "./budget/BudgetManager";
// import UserManagement from "./company/CompanyManagement"; // Importando o UserManagement
// import { Budget } from "./types";
// import ServicesManagement from "./budget/ServicesManagement";

// const RootLayout = () => {
//   const [budgets, setBudgets] = useState<Budget[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchBudgets = async () => {
//       try {
//         const response = await axios.get("http://192.168.1.13:3000/api/budgets");
//         setBudgets(response.data);
//       } catch (error) {
//         console.error("", error);
//         setError("");
//       }
//     };

//     fetchBudgets();
//   }, []);

//   const handleConsultBudgets = async () => {
//     return budgets; 
//   };

//   return (
//     <View style={styles.container}>
//       {error && <Text style={styles.errorText}>{error}</Text>}
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <BudgetManager handleConsultBudgets={handleConsultBudgets} />
//         <ServicesManagement />
//         <UserManagement /> 
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f9f9f9',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'flex-start', 
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
// });

// export default RootLayout;