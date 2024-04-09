import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const HeaderCom = ({ navigation }) => {
  return (
    <View style={{ width: '100%', marginBottom: 10 }}>
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
        <TouchableOpacity style={{ backgroundColor: '#fff', padding: 5, borderRadius: 10 }}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Icon name={"menu-outline"} size={28} color={"#fe724c"} />
        </TouchableOpacity>

        <View style={{ width: '85%' }}>
          <TextInput
            style={{ width: '100%', paddingVertical: 5, borderWidth: 2, borderRadius: 10, borderColor: '#fff', paddingHorizontal: 40, fontSize: 16, }}
            placeholder='Search'
            placeholderTextColor={"#fe724c"}
            caretHidden={true}
            editable={false} />
          <Icon name={"search-outline"} size={24} style={st.search} />
        </View>
      </View>
    </View>
  )
}

export default HeaderCom

const st = StyleSheet.create({
  search: {
    position: 'absolute',
    left: 10,
    top: 10,
    color: '#fe724c'
  }
})