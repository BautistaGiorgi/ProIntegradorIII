

import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Camera from '../../components/Camera/Camera';

class Register extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            userName:'',
            miniBio: '',
            profilePicture: '',
            url: '',
            showCamera: false,
            textError: false,
        }
    }
    register (email, pass, userName, miniBio, profilePicture){
        /* Posibles errores */
        if(this.state.email == '' || this.state.email.includes("@") == false){
            return this.setState({textError: "El email ingresado es inválido"})

        } else if (this.state.password == '' || this.state.password.length < 3){
            return this.setState({textError: "La contraseña debe contener más de 3 caracteres"})

        } else if (this.state.userName == '') {
            return this.setState({textError:'Debes elegir un nombre de usuario'})
        }

        auth.createUserWithEmailAndPassword(email, pass)
            .then((response)=>{
                console.log(response);
                db.collection('user').add({
                    owner: email,
                    createdAt: Date.now(),
                    userName: userName,
                    miniBio: miniBio,
                    profilePicture: profilePicture
                })
            })
            .catch((error) => {
                this.setState({
                    textError: error.message
                })
                console.log(error);
            })
    }

    render(){
        return(
            <View style={styles.formContainer}>
                {this.state.showCamera
                ? <Camera onImageUpload={(url) => this.onImageUpload(url)}  />
                
                : <>
                <Text>Registrarse</Text>
                <View>
                    {/* Email */}
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.setState({email: text})}
                        placeholder='Email'
                        keyboardType='email-address'
                        value={this.state.email}
                    />

                    {/* User name */}
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.setState({userName: text})}
                        placeholder='Nombre de usuario'
                        keyboardType='default'
                        value={this.state.userName}
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

                    {/* Mini bio */}
                    <TextInput
                        style={styles.input}
                        onChangeText={(bio)=>this.setState({miniBio: bio})}
                        placeholder='Descríbete'
                        keyboardType='default'
                        value={this.state.miniBio}
                    />

                    {/* Profile picture */}
                    <TouchableOpacity onPress={()=> this.setState({showCamera: true})}>
                        <Text>Añade una foto de perfil</Text>    
                    </TouchableOpacity>

                    {this.state.email.length > 0 && this.state.password.length > 0 && this.state.userName.length > 0 
                    
                    ? 

                    <TouchableOpacity style={styles.button} onPress={() => 
                    this.register(this.state.email, this.state.password, this.state.userName, this.state.miniBio, this.state.profilePicture)}>
                        <Text style={styles.textButton}>Registrarme</Text>    
                    </TouchableOpacity> 
                    
                    : 

                    <TouchableOpacity onPress={()=> this.setState({textError: 'Es necesario completar todos los campos'})}>
                        <Text >Registrarme</Text>    
                    </TouchableOpacity> }

                    {this.state.textError.length > 0 
                    
                    ? 
                    
                    <Text>{this.state.textError}</Text> 
                   
                    : 
                    
                    false }

                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                    <Text>¿Ya tienes una cuenta? Inicia sesión</Text>
                    </TouchableOpacity>
                    
                </View>
                </> 
                }

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
        backgroundColor:'#28a745',
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

export default Register;