import { Modal, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from "react-redux";
import { createCommentApi, sendCommentApi } from '../src/redux/actions/foodAction';

const ModalSendComment = ({ productId, visible, onClose}) => {
    const [starNumber, setStarNumber] = useState(5)
    const [commentFood, setCommentFood] = useState("")

    const dispatch = useDispatch();

    const stars = []
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <TouchableOpacity key={i} onPress={() => setStarNumber(i)}>
                <Icon name={i <= starNumber ? "star" : "star-outline"} size={30} color={'#fe724c'} style={{ marginHorizontal: 5 }} />
            </TouchableOpacity>
        );
    }

    const getUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            return userId;
        } catch (error) {
            console.log(error)
        }
    }

    const handleSendComment = async () => {
        const userId = await getUserId();
        dispatch(sendCommentApi(productId, commentFood, userId, starNumber));
        clearField()
        onClose();
    }
    const clearField = () => {
        setCommentFood("")
        setStarNumber(5);
    }
    return (
        <Modal animationType='fade' transparent={true} visible={visible} onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Đánh giá sản phẩm</Text>
                    <View style={styles.starContainer}>
                        {stars}
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập đánh giá của bạn..."
                        multiline={true}
                        numberOfLines={4}
                        value={commentFood}
                        onChangeText={text => setCommentFood(text)}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#ccc' }]} onPress={onClose}>
                            <Text style={styles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#fe724c' }]} onPress={handleSendComment}>
                            <Text style={styles.buttonText}>Gửi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalSendComment

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        width: '90%',
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        elevation: 5
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
    starContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },
    input: {
        width: '100%',
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    button: {
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})