import React, { Component } from 'react';
import { View , Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Camera } from 'expo-camera';
import { auth, storage } from '../firebase/config';

class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state = {
            permission : false,
            image: '',
            showCamera: true,
        }
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
          .then((res)=>{
            if (res.granted === true)
               this.setState({
                   permission: true,
               })
          })
          .catch( e => console.log(e))          
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
            showCamera: true,
        })
      }
      
      acceptPicture(){
        fetch(this.state.image)
        .then(res => res.blob())
        .then(image => {
           const ref = storage.ref(`${auth.currentUser?.email}_${Date.now()}.jpg`)
           ref.put(image)
           .then( () => {
            ref.getDownloadURL()
            .then( url => {
                this.props.onImageUpload(url)
            }
            )
        })
        })
        .catch(e => console.log(e))
      }

    render(){
        return(
            <>
                {this.state.permission ? 
                    this.state.showCamera ?
                    <View style={styles.container} >
                        <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={metodosCamara => this.metodosCamara = metodosCamara}/>
                        <View>
                            <TouchableOpacity style={styles.button} onPress={() => this.takePicture()}>
                                <Text style={styles.textButton}>Take Picture</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                :
                    <View style={styles.container}>
                        <Image style={styles.camera} source={{uri: this.state.image}} />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.acceptPicture()}
                            >
                            <Text style={styles.textButton}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.cancelPicture()}
                            >
                            <Text style={styles.textButton}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                :
                <Text>No me diste los permisos de la camara</Text>
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    title:{
      fontWeight: 'bold'
    },
    container: {
        flex:1,
    },
    camera: {
        height: 400
    },
    button: {
      flex:1,
      width:150,
      height:10,
      alignItems: 'center',
      backgroundColor: "blue",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#28a745",
    },
    
    textButton: {
      color: "#fff",
    }
  });

export default MyCamera;