import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import { PlacesComponent } from "../components/screen/places/places.component";
import { HomeComponent } from "../components/screen/Home/home.component";
import { LoginComponent } from "../components/screen/Login/login.component";
import { RegisterComponent } from "../components/screen/Register/register.component";
import { LoginContext } from "../context/login.context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export type AppNavigator = {
    Home : undefined,
    Register: undefined,
    Login: undefined,
    Dashboard: undefined,
    List: undefined,
  }  
  
const Stack = createNativeStackNavigator<AppNavigator>();

const Tab = createBottomTabNavigator();

export default function StackNavigator() { 
  
  const {login, setLogin} = useContext(LoginContext);

    return (
    <>
                  { login ? (
                    <Tab.Navigator>
                      <Stack.Screen name="List" component={PlacesComponent} />
                      <Stack.Screen name="Home" component={HomeComponent} />
                      </Tab.Navigator>
                  ) : (
                      
                      <Stack.Navigator initialRouteName="Dashboard">
                    <Stack.Screen name="Login" component={LoginComponent} />
                    <Stack.Screen name="Register" component={RegisterComponent} />
                    </Stack.Navigator>
                  )}
              </> 
    );
  }