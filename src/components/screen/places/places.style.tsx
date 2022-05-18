import { StyleSheet } from "react-native";

export const placesStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0521',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  listColor: {
      marginTop: 20,
      // backgroundColor: '#fff',
      borderBottomColor: 'white',
      borderBottomWidth: 2,
  },
  textList: {
    color: 'white'
  },
  textListType: {
    fontWeight: 'bold',
    color: '#d3dbf6'
  },
  viewFlatList: {
    height: '65%'
  },
  buttonEdit: {
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 10,
    width: '25%',
    marginRight: 5,
  },
  buttonDelete: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
    width: '25%'
  },
  buttonAdd: {
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 10,
    width: '25%'
  },
  textButton: {
    textAlign: 'center',
    color: 'white'
  },
  viewButton: {
    flexDirection: "row",
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 20,
    alignSelf: 'center'
  },
  TextInput: {
    width: '25%',
    margin: 10
  },
  viewInput: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
  },
  ViewAdd : {
    alignItems: 'center'
  }
       
  });