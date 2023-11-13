import React, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';
import { auth, db } from '../../firebase/config';

class Home extends Component {
    constructor(){
        super()
        this.state={
            arrayPost: []
        }
    }

    componentDidMount(){
        db.collection('posts').orderBy('createdAt' , 'desc').onSnapshot(
            post => {
                let postsShow = [];
                post.forEach( unPost => {
                    postsShow.push(
                        {
                            id: unPost.id,
                            datos: unPost.data()
                        }
                    )
                })
    
                this.setState({
                    arrayPost: postsShow
                })
            }
        )
    }

    render(){
        return(
            <View style={styles.container}>
                {
                    this.state.arrayPost.length == 0
                    ? <Text>
                        Cargando
                    </Text>

                    : <FlatList
                        data= {this.state.arrayPost}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={({item}) => <Post infoPost = {item} navigation={this.props.navigation}/>}
                    />
                }
            </View>
        )
    }
}

export default Home;