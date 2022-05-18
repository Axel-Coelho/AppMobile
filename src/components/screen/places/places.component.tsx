import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, FlatList, Text, Touchable, TouchableOpacity, View } from "react-native";
import { ModalContext } from "../../../context/modal.context";
import { UserContext } from "../../../context/user.context";
import { placesStyle } from "./places.style";
import UpdateModal from "../../../modal/updatePlace.component";
import { PlacesContext } from "../../../context/places.context";


const Item = ({ id, title, address, comment, type, openModal, closeModal, deletePlace }:any) => (
    <View style={placesStyle.listColor}>
      
        <Text>{title} au : {address}</Text>
        <Button title="Edit place" onPress={()=> {openModal(id)}}/>
        <Button title="Delete place" onPress={()=> {deletePlace(id)}}/>
        <Text>Avis : { comment } </Text>
        <Text>Type : { type } </Text>
    </View>
  );

export function PlacesComponent({ navigation }:any) {
  
  const {modalVisible, setModalVisible} = useContext(ModalContext);
  const {places, setPlaces} = useContext(PlacesContext);
  const {user, setUser} = useContext(UserContext);
    
  const [idModal, setIdModal] = useState<any>();
  const [title, setTitle] = useState<any>();
  const [address, setAddress] = useState<any>();
  const [latitude, setLatitude] = useState<any>();
  const [longitude, setlongitude] = useState<any>();

  
    useEffect(() => {
              axios.get('https://digitalcampus.nerdy-bear.com/api/places?populate=type', {headers: {
                Authorization: `Bearer ${user.jwt}`,
              }}).then((response) => {
            //   console.log(response.data);
              const data = response.data;
              setPlaces(data.data.map((data: any) => {
                  return {
                      id: data.id,
                      title: data.attributes.title,
                      address: data.attributes.address,
                      latitude: data.attributes.latitude,
                      longitude: data.attributes.longitude,
                      comment: data.attributes.comment,
                      type: data.attributes.type.data?.attributes?.name
                  };
              }))
            })
        })

        const deletePlace = (id: number) => {
          axios.delete('https://digitalcampus.nerdy-bear.com/api/places/' + id, {headers: {
            Authorization: `Bearer ${user.jwt}`
          }
        })};

        const addPlace = () => {
      axios.post('https://digitalcampus.nerdy-bear.com/api/places?populate=type', {
        title: title,
        address: address,
        latitude: latitude,
        longitude: longitude
      }, {
        headers: {
        Authorization: `Bearer ${user.jwt}`,
      }})
      .then((response) => {
    //   console.log(response.data);
      const data = response.data;
      setPlaces({
        title: title,
        address: address,
        latitude: latitude,
        longitude: longitude
          })})}
     
        const openModal = (id: number) => {
          setIdModal(id);
          setModalVisible(true);
        }
        
        const closeModal = () => {
          setModalVisible(false);
        }        

    const renderItem = ({ item }:any) => {
        return (
              <Item id={item.id} title={item.title} address={item.address} comment={item.comment} type={item.type} openModal={openModal} closeModal={closeModal} deletePlace={deletePlace}/>
        );
      } 

    return (
      <>
        { modalVisible ? <UpdateModal id={idModal}/>
        :
          <View style={placesStyle.container}>
              <FlatList
                  data={places}
                  renderItem={renderItem}
              />
          </View>
      }
    </>
    )
}