import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            like: false,
            commentText: "",
            comment: [],
            showComment: false,        
        }
    }
    
    componentDidMount(){
        let likes = this.props.dataPost.data.likes

        if(likes.length == 0){
            this.setState({
                like: false
            })
        }
        if(likes.length > 0){
            likes.forEach((like) => {if (like === auth.currentUser.email) {
                this.setState({
                    like: true 
                })
            }})
        }
    }

    likear(){
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes:firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(this.setState({
            like: true
        }))
        .catch(error => console.log(error))
    }

    dislike(){
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes:firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(this.setState({
            like: false
        }))
        .catch(error => console.log(error))
    }

    comment(comment) {
        let theUser = this.props.dataPost.data.owner;
        
        let newComment = {
          user: theUser,
          comment: comment,
        };
 
        let post = db.collection("posts").doc(this.props.dataPost.id);
  
        post.update({
          comment: firebase.firestore.FieldValue.arrayUnion(newComment),
        });
      }
    

    render(){
        return(
            <View style={styles.formContainer}>
                {/* Perfil del usuario */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', this.props.dataPost.data.owner)} style={styles.profileContainer}>
                    <Image style={styles.profilePicture}  source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}} resizeMode='contain'/> 
                    <Text style={styles.userName}>{this.props.dataPost.data.userName}</Text>
                </TouchableOpacity>
                
                
                {/* Foto */}
                <Image style={styles.camera} source={{uri:this.props.dataPost.data.image}}/>

                {/* Likes */}
                <View>
                {this.state.like 
                
                ? 

                <TouchableOpacity style={styles.button} onPress={() => this.dislike()}>
                    <View style={styles.iconContainer}>
                        <FontAwesome name='heart' size={18} color='red'/>
                        <Text style={styles.textButton}>{this.props.dataPost.data.likes.length}</Text>
                    </View>
                </TouchableOpacity>

                :

                <TouchableOpacity style={styles.button} onPress={()=>this.likear()}>
                    <View style={styles.iconContainer}>
                        <FontAwesome name='heart-o' size={18}/>
                        <Text style={styles.textButton}>{this.props.dataPost.data.likes.length}</Text>
                    </View>
                </TouchableOpacity>
                
                }

                </View>

                {/* Descripcion */}
                <View style={styles.description}>
                    <TouchableOpacity
                        onPress={ ()=> this.props.navigation.navigate('Profile', this.props.dataPost.data.owner)}>
                        <Text style={styles.nameDescription}>{this.props.dataPost.data.userName} </Text>
                    </TouchableOpacity>
                        <Text >{this.props.dataPost.data.post}</Text>
                </View>

                {/* Comments */}







                
                <TouchableOpacity style={styles.commentCount}
                    onPress={() => this.props.navigation.navigate('Comments', this.props.dataPost.data.image)}>
                    {this.props.dataPost.data.comments.length == 1
                     
                    ? 
                        <Text style={styles.text}> {this.props.dataPost.data.comments.length} comment</Text>
                    
                    :

                        <Text style={styles.text}> {this.props.dataPost.data.comments.length} comments</Text>
                    }  
                </TouchableOpacity>
               
                <View style={styles.containerComment}>
                    <TextInput
                            onChangeText={(text) => this.setState({commentText: text})}
                            placeholder= 'Añade un comentario'
                            keyboardType='default'
                            value={this.state.commentText}
                            style={styles.input}
                        />
                    <TouchableOpacity onPress={() => this.comment(this.state.commentText)}>
                    <Feather name="send" size={19} color="black" />
                    </TouchableOpacity> 
                </View>
                <TouchableOpacity onPress={() => this.setState({ showComment: !this.state.showComment })}>
                <Text>
                    {this.state.showComment ? 'Ocultar Comentarios' : 'Mostrar Comentarios'}
                </Text>
                </TouchableOpacity>
                {this.state.showComment === true ?
                    <FlatList
                        data={this.props.dataPost.data.comments}
                        keyExtractor={(ok) => ok.id}
                        renderItem={({ item }) => (
                        <TouchableOpacity>
                            <View>
                            <Text><Text>{item.userName}</Text>: {item.comment}</Text>
                            </View>
                </TouchableOpacity>
            )}
          />
          :
          <Text></Text>
        }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        backgroundColor: 'rgb(240, 228, 228)',
        height: 600
    },
    userName:{
        fontSize: 18,
        color: 'rgb(94, 63, 67)',
        marginTop: 10,
        marginLeft: 6,
    },
    button:{
        backgroundColor:'#d7bebe',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginTop: 3,
        marginBottom: 8,
        marginLeft: 8,
        borderRadius: 4,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#d7bebe',
        height: 28,
        width: 62,
        display: 'flex',
        justifyContent: 'center'
    },
    textButton:{
        textAlign: 'center',
        fontSize: 16,
        color: 'rgb(94, 63, 67)',
        marginLeft: 10
    },
    iconContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    description:{
        fontSize: 14,
        flexDirection:'row',
        justifyContent: 'left',
        marginBottom: 8,
        marginLeft: 8,
        color: 'gray'
    },
    camera: {
        width: '100%',
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
    profileContainer: {
        flexDirection: 'row',
        width: '100',
        justifyContent:'left',
        marginLeft: 8,
        marginTop: 15,
        marginBottom: 2,
    },
    nameDescription: {
        fontWeight: 'bold',
        marginBottom: 0
    },
    commentCount: {
        flexDirection:'row',
        marginTop: 2,
        marginBottom: 5,
        justifyContent: 'left'
    },
    text: {
        marginLeft: 6
    },
    containerComment: {
        flexDirection: "row",
        alignItems: 'center',
        width: '100%',
        flex: 1,
        marginLeft: 8
    },
    input: {
        color: '#666666',
        height: 32,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
    }
})

export default Post;