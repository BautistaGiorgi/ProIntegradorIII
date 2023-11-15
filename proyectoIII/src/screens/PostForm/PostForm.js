import React, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import MyCamera from '../../components/MyCamera/MyCamera';

class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: '',
            description: '',
            url: '',
            user: '',
            showCamera: true
        }
    }
    
    componentDidMount(){
        db.collection('user').where('owner', '==', auth.currentUser.email).onSnapshot(
          data => {
            let info = [];
            data.forEach(i => {
              info.push(
                {
                  id: i.id,
                  data: i.data()
                })
            })
            this.setState({
              user: info
            })
          }
        )
    }

    createPost(owner, post, createdAt) {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            userName: this.state.user[0].data.userName,
            post: this.state.post,
            image: this.state.url,
            createdAt: Date.now(),
            description: this.state.description,
            likes: [],
            comments: []
        })
            .then( 
                this.setState ({ 
                post: '',
                showCamera: true,
                url: ''
            })
            )
            .catch(error => console.log(error))
    }
    onImageUpload(url) {
        this.setState({ url: url, showCamera: false });
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Image 
                style={styles.image} 
                source={require('../../../assets/albas.png')}
                resizeMode='contain'/> 

            {this.state.showCamera 

            ?

            <MyCamera onImageUpload={(url) => this.onImageUpload(url)} />

            :
            
            <React.Fragment>
                <Text style={styles.title}>Nuevo Posteo</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({post: text })}
                        placeholder='Breve descripción'
                        keyboardType='default'
                        value={this.state.post}
                    />

                    <TouchableOpacity style={styles.button} onPress={() => {this.createPost(), this.props.navigation.navigate('Home')}}>
                        <Text style={styles.textButton}>Postear</Text>
                    </TouchableOpacity>  
            </React.Fragment>

            }

            </View>
        )
    }
}


const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: 'rgb(240, 228, 228)',
        paddingHorizontal:10,
        flex: 1, 
    },
    title: {
        fontSize: 40,
        fontWeight: 400,
        color: 'rgb(135, 90, 97)',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 20,
        padding: 25
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
        marginVertical:10,
    },
    button: {
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
        display: 'flex',
        justifyContent: 'center'
    },
    textButton: {
        textAlign: 'center',
        fontSize: 20,
        color: 'rgb(94, 63, 67)',
    },
    image: {
        height: 60,
        marginTop: 10
    },
})

export default PostForm;