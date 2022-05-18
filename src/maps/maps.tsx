import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { useContext } from "react";
import { PlacesContext } from "../context/places.context";

export default function Map() {
    const deja = "red";

    const pas = "#0362fc";
    const {places, setPlaces} = useContext(PlacesContext);

    return (

        <MapView style={styles.map} initialRegion={{

          latitude: 46.232193,

          longitude: 2.209667,

          latitudeDelta: 30.0,

          longitudeDelta: 1.0,

        }}>
            { places.map((place: any) => (
                <Marker pinColor={deja} coordinate={{latitude: place.latitude, longitude: place.longitude}} title={place.title}/>
            ))
            }
        </MapView>

    );

}

const styles = StyleSheet.create({

    map: {

      width: Dimensions.get('window').width,

      height: Dimensions.get('window').height,

    },

});