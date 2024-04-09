import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'


const CustomTextInput = ({ style, ...restProps }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    return (

        <TextInput {...restProps}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={[st.input, style, isFocused && st.focusedInput]} />
    )
}

export default CustomTextInput

const st = StyleSheet.create({
    input: {
        padding: 15,
        marginBottom: 15,
        borderWidth: 1.5,
        borderColor: "#b6b5bd",
        borderRadius: 15,
        width: "100%",
        fontSize: 16,
        color: "#333"
    },
    focusedInput: {
        borderColor: "#fe724c",
    },
})