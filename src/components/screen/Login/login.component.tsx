import axios from "axios";
import { useContext, useState } from "react";
import { Alert, Button, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LoginContext } from "../../../context/login.context";
import { UserContext } from "../../../context/user.context";
import { loginStyle } from "./login.styles";

export function LoginComponent({ navigation }:any) {
    
    const {login, setLogin} = useContext(LoginContext);
    const {user, setUser} = useContext(UserContext);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const verifyLogin = () => {
        // console.log("email", email, " password", password);
        axios.post('https://digitalcampus.nerdy-bear.com/api/auth/local', {
            identifier: email,
            password: password
        })
        .then(function (response) {
            // handle success
            // console.log("login response : " , response.data);
            setLogin(true);
            const {data} = response;
            setUser({
                id : data.user.id,
                username: data.user.username,
                email: data.user.email,
                password: data.user.password,
                jwt: data.jwt
            })
            // alert(JSON.stringify(response.data));
        })
        .catch(function (error) {
            // handle error
            setEmail('');
            setPassword('');
            Alert.alert("Identifiant ou mot de passe incorrect")
            // alert(error.message);
        })
    };

    return (
        <View style={loginStyle.container}>
            <View style={loginStyle.inputView}>
                <TextInput
                    style={loginStyle.TextInput}
                    placeholder="Identifiant"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                    value = {email}
                />
            </View>
            
            <View style={loginStyle.inputView}>
                <TextInput
                    style={loginStyle.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    value = {password}
                />
            </View>

            <TouchableOpacity style={loginStyle.loginBtn} onPress={verifyLogin}>
                <Text style={loginStyle.TextInput}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={loginStyle.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={loginStyle.register_button} onPress={() => navigation.navigate('Register')}>Register</Text>
            </TouchableOpacity>
        </View>
    );
  }