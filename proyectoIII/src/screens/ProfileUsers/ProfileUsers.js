import React, { Component } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from "react-native";
import { auth, db } from '../../firebase/config';
import { FontAwesome } from '@expo/vector-icons';

class ProfileUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      userPosts: []
    }
  }

  componentDidMount() {
    console.log("Route Params:", this.props.route.params);
    if (this.props.route.params === auth.currentUser) {
      this.props.navigation.navigate("Profile");
    }
    db.collection('user').where('owner', '==', this.props.route.params).onSnapshot(
      data => {
        let user = []
        data.forEach(i => {
          user.push(
            {
              id: i.id,
              datos: i.data()
            })
        })
        this.setState({
          userInfo: user
        })
      },
      error => {
        console.error("Error:", error);
      }
    )

    db.collection('posts').where('owner', '==', this.props.route.params).orderBy('createdAt', 'desc').onSnapshot(
      data => {
        let posts = []
        data.forEach(i => {
          posts.push(
            {
              id: i.id,
              datos: i.data()
            })
        })

        this.setState({
          userPosts: posts
        })
          ;
      },
      error => {
        console.error("Error:", error);
      }
    )
  }

  render() {
    console.log('------');
    console.log(this.state);
    console.log(this.props.route.params);
    
    return (
      <View style={styles.mainContainer}>
        {this.state.userInfo.length > 0 ? (
          <>
            <FlatList
              data={this.state.userInfo}
              keyExtractor={(oneUser) => oneUser.id}
              renderItem={({ item }) => (
                <View style={styles.userDetailsContainer}>
                  <Image
                    style={styles.profileImage}
                    source={{ uri: item.datos.image !== '' ? item.datos.image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                    resizeMode='contain'
                  />
                  <Text style={styles.userNameText}>{item.datos.owner}</Text>
                  <Text style={styles.userNameText}>{item.datos.userName}</Text>
                </View>
              )}
            />
            {this.state.userPosts.length === 0 ? (
              <Text style={styles.userNameText}>Este usuario no tiene ningún posteo</Text>
            ) : (
              <View style={styles.userPostsContainer}>
                <FlatList
                  data={this.state.userPosts}
                  keyExtractor={(onePost) => onePost.id}
                  renderItem={({ item }) => (
                    <Post dataPost={item} navigation={this.props.navigation} />
                  )}
                />
              </View>
            )}
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='small' color='purple' />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButtonContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
    marginRight: 10,
  },
  mainContainer: {
    flex: 1,
    paddingTop: 10,
  },
  userDetailsContainer: {
    flex: 1,
    padding: 10,
  },
  userPostsContainer: {
    flex: 2,
  },
  postImage: {
    width: "33%",
    height: 120,
    margin: 5,
  },
  postText: {
    marginLeft: 5,
    color: 'gray',
  },
  userNameText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
});

export default ProfileUsers;