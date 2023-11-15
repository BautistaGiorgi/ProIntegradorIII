import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import { auth, db } from '../../firebase/config';
import { FontAwesome } from '@expo/vector-icons';   

class FormProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayPosts: [],
            arrayData: []
        }
    }

    componentDidMount() {
      db.collection('user')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot(
        (data) => {
          let info = [];
          data.forEach((i) => {info.push({
                id: i.id,
                user: i.data()
              })
          })
          this.setState({
            arrayData: info
          }, ()=> console.log(this.state.arrayData))
        }
      )
  
      
      db.collection('posts')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot(
        (data) => {
          let info = [];
          data.forEach((i) => {info.push(
              {
                id: i.id,
                user: i.data()
              })
          })
          this.setState({
            arrayPosts: info
          }, ()=> console.log(this.state.arrayPosts))
        }
      )
    }
   
  render() {
    return (
      <View style={styles.formContainer}>

        {this.state.arrayData.length > 0 
        
        ? 
        <>
          <View style={styles.userInfoContainer}>
            <Image style={styles.profilePicture} source={{uri:this.state.arrayData[0].user.profilePicture}} resizeMode='contain'/>
            <View> 
              <Text style={styles.arrayData}>{this.state.arrayData[0].user.owner}</Text>
              <Text style={styles.arrayData}>{this.state.arrayData[0].user.userName}</Text>

              {this.state.arrayData[0].user.miniBio.length > 0 ? <Text>{this.state.arrayData[0].user.miniBio}</Text> : false}
              {this.state.arrayPosts.length == 0 ? <Text style={styles.arrayData}>{this.state.arrayPosts.length} posts</Text> : <Text style={styles.arrayData}> {this.state.arrayPosts.length} post</Text>}
            </View>
          </View>

          <View style={styles.posts}>
          {<FlatList
              data={this.state.arrayPosts}
              keyExtractor={(i) => i.id}
              renderItem={({item}) => {
                return (
                  <View style={styles.containerPost}>
                    <Image style={styles.camera} source={{uri:item.user.image}} />
                    <TouchableOpacity style={styles.deleteButton} onPress={() => this.deletePost(item.id)}>
                      <Text style={styles.deleteText}>Borrar post</Text>
                    </TouchableOpacity>
                  </View>)
              }}
              />}

          </View>
        
        </>
        
        : 
        
          <View style={styles.loader}>
            <ActivityIndicator size='large' color='pink' />
          </View>
        
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'rgb(240, 228, 228)',
    height: 500
  },
  userInfoContainer: {
    marginBottom: 20,
  },
  label: {
    paddingTop:10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrayData: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '400',
  },
  postContainer: {
    marginBottom: 20,
  }, 
  camera: {
    width: '100vw',
    height: 350,
    marginTop: 10,
    marginBottom:10
},
profilePicture: {
  height: 40,
  width: 40,
  borderWidth: 1,
  borderRadius: 25,
  borderColor: 'rgb(240, 228, 228)',
  marginRight: 10
},
  loader: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

export default FormProfile;