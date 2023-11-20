import React, { Component } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image, ActivityIndicator, Alert, Modal, Pressable } from "react-native";
import { auth, db } from "../../firebase/config";
import { FontAwesome } from '@expo/vector-icons';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      userPosts: [],
      modalVisible: false,
      setModalVisible: false
    };
  }
  componentDidMount() {
    db.collection('user')
      .where("owner", "==", auth.currentUser.email)
      .onSnapshot(
        data => {
          let info = []
          data.forEach(i => {
            info.push(
              {
                id: i.id,
                data: i.data()
              })
          })

          this.setState({
            userInfo: info
          }, () => console.log(this.state.userInfo))
        }
      )


    db.collection('posts')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot(
        data => {
          let info = []
          data.forEach(i => {
            info.push(
              {
                id: i.id,
                data: i.data()
              })
          })

          this.setState({
            userPosts: info
          })
        })


  }

  logout() {
    auth.signOut();
    this.props.navigation.navigate("Login");
  }

  deletePost(id) {
    db.collection('posts').doc(id).delete()
      .then(() => {
        this.setState({
          setModalVisible: false,
          modalVisible: false
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  deleteUser(id) {
    const user = auth.currentUser;
    user.delete()
      .then(() => {
        console.log('Usuario eliminado de auth');
      })
      .then(() => {
        db.collection('user').doc(id).delete()
        this.props.navigation.navigate("Login")
      })
      .catch((error) => {
        console.log(error);
      })
  }
  changeModalVisible() {
    {
      this.state.modalVisible === false

        ?
        this.setState({
          modalVisible: true
        })

        :

        this.setState(
          {
            modalVisible: false
          })
    }
  }
  changesetModalVisible() {
    {
      this.state.setModalVisible === false

        ?
        this.setState({
          setModalVisible: true
        })

        :

        this.setState(
          {
            setModalVisible: false
          })
    }
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Home")}
          style={styles.coontainerFlecha}>
          <FontAwesome style={styles.flecha} name="arrow-left" size='large' />
        </TouchableOpacity>

        {this.state.userInfo.length > 0 ?
          <>
            <View style={styles.conteinerProfile}>
              {this.state.userInfo[0].data.profilePicture != '' ?
                <Image
                  style={styles.profilePic}
                  source={{ uri: this.state.userInfo[0].data.profilePicture }}
                  resizeMode='contain'
                />
                :
                <Image
                  style={styles.profilePic}
                  source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                  resizeMode='contain' />}

              <View style={styles.containerDatos}>
                <Text style={styles.userName}> {this.state.userInfo[0].data.userName} </Text>
                <Text> {this.state.userInfo[0].data.owner} </Text>
                {this.state.userInfo[0].data.miniBio.length > 0 ? <Text> {this.state.userInfo[0].data.miniBio} </Text> : false}

                {this.state.userPosts.length == 0 ?
                  <Text style={styles.post}> {this.state.userPosts.length} posts</Text>
                  :
                  <Text style={styles.post}> {this.state.userPosts.length} post</Text>}

              </View>
              
            </View>
            <View style={styles.containerButtons}>
                <TouchableOpacity onPress={() => this.logout()}>
                  <Text style={styles.button}>Cerrar sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.deleteUser(this.state.userInfo[0].id)}>
                  <Text style={styles.button}>Borrar usuario</Text>
                </TouchableOpacity>
              </View>
            <View style={styles.container}>

              {<FlatList
                data={this.state.userPosts}
                keyExtractor={i => i.id}
                renderItem={({ item }) => {
                  return (

                    <View style={styles.containerPost}>
                      <Image style={styles.camera} source={{ uri: item.data.image }} />

                      <View style={styles.centeredView}>
                        <Modal
                          animationType="slide"
                          transparent={true}
                          visible={this.state.modalVisible}
                          onRequestClose={() => { Alert.alert('Modal has been closed.'); this.changeModalVisible() }}>
                          <View style={styles.centeredView}>

                            <View style={styles.modalView}>
                              <Text style={styles.textDelete}>¿Querés borrar tu post? </Text>

                              <TouchableOpacity style={[styles.buttonOk]} onPress={() => this.deletePost(item.id)}>
                                <Text style={styles.text}>Aceptar</Text>
                              </TouchableOpacity>
                              <Pressable
                                style={styles.buttonCancelar}
                                onPress={() => this.changeModalVisible()}>
                                <Text style={styles.text}>Cancelar</Text>
                              </Pressable>
                            </View>
                          </View>
                        </Modal>
                        <Pressable
                          style={[styles.deleteButton]}
                          onPress={() => this.changeModalVisible()}>
                          <Text style={styles.deleteText} >Borrar post</Text>
                        </Pressable>
                      </View>
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
  containerButtons:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteText: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  deleteButton: {
    width: '100%',
    height: 35,
    flexDirection: 'row',
    backgroundColor: '#d7bebe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coontainerFlecha: {
    marginLeft: 20,
    marginRight: 20
  },
  post: {
    color: 'grey',
  },
  botonLogout: {
    color: "#ec5853",
    fontWeight: 'bold',
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    height: '100%'
  },
  userName: {
    fontWeight: 'bold'
  },
  formContainer: {
    height: '100%',
    marginBottom: 10,
    marginTop: 20,
  },
  containerDatos: {
    marginBottom: 5,
  },
  conteinerProfile: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 15,
  },
  containerPost: {
    marginTop: 5,
    marginBottom: 5,
    height: '100%'
  },
  camera: {
    width: "100vw",
    height: '50vh',
    marginTop: 10,
  },
  textoPost: {
    marginLeft: 5,
  },
  profilePic: {
    height: 70,
    width: 70,
    borderRadius: 45,
    marginRight: 10
  },
  textDelete: {
    marginBottom: 7
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#d7bebe',
    margin:10,
  },
  buttonOpen: {
    backgroundColor: '#D9D6D6',
  },
  buttonClose: {
    backgroundColor: 'red',
    marginTop: 5
  },
  buttonCancelar: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: 'red',
    paddingHorizontal: 15,
    width: 100,
    alignItems: 'center',
  },
  buttonOk: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: 'green',
    paddingHorizontal: 15,
    width: 100,
    alignItems: 'center',
    marginBottom: 5,

  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Profile;