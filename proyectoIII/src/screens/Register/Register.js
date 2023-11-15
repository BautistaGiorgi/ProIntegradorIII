import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import MyCamera from '../../components/MyCamera/MyCamera';

class Register extends Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            userName:'',
            miniBio: '',
            profilePicture: '',
            showCamera: false,
            textError: false,
        }
    }
    register (email, pass, userName, miniBio, profilePicture){
        /* Posibles errores */
        if(this.state.email == '' || this.state.email.includes('@') == false){
            return this.setState({textError: 'El email ingresado es inválido'})

        } else if (this.state.password == '' || this.state.password.length < 6){
            return this.setState({textError: 'La contraseña debe contener más de 6 caracteres'})

        } else if (this.state.userName == '') {
            return this.setState({textError:'Debes elegir un nombre de usuario'})
        }

        /* Usuario */
        auth.createUserWithEmailAndPassword(email, pass)
            .then((response) => {
                db.collection('user').add({
                    owner: email,
                    createdAt: Date.now(),
                    userName: userName,
                    miniBio: miniBio,
                    profilePicture: profilePicture
                })
                this.props.navigation.navigate('Login');
            })
            .catch((error) => {
                this.setState({
                    textError: error.message
                })
                console.log(error);
            })
    }

    onImageUpload(url){
        this.setState({ 
            profilePicture: url,
            showCamera: false
        })
      }

    render(){
        return(
            <>
            {this.state.showCamera
            
            ?

                <MyCamera onImageUpload={(url) => this.onImageUpload(url)} />    
            
            :
            
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Registrarse</Text>
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
                        <TextInput
                        style={styles.input}
                        onChangeText={(url)=>this.setState({profilePic: url})}
                        placeholder='Añade la URL de tu imagen'
                        keyboardType='default'
                        value={this.state.profilePicture}
                        />

                        {this.state.email.length > 0 && this.state.password.length > 0 && this.state.userName.length > 0 
                        
                        ? 

                        <TouchableOpacity style={styles.button} onPress={() => 
                        this.register(this.state.email, this.state.password, this.state.userName, this.state.miniBio, this.state.profilePicture)}>
                            <Text style={styles.textButton}>Registrarme</Text>    
                        </TouchableOpacity> 
                        
                        : 

                        <TouchableOpacity style={styles.button} onPress={()=> this.setState({textError: 'Es necesario completar todos los campos'})}>
                            <Text style={styles.textButton}>Registrarme</Text>    
                        </TouchableOpacity> }

                        {this.state.textError.length > 0 
                        
                        ? 
                        
                        <Text style={styles.error}>{this.state.textError}</Text> 
                    
                        : 
                        
                        false }

                        <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                        <Text style={styles.login}>¿Ya tienes una cuenta? Inicia sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            </>
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
        fontSize: 40,
        fontWeight: 400,
        color: 'rgb(135, 90, 97)',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 20,
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
        color: 'rgb(94, 63, 67)'
    },
    error: {
        color: 'rgb(209, 0, 0)',
        fontSize: 15,
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 20
    },
    login: {
        color: 'rgb(71, 68, 68)',
        fontSize: 17,
        display: 'flex',
        justifyContent: 'center'
    }
    }
)

export default Register;