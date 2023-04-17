import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import BottomNavigator from './BottomNavigator';
import Profile from '../../presentation/components/Profile/Profile';
import {scale} from '../utils/screenUtility';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../utils/context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomDrawer = props => {
  const navigation = useNavigation();

  const {signOut} = React.useContext(AuthContext);
  const showAlert = () => {
    Alert.alert(
      'Immagility',
      'Would you like to Logout',
      [
        {
          text: 'No',
          onPress: () => console.log('close'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            navigation.goBack(), signOut();
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView style={{height: '100%', position: 'relative'}}>
        <DrawerItemList {...props} />
        <View
          style={{
            marginHorizontal: scale(12),
            borderWidth: 0.8,
            borderStyle: 'dashed',
            borderColor: '#C3C3C3',
            marginBottom: scale(20),
            marginTop: scale(20),
          }}
        />

        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            marginLeft: scale(9),
            flexDirection: 'row',
            paddingVertical: scale(10),
          }}
          onPress={showAlert}>
          <MaterialIcons name="power-settings-new" size={22} color="#00A8DB" />
          <Text
            style={{
              fontFamily: 'SourceSansPro-Regular',
              fontSize: scale(14),
              color: '#4D4F5C',
              marginLeft: scale(5),
            }}>
            Logout
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginHorizontal: scale(12),
            borderWidth: 0.8,
            borderStyle: 'dashed',
            borderColor: '#C3C3C3',
            marginBottom: scale(20),
            marginTop: scale(20),
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const DrawerNavigator = props => {
  const DrawerStack = createDrawerNavigator();

  return (
    <>
      <DrawerStack.Navigator
        initialRouteName="Profile"
        options={{headerShown: false}}
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={navigation => ({
          drawerItemStyle: {
            marginBottom: scale(-20),
          },
        })}>
        <DrawerStack.Screen
          options={{
            headerShown: false,
            title: props => <Profile {...props} />,
            drawerItemStyle: {marginTop: 0},
          }}
          name="Profile"
          component={BottomNavigator}
        />
      </DrawerStack.Navigator>
    </>
  );
};

export default DrawerNavigator;
