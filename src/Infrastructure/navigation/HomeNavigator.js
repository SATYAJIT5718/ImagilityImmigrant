import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Back from '../component/back/Back';
import {useNavigation} from '@react-navigation/native';
import LOGOSVG from '../../Infrastructure/assets/images/splashScreenLogo.svg';
import ComingSoon from '../component/ComingSoon/ComingSoon';
const HomeStack = createStackNavigator();
const HeaderLeft = props => {
  return (
    <View style={{marginLeft: 20}}>
      <Ionicons color="#4D4F5C" name="menu" size={30} />
    </View>
  );
};
const HearderTitle = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <LOGOSVG width="140px" />
      </View>
    </View>
  );
};
const HomeNavigator = props => {
  const navigation = useNavigation();
  return (
    <>
      <HomeStack.Navigator initialRouteName="Dashboard">
        <>
          <HomeStack.Screen
            name="Dashboard"
            component={ComingSoon}
            options={{
              headerStyle: {
                borderBottomWidth: 1,
                borderColor: '#00000029',
              },
              headerLeft: props => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}>
                  <HeaderLeft {...props} />
                </TouchableOpacity>
              ),
              // headerTitle: props => <HearderTitle {...props} />,
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
export default connect(mapStateToProps, null)(HomeNavigator);
