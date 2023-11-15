import React, { Component } from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { auth } from '../../firebase/config';
import FormProfile from '../../components/FormProfile/FormProfile';

export default class Profile extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    console.log(auth.currentUser);
  }

  logOut() {
    auth.signOut()
    this.props.navigation.navigate('Login')
  }

  deletePost(id) {
    db.collection('posts').doc(id).delete()
      .then(() => {
        console.log('Post eliminado correctamente')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <Image 
                style={styles.image} 
                source={require('../../../assets/albas.png')}
                resizeMode='contain'/> 

        <FormProfile userEmail={auth.currentUser.email} navigation={this.props.navigation} />
        
        <TouchableOpacity style={styles.button} onPress={() => this.logOut()}>
          <Text style={styles.textButton}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
        backgroundColor: 'rgb(240, 228, 228)',
        paddingHorizontal:10,
        flex: 1,  
        height: 500
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
  },
  image: {
      height: 60,
      marginTop: 10
  }
  
});