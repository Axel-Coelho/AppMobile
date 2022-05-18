import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import { PlacesComponent } from "../components/screen/places/places.component";
import { HomeComponent } from "../components/screen/Home/home.component";
import { LoginComponent } from "../components/screen/Login/login.component";
import { RegisterComponent } from "../components/screen/Register/register.component";
import { LoginContext } from "../context/login.context";

export type AppNavigator = {
    Home : undefined,
    Register: undefined,
    Login: undefined,
    Dashboard: undefined,
    Places: undefined,
  }  
  
const Stack = createNativeStackNavigator<AppNavigator>();

export default function StackNavigator() { 
  
  const {login, setLogin} = useContext(LoginContext);

    return (
              <Stack.Navigator initialRouteName="Dashboard">
                  { login ? (
                    <>
                      <Stack.Screen name="Home" component={HomeComponent} />
                      <Stack.Screen name="Places" component={PlacesComponent} />
                      </>
                  ) : (
                      <>
                    <Stack.Screen name="Login" component={LoginComponent} />
                    <Stack.Screen name="Register" component={RegisterComponent} />
                    </>
                  )}
              </Stack.Navigator> 
    );
  }