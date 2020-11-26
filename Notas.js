/**
var Crypto = require('crypto-js');
const request_url = "https://gateway.marvel.com/v1/public/characters";
class List extends Component {


  constructor(props){
    super(props)
    this.timestamp=1;
    this.public_key = '2087b99cd310bab4afac855bd6ad79ba';
    this.private_key = '513b75a817a43a195e1cb707a0c099bfd9ed42cc';
    this.state = {
      dataSource: new FlatList.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false
    }
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    var hash = Crypto.MD5(this.timestamp + this.private_key + this.public_key);
    fetch(request_url+'?ts='+this.timestamp+'&apikey='+this.public_key+'&hash='+hash)
    .then((response)=> response.json())
    .then((responseData)=> {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.data.results),
        loaded: true
      })
    })
  }

  renderLoadingView(){
    return(
      <View>
          <Text>Cargando datos...</Text>
      </View>
    )
  }

renderComic(comic){
  return(
    <TouchableHighlight>
      <Image source={{uri: comic.thumbail.path+'.jpg'}}>
        <View>
          <Text>{comic.name}</Text>
          <Text>{comic.comics.available}</Text>
        </View>
      </Image>
    </TouchableHighlight>
  )
}


  render(){
    if(this.state.loaded === false){
      return this.renderLoadingView();
    }
    return(
      <FlatList
        dataSource= {this,state.dataSource}
        renderRow={this.renderComic.bind(this)}
      />
    )
  }
}



const urlAPI = 'https://gateway.marvel.com/v1/public/characters?apikey=4e892c080bf2a6e7af14172a184981e0&ts=9&hash=0ef2af7eadd56ff1591a935c0311f402';
  const [dataSource, setData] = useState([]);

  useEffect(() => {
    fetch(urlAPI).then((response) => response.json()).then((responseJson) => {
      let dataSource = [];

      Object.values(responseJson).forEach(item => {
          dataSource = dataSource.concat(item);
      });

      setData({dataSource: dataSource})
  });

  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
        <FlatList
          data={dataSource}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.results.name}</Text>
          )}
        />
      
    </View>
  );
}

const urlAPI = 'https://gateway.marvel.com/v1/public/characters?apikey=4e892c080bf2a6e7af14172a184981e0&ts=9&hash=0ef2af7eadd56ff1591a935c0311f402';
      const [data, setData] = useState([]);
      const [isLoading, setLoading] = useState(true);
  useEffect(() => 
  cargarArray()
  )
    function cargarArray(){
      fetch('https://gateway.marvel.com/v1/public/characters?apikey=4e892c080bf2a6e7af14172a184981e0&ts=9&hash=0ef2af7eadd56ff1591a935c0311f402')
      .then(res => res.json())
      .then((json) => {
          setData(json.data.results);    
          console.log(data);
        })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));[];        
     }

/**
Lista con usuarios predefinidos, tiene un boton para acceder a los detalles

const [people, setPeople] = useState([
{name: 'Alejandro', id:'1',job:'Diseñador'  },
{name: 'Luis', id:'2',job:'Programador' },
{name: 'Raquel', id:'3',job:'Diseñador' },
{name: 'Sara', id:'4',job:'Diseñador' },
{name: 'Alberto', id:'5',job:'Programador' },
{name: 'Monica', id:'6',job:'Programador' },
{name: 'Natalia', id:'7',job:'Jefe de proyecto' },
]);

const pressItem = () =>{
  console.log(item.name);
  
}
return(
  <View style={styles.container}>
   <FlatList
    keyExtractor={(item)=> item.id}
    data={people}
    renderItem={({item}) => (
      <View>
        <Text style={styles.item}>{item.name}</Text>
        <Button onPress={() => navigation.navigate('Details', {name: item.name ,id: item.id,job: item.job})} title='Detalles'></Button>
      </View>
    )}
    />
  </View>
);
}


Con touchable, no funciona en esta versión de react, motivo desconocido salta error en la consola de chrome

return(
  <View style={styles.container}>
   <FlatList
    keyExtractor={(item)=> item.id}
    data={people}
    renderItem={({item}) => (
      <TouchableOpacity onPress={() =>  navigation.navigate('List', {name: item.name,id: item.id,job: item.job})}>
        <Text style={styles.item}>{item.name}</Text> 
      </TouchableOpacity>
    )}
    />
  </View>
);



  const array = navigation.getParam('arrayData')
  return (
    <List>
      <FlatList
        data={this.array}
        renderItem={({ item }) => (
          <ListItem
            title={`${item.firstname}`}
            subtitle={item.username}
          />
        )}>
      </FlatList>
    </List>
  )
useEffect(() => {
    fetch('')
      .then((response) => response.json())
      .then((json) => setData(json.response))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.code}, {item.status}</Text>
          )}
        />  
      )}
    </View>
  );







  

  return(
    <View>
      <Text>Lista de heroes</Text>
      {isLoading ? <ActivityIndicator/> : (
      <FlatList
      data={data}
      keyExtractor={({ id }, index) => id}
      renderItem={({hero})=>(
      <Text>{hero.name}</Text>
      )}
      ></FlatList>
      )}
    </View>
  );






















function RegisterVal({navigation}) {

  const [data,setData] = useState({
    name:"",
    lastname:"",
    username:"",
    password:"",
    email:"",
    dni:"",
    tel:"",
    users: [],
})

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [tel, setTel] = useState('');

  function add (){
setData({
    ...data,
    
      name = name,
      lastname = lastname,
      username = username,
      password= password,
      email= email,
      dni= dni,
      tel= tel,
    
      data: users
    })
    
  }
    
    const pressAndroid = () => {
      ToastAndroid.show("Bienvenido, "+username, ToastAndroid.SHORT);
      }
  
      const pressWeb = () =>{
        add();
        console.log(data);
            alert("Name: " + username + " ,Password: " + password);
      }
  
  
    return (
      <View style={styles.container}>
        <Image style={{width: 222, height: 113}} source={require('../img/simed.png')}/>
        <Text>Nombre</Text>
        <TextInput
        name="name"
        style={styles.input}
        placeholder='Juan'
        maxLength={10}
        value={name}
        onChangeText={(val)=>setName(val)}></TextInput>
        <Text>Apellidos</Text>
        <TextInput
        name="lastname"
        style={styles.input}
        placeholder='Lopez'
        maxLength={25}
        value={lastname}
        onChangeText={(val)=>setLastname(val)}></TextInput>
        <Text>Usuario</Text>
        <TextInput
        name="username"
        style={styles.input}
        placeholder='ej.Juan'
        maxLength={16}
        value={username}
        onChangeText={(val)=>setUsername(val)}></TextInput>
        <Text>Contraseña</Text>
        <TextInput
        name="password"
        style={styles.input}
        placeholder='ej.123'
        maxLength={16}
        value={password}
        onChangeText={(val)=>setPassword(val)}></TextInput>
        <Text>Correo</Text>
        <TextInput
        name="email"
        style={styles.input}
        placeholder='juan@simed.es'
        maxLength={30}
        value={email}
        onChangeText={(val)=>setEmail(val)}></TextInput>
        <Text>DNI</Text>
        <TextInput
        name="dni"
        style={styles.input}
        placeholder='12345678A'
        maxLength={9}
        value={dni}
        onChangeText={(val)=>setDni(val)}></TextInput>
        <Text>Telefono</Text>
        <TextInput
        name="tel"
        style={styles.input}
        placeholder='632249824'
        keyboardType="numeric"
        maxLength={9}
        value={tel}
        onChangeText={(val)=>setTel(val)}></TextInput>
  
        <Button onPress={()=>pressWeb()} title="Registrar"></Button>
        <Button onPress={() => navigation.navigate('List')} title="Registrar"
        title="Lista"></Button>
        <Text>Hello there {username} ,Password: {password}</Text>

        <FlatList
          data={[
            {key: name},
          ]}
        renderItem={({item}) => <Text style={styles.lista}>{item.key}</Text>}
          />
      </View>
    );
}


<form onSubmit={handleSubmit(onSubmit)}>
      <input name="firstname" ref={register} placeholder='Nombre'/> {/* registrar una entrada }
      <input name="lastname" ref={register} placeholder='Apellidos'/>
      <input name="username" ref={register} placeholder='Usuarios'/>
      <input name="password" ref={register} placeholder='Contraseña'/>
      <input name="dni" ref={register} placeholder='DNI'/>
      <input name="email" ref={register} placeholder='Email'/>
      <input name="tel" ref={register} placeholder='Telefono'/>
      <input type="submit" />
      <Button onPress={() => navigation.navigate('List')} title="List" ></Button>
    </form>














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












    

  const [data,setData] = useState({
    name:"",
    lastname:"",
    username:"",
    password:"",
    email:"",
    dni:"",
    tel:"",
    users: [],
})



var {name, lastname, username, password, email, dni, tel, users} = data;



  const updateNewData = e => setData({
    ...data,
    [e.target.name]: e.target.value,
        data: users

})

  return (
    <View style={styles.container}>
      <Image style={{width: 222, height: 113}} source={require('../img/simed.png')}/>
      <Text>Nombre</Text>
      <TextInput
      name="name"
      type="text"
      className="txtname"
      value={name}
      onChangeText={text => onChange({updateNewData(e)})}>
      </TextInput>
    </View>
  );












 const det = urls[0].url;
  const wiki = urls[1].url;
  const colink = urls[2].url;


   <Text style={{color: 'blue'}}onPress={() => Linking.openURL(det)}>Detalles</Text>
      <Text style={{color: 'blue'}}onPress={() => Linking.openURL(wiki)}>Wiki</Text>
      <Text style={{color: 'blue'}}onPress={() => Linking.openURL(colink)}>Comiclink</Text>



*/