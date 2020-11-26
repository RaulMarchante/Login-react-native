import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, ToastAndroid, ActivityIndicator, Linking } from 'react-native';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { useForm } from "react-hook-form";

/** ***************************************Login*********************************************** */
function Login({ navigation }) {
  const [usernamel, setUsername] = useState('');
  const [passwordl, setPassword] = useState('');

  const pressAndroid = () => {
    ToastAndroid.show("Bienvenido, " + usernamel, ToastAndroid.SHORT);
  }

  const pressWeb = () => {
    console.log(usernamel);
    alert("Name: " + usernamel + " ,Password: " + passwordl);
  }

  return (
    <View style={styles.container}>
      <Image style={{ width: 222, height: 113 }} source={require('../img/simed.png')} />
      <Text>Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder='ej.Luis'
        onChangeText={(val) => setUsername(val)}></TextInput>
      <Text>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder='ej.123'
        onChangeText={(val) => setPassword(val)}></TextInput>
      <Button onPress={() => pressWeb()} title="Iniciar "></Button>
      <Button onPress={() => navigation.navigate('RegisterVal')} title="Registrar"></Button>
    </View>
  );
}


/**
<Text>Hello there {usernamel} ,Password: {passwordl}</Text>
********************************************Register***************************************** */

function RegisterVal({ navigation }) {
  const arrayData = [];
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [tel, setTel] = useState('');

  const { register, handleSubmit } = useForm(); // inicializar el hook
  const onSubmit = (data) => {
    console.log(data);
    arrayData.push(data);

    try {
      localStorage.getItem('database').then((value) => {
        if (value !== null) {
          const d = JSON.parse(value);
          d.push(data)
          localStorage.setItem('database', JSON.stringify(d))
        } else {
          localStorage.setItem('database', JSON.stringify(arrayData))
        }
      })
    } catch (error) {

    }

    console.log(arrayData);
  };

  return (
    <View style={styles.container}>
      <Image style={{ width: 222, height: 113 }} source={require('../img/simed.png')} />
      <Text>Nombre</Text>
      <TextInput
        name="name"
        style={styles.input}
        placeholder='Juan'
        maxLength={10}
        value={name}
        onChangeText={(val) => setName(val)}></TextInput>
      <Text>Apellidos</Text>
      <TextInput
        name="lastname"
        style={styles.input}
        placeholder='Lopez'
        maxLength={25}
        value={lastname}
        onChangeText={(val) => setLastname(val)}></TextInput>
      <Text>Usuario</Text>
      <TextInput
        name="username"
        style={styles.input}
        placeholder='ej.Juan'
        maxLength={16}
        value={username}
        onChangeText={(val) => setUsername(val)}></TextInput>
      <Text>Contraseña</Text>
      <TextInput
        name="password"
        style={styles.input}
        placeholder='ej.123'
        maxLength={16}
        value={password}
        onChangeText={(val) => setPassword(val)}></TextInput>
      <Text>Correo</Text>
      <TextInput
        name="email"
        style={styles.input}
        placeholder='juan@simed.es'
        maxLength={30}
        value={email}
        onChangeText={(val) => setEmail(val)}></TextInput>
      <Text>DNI</Text>
      <TextInput
        name="dni"
        style={styles.input}
        placeholder='12345678A'
        maxLength={9}
        value={dni}
        onChangeText={(val) => setDni(val)}></TextInput>
      <Text>Telefono</Text>
      <TextInput
        name="tel"
        style={styles.input}
        placeholder='632249824'
        keyboardType="numeric"
        maxLength={9}
        value={tel}
        onChangeText={(val) => setTel(val)}></TextInput>

      <Button onPress={() => onSubmit()} title="Registrar"></Button>
      <Button onPress={() => navigation.navigate('List')} title="Lista"></Button>
    </View>

  );
}

/** *****************************************FlatList******************************************** */
/** 
https://gateway.marvel.com/v1/public/characters?apikey=4e892c080bf2a6e7af14172a184981e0&ts=9&hash=0ef2af7eadd56ff1591a935c0311f402

public key marvel: 2087b99cd310bab4afac855bd6ad79ba
private key marvel: 513b75a817a43a195e1cb707a0c099bfd9ed42cc

*/
function List ({ navigation }){
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://gateway.marvel.com/v1/public/characters?apikey=4e892c080bf2a6e7af14172a184981e0&ts=9&hash=0ef2af7eadd56ff1591a935c0311f402')
      .then((response) => response.json())
      .then((json) => setData(json.data.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          numColumns={5}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={styles.item}>
            <Image style={{ width: 220, height: 220 }} source={{uri: item.thumbnail.path+'.jpg'}}></Image>
            <Text >Nombre: {item.name}</Text>
            <Text>Comics disponibles: {item.comics.available}</Text>
            <Button onPress={() => navigation.navigate('Details', {name: item.name ,
              available: item.comics.available,img: item.thumbnail.path, urls: item.urls})} title='Detalles'></Button>
            </View>
          )}
        />
      )}
      <Button onPress={() => console.log(data)} title="Array"></Button>
    </View>
  );
     

};


/** ********************************************Detalles******************************************** */
function Details({ route }) {
  const { name, available, img, urls } = route.params;
  const det = urls[0].url;
  const wiki = urls[1].url;
  const colink = urls[2].url;
  return (
    <View style={styles.container}>
      <Text>Detalles del Personaje</Text>
      <Text>Nombre: {JSON.stringify(name)}</Text>
      <Text>Numero de comics: {JSON.stringify(available)}</Text>
      <Image style={{ width: 400, height: 400 }} source={{uri: img +'.jpg'}}></Image>
      <Text style={{color: 'blue'}}onPress={() => Linking.openURL(det)}>Detalles</Text>
      <Text style={{color: 'blue'}}onPress={() => Linking.openURL(wiki)}>Wiki</Text>
      <Text style={{color: 'blue'}}onPress={() => Linking.openURL(colink)}>Comiclink</Text>
    </View>
  )
}
/** ********************************************Pantalla******************************************** */
const Stack = createStackNavigator();

function Simed() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RegisterVal" component={RegisterVal} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>

  )
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
  },
  item: {
    backgroundColor: '#BFBCBB',
    width: 240,
    height: 310,
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  }
});

export default Simed