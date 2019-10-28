import React, { Component } from 'react';
import { StyleSheet, TextInput, Alert, TouchableOpacity, Text, View } from 'react-native';

export default class App extends Component {
  constructor(props){
    super(props)

    this.state={
      Nroplaca:'',
      Marca:'',
      Valor:''
    }
  }

  registrarVehi= () =>{
    if (this.state.Nroplaca != "" && this.state.Marca !="" && this.state.Valor !="") {
      const url ='http://192.168.1.72/momento2_RN/Registration_api.php'
      fetch(url,{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-type':'application/json',
        },
        body: JSON.stringify({
          user_placa:this.state.Nroplaca,
          user_marca:this.state.Marca,
          user_valor:this.state.Valor
        })
      }).then((response)=>response.json)
        .then((responseJson)=>{
          alert(responseJson);
        }).catch((error)=>{
          console.error(error);          
        });      
    }else{
      alert('Debe ingresar todos los datos');
    }
  }

    render(){
      return(
        <View style={styles.MainContainer}>
          <Text style={{fontSize:20,color:'#DD2C00',textAlign:'center',marginBottom:15}}>Registro de vehiculos</Text>
          <TextInput
          placeholder='Ingrese Placa'
          onChangeText={data =>this.setState({Nroplaca:data})}          
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          />
          <TextInput
          placeholder='Ingrese Marca'
          onChangeText={data =>this.setState({Marca:data})}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          />
          <TextInput
          placeholder='Ingrese Valor'
          onChangeText={data =>this.setState({Valor:data})}
          underlineColorAndroid='transparent'          
          style={styles.TextInputStyleClass}
          />
          <TouchableOpacity style={styles.button} onPress={this.registrarVehi}>
            
            <Text style={styles.text}>Registrar Vehiculo</Text>

            </TouchableOpacity>          

        </View>
      )
    }
}

const styles = StyleSheet.create({

  MainContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10
  },

  TextInputStyleClass: {

    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: '#DD2C00',
    borderRadius: 5,
  },

  button: {

    width: '80%',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#DD2C00',
    borderRadius: 3,
    marginTop: 20
  },

  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5
  }

});
