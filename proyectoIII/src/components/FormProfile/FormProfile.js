import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { db } from '../../firebase/config';

class FormProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayPosteos: [],
            userData: null
        }
    }

    componentDidMount() {
        console.log(this.props.userEmail)
        this.getUserData(this.props.userEmail)
        this.getPosteos(this.props.userEmail)
    }
    
    getUserData(userEmail) {
        db.collection("user").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().owner == userEmail) {
                    this.setState({
                        userData: doc.data()
                    })
                }
            });
        });
    }

    getPosteos(userEmail) {
        db.collection("posts").onSnapshot((querySnapshot) => {
            const arrayPosteos = []
            querySnapshot.forEach((doc) => {
                if (doc.data().userEmail == userEmail) {
                    arrayPosteos.push({
                        data: doc.data(),
                        uid: doc.id
                    })
                }
            });
            this.setState({
                arrayPosteos: arrayPosteos
            })
        });
    }
   
  render() {
    return (
      <View style={styles.container}>
        <View>
          
         
        </View>
        <Text style={styles.userData}>{this.props.userEmail}</Text>

        {this.state.userData ? (
          <View style={styles.userInfoContainer}>

            <Text style={styles.userData}>{this.state.userData.userName}</Text>
          
            <Text style={styles.userData}>{this.state.userData.bio}</Text>
           
            <Text style={styles.userData}>{this.state.userData.fotoPerfil}</Text>
            
            <Text style={styles.userData}>{this.state.arrayPosteos.length}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userInfoContainer: {
    marginBottom: 20,
  },
  label: {
    paddingTop:10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  userData: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '400',
  },
  postContainer: {
    marginBottom: 20,
  },
});

export default FormProfile;