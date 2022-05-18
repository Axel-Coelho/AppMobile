import { useContext } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { ModalContext } from "../context/modal.context";
import { PlacesContext } from "../context/places.context";
import { modalStyle } from "./updatePlace.styles";

export default function UpdateModal( id: any) {
    
    const {modalVisible, setModalVisible} = useContext(ModalContext);
    const {places, setPlaces} = useContext(PlacesContext);


    const place = places.filter((place:any) => place.id === id.id)[0];

      return (
          <View style={modalStyle.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={modalStyle.centeredView}>
            <View style={modalStyle.modalView}>
              <Text style={modalStyle.modalText}>{place.title}</Text>
              <View style={modalStyle.ViewUpdate}>
              <View style={modalStyle.viewInput}>
                <TextInput
                      style={modalStyle.TextInput}
                      placeholder="Title"
                      placeholderTextColor="#003f5c"
                      onChangeText={(title) => setPlaces(title)}
                      value = {place.title}
                  />
                <TextInput
                      style={modalStyle.TextInput}
                      placeholder="Address"
                      placeholderTextColor="#003f5c"
                      onChangeText={(address) => setPlaces(address)}
                      value = {place.address}
                  />
              </View>
              <View style={modalStyle.viewInput}>
                <TextInput
                      style={modalStyle.TextInput}
                      placeholder="Longitude"
                      placeholderTextColor="#003f5c"
                      keyboardType='numeric'
                      onChangeText={(longitude) => setPlaces(longitude)}
                      value = {place.longitude}
                  />
                <TextInput
                      style={modalStyle.TextInput}
                      placeholder="Latitude"
                      placeholderTextColor="#003f5c"
                      keyboardType='numeric'
                      onChangeText={(latitude) => setPlaces(latitude)}
                      value = {place.latitude}
                  />
              </View>
              <View style={modalStyle.viewInput}>

                <TextInput
                      style={modalStyle.TextInput}
                      placeholder="Comment"
                      placeholderTextColor="#003f5c"
                      onChangeText={(comment) => setPlaces(comment)}
                      value = {place.comment}
                  />
              </View>
              <Pressable
                style={[modalStyle.button, modalStyle.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={modalStyle.textStyle}>Close</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    
  );
};