import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import { db, storage } from '../../firebase/config';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { auth } from '../../firebase/config';

class Camera extends Component{
    constructor(props){
        super(props),
        this.state = {
            hardwarepermissions: false,
            image: '',
            showCamera: true, //Para elegir si queremos mostrar cámara o preview de foto.
        }
        this.cameramethods = '' //Guardar los métodos internos de la cámara.
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then(()=>{
                this.setState({
                    hardwarepermissions: true,
                })
            })
            .catch(error => console.log(error))
    }

    takePicture(){
        this.cameramethods.takePictureAsync()

        .then(image => {
            this.setState({
                image: '',
                showCamera: false
            })
        })
        .catch(error => console.log(error))
    }

    guardarLaFotoEnStorage(){

    }

    render(){
        //El return tiene que mostrar la cámara o el preview de la foto con las opciones de cancelar o confirmar.
        return(
            <View>
                <Camera
                    //style={}
                    type={ Camera.Constants.Type.front}
                    ref={ metedosDeCamara => this.metedosDeCamara = metedosDeCamara}
                />
                <TouchableOpacity onPress={()=>this.sacarFoto()}>
                    <Text>Sacar Foto</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Camera;

