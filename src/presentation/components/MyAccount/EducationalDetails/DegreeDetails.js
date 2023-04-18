import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import styles from '../styles';
import {scale} from '../../../../Infrastructure/utils/screenUtility';
import {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  CustomButton,
  CustomCheckBox,
  CustomDropdownPicker,
  CustomInput,
  CustomRadioButton,
} from '../../../../Infrastructure/CommonComponents/index';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import {connect} from 'react-redux';
// import {fetchStateList} from '../../../../application/store/actions/student';
import Loader from '../../../../Infrastructure/component/Loader/Loader';
import PhoneInput from 'react-native-phone-number-input';
import {useRef} from 'react';
import {DegreeDetailsData} from '../../../../Infrastructure/JSONData/MyAccountData';
const DegreeDetails = ({
  values,
  errors,
  handleChange,
  handleBlur,
  touched,
  isValid,
  setFieldValue,
  handleSubmit,
  CountryList,
  Degree,
  getState,
  editData,
  apidDataToShow,
}) => {
  const [countryopen, setCountryopen] = useState(false);
  const [stateopen, setStateopen] = useState(false);
  const [degreeopen, setDegreeopen] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [degree, setDegree] = useState(
    Degree?.data
      ? Degree.data.map(item => {
          return {
            id: item.id,
            label: item.name,
            value: item.code,
          };
        })
      : [],
  );
  const [state, setState] = useState([]);
  const [selectedcountry, setSelectedcountry] = useState(
    editData.country?.countryCode
      ? editData.country.countryCode
      : apidDataToShow?.[0]?.country?.countryCode
      ? apidDataToShow[0].country.countryCode
      : null,
  );
  const [selectedDegree, setSelectedDegree] = useState(
    editData.degree
      ? editData.degree
      : apidDataToShow?.[0]?.degree
      ? apidDataToShow[0].degree
      : null,
  );
  const [selectedState, setSelectedState] = useState(
    editData?.stateProvinceCode ? editData.stateProvinceCode : null,
  );
  const [show, setShow] = useState(false);
  const [endateShow, setEndateShow] = useState(false);
  const [startdateShow, setStartdateShow] = useState(false);
  const [emptyendDate, setEmptyendDate] = useState('');
  const [emptystartDate, setEmptystartDate] = useState('');
  const [awardeddate, setAwardeddate] = useState(
    apidDataToShow?.[0]?.degreeAwardedDate
      ? apidDataToShow?.[0]?.degreeAwardedDate
      : editData.degreeAwardedDate
      ? new Date(editData.degreeAwardedDate)
      : new Date(),
  );
  const [enddate, setEnddate] = useState(
    editData.endYear
      ? new Date(editData.endYear, 2)
      : apidDataToShow?.[0]?.endYear
      ? new Date(apidDataToShow[0].endYear, 2)
      : new Date(),
  );
  const [startdate, setStartdate] = useState(
    editData.startYear
      ? new Date(editData.startYear, 1)
      : apidDataToShow?.[0]?.startYear
      ? new Date(apidDataToShow[0].startYear, 1)
      : new Date(),
  );
  const [status, setStatus] = useState(false);
  const phoneInput = useRef(null);

  const dateformat = awardeddate
    ? moment(awardeddate).format('MM/DD/YYYY')
    : '';
  const enddateformat = enddate ? moment(enddate).format('YYYY') : '';
  const startdateformat = startdate ? moment(startdate).format('YYYY') : '';
  const [emptyDate, setEmptyDate] = useState(
    apidDataToShow?.[0]?.degreeAwardedDate
      ? apidDataToShow?.[0]?.degreeAwardedDate
      : editData.degreeAwardedDate
      ? new Date(editData.degreeAwardedDate)
      : '',
  );
  const onChange = (type, selectedDate) => {
    Platform.OS === 'ios' ? null : setShow(false);
    console.log('award', selectedDate);
    setAwardeddate(selectedDate);
    setFieldValue(
      'degreeAwardedDate',
      moment(selectedDate).format('YYYY-MM-DD'),
    );
    setEmptyDate(selectedDate);
  };
  const onChangeEndYear = (type, selectedDate) => {
    Platform.OS === 'ios' ? null : setEndateShow(false);
    setEnddate(selectedDate);
    setFieldValue('endYear', moment(selectedDate).format('YYYY'));
    setEmptyendDate(selectedDate);
    setEmptyDate('');
    setFieldValue('degreeAwardedDate', '');
  };
  const onChangeStartYear = (type, selectedDate) => {
    console.log('select start', moment(selectedDate).format('YYYY'));
    Platform.OS === 'ios' ? null : setStartdateShow(false);
    setStartdate(selectedDate);
    setFieldValue('startYear', moment(selectedDate).format('YYYY'));
    setEmptystartDate(selectedDate);
  };
  const showDatepicker = () => {
    setShow(true);
  };
  const endate = () => {
    setEndateShow(true);
  };
  const startdateToShow = () => {
    setStartdateShow(true);
  };
  const fetchStateData = code => {
    setStatus(true);
    getState(code)
      .then(res => {
        const stateList = res.data.map(item => {
          return {
            label: item.stateProvinceName,
            value: item.stateProvinceCode,
          };
        });
        setState(stateList);
        setStatus(false);
      })
      .catch(e => {
        setStatus(false);
      });
  };
  CountryList?.data
    ? CountryList.data.map(item => {
        countryList.push({
          label: item.countryName,
          value: item.countryCode,
        });
      })
    : null;
  useEffect(() => {
    editData.country?.countryCode
      ? fetchStateData(editData.country.countryCode)
      : null;
  }, []);
  const singleViewController = item => {
    return item?.contents.map(data => {
      console.log('data?.content.length', data?.content.length);
      return data?.content.map(value => {
        return (
          <View
            key={value.id}
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: scale(14),
                fontFamily: 'SourceSansPro-Regular',
                color: '#24262F',
                marginVertical: scale(5),
              }}>
              {value.label}
              {value.required ? <Text style={{color: 'red'}}>*</Text> : null}
            </Text>
            {value?.type === 'text' ? (
              <CustomInput
                name={value.name}
                placeholder={value.placeholder}
                placeholderTextColor={value.placeholderTextColor || '#4D4F5C'}
                value={values[value?.name]}
                onBlur={handleBlur(`${value?.name}`)}
                onChangeText={handleChange(`${value?.name}`)}
                autoCorrect={false}
                style={
                  value.style
                    ? value.style
                    : {
                        backgroundColor: 'white',
                        borderColor: '#C3D0DE',
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 10,
                        height: value.multiline ? scale(60) : scale(40),
                      }
                }
                multiline={value.multiline}
                secureTextEntry={value.secureTextEntry}
                keyboardType={value.keyboardType || 'default'}
              />
            ) : null}
            {touched[value?.name] && errors[value?.name] && (
              <Text
                style={{
                  fontSize: scale(10),
                  fontFamily: 'SourceSansPro-Regular',
                  color: 'red',
                  marginLeft: scale(5),
                }}>
                {errors[value?.name]}
              </Text>
            )}
          </View>
        );
      });
    });
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? scale(0) : scale(135)}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, padding: scale(5)}}>
            {DegreeDetailsData?.fields?.map(item => {
              console.log('🚀 ~ file: DegreeDetails.js:1158 ~ item:', item);

              return singleViewController(item);
            })}
          </View>
        </ScrollView>
        <View
          style={{
            justifyContent: 'flex-end',
            backgroundColor: 'red',
          }}>
          <CustomButton
            buttonText={'SAVE'}
            buttonTextStyle={{
              fontSize: scale(18),
              fontFamily: 'SourceSansPro-SemiBold',
              color: '#fff',
            }}
            buttonStyle={{
              backgroundColor: '#349beb',
              height: scale(40),
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            onPressHandler={handleSubmit}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
// const mapStateToProps = ({
//   studentReducer: {studentInformation, CountryList, StateList, Degree},
// }) => ({
//   studentInformation,
//   CountryList,
//   StateList,
//   Degree,
// });

const mapDispatchToProps = {
  // getState: code => fetchStateList(code),
};

export default connect(null, mapDispatchToProps)(DegreeDetails);
