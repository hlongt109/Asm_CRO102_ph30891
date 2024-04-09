import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InforBlock = () => {
  return (
    <View style={st.container}>
      <Text style={st.name}>Name : Tran Hoang Long</Text>
      <Text style={st.mssv}>Student ID : PH30891</Text>
      <Text style={st.class}>Class : MD18305</Text>
    </View>
  )
}

export default InforBlock

const st = StyleSheet.create({
    name:{
        color: '#FFF',
        fontSize: 20,
        fontWeight: '600',
      },
      mssv:{
        color: '#FFF',
        fontSize: 17,
        fontWeight: '600',
        marginTop:7
      },
      class:{
        color: '#FFF',
        fontSize: 17,
        fontWeight: '600',
        marginTop:7
      },
      container:{
        borderRadius: 10, borderWidth: 1,
        borderColor: "#fff",
        padding: 20,
        width: '80%'
      }
})