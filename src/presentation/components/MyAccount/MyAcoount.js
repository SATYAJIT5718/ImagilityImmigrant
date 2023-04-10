import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../../Infrastructure/component/Loader/Loader';
import TimelineCard from '../../../Infrastructure/component/TimelineCards/TimelineCard';
import ProfileHeader from '../../../Infrastructure/component/ProfileHeader/ProfileHeader';
import {MyAccountData} from '../../../Infrastructure/Data/MyAccountData';
const MyAccount = props => {
  const [status, setStatus] = useState(false);
  const navigation = useNavigation();
  const [edit, setEdit] = React.useState(false);
  const [userID, setUserID] = useState(setUserID);
  const studentInfo = props?.studentInformation?.data;
  const PrimEmail = [];
  const [profilePic, setProfilePic] = useState('');
  const toggleHandler = () => {
    setEdit(!edit);
  };
  const RenderItem = item => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(item.navigation)}>
        <TimelineCard
          Title={item.title}
          iconName="filetext1"
          iconSize={{
            width: scale(25),
            height: scale(25),
            marginLeft: scale(1.5),
          }}
          style={{
            titleContent: {
              marginLeft: scale(15),
            },
          }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={150}
      style={{flex: 1}}>
      <Loader status={status} />
      <View style={{flex: 1}}>
        <ProfileHeader
          profilePic={
            profilePic
              ? profilePic
              : studentInfo?.smallProfileImage
              ? studentInfo?.smallProfileImage
              : ''
          }
          name={
            studentInfo
              ? `${studentInfo.firstName} ${studentInfo.lastName}`
              : '--'
          }
          primaryEmail={'--'}
          accStatus="Incomplete"
          editPic={''}
          EditProfile="Edit Profile"
          Toggle={toggleHandler}
        />
      </View>
      <View style={{flex: 7, paddingHorizontal: scale(10)}}>
        {MyAccountData?.map(item => RenderItem(item))}
      </View>
    </KeyboardAvoidingView>
  );
};

export default connect(null, null)(MyAccount);
