import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import saveRecentlyProduct from '../../utilities/saveRecentlyProduct'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoryApi, fetchProductApi, fetchProductsByCategoryId } from '../../src/redux/actions/foodAction'

const Category = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const [products, setProducts] = useState([]);

    const dsCategoty = useSelector(state => state.listCategoty.listCategory);

    const listProduct = useSelector(state => state.listProduct.listProduct)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoryApi());
        dispatch(fetchProductApi());
    }, [dispatch])


    useEffect(() => {
        if (activeCategoryId !== null && activeCategoryId !== "all") {
            const filteredProducts = listProduct.filter(product => product.categoryId === activeCategoryId);
            setProducts(filteredProducts);
        } else if (activeCategoryId == null || activeCategoryId == "all") {
            setProducts(listProduct);
        }
    }, [activeCategoryId, listProduct]);
    
    

    const handlePress = (id) => {
        setActiveCategoryId(id);
    };
    const formatPrice = (price) => {
        return price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    };
    const formatSold = (sold) => {
        if (sold < 1000) {
            return sold.toString();
        } else if (sold < 10000) {
            return (Math.round(sold / 100) / 10).toFixed(1) + "k";
        } else {
            return Math.round(sold / 1000) + "k";
        }
    };

    const renderItemMenu = ({ item}) => (
        <TouchableOpacity
            // key={item.id}
            onPress={() => handlePress(item.id)}
            style={{ marginRight: 10 }}>
            <Text style={[st.menuItem, activeCategoryId === item.id && st.activeMenuItem]}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    const renderProductItem = ({item}) => (
        <TouchableOpacity style={st.productItem}
            // key={item.id}
            onPress={() => {
                navigation.navigate("Details", { item }),
                    saveRecentlyProduct(item.id)
            }}>
            <Image source={{ uri: item.image }} style={{ width: '100%', height: 120, borderRadius: 7 }} />
            <Text style={st.text}>{item.name}</Text>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
                <Text style={st.textPrice}>{formatPrice(item.price)}</Text>
                <Text style={st.textSold}>Đã bán {formatSold(item.sold)}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)", width: 50, padding: 3, position: 'absolute', top: 10, right: 10, borderTopRightRadius: 7, justifyContent: 'center', borderBottomStartRadius: 15 }}>
                <Icon name={"star"} size={15} color={"#ffa033"} />
                <Text style={{ color: '#fff', fontSize: 12 }}> {item.rating}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={st.container}>
            <FlatList
                nestedScrollEnabled={true}
                horizontal
                data={dsCategoty}
                renderItem={renderItemMenu}
                keyExtractor={(item, index) => item.id + index}
            />
            <View style={{ marginTop: 7 }}>
                <FlatList
                    nestedScrollEnabled={true}
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={(item, index) => item.id + index}
                    numColumns={2}
                />
            </View>
        </View>
    );
}

export default Category

const st = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    menuItem: {
        fontSize: 18,
        color: '#333',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,

    },
    activeMenuItem: {
        borderBottomColor: '#fe724c',
        fontWeight: 'bold',
        color: '#fe724c'
    },
    productItem: {
        width: '48%',
        backgroundColor: '#fff',
        margin: 5,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    text: {
        fontSize: 15, fontWeight: '600', color: '#444', marginTop: 3
    },
    textPrice: {
        fontSize: 15, fontWeight: '600', color: '#fe724c'
    },
    textSold: {
        fontSize: 13, color: '#333'
    },

});