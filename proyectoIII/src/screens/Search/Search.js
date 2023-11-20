import React, { Component } from 'react';
import { TextInput, View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, db } from '../../firebase/config';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      results: [],
      id: '',
    }
  }

  componentDidMount() {
      db.collection('user').onSnapshot((snapshot) => {
      let array = [];
      snapshot.forEach((doc) => {
        array.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      this.setState({
        results: array,
      })
    })
  }

  handleUserSelect(selectedUser) {
    selectedUser === auth.currentUser.email
      ? this.props.navigation.navigate('Profile')
      : this.props.navigation.navigate('ProfileUsers', { owner: selectedUser });
  }

  render() {
    let filteredResults = this.state.results.filter((user) =>
      user.data.userName.toLowerCase().includes(this.state.search.toLowerCase())
    );

    return (
      <View style={styles.formContainer}>
        <Image 
                style={styles.image} 
                source={require('../../../assets/albas.png')}
                resizeMode='contain'
        /> 

        <TextInput
          placeholder='Buscar usuario'
          keyboardType='default'
          value={this.state.search}
          style={styles.input}
          onChangeText={(text) => this.setState({search: text})}
        />

        <FlatList
        style={styles.container}
          data={filteredResults}
          keyExtractor={(user) => user.id}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.containerProfile} onPress={() => this.handleUserSelect(item.data.owner)}>
              {item.data.profilePicture != '' 
              
              ?
                <Image 
                    style={styles.profilePicture} 
                    source={{uri:item.data.profilePicture}}
                    resizeMode='contain'/>
                        
              :
                <Image 
                style={styles.profilePicture} 
                source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}
                resizeMode='contain'/> 
              
              }

            <View>
              <Text>{item.data.userName}</Text>
              <Text style={styles.email}>{item.data.owner}</Text>
            </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    formContainer:{
        backgroundColor: 'rgb(240, 228, 228)',
        paddingHorizontal:10,
        flex: 1, 
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
        marginTop: 30,
        marginBottom: 30,
    },
    containerProfile: {
      flexDirection: 'row',
      height:50
    },
    profilePicture:{
      height:40,
      width:40,
      borderWidth:1,
      borderRadius:25,
      borderColor:'rgb(240, 228, 228)',
      marginRight:10
  },
    email: {
      color:'grey',
     
    },
  
});

export default Search;