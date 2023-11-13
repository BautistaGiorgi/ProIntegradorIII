import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";
import { Entypo } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';

import Home from "../screens/Home/Home";
import PostForm from "../screens/PostForm/PostForm";
import Profile from "../screens/Profile/Profile";
import ProfileUsers from "../screens/ProfileUsers/ProfileUsers";
import Search from "../screens/Search/Search";

const Tab = createBottomTabNavigator()

class Menu extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
        <Tab.Navigator screenOptions = {{tabBarShowLabel:false}}>
            <Tab.Screen 
              name='Home' 
              component={Home} 
              options={{
                tabBarIcon: () => <Entypo name="home" size={24} color="black"/>}} 
            />

            <Tab.Screen
             name='PostForm'
             component={PostForm} 
             options={{
                tabBarIcon: () => <Octicons name="diff-added" size={24} color="black"/>}} 
            />

            <Tab.Screen 
              name='Search' 
              component={Search} 
              options={
              {tabBarIcon: () => <FontAwesome name="search" size={24} color="black"/>}}
            />

            <Tab.Screen 
              name='Profile'
              component={Profile}  
              options={
              {tabBarIcon: () => <Ionicons name="person" size={24} color="black"/>}}
            />
        </Tab.Navigator>
    );
  }
}

export default Menu;
