import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = ({ title, style, onPress }) => {
    return (
        <TouchableOpacity  style={[st.container, style]}
            onPress={onPress}>
            <Text style={st.txt}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton

const st = StyleSheet.create({
    container: {
        width: "60%",
        padding: 15,
        backgroundColor: "#fe724c",
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'

    },
    txt: {
        fontSize: 18,
        color: "#fff",
        fontWeight: '600'
    }
})