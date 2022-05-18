import axios from "axios";
import { Button, Text, View } from "react-native";

export function DashboardComponent({ navigation }:any) {
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <Text>Dashboard </Text>
        <Button
          title="Se connecter"
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          title="S'inscrire"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    );
  }