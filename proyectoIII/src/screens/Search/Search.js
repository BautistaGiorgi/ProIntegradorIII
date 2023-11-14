import React, { Component } from 'react';
import { TextInput, View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, db } from '../../firebase/config';
import { FontAwesome } from '@expo/vector-icons';

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
    this.unsubscribe = db.collection('user').onSnapshot((snapshot) => {
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

  handleUserSelect(id) {
    this.props.navigation.navigate('ProfileUsers', id);
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
                resizeMode='contain'/> 
          <TextInput
            placeholder='Buscar usuario'
            keyboardType='default'
            value={this.state.search}
            style={styles.input}
            onChangeText={(text) => this.setState({search: text})}
          />

        {<FlatList
          data={filteredResults}
          keyExtractor={(user) => user.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.handleUserSelect(item.data.owner)}>
              <Text>{item.data.image}</Text>
              <Text>{item.data.userName}</Text>
              <Text>{item.data.email}</Text>
            </TouchableOpacity>
          )}
        />}
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
    image: {
      height: 60,
      marginTop: 10
  },
});

export default Search;