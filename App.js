import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, ToastAndroid } from 'react-native';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const pressAndroid = () => {
    ToastAndroid.show("Hola ", ToastAndroid.SHORT);
  }

  const pressWeb = () =>{
        alert("Name: " + username + " ,Password: " + password);
  }

  return (
    <View style={styles.container}>
      <Image style={{width: 222, height: 113}} source={require('./img/simed.png')}/>
      <Text>Usuario</Text>
      <TextInput
      style={styles.input}
      placeholder='ej.Luis'
      onChangeText={(val)=>setUsername(val)}></TextInput>
      <Text>Contraseña</Text>
      <TextInput
      style={styles.input}
      placeholder='ej.123'
      onChangeText={(val)=>setPassword(val)}></TextInput>
      <Button onPressasd={()=>pressAndroid()} title="Registrar"></Button>
      <Text>Hello there {username} ,Password: {password}</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    width: 100,
  }
});
