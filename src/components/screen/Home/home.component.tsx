import axios from "axios";
import { Button, Text, View } from "react-native";
import Map from "../../../maps/maps";

export function HomeComponent({ navigation }:any) {
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Map></Map>
      </View>
    );
  }