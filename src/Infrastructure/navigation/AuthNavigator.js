import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../presentation/components/LoginScreen/LoginScreen';
import TermsAndConditions from '../../presentation/components/TermsAndConditions/TermsAndConditions';
import {scale} from '../utils/screenUtility';
import Entypo from 'react-native-vector-icons/Entypo';
import {View, Text} from 'react-native';
import RegistrationScreen from '../../presentation/components/RegistrationScreen/RegistrationScreen';

const AuthNavigator = () => {
  const AuthStack = createStackNavigator();
  const navigation = useNavigation();
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        options={{headerShown: false}}
        name="Login"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{headerShown: false}}
        name="Registration"
        component={RegistrationScreen}
      />
      <AuthStack.Screen
        name="Terms & Conditions"
        component={TermsAndConditions}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Registration')}>
              <Entypo name="chevron-small-left" size={30} color="#687C93" />
            </TouchableOpacity>
          ),
          headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: scale(16),
            color: '#4D4F5C',
            fontFamily: 'SourceSansPro-SemiBold',
          },
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
