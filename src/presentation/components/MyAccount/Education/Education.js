import {View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import TimelineCard from '../../../../Infrastructure/component/TimelineCards/TimelineCard';
import {scale} from '../../../../Infrastructure/utils/screenUtility';
import {useNavigation} from '@react-navigation/native';
import {
  getEducationInfo,
  getTrainingInfo,
  getCertificationsInfo,
  getEducationaDocumentTypeInfo,
  getTrainingDocumentTypeInfo,
  getlicenseDocumentTypeInfo,
} from '../../../../application/store/actions/sponsorDetails';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../../../../Infrastructure/component/Loader/Loader';
import {getAuthToken} from '../../../../Infrastructure/utils/storageUtility';
import {EducationDetails} from '../../../../Infrastructure/JSONData/MyAccountData';
const Education = props => {
  const navigation = useNavigation();
  const [status, setStatus] = useState(false);
  const isFocused = useIsFocused();
  const beneficiaryID = props?.route?.params?.beneficiaryId
    ? props.route.params.beneficiaryId
    : props?.userInformation?.data?.id;
  const familyId = props?.indivisualFamilyInfo?.data?.id
    ? props.indivisualFamilyInfo.data.id
    : null;
  const init = async () => {
    let token = await getAuthToken();
    setStatus(true);
    await props
      .getEducationData(token, beneficiaryID, familyId)
      .then(res => {
        setStatus(false);
        console.log('education---res', res.data);
      })
      .catch(e => {
        setStatus(false);
        console.log('get-education-erro', e);
      });
    await props
      .getTrainindData(token, beneficiaryID, familyId)
      .then(res => {
        setStatus(false);
        console.log('getTrainingInfo---res', res.data);
      })
      .catch(e => {
        setStatus(false);
        console.log('getTrainingInfo-erro', e);
      });
    await props
      .getCertificationsData(token, beneficiaryID, familyId)
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
  const RenderItem = item => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(item.navigation, {
            beneficiaryId: beneficiaryID,
          })
        }
        key={item.id}>
        <TimelineCard
          Title={item.title}
          iconName={item.iconName}
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
  useEffect(() => {
    isFocused === true && init();
  }, [isFocused]);
  return (
    <>
      <Loader status={status} />
      <View style={{marginHorizontal: scale(10)}}>
        {EducationDetails.map(value => {
          return RenderItem(value);
        })}
      </View>
    </>
  );
};

const mapStateToProps = ({
  sponsorDetailsReducer: {indivisualBenInfo},
  beneficiaryFamilyReducer: {indivisualFamilyInfo},
  timeLine: {userInformation, CountryList},
}) => ({
  indivisualBenInfo,
  indivisualFamilyInfo,
  userInformation,
  CountryList,
});

const mapDispatchToProps = {
  getEducationData: (authToken, beneficiaryId, familyId) =>
    getEducationInfo(authToken, beneficiaryId, familyId),
  getTrainindData: (authToken, beneficiaryId, familyId) =>
    getTrainingInfo(authToken, beneficiaryId, familyId),
  getCertificationsData: (authToken, beneficiaryId, familyId) =>
    getCertificationsInfo(authToken, beneficiaryId, familyId),
  getEducationaDocumentType: authToken =>
    getEducationaDocumentTypeInfo(authToken),
  getTrainingDocumentType: authToken => getTrainingDocumentTypeInfo(authToken),
  getlicenseDocumentType: authToken => getlicenseDocumentTypeInfo(authToken),
};

export default connect(mapStateToProps, mapDispatchToProps)(Education);
