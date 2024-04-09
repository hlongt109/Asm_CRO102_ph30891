import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ThemeProvider } from './components/ThemeContext';
import Home from './screens/Home';
import Setting from './screens/Setting';
import DrawerNavigation from './components/DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';
import ChangePass from './screens/ChangePass';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Splash from './screens/Splash';
import Welcome from './screens/Welcome';
import Details from './screens/Details';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Splash'>
            <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='Setting' component={Setting} options={{ headerShown: false }} />
            <Stack.Screen name='ChangePass' component={ChangePass} options={{ headerShown: false }} />
            <Stack.Screen name='Drawer' component={DrawerNavigation} options={{ headerShown: false }} />
            <Stack.Screen name='Details' component={Details} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  )
}

export default App
