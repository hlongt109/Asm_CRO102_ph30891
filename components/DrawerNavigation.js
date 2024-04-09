import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import IconTheme from 'react-native-vector-icons/MaterialCommunityIcons'
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from './ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from '../screens/Home';
import Favourite from '../screens/Favourite';
import ChangePass from '../screens/ChangePass';
import Setting from '../screens/Setting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
// import Home from '../screens/Home';
// import Setting from '../screens/Setting';
// import ChangePass from '../src/screens/ChangePass';
// import Favourite from '../src/screens/Favourite';

const Drawer = createDrawerNavigator();


const Header = () => {

    const { theme } = useTheme();
    return (
        <SafeAreaView>
            <View style={[st.header, { backgroundColor: theme == 'light' ? '#fff' : '#000' }]}>
                <Image source={require('../assets/image.png')} style={[st.avatar, { borderColor: theme == "light" ? '#fe724c' : '#EEEEEE' }]} />
                <View style={{marginLeft: 15,}}>
                    <Text style={[st.username, { color: theme == 'light' ? '#333333' : '#EEEEEE' }]}>Tran Hoang Long</Text>
                    <Text>longthph30891@fpt.edu.vn</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
const Footer = () => {
    const navigation = useNavigation();
    const { theme, toggleTheme } = useTheme();
    const handleLogOut = () =>{
        Alert.alert("Notification",
        "Are you sure you want to log out?", 
        [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'Log Out',
              onPress: () => {
                signOut();
                clearSpecificData();
                navigation.navigate("Login");
              },
              style: 'destructive'
            }
          ],
          { cancelable: false }
        );
    }
    
    const signOut = async () => {
        try {
          await auth().signOut();
          console.log('User signed out successfully');
        } catch (error) {
          console.error('Error signing out:', error.message);
        }
      };
      const clearSpecificData = async () => {
        try {
          await AsyncStorage.removeItem('isLoggedIn');
          await AsyncStorage.removeItem('userEmail');
          await AsyncStorage.removeItem('userId');
          console.log('Specific data cleared successfully');
        } catch (error) {
          console.error('Error clearing specific data:', error.message);
        }
      };
    return (
        <SafeAreaView>
            <View style={[st.footer, { backgroundColor: theme == 'light' ? '#fff' : '#000' }]}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
                onPress={() =>{
                    // logout
                    handleLogOut();
                    
                    // handleLogOut()
                }}>
                    <IconMat name={'logout'} size={24} color={theme == 'light' ? '#fe724c' : "#EEEEEE"} />
                    <Text style={{ color: theme == 'light' ? "#000" : "#EEEEEE", fontSize: 18, fontWeight: '600', marginLeft: 31 }}>Log out</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                    <IconTheme name={"theme-light-dark"} size={24} color={theme == 'light' ? '#fe724c' : "#EEEEEE"}/>
                    
                    <TouchableOpacity onPress={toggleTheme} style={{marginLeft: 28}}>
                        {theme == 'light' ? <Image source={require("../assets/off.png")} style={st.imgToggle} /> : <Image source={require("../assets/on.png")} style={st.imgToggle} />}
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <Header />
            <DrawerItemList {...props} />
            <Footer />
        </DrawerContentScrollView>
    )
}

const DrawerNavigation = () => {
    const { theme } = useTheme();
    return (
        <Drawer.Navigator
            drawerContent={CustomDrawerContent}
            screenOptions={{
                drawerStyle: { backgroundColor: theme == 'light' ? '#fff' : '#000', width: 350 },
                headerStyle: { backgroundColor: '#fff' },
                headerTintColor: theme == 'light' ? '#EEEEEE' : '#000',
                drawerLabelStyle: { color: theme == 'light' ? '#111' : '#EEEEEE', fontSize: 18 }, // Màu chữ của menu
            }}>
            <Drawer.Screen name='Home' component={Home} options={{
                drawerLabel: "Home",
                title: "Home",
                drawerIcon: ({ color, size }) => (
                    <Icon name="home-outline" size={size} color={theme == 'light' ? '#fe724c' : "#EEEEEE"} />
                ),
                headerShown: false
            }}
            />
            <Drawer.Screen name='Favourite' component={Favourite} options={{
                drawerLabel: "Favourite",
                drawerIcon: ({ size }) => (
                    <Icon name="heart-outline" size={size} color={theme == 'light' ? '#fe724c' : "#EEEEEE"} />
                ),
                headerShown: false
            }}
            />
            <Drawer.Screen name='ChangePass' component={ChangePass} options={{
                drawerLabel: "Change password",
                drawerIcon: ({ size }) => (
                    <Icon name="key-outline" size={size} color={theme == 'light' ? '#fe724c' : "#EEEEEE"} />
                ),
                headerShown: false
            }}
            />
            <Drawer.Screen name='Setting' component={Setting} options={{
                drawerLabel: "Settings",
                drawerIcon: ({ size }) => (
                    <Icon name="settings-outline" size={size} color={theme == 'light' ? '#fe724c' : "#EEEEEE"} />
                ),
                headerShown: false
            }}
            />
        </Drawer.Navigator>
    )
}
export default DrawerNavigation

const st = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 150,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#DCDCDC",
        borderBottomWidth: 0.7,
    },
    avatar: {
        height: 90,
        width: 90,
        borderRadius: 45,
        borderWidth: 2,
    },
    username: {
        fontSize: 22,
        marginVertical: 6,
        fontWeight: 'bold',
    },
    footer: {
        width: '100%',
        padding: 20,
        flexDirection: 'column',
        borderTopWidth: 0.6,
        borderColor: "#dddddd"
    },
    imgToggle: {
        width: 56, height: 28
    }
})