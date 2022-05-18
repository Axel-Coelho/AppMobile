import MapView, { Marker } from "react-native-maps";

import { StyleSheet, Dimensions, View, Text } from "react-native";

import axios from "axios";

export default function Map() {
    const deja = "red";

    const pas = "#0362fc";

    axios.get("https://digitalcampus.nerdy-bear.com/api/places")
    .then(function (response) {
      console.log('map : ', response)
    })

    return (

        <MapView style={styles.map} initialRegion={{

          latitude: 46.232193,

          longitude: 2.209667,

          latitudeDelta: 30.0,

          longitudeDelta: 1.0,

        }}>

          <Marker pinColor={deja} coordinate={{latitude: 46.319982, longitude: 4.831111}} title='Le S'/>

        </MapView>

    );

}

const styles = StyleSheet.create({

    map: {

      width: Dimensions.get('window').width,

      height: Dimensions.get('window').height,

    },

});