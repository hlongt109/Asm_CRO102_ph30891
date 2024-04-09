import { Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Welcome = () => {
    const navigation = useNavigation();
    useEffect(() => {
        checkLoginStatus();
      }, []);
      const checkLoginStatus = async () => {
        try {
          const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
          if (isLoggedIn === 'true') {
            setTimeout(() => {
               navigation.navigate("Drawer")
            }, 1500)
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      }
    return (
        <View style={st.container}>
            <ImageBackground source={require("../assets/welcom.png")} style={st.background}>
                <LinearGradient colors={["#f3f3f3", "#191b2e"]} style={st.gradient}>
                    <View>
                        <Text style={st.welcome}>Welcome to</Text>
                        <Text style={st.name}>FoodHub</Text>
                        <Text style={st.introl}>{`Your favourite foods delivered\nfast at your door`}.</Text>
                    </View>

                    <View style={st.container2}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>
                            <View style={st.line} />
                            <Text style={{ color: "#fff", marginHorizontal: 7, fontSize: 16, }}>sign in with</Text>
                            <View style={st.line} />
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 }}>
                            <TouchableOpacity style={st.btn}
                                onPress={() => {

                                }}>
                                <Image source={require("../assets/fb.png")}
                                    style={{ width: 30, height: 30 }} />
                                <Text style={{ color: '#000', fontSize: 16, marginLeft: 5, fontWeight: '700' }}>Facebook</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={st.btn} onPress={() => {

                            }}>
                                <Image source={require("../assets/gg.png")}
                                    style={{ width: 30, height: 30 }} />
                                <Text style={{ color: '#000', fontSize: 16, marginLeft: 5, fontWeight: '700' }}>Google</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={st.btn2}
                            onPress={() => {
                                navigation.navigate("Login")
                            }}>
                            <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>Sign in with email</Text>
                        </TouchableOpacity>

                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <Text style={{ color: "#fff", fontSize: 16 }}>Dont't have an account ? </Text>
                            <Text style={{ color: "#fe724c", fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }}
                                onPress={() => {
                                    navigation.navigate("SignUp")
                                }}
                            >Sign Up</Text>
                        </View>
                        <View style={st.footer}></View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    )
}

export default Welcome

const st = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        justifyContent: 'center',
        width: '100%', height: '100%',

    },
    gradient: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    welcome: {
        fontSize: 55, color: "#111", fontWeight: 'bold',
        marginTop: '50%'
    },
    name: {
        fontSize: 45, color: "#fe724c", fontWeight: 'bold',
    },
    introl: {
        fontSize: 18, color: "#111", fontWeight: '600', lineHeight: 27, marginTop: 5
    },
    footer: {
        width: "50%", height: 4, backgroundColor: '#fff', borderRadius: 5,
        position: 'absolute', bottom: 0
    },
    container2: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        width: 100, height: 2, backgroundColor: '#fff', borderRadius: 4
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 25,
        backgroundColor: '#fff',
        width: ' 40%'
    },
    btn2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 25,
        backgroundColor: '#fff',
        width: ' 100%',
        marginBottom: 25
    }
})