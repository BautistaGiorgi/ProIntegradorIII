import React, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';
import { auth, db } from '../../firebase/config';
import { FontAwesome } from '@expo/vector-icons';

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
        arrayPosts: [],
        arrayComments: []
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
    db.collection('posts').where('image','==', this.props.route.params).onSnapshot((data) => {
          let info = []
          data.forEach((i) => {
              info.push(
                {
                  id: i.id,
                  data: i.data()
                })
            })

            this.setState({
                arrayComments: info 
            })
            ;
      })

}

  render() {
    return (
      <View style={styles.formContainer}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Menu')}>
         <FontAwesome name="arrow-left" size='large'/>
       </TouchableOpacity>
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