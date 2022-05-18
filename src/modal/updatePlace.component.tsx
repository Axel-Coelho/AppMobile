import { useContext } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";
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
              
              <Pressable
                style={[modalStyle.button, modalStyle.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={modalStyle.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    
  );
};