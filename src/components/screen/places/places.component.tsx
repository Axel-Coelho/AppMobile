import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, FlatList, Pressable, ScrollView, Text, Touchable, TouchableOpacity, View } from "react-native";
import { ModalContext } from "../../../context/modal.context";
import { UserContext } from "../../../context/user.context";
import { placesStyle } from "./places.style";
import UpdateModal from "../../../modal/updatePlace.component";
import { PlacesContext } from "../../../context/places.context";
import { TextInput } from "react-native-paper";


const Item = ({ id, title, address, comment, type, openModal, closeModal, deletePlace }:any) => (
    <View style={placesStyle.listColor}>
      
        <Text style={placesStyle.textList}>{title} au : {address}</Text>
        <Text style={placesStyle.textList}>Avis : { comment } </Text>
        <Text style={placesStyle.textListType}>{ type } </Text>
        <View style={placesStyle.viewButton}>
          <Pressable
            style={placesStyle.buttonEdit}
            onPress={()=> {openModal(id)}}
          >
            <Text style={placesStyle.textButton}>Edit place</Text>
          </Pressable>
          <Pressable
            style={placesStyle.buttonDelete}
            onPress={()=> {deletePlace(id)}}
          >
            <Text style={placesStyle.textButton}>Delete place</Text>
          </Pressable>
        </View>
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
  const [longitude, setLongitude] = useState<any>();
  const [comment, setComment] = useState<any>();
  const [type, setType] = useState<any>();

    useEffect(() => {
              axios.get('https://digitalcampus.nerdy-bear.com/api/places?populate=type', {headers: {
                Authorization: `Bearer ${user.jwt}`,
              }}).then((response) => {
                const data = response.data;
                // console.log(data);
              setPlaces(data.data.map((data: any) => {
                  return {
                      id: data.id,
                      title: data.attributes.title,
                      address: data.attributes.address,
                      latitude: data.attributes.latitude,
                      longitude: data.attributes.longitude,
                      comment: data.attributes.comment,
                      type: data.attributes.type.data?.attributes?.name
                  }
              }))
            })
        },[]);

        const deletePlace = (id: number) => {
          axios.delete('https://digitalcampus.nerdy-bear.com/api/places/' + id, {headers: {
            Authorization: `Bearer ${user.jwt}`
          }
        })
        const place = places.filter((place:any) => place.id !== id);
        setPlaces(place);
      };

        const addPlace = () => {
          axios.post('https://digitalcampus.nerdy-bear.com/api/places', {
            data : {
            title: title,
            address: address,
            latitude: latitude,
            longitude: longitude,
            comment: comment,
            // type: type
          }}, {
            headers: {
            Authorization: `Bearer ${user.jwt}`,
          }})
            .then((response) => {
              const data = response.data;
              // console.log('data : ' , JSON.stringify(data));
              setPlaces([...places, {
                id: data.data.id,
                title: data.data.attributes.title,
                address: data.data.attributes.address,
                latitude: data.data.attributes.latitude,
                longitude: data.data.attributes.longitude,
                // type: data.data.attributes.data.type
            }])
            setTitle('');
            setAddress('');
            setLatitude('');
            setLongitude('');
            setComment('');
        })
        }
     
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
            <View style={placesStyle.ViewAdd}>
              <View style={placesStyle.viewInput}>
                <TextInput
                      style={placesStyle.TextInput}
                      placeholder="Title"
                      placeholderTextColor="#003f5c"
                      onChangeText={(title) => setTitle(title)}
                      value = {title}
                  />
                <TextInput
                      style={placesStyle.TextInput}
                      placeholder="Address"
                      placeholderTextColor="#003f5c"
                      onChangeText={(address) => setAddress(address)}
                      value = {address}
                  />
              </View>
              <View style={placesStyle.viewInput}>
                <TextInput
                      style={placesStyle.TextInput}
                      placeholder="Longitude"
                      placeholderTextColor="#003f5c"
                      onChangeText={(longitude) => setLongitude(longitude)}
                      value = {longitude}
                  />
                <TextInput
                      style={placesStyle.TextInput}
                      placeholder="Latitude"
                      placeholderTextColor="#003f5c"
                      onChangeText={(latitude) => setLatitude(latitude)}
                      value = {latitude}
                  />
              </View>
              <View style={placesStyle.viewInput}>

                <TextInput
                      style={placesStyle.TextInput}
                      placeholder="Type"
                      placeholderTextColor="#003f5c"
                      onChangeText={(type) => setType(type)}
                      value = {type}
                  />

                <TextInput
                      style={placesStyle.TextInput}
                      placeholder="Comment"
                      placeholderTextColor="#003f5c"
                      onChangeText={(comment) => setComment(comment)}
                      value = {comment}
                  />
              </View>
                <Pressable 
                style={placesStyle.buttonAdd}
                onPress={addPlace}>
                <Text style={placesStyle.textButton}>Ajout</Text>
              </Pressable>
            </View>
            <View style={placesStyle.viewFlatList}>
              <FlatList
                  data={places}
                  renderItem={renderItem}
                  />
            </View>
          </View>
      }
    </>
    )
}