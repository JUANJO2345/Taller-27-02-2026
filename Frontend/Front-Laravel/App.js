import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { useState } from 'react';


export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const datos = {
    name: name,
    email: email
  };

  // Función para traer datos de la API y mostrarlo en la aplicación
  function traerDatos() {
    fetch('http://10.169.39.169:8000/api/clients')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert(JSON.stringify(data));
      })
      .catch(error => {
        console.error('Error al traer datos:', error);
        alert('Error al traer datos');
      });
  }
  function enviarDatos() {
    fetch('http://10.169.39.169:8000/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Datos enviados:', data);
        alert('Datos enviados correctamente');
      })
      .catch(error => {
        console.error('Error al enviar datos:', error);
        alert('Error al enviar datos');
      });
  }
  function mostrarDato() {
    alert(`Nombre: ${name}, Email: ${email}`);
  }
  return (
    <View style={styles.container}>
      <TextInput onChange={(e) => setName(e.nativeEvent.text)}
        style={styles.input}
        placeholder="Nombre"
      />
      <TextInput onChange={(e) => setEmail(e.nativeEvent.text)}
        style={styles.input}
        placeholder="Email"
      />
      <Pressable style={styles.button} onPress={mostrarDato}>
        <Text style={styles.buttonText}>Mostrar Dato</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={traerDatos}>
        <Text style={styles.buttonText}>Traer Datos</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={enviarDatos}>
        <Text style={styles.buttonText}>Enviar Datos</Text>
      </Pressable>
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
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
});
