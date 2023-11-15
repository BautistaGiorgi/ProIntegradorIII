import React, { Component } from 'react';
import { auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from 'react-native';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            textError: '',
            logueado: false,
            rememberMe: false
        }
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Menu')
            }
            this.setState({
                logueado: true
              })
        })
    }

    login(email, pass) {
        auth.signInWithEmailAndPassword(email, pass)
            .then((response) => {
                //Redirigir al usuario a la home del sitio.
                this.props.navigation.navigate('Menu')
            })
            .catch((error) => {
                if (error.code == 'auth/internal-error') {
                    this.setState({
                      textError: 'Verifica tu contraseña'
                    })
                  }
                  else {
                  this.setState({
                    textError: 'Verifica tu email'
                })}
                console.log(error);
            })
    }
    handleRememberMe = () => {
        this.setState(prevState => ({ rememberMe: !prevState.rememberMe }));
    }
    render() {
        return (
            <View style={styles.formContainer}>
                {this.state.logueado == true 
                 
                ?

                <>
                <Text style={styles.title}>Inicia sesión</Text>

                {/* Email */}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ email: text })}
                    placeholder='Email'
                    keyboardType='email-address'
                    value={this.state.email}
                />

                {/* Password */}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ password: text })}
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

                    <TouchableOpacity style={styles.button} onPress={() => this.setState({ textError: 'Es necesario completar todos los campos' })}>
                        <Text style={styles.textButton}>Iniciar sesión</Text>
                    </TouchableOpacity>
                }

                {this.state.textError.length > 0

                    ?

                    <Text style={styles.error}>{this.state.textError}</Text>

                    :

                    false}

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.register}>¿Todavía no tienes una cuenta? Registrate</Text>
                </TouchableOpacity>
                </>
                 
            :
                    <View style={styles.loader}>
                        <ActivityIndicator size='large' color='pink' />
                    </View>
                
                }
                
            </View>
        )
    }
}


const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: 'rgb(240, 228, 228)',
        paddingHorizontal: 10,
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
    input: {
        color: '#666666',
        height: 35,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#d7bebe',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#d7bebe',
        height: 35,
        display: 'flex',
        justifyContent: 'center'
    },
    textButton: {
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
    register: {
        color: 'rgb(71, 68, 68)',
        fontSize: 17,
        display: 'flex',
        justifyContent: 'center'
    },
    loader: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    }


})

export default Login;