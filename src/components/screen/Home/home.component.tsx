import axios from "axios";
import { Button, Text, View } from "react-native";

export function HomeComponent({ navigation }:any) {
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <Text>Home Screen </Text>
        <Button
          title="Voir les places"
          onPress={() => navigation.navigate('Places')}
        />
      </View>
    );
  }