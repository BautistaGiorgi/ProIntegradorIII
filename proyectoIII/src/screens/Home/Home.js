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
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            post => {
                let postsShow = [];
                post.forEach( onePost => {
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

    render(){
        return(
            <View style={styles.formContainer}>
                {
                    this.state.arrayPost.length == 0
                    ? <Text>
                        Cargando
                    </Text>

                    : <FlatList
                        data= {this.state.arrayPost}
                        keyExtractor={ onePost => onePost.id }
                        renderItem={({item}) => <Post infoPost = {item} navigation={this.props.navigation}/>}
                    />
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
  })

export default Home;