import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { LoginContext } from './src/context/login.context';
import { ModalContext } from './src/context/modal.context';
import { PlacesContext } from './src/context/places.context';
import { UserContext } from './src/context/user.context';
import StackNavigator from './src/navigator/stackNavigator';

export default function App() { 
  
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState<any>({
    username: '',
    email: '',
    password: '',
    jwt: ''
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [places, setPlaces] = useState<any>();
    return (
      <NavigationContainer>
        <LoginContext.Provider value={{login, setLogin}}>
        <UserContext.Provider value={{user, setUser}}>
        <ModalContext.Provider value={{modalVisible, setModalVisible}}>
        <PlacesContext.Provider value={{places, setPlaces}}>
          <StackNavigator/>
        </PlacesContext.Provider>
        </ModalContext.Provider>
        </UserContext.Provider>
        </LoginContext.Provider>

      </NavigationContainer>
    );
  }
