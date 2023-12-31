import React, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { auth, db } from '../../firebase/config';
import Post from '../../components/Post/Post';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            arrayPost: []
        }
    }

    componentDidMount() {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            post => {
                let postsShow = [];
                post.forEach(onePost => {
                    postsShow.push(
                        {
                            id: onePost.id,
                            data: onePost.data()
                        }
                    )
                })
                this.setState({
                    arrayPost: postsShow
                })
            }
        )
    }

    render() {
        return (
            <View style={styles.formContainer}>
                <Image
                    style={styles.image}
                    source={require('../../../assets/albas.png')}
                    resizeMode='contain' />
                {
                    this.state.arrayPost.length == 0

                        ?

                        <View style={styles.loader}>
                            <ActivityIndicator size='large' color='pink' />
                        </View>

                        :

                        <FlatList
                            data={this.state.arrayPost}
                            keyExtractor={(onePost) => onePost.id}
                            renderItem={({ item }) => <Post dataPost={item} navigation={this.props.navigation} />}
                        />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: 'rgb(240, 228, 228)',
        flex: 1,
    },
    image: {
        height: 60,
        marginTop: 10
    },
    loader: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    }
})

export default Home;