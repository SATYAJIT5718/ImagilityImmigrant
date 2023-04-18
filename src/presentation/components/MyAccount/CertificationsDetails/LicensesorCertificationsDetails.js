import {View, Text, TouchableOpacity, Platform, TextInput} from 'react-native';
import React from 'react';
import styles from '../styles';
import {scale} from '../../../../Infrastructure/utils/screenUtility';
import {useState} from 'react';
import {CustomInput} from '../../../../Infrastructure/component/Custom';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import {connect} from 'react-redux';
import {Checkbox} from 'react-native-paper';
// import {fetchStateList} from '../../../../application/store/actions/student';
const LicensesorCertificationsDetails = ({
  values,
  errors,
  handleChange,
  handleBlur,
  touched,
  setFieldValue,
  handleSubmit,
  editData,
  apidDataToShow,
}) => {
  const [endateShow, setEndateShow] = useState(false);
  const [startdateShow, setStartdateShow] = useState(false);
  const [emptyendDate, setEmptyendDate] = useState('');
  const [emptystartDate, setEmptystartDate] = useState('');
  const [enddate, setEnddate] = useState(new Date());
  const [startdate, setStartdate] = useState(new Date());
  const [modifyData, setModifyData] = useState(
    editData.endDate ? moment(editData.endDate).format('MM/DD/YYYY') : '',
  );
  const [toggleCheckBox, setToggleCheckBox] = useState(
    apidDataToShow?.[0]?.endDate === null
      ? true
      : apidDataToShow?.[0]?.endDate === undefined
      ? editData?.endDate === null
        ? true
        : false
      : false,
  );
  const enddateformat = enddate ? moment(enddate).format('MM/DD/YYYY') : '';
  const startdateformat = startdate
    ? moment(startdate).format('MM/DD/YYYY')
    : '';
  const onChangeEndYear = (type, selectedDate) => {
    Platform.OS === 'ios' ? null : setEndateShow(false);
    const formatEndData = moment(selectedDate).format('YYYY-MM-DD');
    setEnddate(selectedDate);
    setFieldValue('endDate', formatEndData);
    setEmptyendDate(selectedDate);
  };
  const onChangeStartYear = (type, selectedDate) => {
    Platform.OS === 'ios' ? null : setStartdateShow(false);
    const formatStartData = moment(selectedDate).format('YYYY-MM-DD');
    setStartdate(selectedDate);
    setFieldValue('startDate', formatStartData);
    setEmptystartDate(selectedDate);
  };
  const endate = () => {
    setEndateShow(true);
  };
  const startdateToShow = () => {
    setStartdateShow(true);
  };
  const handleOnChange = () => {
    setToggleCheckBox(!toggleCheckBox);
    setFieldValue('credential', toggleCheckBox);
    setEmptyendDate('');
    setFieldValue('endDate', '');
    setModifyData('');
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.formInputTitle}>
          Name<Text style={{color: 'red'}}>*</Text>
        </Text>
        <TextInput
          style={{
            marginTop: scale(6),
            borderWidth: 1,
            borderColor: '#C3D0DE',
            borderRadius: scale(4),
            color: '#4D4F5C',
            height: scale(80),
          }}
          onBlur={handleBlur('name')}
          onChangeText={handleChange('name')}
          value={values.name}
          placeholder="Ex: Associate Human Factors Professionals (AEP)"
          placeholderTextColor="#4D4F5C"
          editable={true}
          multiline={true}
        />
        {touched.name && errors.name && (
          <Text style={styles.errorMessage}>{errors.name}</Text>
        )}
      </View>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.formInputTitle}>
          Issuing Organization<Text style={{color: 'red'}}>*</Text>
        </Text>
        <CustomInput
          name="institution"
          placeholder="Enter"
          placeholderTextColor="#4D4F5C"
          value={values.institution}
          onBlur={handleBlur('institution')}
          onChangeText={handleChange('institution')}
          editable={true}
        />
        {touched.institution && errors.institution && (
          <Text style={styles.errorMessage}>{errors.institution}</Text>
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Checkbox.Android
          name="checkbox"
          status={toggleCheckBox ? 'checked' : 'unchecked'}
          color="#0D89CF"
          uncheckedColor="#0D89CF"
          onPress={handleOnChange}
        />
        <Text style={styles.subTitle}>This credential does not expire</Text>
      </View>

      <View style={{flexDirection: 'column', flex: 1, marginBottom: scale(10)}}>
        <View>
          <Text style={styles.formInputTitle}>
            Start Date<Text style={{color: 'red'}}>*</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              startdateToShow();
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomInput
                name="date"
                placeholder="Select"
                placeholderTextColor="#4D4F5C"
                value={
                  emptystartDate === ''
                    ? apidDataToShow?.[0]?.startDate
                      ? moment(apidDataToShow[0].startDate).format('MM/DD/YYYY')
                      : editData.startDate
                      ? moment(editData.startDate).format('MM/DD/YYYY')
                      : ''
                    : startdateformat
                }
                editable={false}
                autoCorrect={false}
                style={{flex: 1}}
              />
              <AntDesign
                name="calendar"
                size={20}
                style={{
                  position: 'absolute',
                  right: scale(10),
                  color: 'grey',
                }}
              />
            </View>
            {touched.startDate && errors.startDate && (
              <Text style={styles.errorMessage}>{errors.startDate}</Text>
            )}
          </TouchableOpacity>
          {startdateShow && (
            <DatePicker
              modal
              mode="date"
              open={true}
              date={startdate}
              maximumDate={new Date(enddateformat)}
              // onChange={onChangeStartYear}
              onConfirm={date => {
                // setFieldValue(
                //   `${item?.isOpenTitle}`,
                //   !values[item?.isOpenTitle],
                // );
                // setFieldValue(`${item?.name}`, date);
              }}
              onCancel={() => {
                // setFieldValue(
                //   `${item?.isOpenTitle}`,
                //   !values[item?.isOpenTitle],
                // );
              }}
            />
          )}
        </View>
        {!toggleCheckBox ? (
          <View>
            <Text style={styles.formInputTitle}>
              End Date<Text style={{color: 'red'}}>*</Text>
            </Text>
            <TouchableOpacity
              onPress={() => {
                endate();
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomInput
                  name="date"
                  placeholder="Select"
                  placeholderTextColor="#4D4F5C"
                  value={
                    emptyendDate === ''
                      ? apidDataToShow?.[0]?.endDate
                        ? moment(apidDataToShow[0].endDate).format('MM/DD/YYYY')
                        : modifyData
                      : enddateformat
                  }
                  editable={false}
                  autoCorrect={false}
                  style={{flex: 1}}
                />
                <AntDesign
                  name="calendar"
                  size={20}
                  style={{
                    position: 'absolute',
                    right: scale(10),
                    color: 'grey',
                  }}
                />
              </View>
              {touched.endDate && errors.endDate && (
                <Text style={styles.errorMessage}>{errors.endDate}</Text>
              )}
            </TouchableOpacity>
            {endateShow && (
              <DatePicker
                modal
                open={true}
                mode="date"
                date={enddate}
                onChange={onChangeEndYear}
                minimumDate={new Date(startdateformat)}
                onConfirm={date => {
                  // setFieldValue(
                  //   `${item?.isOpenTitle}`,
                  //   !values[item?.isOpenTitle],
                  // );
                  // setFieldValue(`${item?.name}`, date);
                }}
                onCancel={() => {
                  // setFieldValue(
                  //   `${item?.isOpenTitle}`,
                  //   !values[item?.isOpenTitle],
                  // );
                }}
              />
            )}
          </View>
        ) : null}
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: scale(20),
            padding: scale(10),
            borderRadius: scale(5),
            backgroundColor: '#FFFFFF',
            borderColor: '#349beb',
            borderWidth: 1,
          }}
          disabled={false}
          onPress={handleSubmit}>
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
  studentReducer: {studentInformation, CountryList, StateList, Degree},
}) => ({
  studentInformation,
  CountryList,
  StateList,
  Degree,
});

const mapDispatchToProps = {
  // getState: code => fetchStateList(code),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LicensesorCertificationsDetails);
