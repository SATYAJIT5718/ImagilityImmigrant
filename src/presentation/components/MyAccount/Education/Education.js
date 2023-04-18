import {View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import TimelineCard from '../../../../Infrastructure/component/TimelineCards/TimelineCard';
import {scale} from '../../../../Infrastructure/utils/screenUtility';
import {useNavigation} from '@react-navigation/native';
// import {
//   getEducationInfo,
//   getTrainingInfo,
//   getCertificationsInfo,
//   getEducationaDocumentTypeInfo,
//   getTrainingDocumentTypeInfo,
//   getlicenseDocumentTypeInfo,
// } from '../../../../application/store/actions/student';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../../../../Infrastructure/component/Loader/Loader';
import {
  getAuthToken,
  getBeneficiaryUserID,
} from '../../../../Infrastructure/utils/storageUtility';
const Education = props => {
  const navigation = useNavigation();
  const [status, setStatus] = useState(false);
  const isFocused = useIsFocused();
  const init = async () => {
    console.log('hhhhhh');
    let token = await getAuthToken();
    let beneficiaryID = await getBeneficiaryUserID();
    setStatus(true);
    await props
      .getEducationData(token, beneficiaryID)
      .then(res => {
        setStatus(false);
        console.log('education---res', res.data);
      })
      .catch(e => {
        setStatus(false);
        console.log('get-education-erro', e);
      });
    await props
      .getTrainindData(token, beneficiaryID)
      .then(res => {
        setStatus(false);
        console.log('getTrainingInfo---res', res.data);
      })
      .catch(e => {
        setStatus(false);
        console.log('getTrainingInfo-erro', e);
      });
    await props
      .getCertificationsData(token, beneficiaryID)
      .then(res => {
        setStatus(false);
        console.log('getcertificationsInfo---res', res.data);
      })
      .catch(e => {
        setStatus(false);
        console.log('getcertificationsInfo-erro', e);
      });
    await props
      .getEducationaDocumentType(token)
      .then(res => {
        setStatus(false);
        console.log('getEducationaDocumentType---res', res.data);
      })
      .catch(e => {
        setStatus(false);
        console.log('getEducationaDocumentType-erro', e);
      });
    await props
      .getTrainingDocumentType(token)
      .then(res => {
        setStatus(false);
        console.log('getTrainingDocumentType---res', res.data);
      })
      .catch(e => {
        setStatus(false);
        console.log('getTrainingDocumentType-erro', e);
      });
    await props
      .getlicenseDocumentType(token)
      .then(res => {
        setStatus(false);
        console.log('getlicenseDocumentType---res', res.data);
      })
      .catch(e => {
        setStatus(false);
        console.log('getlicenseDocumentType-erro', e);
      });
  };
  useEffect(() => {
    // isFocused === true && init();
  }, [isFocused]);
  return (
    <>
      <Loader status={status} />
      <View style={{marginHorizontal: scale(10)}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EducationalDetailsListView')}>
          <TimelineCard
            Title="Educational Details"
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
        <TouchableOpacity
          onPress={() => navigation.navigate('TrianingDetailsListView')}>
          <TimelineCard
            Title="Training Details"
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
        <TouchableOpacity
          onPress={() => navigation.navigate('CertificationsDetailsListView')}>
          <TimelineCard
            Title="License Or Certifications Details"
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
      </View>
    </>
  );
};

const mapDispatchToProps = {
  // getEducationData: (authToken, beneficiaryId) =>
  //   getEducationInfo(authToken, beneficiaryId),
  // getTrainindData: (authToken, beneficiaryId) =>
  //   getTrainingInfo(authToken, beneficiaryId),
  // getCertificationsData: (authToken, beneficiaryId) =>
  //   getCertificationsInfo(authToken, beneficiaryId),
  // getEducationaDocumentType: authToken =>
  //   getEducationaDocumentTypeInfo(authToken),
  // getTrainingDocumentType: authToken => getTrainingDocumentTypeInfo(authToken),
  // getlicenseDocumentType: authToken => getlicenseDocumentTypeInfo(authToken),
};

export default connect(null, mapDispatchToProps)(Education);
