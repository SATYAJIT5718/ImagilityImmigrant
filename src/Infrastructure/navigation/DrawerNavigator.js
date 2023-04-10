import React from 'react';
import {View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import BottomNavigator from './BottomNavigator';
import Profile from '../../presentation/components/Profile/Profile';
import {scale} from '../utils/screenUtility';
const CustomDrawer = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView style={{height: '100%', position: 'relative'}}>
        <DrawerItemList {...props} />
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
