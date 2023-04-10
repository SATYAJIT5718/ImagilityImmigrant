import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import {useNavigation} from '@react-navigation/native';
import ProfileHeader from '../../../Infrastructure/component/ProfileHeader/ProfileHeader';
import TimelineCard from '../../../Infrastructure/component/TimelineCards/TimelineCard';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../../../Infrastructure/component/Loader/Loader';
import {connect} from 'react-redux';
import {
  TimeLineStudentDate,
  TimeLineH1BDate,
} from '../../../Infrastructure/Data/TimeLineData';
const TimeLineComponent = props => {
  const [status, setStatus] = useState(false);
  const [logInFirst, setLogInFirst] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const studentInfo = props?.studentInformation?.data;
  const primaryEmail = props?.studentInformation?.data?.emailContacts
    ? props?.studentInformation.data.emailContacts.filter(value => {
        if (value.type.name === 'Primary') {
          return value;
        }
      })
    : '-';
  const onViewProfile = () => {
    // navigation.navigate('ComingSoon');
    navigation.navigate('My Account');
  };
  // const renderaData = TimeLineStudentDate;
  const renderaData = TimeLineH1BDate;

  const renderItem = item => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(item.navigation, {
              title: item.title,
            });
          }}
          key={item.id}>
          <TimelineCard
            Title={item.title}
            iconImage={item.iconImage}
            iconSize={{
              width: scale(18),
              height: scale(22),
              marginLeft: scale(1.5),
              resizeMode: 'contain',
            }}
            style={{
              titleContent: {
                marginLeft: scale(26),
              },
            }}
          />
        </TouchableOpacity>
      </>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: '#F3F3F3', flex: 1}}>
      <Loader status={status} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, marginBottom: scale(20)}}>
        <View
          style={{
            flex: 1,
            marginHorizontal: scale(20),
          }}>
          <View style={{marginTop: scale(25)}}>
            <ProfileHeader
              onAction={onViewProfile}
              actionLabel="View Profile"
              profilePic={
                studentInfo?.smallProfileImage
                  ? studentInfo?.smallProfileImage
                  : ''
              }
              name={
                studentInfo
                  ? `${studentInfo.firstName} ${studentInfo.lastName}`
                  : '--'
              }
              primaryEmail={
                primaryEmail[0]?.email ? primaryEmail[0].email : '--'
              }
            />
          </View>
          <View>
            {renderaData?.length > 0 &&
              renderaData.map(item => {
                return renderItem(item);
              })}
          </View>
        </View>
        {/* <Advertisement /> */}
      </ScrollView>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};
// const mapDispatchToProps = {
//   getOtherSupportingAppDetails: (token) => getOtherSupportingAppData(token),
// };

export default connect(null, null)(TimeLineComponent);
