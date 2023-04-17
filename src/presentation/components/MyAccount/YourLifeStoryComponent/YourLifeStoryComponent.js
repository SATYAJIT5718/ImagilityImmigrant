import {View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import TimelineCard from '../../../../Infrastructure/component/TimelineCards/TimelineCard';
import {scale} from '../../../../Infrastructure/utils/screenUtility';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import Loader from '../../../../Infrastructure/component/Loader/Loader';
import {
  ExperienceDetails,
  fetchVisa,
  fetchPet,
  fetchVsaOut,
  fetchImmigratationSelf,
  fetchImmigratationStatus,
  fetchImmiDocType,
  fetchDegree,
  EmpTypeList,
  CurrList,
} from '../../../../application/store/actions/sponsorDetails';
import {getAuthToken} from '../../../../Infrastructure/utils/storageUtility';
import {YourLifeStory} from '../../../../Infrastructure/JSONData/MyAccountData';
const YourLifeStoryComponent = props => {
  const [status, setStatus] = useState(false);
  const beneficiaryId = props?.route?.params?.benInfo?.beneficiaryEmployeeId
    ? props.route.params.benInfo.beneficiaryEmployeeId
    : props?.userInformation?.data?.id;

  const familyId = props?.indivisualFamilyInfo?.data?.id
    ? props.indivisualFamilyInfo.data.id
    : null;
  const init = async () => {
    let token = await getAuthToken();
    // let beneficiaryID = await getBeneficiaryUserID();
    setStatus(true);
    props
      .getDegree(token)
      .then(async res => {
        console.log('getDegree', res);
      })
      .catch(e => {
        setStatus(false);
        console.log('getDegree-error', e);
      });
    props
      .getEmpList(token)
      .then(async res => {
        console.log('EmployeeList', res.data);
      })
      .catch(e => {
        console.log('error', e);
        setStatus(false);
      });
    props
      .getCurrList(token)
      .then(async res => {
        console.log('CurrList', res.data);
      })
      .catch(e => {
        console.log('error', e);
        setStatus(false);
      });
    props
      .getImigrationDocType(token)
      .then(res => {
        console.log('getImigrationDocType---res', res.data);
      })
      .catch(e => {
        setStatus(false);
        console.log('getImigrationDocType-erro', e);
      });
    props
      .getVisaList(token)
      .then(async res => {
        console.log('VisaList', res.data);
      })
      .catch(e => {
        console.log('VisaList-error', e);
        setStatus(false);
      });
    props
      .getPetitionList(token)
      .then(async res => {
        console.log('PetitionList', res.data);
      })
      .catch(e => {
        console.log('PetitionList-error', e);
        setStatus(false);
      });
    props
      .getVsaOutList(token)
      .then(async res => {
        console.log('VsaList', res.data);
      })
      .catch(e => {
        console.log('VsaList-error', e);
        setStatus(false);
      });
    props
      .getExperience(token, beneficiaryId, familyId)
      .then(async res => {
        console.log('ExperienceList', res);
      })
      .catch(e => {
        console.log('ExperienceList-error', e);
        setStatus(false);
      });
    props
      .getImmigratation(token, beneficiaryId, familyId)
      .then(async res => {
        console.log('ImmigratationList', res.data);
        props
          .getImigrationData(token, beneficiaryId, familyId)
          .then(res => {
            setStatus(false);
            console.log('getImigrationData---res', res.data);
          })
          .catch(e => {
            setStatus(false);
            console.log('getImigrationData-erro', e);
          });
      })
      .catch(e => {
        console.log('ImmigratationList-error', e);
        setStatus(false);
      });
  };

  useEffect(() => {
    init();
  }, []);

  const navigation = useNavigation();

  const RenderItem = item => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(item.navigation, {
            beneficiaryId: beneficiaryId,
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
  return (
    <View style={{marginHorizontal: scale(10)}}>
      <Loader status={status} />
      {YourLifeStory.map(value => {
        return RenderItem(value);
      })}
    </View>
  );
};
const mapStateToProps = ({
  sponsorDetailsReducer: {
    indivisualBenInfo,
    CountryList,
    StateList,
    petitionList,
    vsaoutList,
    immigratationStatus,
    getImmiDocType,
  },
  timeLine: {userInformation},
  beneficiaryFamilyReducer: {indivisualFamilyInfo},
}) => ({
  indivisualBenInfo,
  CountryList,
  StateList,
  petitionList,
  vsaoutList,
  immigratationStatus,
  getImmiDocType,
  indivisualFamilyInfo,
  userInformation,
});

const mapDispatchToProps = {
  getExperience: (token, beneficiaryId, familyId) =>
    ExperienceDetails(token, beneficiaryId, familyId),
  getVisaList: token => fetchVisa(token),
  getPetitionList: token => fetchPet(token),
  getVsaOutList: token => fetchVsaOut(token),
  getImmigratation: (token, beneficiaryId, familyId) =>
    fetchImmigratationSelf(token, beneficiaryId, familyId),
  getImigrationData: (authToken, beneficiaryId, familyId) =>
    fetchImmigratationStatus(authToken, beneficiaryId, familyId),
  getImigrationDocType: authToken => fetchImmiDocType(authToken),
  getDegree: authToken => fetchDegree(authToken),
  getEmpList: token => EmpTypeList(token),
  getCurrList: token => CurrList(token),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YourLifeStoryComponent);
