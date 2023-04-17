import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import Back from '../component/back/Back';
import {useNavigation} from '@react-navigation/native';
import ComingSoon from '../component/ComingSoon/ComingSoon';
import {scale} from '../utils/screenUtility';
import MyAccount from '../../presentation/components/MyAccount/MyAcoount';
import PersonalDetails from '../../presentation/components/MyAccount/PersonalDetails/PersonalDetails';
import YourLifeStoryComponent from '../../presentation/components/MyAccount/YourLifeStoryComponent/YourLifeStoryComponent';
import Education from '../../presentation/components/MyAccount/Education/Education';
import EducationalDetailsListView from '../../presentation/components/MyAccount/EducationalDetails/EducationalDetailsListView';
const HomeStack = createStackNavigator();

const MyAccountNavigator = props => {
  const navigation = useNavigation();
  return (
    <>
      <HomeStack.Navigator initialRouteName="Dashboard">
        <>
          <HomeStack.Screen
            name="My Account"
            component={MyAccount}
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
          <HomeStack.Screen
            name="PersonalDetails"
            component={PersonalDetails}
            options={{
              title: 'Personal Details',
              headerShown: true,
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(18),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="FamilyDetails"
            component={ComingSoon}
            options={{
              title: 'Family Details',
              headerShown: true,
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(18),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="OtherDependantDetails"
            component={ComingSoon}
            options={{
              title: 'Other Dependant Details',
              headerShown: true,
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(18),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="Documents"
            component={ComingSoon}
            options={{
              title: 'Documents',
              headerShown: true,
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(18),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="YourLifeStoryTimelines"
            component={YourLifeStoryComponent}
            options={{
              title: 'Your life story in 3 timelines',
              headerShown: true,
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(18),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="Education"
            component={Education}
            options={{
              title: 'Education',
              headerShown: true,
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(18),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="WorkExperience"
            component={ComingSoon}
            options={{
              title: 'Work Experiance',
              headerShown: true,
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(18),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="ImmigratationDetailsListView"
            component={ComingSoon}
            options={{
              title: 'Immigration',
              headerShown: true,
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(18),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="EducationalDetailsListView"
            component={EducationalDetailsListView}
            options={{
              title: 'Educational Details',
              headerShown: true,
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(18),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="TrianingDetailsListView"
            component={ComingSoon}
            options={{
              title: 'Training Details',
              headerShown: true,
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(18),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="CertificationsDetailsListView"
            component={ComingSoon}
            options={{
              title: 'License Or Certifications Details',
              headerShown: true,
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(18),
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
