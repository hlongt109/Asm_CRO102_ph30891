import { Dimensions, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from "react-redux";
import { fetchFavuoriteApi } from '../src/redux/actions/foodAction';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const Favourite = () => {
  const navigation = useNavigation();
  const [favouriteData, setFavaouriteData] = useState([]);

  const listFavourite = useSelector(state => state.listFavourite.listFavourite);

  const dispatch = useDispatch();
  console.log(listFavourite)


  useEffect(() =>{
     loadData()
  },[dispatch])

  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      return userId;
    } catch (error) {
      console.log(error)
    }
  }

  const loadData = async() =>{
    try {
        const userId = await getUserId();
        dispatch(fetchFavuoriteApi(userId))
    } catch (error) {
      console.log(error)
    }
  }
  // useEffect(() => {
  //   fetch("http://10.0.2.2:3000/favourite")
  //     .then(response => response.json())
  //     .then(data => {
  //       // cần phải so sánh thêm userId
  //       setFavaouriteData(data)
  //     })
  //     .catch(e => console.log(e))
  // }, [favouriteData])

  const formatPrice = (price) => {
    if (price && typeof price === 'number') {
      return price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    } else {
      return 'N/A';
    }
  };

  const renderItemFavourite = ({ item }) => (
    <TouchableOpacity style={{ width: '100%', borderRadius: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#b6b5bd', backgroundColor: '#ffece7', marginBottom: 7 }}
      onPress={() => {
        // navigation.navigate("Details", { item })
      }}>
      <View style={{ width: '100%' }}>

        <View style={{ overflow: 'hidden' }}>
          <Image style={{ width: "100%", height: HEIGHT * 0.3 }} source={{ uri: item.image }} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ padding: 5, flexDirection: 'column', padding: 10 }}>
            <Text style={{ fontSize: 24, fontWeight: '600', color: '#333' }}>{item.name}</Text>
            <Text style={st.textPrice}>{formatPrice(item.price)}</Text>
          </View>

          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => {

            }}>
            <Icon name={"heart"} size={24} color={"#f20"} />
          </TouchableOpacity>
        </View>

      </View>

    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header navigation={navigation} title={"Favourite"} />
      <FlatList
        data={listFavourite}
        keyExtractor={(item )=> item.id }
        renderItem={renderItemFavourite}
        style={{ marginHorizontal: 7 }}
      />
    </SafeAreaView>
  )
}

export default Favourite

const st = StyleSheet.create({
  textPrice: {
    fontSize: 18, fontWeight: '600', color: '#fe724c'
  },
})