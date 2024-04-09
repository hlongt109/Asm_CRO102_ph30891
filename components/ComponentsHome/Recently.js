import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import saveRecentlyProduct from '../../utilities/saveRecentlyProduct';
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentyApi } from '../../src/redux/actions/foodAction';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const Recently = () => {
    const navigation = useNavigation();
    const [dataRecently, setDataRecently] = useState([]);

    const listRecently = useSelector(state => state.listRecently.listRecently)

    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(fetchRecentyApi())
    },[dispatch])

    // useEffect(() => {
    //     AsyncStorage.getItem("savedProductIds")
    //         .then((saveRecentId) => {
    //             if (saveRecentId) {
    //                 const productId = JSON.parse(saveRecentId);
    //                 const fetchPromises = productId.map((id) => {
    //                     return fetch(`http://10.0.2.2:3000/products/${id}`)
    //                         .then((res) => res.json());
    //                 });
    //                 Promise.all(fetchPromises)
    //                     .then((fetchProduct) => {
    //                         setDataRecently(fetchProduct);
    //                     })
    //                     .catch(e => console.error('Error fetching recently products:' + e));
    //             }
    //         })
    //         .catch(e => console.error('Error reading saved product IDs:', e));
    // }, [dataRecently])

    
    // useEffect(() => {
    //     AsyncStorage.getItem("savedProductIds")
    //         .then((saveRecentId) => {
    //             if (saveRecentId) {
    //                 const productId = JSON.parse(saveRecentId);
    //                 dispatch(fetchRecentyApi(productId));
    //             }
    //         })
    //         .catch(e => console.error('Error reading saved product IDs:', e));
    // }, [dispatch]);

    const renderItemSeparator = () => (
        <View style={{ width: 10 }} />
    );
    const formatPrice = (price) => {
        return price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    };
    return (
        <View style={st.container}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#333' }}>Recently viewed products</Text>
            <View style={{ width: '100%', marginTop: 10 }}>
                <FlatList
                    nestedScrollEnabled={true}
                    horizontal={true}
                    data={listRecently}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            // key={item.id}
                            style={{ width: WIDTH / 3, borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: '#ffece7' }}
                            onPress={() => {
                                navigation.navigate("Details", { item })
                            }}>
                            <View style={{ width: '100%' }}>
                                <View style={{ overflow: 'hidden' }}>
                                    <Image style={{ width: "100%", height: 100 }} source={{ uri: item.image }} />
                                </View>
                                <View style={{ width: '100%', padding: 5, flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#333' }}>{item.name}</Text>
                                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#333' }}>{formatPrice(item.price)}</Text>
                                </View>
                            </View>

                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={renderItemSeparator}
                />
            </View>
        </View>
    )
}

export default Recently

const st = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        marginTop: 10
    }
})