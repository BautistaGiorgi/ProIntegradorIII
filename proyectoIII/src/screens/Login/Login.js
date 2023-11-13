import React, { Component } from 'react';
import { auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

class Login extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            textError: ''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.props.navigation.navigate('Home')
          }
        })
      }

    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then((response) => {
                //Cuando firebase responde sin error
                console.log('Login ok', response);

                //Cambiar los estados a vacío como están al inicio.

                //Redirigir al usuario a la home del sitio.
                this.props.navigation.navigate('Home')
            })
            .catch((error) => { 
                if (error.code == 'auth/internal-error'){
                    this.setState({
                      textError: 'Verifica tu email o contraseña'
                    })
                  }
                  else {
                  this.setState({
                    textError: error.message
                })}
                console.log(error);
             })
    }

    render(){
        return(
            <View style={styles.formContainer}>

                <Text>Inicia sesión</Text>

                {/* Email */}
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='Email'
                    keyboardType='email-address'
                    value={this.state.email}
                />

                {/* Password */}
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='Contraseña'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />

                {this.state.email.length > 0 && this.state.password.length > 0 
                
                ? 

                <TouchableOpacity style={styles.button} onPress={() => 
                this.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Iniciar sesión</Text>
                </TouchableOpacity> 
                
                :

                <TouchableOpacity onPress={()=> this.setState({textError: 'Es necesario completar todos los campos'})}>
                    <Text style={styles.textButton}>Iniciar sesión</Text>    
                </TouchableOpacity>
                }

                {this.state.textError.length > 0 
                
                ? 
                
                <Text>{this.state.textError}</Text> 
                
                :
                
                false }

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                   <Text>¿Todavía no tienes una cuenta? Registrate</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'blue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }


})

export default Login;