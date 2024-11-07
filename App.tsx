import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [storedValue, setStoredValue] = useState('');

  const saveValue = async () => {
    try {
      await AsyncStorage.setItem('@storage_Key', inputValue);
      Alert.alert('Value saved');
      setInputValue('');
    } catch (e) {
      Alert.alert('Error saving value');
    }
  };

  const getValue = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        setStoredValue(value);
      }
    } catch (e) {
      Alert.alert('Error restoring value');
    }
  };

  useEffect(() => {
    getValue();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Put Value:</Text>
      <TextInput
        placeholder="Put here the value"
        value={inputValue}
        onChangeText={setInputValue}
        style={{
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          padding: 8,
        }}
      />
      <Button title="Save value" onPress={saveValue} />

      <Text style={{ marginVertical: 20 }}>Saved value: {storedValue}</Text>
      <Button title="Load saved value" onPress={getValue} />
    </View>
  );
};

export default App;
