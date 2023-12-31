import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from './src/screens/Register/Register';
import Login from './src/screens/Login/Login';
import Menu from "./src/components/Menu/Menu";
import ProfileUsers from "./src/screens/ProfileUsers/ProfileUsers";
import Comments from './src/screens/Comments/Comments';
import Search from './src/screens/Search/Search';
import Profile from './src/screens/Profile/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name='Register' component={Register} options={{ headerShown: false }}/>
          <Stack.Screen name='Menu' component={Menu} options={{ headerShown: false }}/>
          <Stack.Screen name='Search' component={Search} options={{ headerShown: false }}/>
          <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }}/>
          <Stack.Screen name='ProfileUsers' component={ProfileUsers} options={{ headerShown: false }}/>
          <Stack.Screen name='Comments' component={Comments} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});