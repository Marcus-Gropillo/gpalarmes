import React from "react";
import UserManagement from './components/UserManagement';
import CompanyList from './components/CompanyList';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="User Management">
        <Stack.Screen name="User Management" component={UserManagement} />
        <Stack.Screen name='CompanyList' component={CompanyList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
