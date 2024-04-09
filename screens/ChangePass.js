import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import { useDispatch, useSelector } from "react-redux";
import { checkPass, updatePassword } from '../src/redux/actions/foodAction';
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth';

const ChangePass = () => {
  const navigation = useNavigation();
  const [passOld, setPassOld] = useState('');
  const [passNew, setPassNew] = useState('');

  const [oldError, setOldError] = useState('');
  const [newError, setNewError] = useState('');

  const dispatch = useDispatch();

  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      return userId;
    } catch (error) {
      console.log(error)
    }
  }

  const validateSave = async () => {
    const idUser = await getUserId();
    const check = await dispatch(checkPass(idUser, passOld));
    if (!check || passNew.trim() === "") {
      if (!check) {
        setOldError("Your old password is invalid")
      } else {
        setOldError("")
      }

      if (passNew.trim() === "") {
        setNewError("Enter new password")
      } else {
        setNewError("")
      }
    } else {
      //
      const success = await changePassword(passOld, passNew);
      if (success) {
        dispatch(updatePassword(idUser, passNew));
        resetFiled();
      } else {
        console.log("Password update failed");
      }
    }
  }
  const changePassword = async (oldPassword, newPassword) => {
    try {
      const user = auth().currentUser;
      
      // Reauthenticate user with current password
      const credential = auth.EmailAuthProvider.credential(user.email, oldPassword);
      await user.reauthenticateWithCredential(credential);
  
      await user.updatePassword(newPassword);

      console.log('Password updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating password:', error.message);
      return false;
    }
  };
  const resetFiled = () =>{
    setNewError('')
    setOldError('')
    setPassNew('')
    setPassOld('')
  }
  return (
    <View style={{ backgroundColor: "#fff", padding: 10, flex: 1, alignItems: 'center' }}>
      <Header navigation={navigation} title={"Change password"} />
      <View style={{ width: '100%', justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <View style={{width:"100%"}}>
          <CustomTextInput
            placeholder="Your old password"
            onChangeText={txt => setPassOld(txt)}
            style={{}}
          />
          {oldError ? <Text style={{ color: "#fe724c" }}>{oldError}</Text> : null}
        </View>

        <View style={{width:"100%"}}>
          <CustomTextInput
            placeholder="New password"
            onChangeText={txt => setPassNew(txt)}
            style={{}}
          />
          {newError ? <Text style={{ color: "#fe724c" }}>{newError}</Text> : null}
        </View>

        <CustomButton title={"SAVE"}
          onPress={() => {
            validateSave()
          }}
          style={{ width: '75%' }} />
      </View>
    </View>
  )
}

export default ChangePass

const styles = StyleSheet.create({})