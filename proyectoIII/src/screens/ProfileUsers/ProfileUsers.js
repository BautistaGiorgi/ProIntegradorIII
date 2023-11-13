import React, { Component } from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'

import { auth } from '../firebase/config'

import FormProfile from '../components/FormProfile'

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
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        
        <FormProfile userEmail={auth.currentUser.email} navigation={this.props.navigation} />
        
        <TouchableOpacity style={styles.logoutButton} onPress={() => this.logOut()}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: '#282c34', 
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
    marginLeft: 130, 
    color: '#61dafb',
   },
  logoutButton: {
    backgroundColor: '#61dafb',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});