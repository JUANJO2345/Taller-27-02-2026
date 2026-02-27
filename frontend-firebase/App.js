import { onValue, push, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { db } from './firebase'

export default function App() {
  const [name, setName] = useState('')
  const [stock, setStock] = useState('')
  const [data, setData] = useState([])

  function sendData() {
    push(ref(db, "products"), {
      name: name,
      stock: stock
    }).then(function () {      
      Alert.alert("Datos enviados", "Los datos se han enviado correctamente")
      setName('')
      setStock('')
    })
  }

  function getData() {
    onValue(ref(db, "products"), (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setData(Object.values(data))
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar Productos</Text>
      
      <TextInput
        style={styles.input}
        placeholder='Nombre del producto'
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder='Stock del producto'
        value={stock}
        onChangeText={(text) => setStock(text)}
        keyboardType='numeric'
      />
   
      <Pressable title='Enviar datos' onPress={sendData} style={styles.button}>
        <Text style={styles.buttonText}>Enviar datos</Text>
      </Pressable>


      <Text style={styles.title}>Lista de Productos</Text>

      <View style={styles.data}> 
        {data.length > 0 ? data.map((item, index) => (
          <Text key={index} style={styles.dataItem}>{item.name} - Stock: {item.stock}</Text>
        )) : <Text>No hay datos</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center', 
  },
  buttonText: {
    color: '#fff',
  },
  data: {
    gap: 10,
  },
  dataItem: {
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
});
