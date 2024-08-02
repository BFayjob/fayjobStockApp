import axios from 'axios';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignIn = () => {
  const [name, setName] = useState('boluwatife');
  const [password, setPassword] = useState('qwerty1234');

  const handleSubmit = async () => {
    if (name === '' || password === '') {
      alert('all Fields are required');
      return;
    }
    await axios.post('http://localhost:8001/api/signin', { name, password });
    alert('sign in successfull');
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={{ marginVertical: 100 }}>
        <Text style={styles.signintext}>SignIn</Text>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: 'gray' }}>Username</Text>
          <TextInput
            style={styles.signinInput}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: 'gray' }}>Password</Text>
          <TextInput
            style={styles.signinInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            autoCapitalize="password"
          />
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
          <Text style={styles.buttonText}> Sign In</Text>
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 24 }}>{JSON.stringify({ name, password })}</Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContents: 'center',
  },
  signintext: {
    fontSize: 30,
    textAlign: 'center',
  },
  signinInput: {
    borderBottomWidth: 0.5,
    height: 48,
    borderBottomColor: 'Gray',
    marginBottom: 30,
  },
  buttonStyle: {
    backgroundColor: 'darkmagenta',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
