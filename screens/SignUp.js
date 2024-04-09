import { Image, Keyboard, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton'
import Icon from "react-native-vector-icons/Feather"
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from "react-redux";
import { registerUser, registerUserApi } from '../src/redux/actions/foodAction'
import auth from '@react-native-firebase/auth'

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setname] = useState("");
  const [userInput, setUserInput] = useState({ email: "", password: "" })

  const [nameError, setNameErr] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [hidenPass, setHidenPass] = useState(true);

  const togglePassword = () => {
    setHidenPass(!hidenPass)
  }

  const dispatch = useDispatch();

  const validate = () => {
    if(name.trim() === '' || userInput.email.trim() === '' || userInput.password.trim() === '' ){

      if(name.trim() === ""){
        setNameErr("Enter your name");
      }else{
        setNameErr("")
      }

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
        // sign up
        onSignUpWithEmailPassword();
        dispatch(registerUser(userInput.email,userInput.password,name))
    }
  }

  //signup
  const onSignUpWithEmailPassword = () => {
    // if (userInput.email.trim() === '' || userInput.password.trim() === '') {
    //   Alert.alert("Email và mật khẩu không được để trống");
    //   return;
    // }
    auth()
      .createUserWithEmailAndPassword(userInput.email, userInput.password)
      .then(() => {
        navigation.navigate("Login")
        // Alert.alert("Tai khoan da duoc tao va dang nhap");
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          Alert.alert("Email da ton tai");
        }

        if (err.code === 'auth/invalid-email') {
          Alert.alert("Email khong hop le");
        }

        console.log(err);
      })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={{ flex: 1 }}>
        <Image source={require("../assets/ellipse1.png")} style={st.img1} />
        <Image source={require("../assets/ellipse3.png")} style={st.img2} />
        <Image source={require("../assets/ellipse2.png")} style={st.img3} />
      </View>
      <View style={{ flex: 9, padding: 20, flexDirection: 'column' }}>

        <Text style={{ color: "#333", fontSize: 35, fontWeight: '700' }}>Sign Up</Text>

        <Text style={{ fontSize: 17, color: "#b6b5bd", marginBottom: 7, fontWeight: 'bold', marginTop: 25 }}>Full name</Text>
        <View>
          <CustomTextInput
            placeholder="Your name"
            onChangeText={txt => setname(txt)}
            style={{}}
          />
          {nameError ? <Text style={{ color: "#fe724c" }}>{nameError}</Text> : null}
        </View>

        <Text style={{ fontSize: 17, color: "#b6b5bd", marginBottom: 7, fontWeight: 'bold', marginTop: 10 }}>Email</Text>
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


        <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
          <CustomButton title={"SIGN UP"}
            onPress={() => {
                validate()
            }}
            style={{ width: '75%' }} />

          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ color: "#333", fontSize: 16 }}>Already have an account ? </Text>
            <Text style={{ color: "#fe724c", fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }}
              onPress={() => navigation.goBack()}>Sign In</Text>
          </View>
        </View>

        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 30 }}>
            <View style={st.line} />
            <Text style={{ color: "#333", marginHorizontal: 7, fontSize: 16, }}>Sign up with</Text>
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

export default SignUp

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
})