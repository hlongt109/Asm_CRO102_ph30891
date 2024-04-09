import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import InforBlock from '../components/InforBlock'
import { useNavigation } from '@react-navigation/native'


const Splash = () => {
  const navigation = useNavigation();

  useEffect(() =>{
    const switchScreen = setTimeout(() =>{
        navigation.navigate("Welcome")
    },3000)
    return () => clearTimeout(switchScreen);
  },[])

  return (
    <View style={st.container}>
      <Image source={require("../assets/logo.png")} style={{width: 100, height: 90, marginBottom: 20}}/>
      <InforBlock/>
      <View style={st.footer}></View>
    </View>
  )
}

export default Splash

const st = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#fe724c",
    justifyContent:'center',
    alignItems:'center'
  },
  footer:{
    width: "50%", height: 4, backgroundColor: '#fff',borderRadius:5,
    position: 'absolute', bottom: 15
  }
})