import axios from "axios";
import { useContext, useState } from "react";
import { Alert, Button, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Appbar } from "react-native-paper";
import { LoginContext } from "../../../context/login.context";
import { UserContext } from "../../../context/user.context";

export function RegisterComponent({ navigation }:any) {
  
    const {login, setLogin} = useContext(LoginContext);
    const {user, setUser} = useContext(UserContext);
    
    const [name, onChangeName] = useState('');
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    
    const verifyRegister = () => {
        axios.post('https://digitalcampus.nerdy-bear.com/api/auth/local/register', {
            username: name,
            email: email,
            password: password
        })
        .then(function (response) {
            // handle success
            // console.log(response.data);
            setLogin(true);
            const {data} = response;
            setUser({
                id : data.user.id,
                username: data.user.username,
                email: data.user.email,
                password: data.user.password,
            })
            alert(JSON.stringify(response.data));
        })
        .catch(function (error) {
            // handle error
            onChangeName('');
            onChangeEmail('');
            onChangePassword('');
            Alert.alert("Identifiant ou mot de passe incorrect")
            // console.log(error.message);
        })
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <Appbar>
                    <Appbar.BackAction/>
                    <Appbar.Content title="Register"/>
                </Appbar>

                <TextInput
                    placeholder="Username"
                    value={name}
                    onChangeText={onChangeName}
                    />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={onChangeEmail}
                    />
                <TextInput
                    placeholder="Password"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={onChangePassword}
                    />
                <TouchableOpacity onPress={verifyRegister}>
                    <Text>REGISTER</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
  }