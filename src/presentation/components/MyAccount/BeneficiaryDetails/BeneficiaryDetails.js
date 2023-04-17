import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {useIsFocused} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {decode as atob, encode as btoa} from 'base-64';
import Loader from '../../../../Infrastructure/component/Loader/Loader';
import TimelineCard from '../../../../Infrastructure/component/TimelineCards/TimelineCard';
import {baseURL} from '../../../../application/config/index';
// import {getIndiBeneficiaryInfo} from '../../../../../application/store/actions/beneficiaryAccount';
// import {getProfileStatus} from '../../../../../application/store/actions/timeLine';
import {
  getAuthToken,
  getBeneficiaryUserID,
} from '../../../../Infrastructure/utils/storageUtility';
import {scale} from '../../../../Infrastructure/utils/screenUtility';
import ProfileHeader from '../../../../Infrastructure/component/ProfileHeader/ProfileHeader';
import {
  getFamilyDetailsInfo,
  indivisualFamilyInfo,
} from '../../../../application/store/actions/beneficiaryFamily';
import {getUserInformation} from '../../../../application/store/actions/timeLine';
const BeneficiaryDetails = props => {
  // const {item, benInfo} = props.route.params;
  const [status, setStatus] = useState(false);
  const navigation = useNavigation();
  const [country, setCountry] = useState('');
  const [edit, setEdit] = React.useState(false);
  const countryList = [];
  const [userID, setUserID] = useState(setUserID);
  const isFocused = useIsFocused();
  const PrimEmail = [];
  const AltEmail = [];
  const [newProfilePic, setNewProfilePic] = useState('');
  const familyId = props?.indivisualFamilyInfo?.data?.id
    ? props.indivisualFamilyInfo.data.id
    : null;
  const indivisualFamilyInfo =
    props?.indivisualFamilyInfo?.data !== null
      ? props.indivisualFamilyInfo.data
      : props.userInformation.data;
  console.log(
    '🚀 ~ file: BeneficiaryDetails.js ~ line 49 ~ BeneficiaryDetails ~ indivisualFamilyInfo',
    indivisualFamilyInfo,
  );
  indivisualFamilyInfo?.emailContacts
    ? indivisualFamilyInfo?.emailContacts.filter(items => {
        if (items.type.description === 'Primary') {
          PrimEmail.push({Primary: items.email});
        }
        if (items.type.description === 'Alternate') {
          AltEmail.push({Primary: items.email});
        }
      })
    : null;
  country
    ? country.map(item => {
        countryList.push({
          name: item.countryName,
          iso2: item.countryCode,
          dialCode: item.phoneCode,
          shortCountryCode: item.shortCountryCode,
        });
      })
    : null;
  const init = async () => {
    let token = await getAuthToken();
    const beneficiaryID = await getBeneficiaryUserID();
    setStatus(true);
    props
      .getFamilyDetails(token, beneficiaryID)
      .then(res => {
        console.log('getFamilyDetails res--', res);
        let id = familyId;
        let FilterSelectItem = res.data.filter(item => {
          if (item.id === id) {
            return item;
          }
        });
        props.storeIndivisualFamilyInfo({data: FilterSelectItem[0]});
        setStatus(false);
      })
      .catch(error => {
        console.log('getFamilyDetails-error', error);
        setStatus(false);
      });
  };
  const EditProfilePic = async () => {
    const token = await getAuthToken();
    const beneficiaryID = await getBeneficiaryUserID();
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      let imageType = ['jpeg', 'png', 'jpg'];
      if (imageType.includes(res[0].type.split('/').reverse()[0])) {
        if (res[0].size >= 1048576) {
          Toast.show(
            'The file is too large to upload, please try a file with less than 1MB',
            Toast.LONG,
          );
        } else {
          let uri = decodeURI(res[0].uri);
          console.log('res-s-s-s', res);
          uri
            ? RNFS.readFile(uri, 'base64').then(async base64data => {
                const binary = atob(base64data);
                let formData = new FormData();
                formData.append('file', {
                  uri: uri,
                  type: res[0].type,
                  name: res[0].name,
                  data: binary,
                });
                setStatus(true);
                let resp = await fetch(
                  `${baseURL}api/v1/beneficiary/${beneficiaryID}/profile/${
                    familyId !== null ? `family/${familyId}` : `self`
                  }/profileimage`,

                  {
                    method: 'post',
                    body: formData,
                    headers: {
                      'Content-Type': 'multipart/form-data; ',
                      Authorization: `Bearer ${token}`,
                    },
                  },
                );
                let responseJson = resp;
                console.log('responseJson-----------', responseJson);
                if (responseJson.status === 200) {
                  familyId === null
                    ? props
                        .getUserInformation(token, beneficiaryID)
                        .then(res => {
                          console.log('user Information--', res);
                          setStatus(false);
                          setTimeout(() => {
                            Toast.show(
                              'Profile image is saved successfully',
                              Toast.LONG,
                            );
                          }, 1);
                        })
                        .catch(error => {
                          console.log('error', error);
                          setStatus(false);
                          setTimeout(() => {
                            Toast.show(
                              'Failed to update profile Picture',
                              Toast.SHORT,
                            );
                          }, 1);
                        })
                    : init().then(res => {
                        setStatus(false);
                        setTimeout(() => {
                          Toast.show(
                            'Profile image is saved successfully',
                            Toast.LONG,
                          );
                        }, 1);
                      });
                  setNewProfilePic(base64data);
                } else {
                  console.log('responseJson-----------', responseJson);
                  setStatus(false);
                  Toast.show('Failed to update profile Picture', Toast.SHORT);
                }
              })
            : null;
        }
      } else {
        Toast.show(
          `Unaccepted format!. Please upload a 'jpeg/png/jpg' format file`,
          Toast.LONG,
        );
      }
    } catch (err) {
      setStatus(false);
      if (DocumentPicker.isCancel(err)) {
      } else {
        //For Unknown Error
        // alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const toggleHandler = () => {
    setEdit(!edit);
  };

  // useEffect(() => {
  //   isFocused === true && init();
  // }, [isFocused]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={150}
      style={{flex: 1}}>
      <Loader status={status} />
      <View
        style={{flex: 1, paddingHorizontal: scale(10), marginTop: scale(10)}}>
        <ProfileHeader
          profilePic={
            newProfilePic
              ? newProfilePic
              : indivisualFamilyInfo?.profileImage
              ? indivisualFamilyInfo.profileImage
              : null
          }
          name={
            indivisualFamilyInfo?.fName
              ? `${indivisualFamilyInfo?.fName} ${indivisualFamilyInfo?.lName}`
              : '--'
          }
          primaryEmail={
            PrimEmail?.[0]?.Primary ? PrimEmail?.[0]?.Primary : '--'
          }
          accStatus="Incomplete"
          editPic={EditProfilePic}
          EditProfile="Edit Profile"
          Toggle={toggleHandler}
          EditProfilePic={indivisualFamilyInfo?.newCreated ? false : true}
        />
      </View>
      <View style={{flex: 7, paddingHorizontal: scale(10)}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Personal Details')}
          // disabled={indivisualFamilyInfo?.status === 'PEND' ? true : false}
        >
          <TimelineCard
            Title="Personal Details"
            iconName="filetext1"
            bgColor={'#fff'}
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
        <TouchableOpacity
          onPress={() => navigation.navigate('YourLifeStoryComponent')}
          disabled={indivisualFamilyInfo?.newCreated ? true : false}>
          <TimelineCard
            Title="Your life story in 3 timelines"
            iconName="filetext1"
            bgColor={indivisualFamilyInfo?.newCreated ? '#EDEDED' : '#fff'}
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
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = ({
  // beneficiaryAccountReducer: {
  //   StateList,
  //   CountryList,
  //   getProfileStatus,
  //   indivisualBenInfo,
  // },
  beneficiaryFamilyReducer: {indivisualFamilyInfo},
  // attorneyReducer: {attorneyInformation},
  timeLine: {userInformation},
  // myAccountReducer: {getCountryList},
}) => ({
  // attorneyInformation,
  userInformation,
  // getCountryList,
  // StateList,
  // CountryList,
  // getProfileStatus,
  // indivisualBenInfo,
  indivisualFamilyInfo,
});

const mapDispatchToProps = {
  // getIndiBeneficiaryInfo: (token, beneficiaryID) =>
  //   getIndiBeneficiaryInfo(token, beneficiaryID),
  getFamilyDetails: (token, beneficiaryID) =>
    getFamilyDetailsInfo(token, beneficiaryID),
  storeIndivisualFamilyInfo: indivisualfamilyInfo =>
    indivisualFamilyInfo(indivisualfamilyInfo),
  getUserInformation: (authToken, beneficiaryUserID) =>
    getUserInformation(authToken, beneficiaryUserID),
};

export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryDetails);
