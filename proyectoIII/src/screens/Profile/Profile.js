import React, { Component } from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
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
    .then(() => {
      this.props.navigation.navigate("Login")
    })
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <FormProfile userEmail={auth.currentUser.email} navigation={this.props.navigation} />
        
        <TouchableOpacity style={styles.button} onPress={() => this.logOut()}>
          <Text style={styles.textButton}>Logout</Text>
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
  },
  title: {
      fontSize: 40,
      fontWeight: 400,
      color: 'rgb(135, 90, 97)',
      display: 'flex',
      justifyContent: 'center',
      fontFamily: 'Nunito',
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
      fontFamily: 'Nunito'
  },
  
});