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
            
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', this.props.dataPost.data.owner)} style={styles.profileContainer}>
                    <Image style={styles.profilePicture}  source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}} resizeMode='contain'/> 
                    <Text style={styles.userName}>{this.props.dataPost.data.userName}</Text>
                </TouchableOpacity>
                
                
                {/* Foto */}

                <Image style={styles.camera} source={{uri:this.props.dataPost.data.image}}/>

                <View>
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

                {/* Descripcion */}
                <View style={styles.description}>
                    <TouchableOpacity
                        onPress={ ()=> this.props.navigation.navigate('Profile', this.props.dataPost.data.owner)}>
                        <Text style={styles.nameDescription}>{this.props.dataPost.data.userName} </Text>
                    </TouchableOpacity>
                        <Text >{this.props.dataPost.data.post}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        backgroundColor: 'rgb(240, 228, 228)',
        height: 500
    },
    userName:{
        fontSize: 18,
        color: 'rgb(94, 63, 67)',
        paddingTop: 10,
        paddingLeft: 6,
    },
    button:{
        backgroundColor:'#d7bebe',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginTop: 5,
        marginBottom: 8,
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
        fontSize: 18,
        color: 'rgb(94, 63, 67)',
        marginLeft: 10
    },
    iconContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    description:{
        fontSize: 14,
        flex:1,
        flexDirection:'row',
        justifyContent: 'left',
        marginBottom:20,
        color: 'gray',
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
    profileContainer: {
        flex:1,
        flexDirection: 'row',
        height: 50,
        width: '100',
        justifyContent:'left',
        marginLeft: 5,
        marginTop: 15,
        marginBottom: 35,
    },
    nameDescription: {
        fontWeight: 'bold'
    }
})

export default Post;