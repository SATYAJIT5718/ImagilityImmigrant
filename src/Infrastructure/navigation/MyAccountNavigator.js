import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Back from '../component/back/Back';
import {useNavigation} from '@react-navigation/native';
import ComingSoon from '../component/ComingSoon/ComingSoon';
import PersonalDetails from '../../presentation/components/MyAccount/PersonalDetails/PersonalDetails';
import {scale} from '../utils/screenUtility';
const HomeStack = createStackNavigator();

const MyAccountNavigator = props => {
  const navigation = useNavigation();
  return (
    <>
      <HomeStack.Navigator initialRouteName="Dashboard">
        <>
          <HomeStack.Screen
            name="My Account"
            component={PersonalDetails}
            options={{
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
        </>
      </HomeStack.Navigator>
    </>
  );
};
const mapStateToProps = ({notificationReducer: {notificationStatus}}) => ({
  notificationStatus,
});
export default connect(mapStateToProps, null)(MyAccountNavigator);
