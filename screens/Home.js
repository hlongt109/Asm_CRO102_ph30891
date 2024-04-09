import { Image, StatusBar, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import HeaderCom from '../components/ComponentsHome/HeaderCom'
import SlideShow from '../components/ComponentsHome/SlideShow'
import ProductHot from '../components/ComponentsHome/ProductHot'
import ProductNew from '../components/ComponentsHome/ProductNew'
import { ScrollView } from 'react-native-virtualized-view'
import Category from '../components/ComponentsHome/Category'
import Recently from '../components/ComponentsHome/Recently'
import AsyncStorage from '@react-native-async-storage/async-storage'



const Home = () => {
  const navigation = useNavigation();

  return (

    <View style={{flex:1, backgroundColor: "#E8E8E8", padding: 10 }}>
      <HeaderCom navigation={navigation} />
      <ScrollView nestedScrollEnabled={true}>
        <SlideShow />
        <ProductHot />
        <ProductNew />
        <Category />
        <Recently />
      </ScrollView>
    </View>
  )
}

export default Home

const st = StyleSheet.create({

})