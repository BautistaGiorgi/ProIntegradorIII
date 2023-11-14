import react, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Camera from '../../components/Camera/Camera';

class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postUrl: '',
            description: '',
            url: '',
            showCamera: true
        }
    }

    createPost(owner, postUrl, createdAt) {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            userName: auth.currentUser.userName,
            postUrl: this.state.postUrl,
            createdAt: Date.now(),
            description: this.state.description,
            likes: [],
            comments: []
        })
            .then(
                this.props.navigation.navigate("Home")
            )
            .catch(e => console.log(e))
    }
    onImageUpload(url) {
        this.setState({ url: url, showCamera: false });
    }

    render() {
        return (
            <View>

                {this.state.showCamera ? <Camera onImageUpload={(url) => this.onImageUpload(url)} /> :
                    <>
                        <Text>Nuevo Posteo</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({ postUrl: text })}
                            placeholder='Escribir...'
                            keyboardType='default'
                            value={this.state.postUrl}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => this.createPost(auth.currentUser.email, this.state.postUrl, Date.now())}>
                            <Text style={styles.textButton}>Postear</Text>
                        </TouchableOpacity>

                    </>}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    formContainer: {
        paddingHorizontal: 10,
        marginTop: 20,
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton: {
        color: '#fff'
    }
})

export default PostForm;