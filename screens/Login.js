import { Image, KeyboardAvoidingView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '../components/CustomTextInput';
import Icon from "react-native-vector-icons/Feather"
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import { useDispatch, useSelector } from "react-redux";
import { checkAcc } from '../src/redux/actions/foodAction';

const Login = () => {
  const navigation = useNavigation();
  const [userInput, setUserInput] = useState({ email: "", password: "" })
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');

  const [hidenPass, setHidenPass] = useState(true);
  const togglePassword = () => {
    setHidenPass(!hidenPass)
  }

  const dispatch = useDispatch();
  const validateLogin = ()=>{
    if (userInput.email.trim() === '' || userInput.password.trim() === '') {
      if(userInput.email.trim() === ''){
        setEmailError("Enter your email address")
      }else{
        setEmailError("")
      }

      if(userInput.password.trim() === ''){
        setPassError("Enter the password")
      }else{
        setPassError("")
      }
    }else{
        onSignInWithEmailAndPassword();
        dispatch(checkAcc(userInput.email,userInput.password))
    }
  }
  const onSignInWithEmailAndPassword = () => {
    auth()
        .signInWithEmailAndPassword(userInput.email, userInput.password)
        .then(() => {
            ToastAndroid.show("Đăng nhập thành công",ToastAndroid.SHORT);
            navigation.navigate("Drawer")
        })
        .catch(err => {
            if (err.code === 'auth/user-not-found') {
                Alert.alert("Không tìm thấy người dùng với email đã nhập");
            }

            if (err.code === 'auth/wrong-password') {
                Alert.alert("Mật khẩu không chính xác");
            }

            console.log(err);
        });
}
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={{ flex: 1 }}>
        <Image source={require("../assets/ellipse1.png")} style={st.img1} />
        <Image source={require("../assets/ellipse3.png")} style={st.img2} />
        <Image source={require("../assets/ellipse2.png")} style={st.img3} />
      </View>
      <View style={{ flex: 9, padding: 20, flexDirection: 'column' }}>
        <TouchableOpacity style={st.btnBack}
          onPress={() => {
            navigation.navigate("Welcome")
          }}>
          <Icon name={"arrow-left"} size={24} />
        </TouchableOpacity>
        <Text style={{ color: "#333", fontSize: 35, fontWeight: '700' }}>LOGIN</Text>

        <Text style={{ fontSize: 17, color: "#b6b5bd", marginBottom: 7, fontWeight: 'bold', marginTop: 20 }}>Email</Text>
        <View>
          <CustomTextInput
            placeholder="Your email address"
            onChangeText={txt => setUserInput({ ...userInput, email: txt })}
            style={{}}
          />
          {emailError ? <Text style={{ color: "#fe724c" }}>{emailError}</Text> : null}
        </View>

        <Text style={{ fontSize: 17, color: "#b6b5bd", marginBottom: 7, fontWeight: 'bold', marginTop: 10 }}>Password</Text>
        <View>
          <CustomTextInput
            placeholder="Password"
            onChangeText={txt => setUserInput({ ...userInput, password: txt })}
            secureTextEntry={hidenPass}
            style={{ paddingEnd: 40 }}
          />
          <TouchableOpacity onPress={togglePassword} style={st.eyeIcon}>
            <Icon name={hidenPass ? 'eye-off' : 'eye'} size={20} />
          </TouchableOpacity>
          {passError ? <Text style={{ color: "#fe724c" }}>{passError}</Text> : null}
        </View>

        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => {

            }}>
            <Text style={{ color: "#fe724c", fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }}>Forgot password ?</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center', marginTop: 30 }}>
          <CustomButton title={"LOGIN"}
            onPress={() => {
              validateLogin()
            }}
            style={{ width: '75%' }} />

          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 35 }}>
            <Text style={{ color: "#333", fontSize: 16 }}>Dont't have an account ? </Text>
            <Text style={{ color: "#fe724c", fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }}
            onPress={() => navigation.navigate("SignUp")}>Sign Up</Text>
          </View>
        </View>


        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 30 }}>
            <View style={st.line} />
            <Text style={{ color: "#333", marginHorizontal: 7, fontSize: 16, }}>Sign in with</Text>
            <View style={st.line} />
          </View>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity style={st.btn}
              onPress={() => {

              }}>
              <Image source={require("../assets/fb.png")}
                style={{ width: 30, height: 30 }} />
              <Text style={{ color: '#000', fontSize: 16, marginLeft: 5, fontWeight: '700' }}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={st.btn} onPress={() => {

            }}>
              <Image source={require("../assets/gg.png")}
                style={{ width: 30, height: 30 }} />
              <Text style={{ color: '#000', fontSize: 16, marginLeft: 5, fontWeight: '700' }}>Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </View>
  )
}

export default Login

const st = StyleSheet.create({
  img1: {
    width: 50, height: 80,
    position: 'absolute', left: 0, top: -10
  },
  img2: {
    width: 160, height: 70,
    position: 'absolute', left: 0, top: -10
  },
  img3: {
    width: 80, height: 80,
    position: 'absolute', right: 0, top: -10
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 20,
  },
  line: {
    width: 130, height: 2, backgroundColor: '#b6b5bd', borderRadius: 4
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#ffece7',
    width: ' 45%'
  },
  btnBack: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#ffece7',
    width: 40, borderWidth: 1,
    borderColor: '#b6b5bd', marginBottom: 20
  }
})