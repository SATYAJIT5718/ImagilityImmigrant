import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
  Pressable,
  TouchableHighlight,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import styles from './styles';
import {scale} from '../../../../../Infrastructure/utils/screenUtility';
import Loader from '../../../../../Infrastructure/component/Loader/Loader';
import {connect} from 'react-redux';
import * as yup from 'yup';
import Toast from 'react-native-simple-toast';
import {
  CustomInput,
  CustomButton,
} from '../../../../../Infrastructure/component/Custom';
import {Formik, useFormikContext, useFormik} from 'formik';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Info from 'react-native-vector-icons/Feather';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';

import {RadioButton, Checkbox} from 'react-native-paper';
import {
  immigrationTravelHistory,
  getImmigrationTravelHistory,
  deleteUsTravelHistory,
  fetchImmigratationSelf,
} from '../../../../../application/store/actions/student';
import {
  getAuthToken,
  getBeneficiaryUserID,
} from '../../../../../Infrastructure/utils/storageUtility';
import Tooltip from 'react-native-walkthrough-tooltip';

const validationSchema = yup.object().shape({
  i94Number: yup.string().required('I94 Number Required'),
  i94ExpiryDate: yup.string().required('I94 Expiry Date Required'),
});

const USStayHistory = props => {
  const reducer = props?.immigratationList?.data
    ? props?.immigratationList?.data
    : null;
  const filterData = reducer.filter(item => item.id === props.routeData);
  const routeData = filterData[0].travelInfo;
  console.log(routeData.travelInfo, 'routeData.travelInfo');
  const [loading, setLoading] = useState(false);
  const [travelHistory, setTravelHistory] = useState([]);
  const [eraseData, setEraseData] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [infoIsVisible, setInfoIsVisible] = useState(false);
  const formikProps = useFormikContext();
  const [show, setShow] = useState(false);
  const [emptyDate, setEmptyDate] = useState('');
  const [date, setDate] = useState(new Date());
  let dateformat = moment(date).format('MM/DD/YYYY');
  const onChange = (event, selectedDate) => {
    Platform.OS === 'ios' ? null : setShow(false);
    const currentDate = selectedDate;
    const expiryDate = moment(selectedDate).format('YYYY-MM-DD');
    setDate(currentDate);
    setFieldValue('i94ExpiryDate', expiryDate);
    setEmptyDate(currentDate);
  };
  const showDatepicker = () => {
    setShow(!show);
  };
  const [startShow, setStartShow] = useState(false);
  const [emptyarrivalDate, setEmptyarrivalDate] = useState('');
  const [arrivalDate, setarrivalDate] = useState(new Date());
  let arrivalDateformat = moment(arrivalDate).format('MM/DD/YYYY');
  const onChangeStart = (event, selectedDate) => {
    console.log('value', selectedDate);
    Platform.OS === 'ios' ? null : setStartShow(false);
    const currentDate = selectedDate;
    const arrivalDate = moment(selectedDate).format('YYYY-MM-DD');
    setarrivalDate(currentDate);
    setFieldValue('arrivalDate', arrivalDate);
    setEmptyarrivalDate(currentDate);
  };
  const showarrivalDatepicker = () => {
    setStartShow(!startShow);
  };
  const [endShow, setEndShow] = useState(false);
  const [emptyexitDate, setEmptyexitDate] = useState('');
  const [exitDate, setexitDate] = useState(new Date());
  let exitDateformat = moment(exitDate).format('MM/DD/YYYY');
  const onChangeEnd = (event, selectedDate) => {
    Platform.OS === 'ios' ? null : setEndShow(false);
    const currentDate = selectedDate;
    const exitDate = moment(selectedDate).format('YYYY-MM-DD');
    setexitDate(currentDate);
    setFieldValue('exitDate', exitDate);
    setEmptyexitDate(currentDate);
  };
  const showexitDatepicker = () => {
    setEndShow(!endShow);
  };
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
    handleReset,
  } = useFormik({
    initialValues: {
      i94Number: '',
      i94ExpiryDate: '',
      arrivalDate: '',
      exitDate: '',
      meansOfTravel: '',
      portOfEntry: '',
      exitDateCheck: '',
      arrivalDateCheck: '',
    },

    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => formSubmitHandler(values),
    validationSchema,
  });
  console.log('arrivalDateformat', arrivalDateformat);
  console.log('props.validityStartDate', props.validityStartDate);
  const getUsTravelHistory = async () => {
    const immigrationId = props.routeData;
    const token = await getAuthToken();
    const beneficiaryId = await getBeneficiaryUserID();
    console.log('immigrationId', props.routeData);
    setLoading(true);
    props
      .getTravelHistory(token, beneficiaryId, immigrationId)
      .then(async res => {
        console.log('res get travel history', res);
        setTravelHistory(res.data);
        props
          .fetchImmigratation(token, beneficiaryId)
          .then(async res => {
            setLoading(false);
            console.log(
              'get Data---------------------------------------',
              res.data,
            );
          })
          .catch(e => {
            setLoading(false);
            console.log('error', e);
          });
      })
      .catch(e => {
        setLoading(false);
        console.log('error', e);
      });
  };

  const deleteHandler = async value => {
    console.log('value', value);
    const immigrationId = props.routeData;
    const token = await getAuthToken();
    const beneficiaryId = await getBeneficiaryUserID();
    const travelInfoId = value;
    setLoading(true);
    props
      .deleteTravelHistory(token, beneficiaryId, immigrationId, travelInfoId)
      .then(async res => {
        console.log('res', res);
        const resMessage = res.message;
        props
          .getTravelHistory(token, beneficiaryId, immigrationId)
          .then(async res => {
            console.log('res get travel history', res);
            setTravelHistory(res.data);
            props
              .fetchImmigratation(token, beneficiaryId)
              .then(async res => {
                setLoading(false);
                console.log(
                  'get Data---------------------------------------',
                  res.data,
                );
              })
              .catch(e => {
                setLoading(false);
                console.log('error', e);
              });
          })
          .catch(e => {
            setLoading(false);
            console.log('error', e);
          });
        Toast.show(resMessage, Toast.LONG);
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
      });
  };

  const formSubmitHandler = async formData => {
    console.log('handler value', formData);
    console.log('immigrationId', props.routeData);
    const payload = {
      arrivalDate:
        formData.arrivalDateCheck === 'Arrival Date'
          ? formData.arrivalDate
          : formData.exitDateCheck === 'End of stay on this Visa'
          ? null
          : null,
      effectiveexitDate:
        formData.exitDateCheck === 'End of stay on this Visa'
          ? formData.exitDate
          : formData.arrivalDateCheck === 'Arrival Date'
          ? null
          : null,
      effectivearrivalDate:
        formData.arrivalDateCheck === 'Start of stay on this Visa'
          ? formData.arrivalDate
          : formData.exitDateCheck === 'Departure Date'
          ? null
          : null,
      exitDate:
        formData.exitDateCheck === 'Departure Date'
          ? formData.exitDate
          : formData.arrivalDateCheck === 'Start of stay on this Visa'
          ? null
          : null,
      i94ExpiryDate: formData.i94ExpiryDate,
      i94Number: formData.i94Number,
      id: 0,
      // isChangeOfStatus: true,
      isCurrentlyInUS: false,
      meansOfTravel: formData.meansOfTravel,
      portOfEntry: formData.portOfEntry,
    };
    const immigrationId = props.routeData;
    const token = await getAuthToken();
    const beneficiaryId = await getBeneficiaryUserID();
    console.log('payLoad', payload);
    console.log('token', token);
    console.log('beneficiaryId', beneficiaryId);
    setLoading(true);
    // deleteHandlerssss();
    setEraseData(true);

    props
      .sendTravelHistory(token, beneficiaryId, immigrationId, payload)
      .then(res => {
        console.log('res', res);
        const message = res.message;
        setLoading(false);
        getUsTravelHistory();
        setEmptyDate('');
        setEmptyarrivalDate('');
        setEmptyexitDate('');
        setexitDate(new Date());
        setarrivalDate(new Date());
        setDate(new Date());
        handleReset();
        Toast.show(message, Toast.LONG);
      })
      .catch(e => {
        console.log('error', e);
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <Loader status={loading} />

      <>
        <View>
          <Text style={styles.textHead}>
            I94 Number<Text style={{color: 'red'}}>*</Text>
          </Text>
          <CustomInput
            name="i94Number"
            placeholder="Enter"
            placeholderTextColor="#4D4F5C"
            value={values.i94Number}
            onBlur={handleBlur('i94Number')}
            onChangeText={handleChange('i94Number')}
          />
          {touched.i94Number && errors.i94Number && (
            <Text style={styles.errorMessage}>{errors.i94Number}</Text>
          )}
        </View>
        <View>
          <Text style={styles.textHead}>
            I94 Expiry Date<Text style={{color: 'red'}}>*</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              showDatepicker();
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomInput
                name="i94ExpiryDate"
                placeholder="MM/DD/YYYY"
                placeholderTextColor="#4D4F5C"
                value={emptyDate === '' ? '' : dateformat}
                editable={false}
                autoCorrect={false}
                style={{marginTop: scale(6), flex: 1}}
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
            {touched.i94ExpiryDate && errors.i94ExpiryDate && (
              <Text style={styles.errorMessage}>{errors.i94ExpiryDate}</Text>
            )}
          </TouchableOpacity>
          {show && (
            <DatePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              onChange={onChange}
              style={{
                accentColor: 'red',
                textColor: 'red',
              }}
              themeVariant="dark"
              textColor="blue"
            />
          )}
        </View>
        <View style={{...styles.dashedLine, marginTop: scale(15)}} />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: scale(5),
          }}>
          <Text style={styles.textHeadBold}>
            Let us know your Stay (Arrival and Exit)
          </Text>
          <Tooltip
            isVisible={infoIsVisible}
            content={
              <>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      ...styles.infotext,
                      fontFamily: 'SourceSansPro-Bold',
                    }}>
                    Select the following
                  </Text>
                  <Text style={styles.infotext}>
                    - Select if there is 'Change of Status'
                  </Text>
                  <Text style={styles.infotext}>
                    - Enter the day you have arrived in the US.
                  </Text>
                  <Text style={styles.infotext}>
                    - If you have switched the visa status select and enter.
                  </Text>
                  <Text style={styles.infotext}>
                    - Enter the day you left the US.
                  </Text>
                </View>
              </>
            }
            placement="bottom"
            onClose={() => setInfoIsVisible(!infoIsVisible)}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => setInfoIsVisible(!infoIsVisible)}>
              <Info name="info" size={25} color="#687C93" />
            </TouchableOpacity>
          </Tooltip>
        </View>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton.Group
              onValueChange={handleChange('arrivalDateCheck')}
              value={values.arrivalDateCheck}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <RadioButton.Android
                    value="Start of stay on this Visa"
                    uncheckedColor="grey"
                    color="#0089CF"
                    label="Start of stay on this Visa"
                  />
                  <Text style={styles.radioTitle}>
                    Start of stay on this Visa
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <RadioButton.Android
                    value="Arrival Date"
                    uncheckedColor="grey"
                    color="#0089CF"
                    label="Arrival Date"
                  />
                  <Text style={styles.radioTitle}>Arrival Date</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
          {touched.arrivalDateCheck && errors.arrivalDateCheck && (
            <Text style={{...styles.errorMessage, marginLeft: scale(5)}}>
              {errors.arrivalDateCheck}
            </Text>
          )}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              showarrivalDatepicker();
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomInput
                name="arrivalDate"
                placeholder="MM/DD/YYYY"
                placeholderTextColor="#4D4F5C"
                value={emptyarrivalDate === '' ? '' : arrivalDateformat}
                editable={false}
                autoCorrect={false}
                style={{marginTop: scale(6), flex: 1}}
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
            {touched.arrivalDate && errors.arrivalDate && (
              <Text style={styles.errorMessage}>{errors.arrivalDate}</Text>
            )}
          </TouchableOpacity>
          {startShow && (
            <DatePicker
              testID="dateTimePicker"
              value={arrivalDate}
              mode="date"
              onChange={onChangeStart}
              minimumDate={
                new Date(
                  props.validityStartDate ? props.validityStartDate : null,
                )
              }
              maximumDate={
                new Date(props.validityEndDate ? props.validityEndDate : null)
              }
              style={{
                accentColor: 'red',
                textColor: 'red',
              }}
              themeVariant="dark"
              textColor="blue"
            />
          )}
        </View>
        {values.arrivalDateCheck === 'Arrival Date' ? (
          <>
            <View>
              <Text style={styles.textHead}>Mode of travel</Text>
              <CustomInput
                name="meansOfTravel"
                placeholder="Enter"
                placeholderTextColor="#4D4F5C"
                value={values.meansOfTravel}
                onBlur={handleBlur('meansOfTravel')}
                onChangeText={handleChange('meansOfTravel')}
              />
              {touched.meansOfTravel && errors.meansOfTravel && (
                <Text style={styles.errorMessage}>{errors.meansOfTravel}</Text>
              )}
            </View>
            <View>
              <Text style={styles.textHead}>Port of Entry into the US</Text>
              <CustomInput
                name="portOfEntry"
                placeholder="Enter"
                placeholderTextColor="#4D4F5C"
                value={values.portOfEntry}
                onBlur={handleBlur('portOfEntry')}
                onChangeText={handleChange('portOfEntry')}
              />
              {touched.portOfEntry && errors.portOfEntry && (
                <Text style={styles.errorMessage}>{errors.portOfEntry}</Text>
              )}
            </View>
          </>
        ) : null}

        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton.Group
              onValueChange={handleChange('exitDateCheck')}
              value={values.exitDateCheck}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <RadioButton.Android
                    value="End of stay on this Visa"
                    uncheckedColor="grey"
                    color="#0089CF"
                    label="End of stay on this Visa"
                  />
                  <Text style={styles.radioTitle}>
                    End of stay on this Visa
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <RadioButton.Android
                    value="Departure Date"
                    uncheckedColor="grey"
                    color="#0089CF"
                    label="Departure Date"
                  />
                  <Text style={styles.radioTitle}>Departure Date</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
          {touched.exitDateCheck && errors.exitDateCheck && (
            <Text style={{...styles.errorMessage, marginLeft: scale(5)}}>
              {errors.exitDateCheck}
            </Text>
          )}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              showexitDatepicker();
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomInput
                name="exitDate"
                placeholder="MM/DD/YYYY"
                placeholderTextColor="#4D4F5C"
                value={emptyexitDate === '' ? '' : exitDateformat}
                editable={false}
                autoCorrect={false}
                style={{marginTop: scale(6), flex: 1}}
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
            {touched.exitDate && errors.exitDate && (
              <Text style={styles.errorMessage}>{errors.exitDate}</Text>
            )}
          </TouchableOpacity>
          {endShow && (
            <DatePicker
              testID="dateTimePicker"
              value={exitDate}
              mode="date"
              onChange={onChangeEnd}
              minimumDate={
                arrivalDateformat
                  ? new Date(moment(arrivalDateformat).format('YYYY-MM-DD'))
                  : null
              }
              style={{
                accentColor: 'red',
                textColor: 'red',
              }}
              themeVariant="dark"
              textColor="blue"
            />
          )}
        </View>
        <View style={{marginTop: scale(10)}}>
          <CustomButton
            borderradius="4px"
            bgcolor="#fff"
            borderradiuscolor="#00A0DA"
            borderwidth="1px"
            height="34px"
            width="88px"
            onPress={() => {
              handleSubmit();
            }}>
            <Text style={{...styles.text, color: '#00A0DA'}}>ADD</Text>
          </CustomButton>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#EDF4FB',
            height: scale(56),
            marginTop: scale(20),
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingLeft: scale(15),
              flexWrap: 'wrap',
              // marginLeft: scale(20),
            }}>
            <Text style={styles.formInputTitle}>I-94 Number</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.formInputTitle}>I-94 Expiry Date</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.formInputTitle}>Actions</Text>
          </View>
        </View>
        {routeData?.length > 0 ? (
          routeData.map(item => {
            return (
              <>
                <View
                  // key={item.id}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    height: scale(56),
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      paddingLeft: scale(15),
                    }}>
                    <Text style={styles.formInputTitle}>
                      {item?.i94Number ? item?.i94Number : '--'}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <Text style={styles.formInputTitle}>
                      {item?.i94ExpiryDate
                        ? moment(item?.i94ExpiryDate).format('MM/DD/YYYY')
                        : '--'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => deleteHandler(item.id)}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AntDesign
                      name="delete"
                      size={20}
                      style={{
                        color: '#00A8DB',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      backgroundColor: '#00000040',
                    }}>
                    <View
                      style={{
                        margin: scale(20),
                        backgroundColor: '#FFFFFF',
                        padding: scale(20),
                        // alignItems: "center",
                        // shadowColor: "#000",
                        // shadowOffset: {
                        //   width: 0,
                        //   height: 2,
                        // },
                        shadowOpacity: 0.25,
                        // shadowRadius: 4,
                        elevation: 5,
                        height: scale(213),
                        width: scale(328),
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          // justifyContent: "space-between",
                          // alignItems: "center",
                          // backgroundColor: "red",
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: scale(18),
                              color: '#4D4F5C',
                              fontFamily: 'SourceSansPro-Semibold',
                            }}>
                            Confirm
                          </Text>

                          <Pressable
                            onPress={() => setModalVisible(!modalVisible)}>
                            <AntDesign
                              name="close"
                              size={23}
                              style={{
                                color: 'grey',
                                marginBottom: scale(10),
                              }}
                            />
                          </Pressable>
                        </View>
                        <View
                          style={{
                            marginVertical: scale(10),
                            borderBottomWidth: scale(1),
                            borderBottomColor: '#00000029',
                          }}
                        />
                        <Text>Do you wish to Delete the File?</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: scale(30),
                          }}>
                          <TouchableOpacity
                            onPress={() => deleteHandler()}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: scale(12),
                              borderRadius: scale(5),
                              backgroundColor: '#00A0DA',
                              width: '30%',
                            }}
                            disabled={false}>
                            <Text
                              style={{
                                fontSize: scale(14),
                                fontFamily: 'SourceSansPro-SemiBold',
                                color: '#FFFFFF',
                              }}>
                              Delete
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            style={{
                              marginLeft: scale(30),
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: scale(12),
                              borderRadius: scale(5),
                              backgroundColor: '#EFEFEF',
                              width: '30%',
                            }}
                            disabled={false}>
                            <Text
                              style={{
                                fontSize: scale(14),
                                fontFamily: 'SourceSansPro-SemiBold',
                                color: '#656565',
                              }}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
              </>
            );
          })
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.infotext}>No Data found</Text>
          </View>
        )}

        <View>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: scale(20),
              padding: scale(10),
              borderRadius: scale(5),
              backgroundColor: '#FFFFFF',
              borderColor: '#00A0DA',
              borderWidth: 1,
            }}
            disabled={false}
            onPress={() => props.toggle()}>
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
      </>
    </View>
  );
};
const mapStateToProps = ({
  studentReducer: {getImmigrationTravelHistory, immigratationList},
}) => ({
  getImmigrationTravelHistory,
  immigratationList,
});

const mapDispatchToProps = {
  fetchImmigratation: (token, beneficiaryId) =>
    fetchImmigratationSelf(token, beneficiaryId),
  sendTravelHistory: (token, beneficiaryId, immigrationId, payload) =>
    immigrationTravelHistory(token, beneficiaryId, immigrationId, payload),
  getTravelHistory: (token, beneficiaryId, immigrationId) =>
    getImmigrationTravelHistory(token, beneficiaryId, immigrationId),
  deleteTravelHistory: (
    authToken,
    beneficiaryId,
    immigrationId,
    travelInfoId,
  ) =>
    deleteUsTravelHistory(
      authToken,
      beneficiaryId,
      immigrationId,
      travelInfoId,
    ),
};
export default connect(mapStateToProps, mapDispatchToProps)(USStayHistory);
