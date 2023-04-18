import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {scale} from '../../../../../Infrastructure/utils/screenUtility';
import {useState, useRef} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from '../../../../../Infrastructure/component/Loader/Loader';
import {connect} from 'react-redux';
import {CustomInput} from '../../../../../Infrastructure/component/Custom';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import {Checkbox} from 'react-native-paper';
import PhoneInput from 'react-native-phone-input';
// import {fetchStateList} from '../../../../../application/store/actions/student';
const Employment = ({
  values,
  errors,
  handleChange,
  handleBlur,
  touched,
  setFieldValue,
  handleSubmit,
  EmptypeList,
  CurrList,
  CountryList,
  getstate,
  loading,
  routeData,
}) => {
  useEffect(() => {
    routeData?.countryCode
      ? stateHandler(routeData?.countryCode ? routeData?.countryCode : '')
      : null;
    return () => {};
  }, []);

  const [toggleCheckBox, setToggleCheckBox] = useState(
    routeData?.isCurrentRole ? routeData.isCurrentRole : false,
  );
  const [openType, setOpenType] = useState(false);
  const [type, setType] = useState(
    routeData?.employmentType?.code ? routeData.employmentType.code : '',
  );
  const [typeItems, setTypeItems] = useState(EmptypeList.data);
  const EpmList = [];
  typeItems
    ? typeItems.map(item => {
        EpmList.push({
          label: item.name,
          value: item.code,
        });
      })
    : null;

  const [openCountry, setOpenCountry] = useState(false);
  const [country, setCountry] = useState(
    routeData?.countryCode ? routeData.countryCode : '',
  );
  const [countryItems, setCountryItems] = useState(CountryList.data);
  const countryData = [];
  countryItems
    ? countryItems.map(item => {
        countryData.push({
          label: item.countryName,
          value: item.countryCode,
        });
      })
    : null;

  const [startdate, setStartdate] = useState(new Date());
  const [startdateShow, setStartdateShow] = useState(false);
  const startdateToShow = () => {
    setStartdateShow(true);
  };
  const [emptystartDate, setEmptystartDate] = useState('');
  const onChangeStartYear = (type, selectedDate) => {
    Platform.OS === 'ios' ? null : setStartdateShow(false);
    setStartdate(selectedDate);
    setFieldValue('fromdate', moment(selectedDate).format('YYYY-MM-DD'));
    setEmptystartDate(selectedDate);
  };

  const startdateformat = moment(startdate).format('MM/DD/YYYY');
  const [enddate, setEnddate] = useState(new Date());
  const [endateShow, setEndateShow] = useState(false);
  const endate = () => {
    setEndateShow(true);
  };
  const [emptyendDate, setEmptyendDate] = useState('');
  const onChangeEndYear = (type, selectedDate) => {
    Platform.OS === 'ios' ? null : setEndateShow(false);
    setEnddate(selectedDate);
    setFieldValue('enddate', moment(selectedDate).format('YYYY-MM-DD'));
    setEmptyendDate(selectedDate);
  };
  const enddateformat = moment(enddate).format('MM/DD/YYYY');

  const [openSalary, setOpenSalary] = useState(false);
  const [salary, setSalary] = useState(
    routeData?.currency ? routeData.currency : '',
  );
  const [salaryItems, setSalaryItems] = useState(CurrList.data);
  const curr = [];
  salaryItems
    ? salaryItems.map(item => {
        curr.push({
          label: item.name,
          value: item.id,
        });
      })
    : null;

  const [phoneNumber, setphoneNumber] = useState();
  const phoneInput = useRef(null);

  const [openState, setOpenState] = useState(false);
  const [state, setState] = useState(
    routeData?.stateProvinceCode ? routeData.stateProvinceCode : '',
  );
  const [stateItems, setStateItems] = useState(CountryList.data);
  const [stateresp, setStateResp] = useState([]);
  const [showStateDropDown, setShowStateDropDown] = useState(false);
  const stateHandler = code => {
    getstate(code)
      .then(res => {
        setStateResp(res.data);
        res.data.length > 0
          ? setShowStateDropDown(true)
          : setShowStateDropDown(false);
      })
      .then(error => {
        console.log('error', error);
      });
  };
  const stateData = [];
  stateresp
    ? stateresp.map(item => {
        stateData.push({
          label: item.stateProvinceName,
          value: item.stateProvinceCode,
        });
      })
    : null;
  return (
    <View style={styles.container}>
      <Loader status={loading} />
      <>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: scale(-8),
            }}>
            <Checkbox.Android
              name="checkbox"
              status={toggleCheckBox ? 'checked' : 'unchecked'}
              color="#00A0DA"
              uncheckedColor="grey"
              onPress={() => {
                setToggleCheckBox(!toggleCheckBox);
                setFieldValue('togglebox', !toggleCheckBox);
              }}
            />
            <Text style={styles.text}>I am currently working on this role</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: scale(10)}}>
            <Text style={styles.textHead}>
              Title<Text style={{color: 'red'}}>*</Text>
            </Text>
          </View>
          <CustomInput
            multiline
            name="title"
            placeholder="Ex: User Experience Designer"
            placeholderTextColor="#4D4F5C"
            value={values.title}
            autoCorrect={false}
            onBlur={handleBlur('title')}
            onChangeText={handleChange('title')}
            style={{height: 80, marginTop: scale(6)}}
          />
          {touched.title && errors.title && (
            <Text style={styles.errorMessage}>{errors.title}</Text>
          )}
        </View>
        <View style={{zIndex: 100}}>
          <View style={{flexDirection: 'row', marginTop: scale(10)}}>
            <Text style={styles.textHead}>
              Employment Type<Text style={{color: 'red'}}>*</Text>
            </Text>
          </View>
          <DropDownPicker
            listMode="SCROLLVIEW"
            open={openType}
            value={type}
            items={EpmList}
            setOpen={setOpenType}
            setValue={setType}
            setItems={setTypeItems}
            placeholder="Ex: Full Time"
            onChangeValue={value => setFieldValue('type', value)}
            style={{
              height: scale(40),
              marginTop: scale(5),
              borderRadius: scale(4),
              borderColor: '#C3D0DE',
              zIndex: 100,
            }}
            textStyle={styles.dropdownText}
          />
          {touched.type && errors.type && (
            <Text style={styles.errorMessage}>{errors.type}</Text>
          )}
        </View>

        <View style={{marginTop: scale(10)}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textHead}>
              Employed From<Text style={{color: 'red'}}>*</Text>
            </Text>
          </View>

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
                    ? routeData?.startDate
                      ? moment(routeData?.startDate).format('MM/DD/YYYY')
                      : ''
                    : startdateformat
                }
                editable={false}
                autoCorrect={false}
                onBlur={handleBlur('from')}
                onChangeText={handleChange('from')}
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
            {touched.fromdate && errors.fromdate && (
              <Text style={styles.errorMessage}>{errors.fromdate}</Text>
            )}
          </TouchableOpacity>
          {startdateShow && (
            <DatePicker
              testID="dateTimePicker"
              value={startdate}
              mode="date"
              maximumDate={new Date()}
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
        {toggleCheckBox ? null : (
          <View style={{marginTop: scale(10)}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textHead}>
                Employed To<Text style={{color: 'red'}}>*</Text>
              </Text>
            </View>
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
                  value={
                    emptyendDate === ''
                      ? routeData?.endDate
                        ? moment(routeData?.endDate).format('MM/DD/YYYY')
                        : ''
                      : enddateformat
                  }
                  editable={false}
                  autoCorrect={false}
                  onBlur={handleBlur('to')}
                  onChangeText={handleChange('to')}
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
              {touched.enddate && errors.enddate && (
                <Text style={styles.errorMessage}>{errors.enddate}</Text>
              )}
            </TouchableOpacity>
            {endateShow && (
              <DatePicker
                testID="dateTimePicker"
                value={enddate}
                mode="date"
                onChange={onChangeEndYear}
                maximumDate={new Date()}
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
        )}
        <View>
          <View style={{flexDirection: 'row', marginTop: scale(10)}}>
            <Text style={styles.textHead}>
              Salary<Text style={{color: 'red'}}>*</Text>
            </Text>
          </View>
          <View style={{flexDirection: 'row', zIndex: 50}}>
            <View style={{flex: 3.5, marginRight: scale(5)}}>
              <DropDownPicker
                listMode="SCROLLVIEW"
                open={openSalary}
                value={salary}
                items={curr}
                setOpen={setOpenSalary}
                setValue={setSalary}
                setItems={setSalaryItems}
                placeholder="Select"
                style={{
                  height: 40,
                  marginTop: scale(5),
                  borderRadius: scale(4),
                  borderColor: '#C3D0DE',
                  zIndex: 100,
                }}
                textStyle={styles.dropdownText}
                onChangeValue={value => setFieldValue('curr', value)}
              />
              {touched.curr && errors.curr && (
                <Text style={styles.errorMessage}>{errors.curr}</Text>
              )}
            </View>
            <View style={{flex: 8.5}}>
              <CustomInput
                name="salary"
                placeholder="Enter"
                placeholderTextColor="#4D4F5C"
                value={values.salary}
                onBlur={handleBlur('salary')}
                onChangeText={handleChange('salary')}
                onChangeValue={handleChange('salary')}
                autoCorrect={false}
                keyboardType="numeric"
                style={{marginTop: scale(5)}}
              />
              {touched.salary && errors.salary && (
                <Text style={styles.errorMessage}>{errors.salary}</Text>
              )}
            </View>
          </View>
          <View style={{marginTop: scale(15)}}>
            <Text style={styles.textHeadBold}>Employer Contact Details</Text>
          </View>
          <View style={{marginTop: scale(10)}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textHead}>
                Company<Text style={{color: 'red'}}>*</Text>
              </Text>
            </View>
            <CustomInput
              name="Company"
              placeholder="Enter"
              placeholderTextColor="#4D4F5C"
              value={values.company}
              onBlur={handleBlur('company')}
              onChangeText={handleChange('company')}
              onChangeValue={handleChange('company')}
              autoCorrect={false}
              style={{marginTop: scale(6)}}
            />
            {touched.company && errors.company && (
              <Text style={styles.errorMessage}>{errors.company}</Text>
            )}
          </View>
        </View>
        <View style={{marginTop: scale(10)}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textHead}>
              Phone No.<Text style={{color: 'red'}}></Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              height: scale(37),
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flex: 1,
                  height: 40,
                  borderWidth: 1,
                  borderColor: '#CCD5E6',
                  borderRadius: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 5,
                }}>
                <PhoneInput
                  name="phoneNumber"
                  ref={phoneInput}
                  initialCountry={
                    routeData?.officeCountryCode?.shortCountryCode
                      ? routeData.officeCountryCode.shortCountryCode.toLowerCase()
                      : ''
                  }
                  layout="first"
                  withShadow
                  autoFocus
                  countryCode={text => {}}
                  pickerBackgroundColor="#A2D3EA"
                  onChangePhoneNumber={value => setphoneNumber(value)}
                  onSelectCountry={handleChange('countryName')}
                />
              </View>

              <View style={{flex: 8, marginLeft: scale(5)}}>
                <CustomInput
                  name="phoneNumber"
                  placeholder="Enter"
                  placeholderTextColor="#4D4F5C"
                  value={values.phoneNumber}
                  onBlur={handleBlur('phoneNumber')}
                  onChangeText={handleChange('phoneNumber')}
                  autoCorrect={false}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: scale(5),
            }}></View>
        </View>
        <View style={{marginTop: scale(5)}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textHead}>
              Address Line 1 <Text style={{color: 'red'}}>*</Text>
            </Text>
          </View>
          <CustomInput
            name="AddressLine1"
            placeholder="Enter"
            placeholderTextColor="#4D4F5C"
            value={values.AddressLine1}
            onBlur={handleBlur('AddressLine1')}
            onChangeText={handleChange('AddressLine1')}
            onChangeValue={handleChange('AddressLine1')}
            autoCorrect={false}
            style={{height: 60, marginTop: scale(6)}}
          />
          {touched.AddressLine1 && errors.AddressLine1 && (
            <Text style={styles.errorMessage}>{errors.AddressLine1}</Text>
          )}
        </View>
        <View style={{marginTop: scale(10)}}>
          <Text style={styles.textHead}>Address Line 2</Text>
          <CustomInput
            name="AddressLine2"
            placeholder="Enter"
            placeholderTextColor="#4D4F5C"
            value={values.AddressLine2}
            onBlur={handleBlur('AddressLine2')}
            onChangeText={handleChange('AddressLine2')}
            onChangeValue={handleChange('AddressLine2')}
            autoCorrect={false}
            style={{height: 60, marginTop: scale(6)}}
          />
        </View>
        <View style={{marginTop: scale(10)}}>
          <Text style={styles.textHead}>
            ZIP / Postal Code <Text style={{color: 'red'}}>*</Text>
          </Text>
          <CustomInput
            name="postalcode"
            placeholder="Enter"
            placeholderTextColor="#4D4F5C"
            value={values.postalcode}
            onBlur={handleBlur('postalcode')}
            onChangeText={handleChange('postalcode')}
            onChangeValue={handleChange('postalcode')}
            keyboardType="numeric"
            autoCorrect={false}
            style={{marginTop: scale(6)}}
          />
          {touched.postalcode && errors.postalcode && (
            <Text style={styles.errorMessage}>{errors.postalcode}</Text>
          )}
        </View>
        <View>
          <View style={{flexDirection: 'row', marginTop: scale(10)}}>
            <Text style={styles.textHead}>
              Country<Text style={{color: 'red'}}>*</Text>
            </Text>
          </View>
          <DropDownPicker
            listMode="MODAL"
            open={openCountry}
            value={country}
            items={countryData}
            setOpen={setOpenCountry}
            setValue={setCountry}
            setItems={setCountryItems}
            placeholder="Select"
            style={{
              height: scale(40),
              marginTop: scale(5),
              borderRadius: scale(4),
              borderColor: '#C3D0DE',
              zIndex: 100,
            }}
            textStyle={styles.dropdownText}
            onSelectItem={value => {
              setStateResp([]);
              stateHandler(value.value);
              setFieldValue('countrycode', value.value);
            }}
          />
          {touched.countrycode && errors.countrycode && (
            <Text style={styles.errorMessage}>{errors.countrycode}</Text>
          )}
        </View>
        <View>
          <View style={{flexDirection: 'row', marginTop: scale(10)}}>
            <Text style={styles.textHead}>
              State<Text style={{color: 'red'}}>*</Text>
            </Text>
          </View>
          {showStateDropDown ? (
            <DropDownPicker
              listMode="MODAL"
              open={openState}
              value={state}
              items={stateData}
              setOpen={setOpenState}
              setValue={setState}
              // setItems={setStateItems}
              style={{
                height: scale(40),
                marginTop: scale(5),
                borderRadius: scale(4),
                borderColor: '#C3D0DE',
                zIndex: 100,
              }}
              onChangeValue={value => setFieldValue('stateCode', value)}
              onSelectItem={value => {
                setFieldValue('stateName', value.label);
              }}
              placeholder="Select"
              textStyle={styles.dropdownText}
            />
          ) : (
            <CustomInput
              name="stateName"
              placeholder="Enter"
              placeholderTextColor="#4D4F5C"
              value={values.stateName}
              onBlur={handleBlur('stateName')}
              onChangeText={handleChange('stateName')}
              autoCorrect={false}
              onChange={() => setFieldValue('stateCode', null)}
              style={{marginTop: scale(6)}}
            />
          )}
          {touched.stateName && errors.stateName && (
            <Text style={styles.errorMessage}>{errors.stateName}</Text>
          )}
        </View>
        <View>
          <View style={{flexDirection: 'row', marginTop: scale(10)}}>
            <Text style={styles.textHead}>
              City<Text style={{color: 'red'}}>*</Text>
            </Text>
          </View>
          <CustomInput
            name="City"
            placeholder="Enter"
            placeholderTextColor="#4D4F5C"
            value={values.city}
            onBlur={handleBlur('city')}
            onChangeText={handleChange('city')}
            onChangeValue={handleChange('city')}
            autoCorrect={false}
            style={{marginTop: scale(6)}}
          />
          {touched.city && errors.city && (
            <Text style={styles.errorMessage}>{errors.city}</Text>
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
            borderColor: '#00A0DA',
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
      </>
    </View>
  );
};
const mapStateToProps = ({
  studentReducer: {
    studentInformation,
    CountryList,
    StateList,
    EmptypeList,
    CurrList,
  },
}) => ({
  studentInformation,
  CountryList,
  StateList,
  EmptypeList,
  CurrList,
});
const mapDispatchToProps = {
  // getStudentInformation: (token, beneficiaryId) =>
  //   studentInformation(token, beneficiaryId),
  // getstate: code => fetchStateList(code),
};
export default connect(mapStateToProps, mapDispatchToProps)(Employment);
