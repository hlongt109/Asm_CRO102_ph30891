import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const Header = ({navigation, title}) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff' }}>
        <TouchableOpacity
          style={{ padding: 5, backgroundColor: '#fe724c', borderRadius: 10 }}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Icon name={"chevron-back"} size={20} color={"#fff"} />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: '700', textAlign: 'center', width: '88%', color: '#444' }}>{title}</Text>
      </View>
  )
}

export default Header

const styles = StyleSheet.create({})