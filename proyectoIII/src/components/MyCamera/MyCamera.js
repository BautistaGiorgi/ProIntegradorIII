import React, { Component } from 'react';
import { View , Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator} from 'react-native';
import { Camera } from 'expo-camera';
import { auth, storage } from '../../firebase/config';

class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state = {
            permission: false,
            image: '',
            showCamera: true,
        }
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then((res) => {
        if (res.granted === true)
            this.setState({
                permission: true
            })
        })
        .catch(error => console.log(error))          
    }
      
    
    takePicture(){
        this.metodosCamara.takePictureAsync()
        .then((image) => {
            this.setState({
                image: image.uri,
                showCamera: false
            })
        })
        .catch(error => console.log(error))
    }

    cancelPicture(){
        this.setState({
            showCamera: true
        })
    }
      
    acceptPicture(){
        fetch(this.state.image)
        .then((res) => res.blob())
        .then((image) => {
            const ref = storage.ref(`${auth.currentUser?.email}_${Date.now()}.jpg`)
            ref.put(image)
            .then(() => {
                ref.getDownloadURL()
                .then((url) => {
                    this.props.onImageUpload(url)
                })
            })
        })
        .catch(error => console.log(error))
    }

    render(){
        return(   
            <>
                {this.state.permission
                
                ? 
                
                this.state.showCamera 
                
                ?

                    <View style={styles.formContainer}>
                        <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={metodosCamara => this.metodosCamara = metodosCamara}/>
                        <TouchableOpacity style={styles.button} onPress={() => this.takePicture()}>
                            <Text style={styles.textButton}>Sacar foto</Text>
                        </TouchableOpacity>
                    </View>
               
                :

                    <View style={styles.formContainer}>
                        <Image style={styles.camera} source={{uri: this.state.image}}/>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buttonAceptar} onPress={() => this.acceptPicture()}>
                                <Text style={styles.textButtonOk}>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonCancelar} onPress={() => this.cancelPicture()}>
                                <Text style={styles.textButtonOk}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                
                :

                <View style={styles.loader}>
                    <ActivityIndicator size='large' color='pink' />
                </View>
                
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1, 
    },
    camera:{
        height: 453,
        marginTop: 20
    },
    title:{
      fontWeight: 'bold'
    },
    button: {
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
    },
    textButton: {
        textAlign: 'center',
        fontSize: 20,
        color: 'rgb(94, 63, 67)',
    },
    buttonAceptar: {
        backgroundColor:'green',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 32,
        borderRadius: 4,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'green',
        height: 35,
        width: 130
    },
    buttonCancelar: {
        backgroundColor:'red',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 32,
        borderRadius: 4,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'red',
        height: 35,
        width: 130
    },
    textButtonOk:{
        textAlign: 'center',
        fontSize: 20,
        color: 'white'
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    loader: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    }
  })

export default MyCamera;