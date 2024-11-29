const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value); 
      await AsyncStorage.setItem('@storage_Key', jsonValue); 
    } catch (e) {
      console.error('Erro ao armazenar dados:', e);
    }
  };
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key'); 
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Erro ao recuperar dados:', e);
    }
  };
  

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key');
    } catch (e) {
      console.error('Erro ao remover dados:', e);
    }
  };a