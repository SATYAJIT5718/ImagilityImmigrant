import {View, Text, TouchableOpacity, Platform, TextInput} from 'react-native';
import React from 'react';
import styles from '../styles';
import {scale} from '../../../../Infrastructure/utils/screenUtility';
import {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from 'react-redux';
import {fetchStateList} from '../../../../application/store/actions/sponsorDetails';
const Training = ({
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
  const [emptyendDate, setEmptyendDate] = useState(
    apidDataToShow?.[0]?.startDate
      ? moment(apidDataToShow[0].endDate).format('MM/DD/YYYY')
      : editData.endDate
      ? moment(editData.endDate).format('MM/DD/YYYY')
      : '',
  );
  const [emptystartDate, setEmptystartDate] = useState('');
  const [enddate, setEnddate] = useState(new Date());
  const [startdate, setStartdate] = useState(new Date());
  const enddateformat = editData.endYear
    ? `${editData.endYear}`
    : moment(enddate).format('MM/DD/YYYY');
  const startdateformat = editData.startYear
    ? `${editData.startYear}`
    : moment(startdate).format('MM/DD/YYYY');
  const onChangeEndYear = (type, selectedDate) => {
    Platform.OS === 'ios' ? null : setEndateShow(false);
    const formatEndData = moment(selectedDate).format('YYYY-MM-DD');
    setEnddate(selectedDate);
    setFieldValue('endDate', formatEndData);
    setEmptyendDate(moment(selectedDate).format('MM/DD/YYYY'));
  };
  const onChangeStartYear = (type, selectedDate) => {
    Platform.OS === 'ios' ? null : setStartdateShow(false);
    const formatStartData = moment(selectedDate).format('YYYY-MM-DD');
    setStartdate(selectedDate);
    setFieldValue('startDate', formatStartData);
    setFieldValue('endDate', '');
    setEmptystartDate(selectedDate);
    setEmptyendDate('');
    setEnddate(new Date());
  };
  const endate = () => {
    setEndateShow(true);
  };
  const startdateToShow = () => {
    setStartdateShow(true);
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.formInputTitle}>
          Name<Text style={{color: 'red'}}>*</Text>
        </Text>
        <TextInput
          onBlur={handleBlur('name')}
          onChangeText={handleChange('name')}
          value={values.name}
          placeholder="Ex: Associate Human Factors Professionals (AEP)"
          placeholderTextColor="#4D4F5C"
          editable={true}
          style={styles.TextInput}
        />
        {touched.name && errors.name && (
          <Text style={styles.errorMessage}>{errors.name}</Text>
        )}
      </View>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.formInputTitle}>
          Institution<Text style={{color: 'red'}}>*</Text>
        </Text>
        <TextInput
          name="institution"
          placeholder="Enter"
          placeholderTextColor="#4D4F5C"
          value={values.institution}
          onBlur={handleBlur('institution')}
          onChangeText={handleChange('institution')}
          editable={true}
          style={styles.TextInput}
        />
        {touched.institution && errors.institution && (
          <Text style={styles.errorMessage}>{errors.institution}</Text>
        )}
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
              <TextInput
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
                style={{...styles.TextInput, flex: 1}}
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
            <DateTimePicker
              testID="dateTimePicker"
              value={startdate}
              mode="date"
              maximumDate={new Date(enddateformat)}
              onChange={onChangeStartYear}
              style={{
                accentColor: 'red',
                textColor: 'red',
              }}
              themeVariant="dark"
              textColor="blue"
            />
          )}
        </View>
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
              <TextInput
                name="date"
                placeholder="Select"
                placeholderTextColor="#4D4F5C"
                value={emptyendDate === '' ? '' : emptyendDate}
                editable={false}
                autoCorrect={false}
                // onBlur={handleBlur('userID')}
                // onChangeText={handleChange('userID')}
                // style={styles.input}
                // autoCorrect={false}
                style={{...styles.TextInput, flex: 1}}
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
            <DateTimePicker
              testID="dateTimePicker"
              value={enddate}
              mode="date"
              onChange={onChangeEndYear}
              minimumDate={new Date(startdateformat)}
              style={{
                accentColor: 'red',
                textColor: 'red',
              }}
              themeVariant="dark"
              textColor="blue"
            />
          )}
        </View>
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
  sponsorDetailsReducer: {indivisualBenInfo, CountryList, StateList, Degree},
}) => ({
  indivisualBenInfo,
  CountryList,
  StateList,
  Degree,
});

const mapDispatchToProps = {
  getState: code => fetchStateList(code),
};

export default connect(mapStateToProps, mapDispatchToProps)(Training);
