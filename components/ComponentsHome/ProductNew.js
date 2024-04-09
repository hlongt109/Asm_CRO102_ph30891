import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import saveRecentlyProduct from '../../utilities/saveRecentlyProduct';
import { useDispatch, useSelector } from "react-redux";
import { fetchProductNew } from '../../src/redux/actions/foodAction';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ProductNew = () => {
    const [dataNew, setDataNew] = useState([]);
    const navigation = useNavigation();

    const listProductNews = useSelector(state => state.listProductNew.listProductNew)

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchProductNew())
    }, [dispatch])

    const renderItemSeparator = () => (
        <View style={{ width: 10 }} />
    );
    const formatPrice = (price) => {
        return price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    };
    return (
        <View style={st.container}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#333' }}>New</Text>
            <View style={{ width: '100%', marginTop: 10 }}>
                <FlatList
                    nestedScrollEnabled={true}
                    horizontal={true}
                    data={listProductNews}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ width: WIDTH / 3, borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: '#ffece7' }}
                            onPress={() => {
                            navigation.navigate("Details",{item})
                            saveRecentlyProduct(item.id);
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

export default ProductNew

const st = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 10
    }
})