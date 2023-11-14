import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            like: false
        }
    }
    
    componentDidMount(){
        let  likes = this.props.dataPost.data.likes.length

        if(likes.length == 0){
            this.setState({
                like: false
            })
        }
        if(likes.length > 0){
            likes.forEach(like => {if (like === auth.currentUser.email) {
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
            like: true,
            likes: this.props.dataPost.data.likes.length
        }))
        .catch(error => console.log(error))
    }

    dislike(){
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes:firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(this.setState({
            like: false,
            likes: this.props.dataPost.data.likes.length
        }))
        .catch(error => console.log(error))
    }

    render(){
        return(
            <View style={styles.formContainer}>
                {/* Perfil del usuario */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileUsers', this.props.dataPost.data.owner)} style={styles.container}>
                    <Image source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}} resizeMode='contain'/> 
                    <Text style={styles.userName}>{this.props.dataPost.data.userName}</Text>
                </TouchableOpacity>
                
                {/* Post */}
                <Image source={{uri:this.props.dataPost.data.photo}}/>
                <Text style={styles.description}>{this.props.dataPost.data.post}</Text>
              
                {/* Likes */}
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
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        backgroundColor: 'rgb(240, 228, 228)',
        paddingHorizontal:10,
        flex: 1, 
    },
    input:{
        color: '#666666',
        height: 35,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    userName:{
        fontSize: 20,
        color: 'rgb(94, 63, 67)',
        fontFamily: 'Nunito',
    },
    button:{
        backgroundColor:'#d7bebe',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 4,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#d7bebe',
        height: 35,
        width: 62,
        display: 'flex',
        justifyContent: 'center'
    },
    textButton:{
        textAlign: 'center',
        fontSize: 18,
        color: 'rgb(94, 63, 67)',
        fontFamily: 'Nunito',
        marginLeft: 10
    },
    iconContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    description:{
        fontSize: 14,
        color: 'gray',
        fontFamily: 'Nunito',
    }
})

export default Post;