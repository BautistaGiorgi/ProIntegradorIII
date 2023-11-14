import React, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';
import { auth, db } from '../../firebase/config';

class Comments extends Component {
  constructor() {
    super();
    this.state = {
        arrayPosts: []
    }
  }

  componentDidMount(){
    db.collection('posts').onSnapshot((posts) => {
        let postsShow = [];
        posts.forEach((onePost) => {
            postsShow.push({
                    id: onePost.id,
                    data: onePost.data()
                })
        })
        this.setState({
            arrayPosts: postsShow
        })
    })
}

  render() {
    return (
      <View style={styles.formContainer}>

      </View>
    )
  }
}

const styles = StyleSheet.create({
    formContainer: {
        height: '100%',
        backgroundColor: 'white'
    },
})

export default Comments;