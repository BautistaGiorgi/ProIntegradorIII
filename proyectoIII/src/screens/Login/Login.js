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
            this.props.navigation.navigate('Menu')
          }
        })
      }

    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then((response) => {
            

                //Cambiar los estados a vacío como están al inicio.

                //Redirigir al usuario a la home del sitio.
                this.props.navigation.navigate('Menu')
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

                <Text style={styles.title}>Inicia sesión</Text>

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

                <TouchableOpacity style={styles.button} onPress={()=> this.setState({textError: 'Es necesario completar todos los campos'})}>
                    <Text style={styles.textButton}>Iniciar sesión</Text>    
                </TouchableOpacity>
                }

                {this.state.textError.length > 0 
                
                ? 
                
                <Text style={styles.error}>{this.state.textError}</Text> 
                
                :
                
                false }

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                   <Text style={styles.register}>¿Todavía no tienes una cuenta? Registrate</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    formContainer:{
        backgroundColor: 'rgb(240, 228, 228)',
        paddingHorizontal:10,
        flex: 1, 
    },
    title: {
        fontSize: 60,
        fontWeight: 400,
        color: 'rgb(135, 90, 97)',
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Nunito',
        marginBottom: 15,
        padding: 25
    },
    input:{
        color: '#666666',
        height: 35,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#d7bebe',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 4,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#d7bebe',
        height: 35,
        display: 'flex',
        justifyContent: 'center'
    },
    textButton:{
        textAlign: 'center',
        fontSize: 20,
        color: 'rgb(94, 63, 67)',
        fontFamily: 'Nunito'
    },
    error: {
        color: 'rgb(209, 0, 0)',
        fontSize: 15,
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Nunito',
        marginBottom: 20
    },
    register: {
        color: 'rgb(71, 68, 68)',
        fontSize: 20,
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Nunito'
    }


})

export default Login;