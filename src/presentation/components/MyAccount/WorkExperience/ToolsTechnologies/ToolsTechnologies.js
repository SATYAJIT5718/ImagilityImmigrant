import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {scale} from '../../../../../Infrastructure/utils/screenUtility';
import styles from './styles';
import Loader from '../../../../../Infrastructure/component/Loader/Loader';
import TagInput from 'react-native-tags-input';
import {getAuthToken} from '../../../../../Infrastructure/utils/storageUtility';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  updateWorkDetails,
  ExperienceDetails,
} from '../../../../../application/store/actions/sponsorDetails';
const ToolsTechnologies = props => {
  const reducer = props?.ExperienceList?.data
    ? props.ExperienceList.data
    : null;
  const filterData = reducer.filter(item => item.id === props.routeData);
  const routeData = filterData[0];
  const beneficiaryInfo = props?.userInformation?.data;
  const [tags, setTags] = useState({
    tag: '',
    tagsArray: [],
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const familyId = props?.indivisualFamilyInfo?.data?.id
    ? props.indivisualFamilyInfo.data.id
    : null;
  const updateTagState = state => {
    if (
      state.tagsArray.includes(' ') ||
      state.tagsArray.includes('  ') ||
      state.tagsArray.includes('   ') ||
      state.tagsArray.includes('    ') ||
      state.tagsArray.includes('     ') ||
      state.tagsArray.includes('      ') ||
      state.tagsArray.includes('       ') ||
      state.tagsArray.includes('        ') ||
      state.tagsArray.includes('         ') ||
      state.tagsArray.includes('          ') ||
      state.tagsArray.includes('           ')
    ) {
      setErrorMessage('Please enter Valid Curses Name');
    } else {
      setTags(state), setErrorMessage('');
    }
  };
  const addHanderler = () => {
    const prePayload = tags.tagsArray.map((item, index) => {
      return {
        beneficiaryId: null,
        createdBy: null,
        id: null,
        modifiedBy: null,
        skillName: item,
      };
    });
    const tools = [...prePayload, ...routeData.tools];
    tags.tagsArray.length > 0
      ? addHanderler1(tools)
      : setErrorMessage('Please enter Valid Curses Name');
  };
  const addHanderler1 = async tools => {
    let token = await getAuthToken();
    let beneficiaryID = beneficiaryInfo.id;
    const payload = {
      workExpDetailsReq: [
        {
          id: routeData?.id || null,
          addressLine1: routeData?.addressLine1 || null,
          addressLine2: routeData?.addressLine2 || null,
          city: routeData?.city || null,
          companyName: routeData?.companyName || null,
          employmentType: routeData?.employmentType?.code || null,
          country: routeData?.countryCode || null,
          countryCode: routeData?.countryCode || null,
          currency: routeData?.currency || null,
          designation: routeData?.designation || null,
          isCurrentRole:
            routeData?.isCurrentRole === 1
              ? routeData?.isCurrentRole
              : routeData?.isCurrentRole,
          mobileCountryCode: null,
          mobileNo: null,
          officeCountryCode: routeData?.officeCountryCode?.countryCode || null,
          officeNo: routeData?.officeNo || null,
          salary: routeData?.salary || null,
          startDate: routeData?.startDate || null,
          endDate: routeData?.endDate || null,
          stateProvinceCode: routeData?.stateProvinceCode || null,
          stateProvinceName: routeData?.stateProvinceName || null,
          workExpDetailId: routeData?.id || null,
          zipCode: routeData?.zipCode || null,
          duty: null,
          subDutyDescription: null,
          skillName: null,
          jobDuties: routeData?.jobDuties,
          tools: tools,
          clients: routeData?.clients,
        },
      ],
    };
    console.log(payload, 'payload');
    setLoading(true);
    props
      .saveWorkDetails(token, beneficiaryID, payload, familyId)
      .then(async res => {
        Toast.show(res.message, Toast.LONG);
        setLoading(true);
        setTags({
          tag: '',
          tagsArray: [],
        });
        props
          .getExperience(token, beneficiaryID, familyId)
          .then(async res => {
            setLoading(false);
          })
          .catch(e => {
            console.log('error', e);
            setLoading(false);
          });
      })
      .catch(e => {
        console.log('error', e);
        setLoading(false);
      });
  };
  const deleteHandler = id => {
    const tempArra = routeData.tools;
    const filtered = tempArra.filter(item => item.id !== id);
    addHanderler1(filtered);
  };
  const renderItem = (item, index) => {
    return (
      <>
        <View
          key={item.id}
          style={{
            flex: 1,
            marginTop: index === 0 ? scale(20) : 0,
            marginHorizontal: scale(10),
            borderWidth: scale(1),
            borderColor: '#D6D6D6',
            height: scale(42),
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#EDF4FB',
                height: scale(21),
                width: scale(22),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#4A4A4A',
                  fontSize: scale(14),
                  fontFamily: 'SourceSansPro-SemiBold',
                }}>
                {index + 1}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                color: '#505050',
                fontSize: scale(14),
                fontFamily: 'SourceSansPro-Regular',
              }}>
              {item.skillName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => deleteHandler(item.id)}
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign
              name="delete"
              size={17}
              style={{
                color: '#00A8DB',
              }}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <View style={styles.container}>
      <Loader status={loading} />
      <View
        style={{
          marginTop: scale(10),
          marginBottom: scale(10),
        }}>
        <Text style={styles.textHead}>Enter Tools & Technologies</Text>
        <Text style={styles.bodyText}>Please enter comma separated values</Text>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', marginHorizontal: scale(-10)}}>
            <TagInput
              updateState={updateTagState}
              tags={tags}
              placeholder="Ex: Javascript"
              tagStyle={{backgroundColor: '#E5E5E5', borderColor: '#E5E5E5'}}
              tagTextStyle={{color: '#4A4A4A'}}
              autoCorrect={false}
              keysForTag={','}
              inputStyle={{color: '#4A4A4A'}}
              inputContainerStyle={{
                height: scale(80),
                borderColor: '#C3D0DE',
                borderWidth: scale(1),
                marginTop: scale(8),
                borderRadius: scale(4.8),
              }}
            />
          </View>
          {errorMessage !== '' ? (
            <Text style={{color: 'red', marginLeft: scale(10)}}>
              {errorMessage}
            </Text>
          ) : null}
          <TouchableOpacity
            onPress={addHanderler}
            style={{
              borderRadius: 4,
              backgroundColor: '#fff',
              borderColor: '#10A0DA',
              borderWidth: 1,
              height: scale(40),
              width: '25%',
              marginTop: scale(20),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: scale(16),
                fontFamily: 'SourceSansPro-SemiBold',
                color: '#349beb',
              }}>
              ADD
            </Text>
          </TouchableOpacity>
        </View>
        {routeData.tools.map((item, index) => {
          return renderItem(item, index);
        })}
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: scale(20),
            padding: scale(10),
            borderRadius: scale(5),
            backgroundColor: '#FFFFFF',
            borderColor: '#10A0DA',
            borderWidth: 1,
          }}
          disabled={false}
          onPress={props.toggleAccordion}>
          <Text
            style={{
              fontSize: scale(16),
              fontFamily: 'SourceSansPro-SemiBold',
              color: '#10A0DA',
            }}>
            SAVE & NEXT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const mapStateToProps = ({
  sponsorDetailsReducer: {ExperienceList},
  beneficiaryFamilyReducer: {indivisualFamilyInfo},
  timeLine: {userInformation},
}) => ({
  ExperienceList,
  indivisualFamilyInfo,
  userInformation,
});
const mapDispatchToProps = {
  saveWorkDetails: (token, beneficiaryId, payload, familyId) =>
    updateWorkDetails(token, beneficiaryId, payload, familyId),
  getExperience: (token, beneficiaryId, familyId) =>
    ExperienceDetails(token, beneficiaryId, familyId),
};
export default connect(mapStateToProps, mapDispatchToProps)(ToolsTechnologies);
