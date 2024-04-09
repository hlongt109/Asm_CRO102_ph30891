import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import ModalSendComment from '../components/ModalSendComment';
import Recently from '../components/ComponentsHome/Recently';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from "react-redux";
import { createFavouriteApi, fetchCommentApi, fetchUserApi } from '../src/redux/actions/foodAction';
import { clearCommentList, sendCommentApi } from '../src/redux/reducers/foodReducer';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Details = ({ route }) => {
    const { item } = route.params;
    const [comments, setComment] = useState([]);
    const [users, setUsersList] = useState([])

    const [openModal, setOpenModal] = useState(false)
    const [iconHeartActive, setIconHeartActive] = useState(false);
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const listComment = useSelector(state => state.listComment.listComment)
    const listUser = useSelector(state => state.listUser.listUser)
    
    const totalComment = listComment.length;


    useEffect(() => {
        loadComment()
    }, [item])

    const loadComment = async() => {
        try {
            await dispatch(clearCommentList());
            await dispatch(fetchCommentApi(item.id))
            await dispatch(fetchUserApi())
        } catch (error) {
            console.log(error)
        }

    }


    // const resetData = () => {
    //     dispatch(clearCommentList());
    //     loadComment();
    // }

    const formatPrice = (price) => {
        if (price && typeof price === 'number') {
            return price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
        } else {
            return 'N/A';
        }
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

    const stars = [];
    const integerPart = Math.floor(item.rating);
    const decimalPart = item.rating - integerPart;

    for (let i = 0; i < integerPart; i++) {
        stars.push(<Icon key={i} name={"star"} size={15} color={"#ffa033"} />);
    }

    if (decimalPart >= 0.5) {
        stars.push(<Icon key="half" name={"star-half"} size={15} color={"#ffa033"} />);
    }

    while (stars.length < 5) {
        stars.push(<Icon key={stars.length} name={"star-outline"} size={15} color={"#ffa033"} />);
    }

    const getUsernameFromUserId = (userId) => {
        const user = listUser.find(user => user.id === userId);
        return user ? user.name : 'Unknown';
    };
    const getStart = (star) => {
        const stars = []
        for (let i = 0; i < star; i++) {
            stars.push(<Icon key={i} name={"star"} size={15} color={"#ffa033"} />);
        }
        while (stars.length < 5) {
            stars.push(<Icon key={stars.length} name={"star-outline"} size={15} color={"#ffa033"} />);
        }
        return stars;
    }
    const renderItemComment = ({ item }) => (
        <View style={{ width: '100%', padding: 10, backgroundColor: '#fff', flexDirection: 'column', marginTop: 7 }}>
            <View style={{ flexDirection: 'row', width: '100%', }}>
                <Image source={require('../assets/person.jpeg')} style={{ width: 25, height: 25, borderRadius: 15 }} />

                <View style={{ marginLeft: 10, marginTop: 2 }}>
                    <Text style={{ fontSize: 14, color: '#484848', fontWeight: '600', }}>{getUsernameFromUserId(item.userId)}</Text>
                    <View style={{ marginTop: 7, flexDirection: 'row' }}>
                        {getStart(item.star)}
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 10, width: '100%', paddingHorizontal: 5 }}>
                <Text style={{ textAlign: 'justify', color: '#484848', lineHeight: 22, fontSize: 16 }}>{item.content}</Text>
            </View>
        </View>
    );

    // handle save favourite
    const getUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            return userId;
        } catch (error) {
            console.log(error)
        }
    }
    const handleSaveFavourie = async () => {
        const idProduct = item.id;
        const userId = await getUserId();
        const result = await dispatch(createFavouriteApi(idProduct, userId))
        if (result) {
            setIconHeartActive(true)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 9.3, backgroundColor: "#E8E8E8" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff' }}>
                    <TouchableOpacity
                        style={{ padding: 5, backgroundColor: '#fe724c', borderRadius: 10 }}
                        onPress={() => {
                        
                            navigation.goBack();
                            
                        }}>
                        <Icon name={"chevron-back"} size={20} color={"#fff"} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, fontWeight: '700', textAlign: 'center', width: '88%', color: '#444' }}>Details</Text>
                </View>
                <ScrollView>
                    <View>
                        <Image style={{ width: WIDTH, height: HEIGHT * 0.3, }} source={{ uri: item.image }} />
                    </View>

                    <View style={{ width: '100%', backgroundColor: '#fff', padding: 10 }}>
                        <Text style={st.text}>{item.name}</Text>
                        <Text style={st.textPrice}>{formatPrice(item.price)}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                {stars}
                                <Text style={st.textSold}> {item.rating}</Text>
                                <Text style={{ marginHorizontal: 7 }}> | </Text>
                                <Text style={st.textSold}>Đã bán {formatSold(item.sold)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                                <TouchableOpacity
                                    style={{ marginRight: 15 }}
                                    onPress={() => {
                                        handleSaveFavourie()
                                    }}>
                                    <Icon name={iconHeartActive ? "heart" : "heart-outline"} size={24} color={iconHeartActive ? "#f20" : "#696969"} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {

                                    }}>
                                    <Icon name={"share-social-outline"} size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '100%', backgroundColor: '#fff', marginTop: 7, padding: 10 }}>
                        <Text style={st.textSold}>Mô tả</Text>
                        <Text style={st.textDes}>{item.description}</Text>
                    </View>

                    <View style={{ width: '100%', backgroundColor: '#fff', marginTop: 7, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={st.textSold}>Đánh giá sản phẩm</Text>
                            <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 5 }}>
                                {stars}
                                <Text style={{ color: "#f20", fontSize: 14 }}> {item.rating} / 5</Text>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>{`(${totalComment} đánh giá)`}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ padding: 10, backgroundColor: '#fe724c', borderRadius: 7 }}
                            onPress={() => {
                                // Open modal comment
                                setOpenModal(true)
                            }}>
                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: "600" }}>Đánh giá</Text>
                        </TouchableOpacity>
                    </View>
                    {totalComment !== 0
                        ?
                        <FlatList
                            nestedScrollEnabled={true}
                            scrollEnabled={false}
                            data={listComment}
                            keyExtractor={(item, index) => item.id + index}
                            renderItem={renderItemComment}
                        />
                        :
                        <View style={{ width: '100%', backgroundColor: '#fff', marginTop: 10, padding: 10, height: 90, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#444' }}>Chưa có đánh giá</Text>
                        </View>}
                    <Recently />
                </ScrollView>
            </View>

            <View style={{ flex: 0.7, backgroundColor: '#fff', height: 70, borderTopWidth: 0.2, borderTopColor: '#ddd' }}>
                <View style={{ width: '100%', flexDirection: 'row', height: '100%' }}>
                    <TouchableOpacity style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon2 name={"cart-plus"} size={30} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: '50%', backgroundColor: "#fe724c", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: "bold" }}>Buy now</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <ModalSendComment productId={item.id} visible={openModal} onClose={() => {
                setOpenModal(false)
                loadComment()
                // resetData()
            }} />
        </SafeAreaView>

    )
}

export default Details

const st = StyleSheet.create({
    text: {
        fontSize: 26, fontWeight: '600', color: '#444', marginTop: 3
    },
    textPrice: {
        fontSize: 18, fontWeight: '600', color: '#fe724c', marginTop: 5
    },
    textSold: {
        fontSize: 16, color: '#484848'
    },
    textDes: {
        fontSize: 16, lineHeight: 24, textAlign: 'justify'
    }
})