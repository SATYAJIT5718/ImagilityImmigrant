import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useRef, memo} from 'react';
import {
  CustomInput,
  CustomButton,
  CustomCheckBox,
  CustomDropdownPicker,
  CustomRadioButton,
  CustomDatePicker,
} from '../../../../Infrastructure/CommonComponents/index';
import PhoneInput from 'react-native-phone-number-input';
import {
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {scale} from '../../../../Infrastructure/utils/screenUtility';
import {useFormik, Form} from 'formik';
import * as yup from 'yup';
import {PersonalDetailsJSON} from '../../../../Infrastructure/JSONData/PersonalDetails';
import Accordion from '../../../../Infrastructure/component/Accordion/Accordion';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
const PersonalDetails = props => {
  const navigation = useNavigation();
  const FormFields = PersonalDetailsJSON;
  const [selectedValue, setSelectedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const phoneInput = useRef(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  let initialValue = {};

  FormFields?.fields?.forEach(property => {
    property.contents.map(itemz => {
      switch (itemz.type) {
        case 'text':
          initialValue[itemz.name] = '';
          break;
        case 'email':
          initialValue[itemz.name] = '';
          break;
        case 'multi':
          itemz.content.map(val => {
            initialValue[val?.name] = '';
          });
          break;
        case 'password':
          initialValue[itemz.name] = '';
          break;
        case 'radio':
          initialValue[itemz.name] = '';
          break;
        case 'dropdown':
          initialValue[itemz.name] = '';
          initialValue[itemz.isOpenTitle] = itemz.isOpen;

          break;
        case 'checkbox':
          initialValue[itemz.name] = '';
          break;
        case 'phoneInput':
          initialValue[itemz.name] = '';
          initialValue[itemz.countryName] = 'IN';
          break;
        case 'date':
          initialValue[itemz.name] = '';
          initialValue[itemz.isOpenTitle] = itemz.isOpen;
          break;
        // Add cases for other data types as needed
        default:
          // initialValue[itemz.name] = '';
          break;
      }
    });
  });

  const createValidationSchema = fields => {
    const schema = {};
    fields?.forEach(field => {
      field.contents.map(itemz => {
        switch (itemz.type) {
          case 'text':
            schema[itemz?.name] = itemz?.required
              ? yup.string().required(`${itemz?.label} is required`)
              : yup.string();
            break;
          case 'email':
            schema[itemz?.name] = itemz?.required
              ? yup
                  .string()
                  .email('Please enter valid Email')
                  .required(`${itemz?.label} is required`)
              : yup.string();
            break;
          case 'multi':
            itemz?.content?.map(val => {
              schema[val?.name] = val?.required
                ? yup.string().required(`${val?.label} is required`)
                : yup.string();
            });
            break;
          case 'password':
            itemz.view === 'multi'
              ? itemz.content.map(val => {
                  schema[val?.name] = val?.required
                    ? yup.string().required(`${val?.label} is required`)
                    : yup.string();
                })
              : (schema[itemz?.name] = itemz?.required
                  ? yup.string().required(`${itemz?.label} is required`)
                  : yup.string());
            break;
          case 'dropdown':
            schema[itemz?.name] = itemz?.required
              ? yup.string().required(`${itemz?.label} is required`)
              : yup.string();
            break;
          case 'phoneInput':
            schema[itemz?.name] = itemz?.required
              ? yup
                  .string()
                  .matches(/^\S*$/, 'Space is not allowed')
                  .matches(
                    /^[^!@#$%^&*()\"/?'=+{}; :,<.>]*$/,
                    'Special character is not allowed',
                  )
                  .min(10)
                  .max(10)
                  .typeError("That doesn't look like a phone number")
                  .required(`${itemz?.label} is required`)
              : yup.number();
            break;
          case 'radio':
            schema[itemz?.name] = itemz?.required
              ? yup.string().required(`${itemz?.label} is required`)
              : yup.string().nullable();
            break;
          case 'checkbox':
            schema[itemz?.name] = itemz?.required
              ? yup.boolean().oneOf([true], `You must accept ${itemz?.label}`)
              : yup.boolean();
            break;
          case 'date':
            schema[itemz?.name] = itemz?.required
              ? yup.string().required(`${itemz?.label} is required`)
              : yup.string();
            break;
          default:
            break;
        }
      });
    });
    return yup.object().shape(schema);
  };

  const validationSchema = createValidationSchema(FormFields?.fields);

  const formHandler = value => {
    console.log('fianl submit handler =>>>>>', value);
    const payload = {
      id: benID ? benID : '',
      fName: formData.firstName,
      mName: formData.middleName,
      lName: formData.lastName,
      greScore: formData.GREscore,
      toeflScore: formData.TOEFLscore,
      title: formData.title,
      // aliasName: otherNameCheck
      //   ? [
      //       {
      //         fName: '',
      //         title: '',
      //       },
      //     ]
      //   : [],
      gender: {
        id:
          formData.gender === 'FEML'
            ? 7
            : formData.gender === 'MALE'
            ? 6
            : null,
        name: formData.gender,
      },
      dob: '',
      ssn: formData.SocialSecurityNumber,
      emailContacts: [
        {
          email: formData.email,
          id: '',
          type: {
            code: 'PRIM',
            id: 34,
          },
        },
      ],
      phoneContacts: [
        {
          phoneNo: formData.phoneNumber,
          id: '',
          type: {
            code: 'MOBL',
            id: 31,
          },
          countryCode: {
            countryCode: formData.countryName ? formData.countryName : '',
            phoneCode: '',
          },
        },
      ],
    };
    console.log('payload', payload);
  };
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    values,
    touched,
    errors,
    isValid,
  } = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: value => formHandler(value),
    validationSchema,
  });
  console.log('initialValue', initialValue);
  console.log('values', values);

  const singleViewController = item => {
    {
      if (item.type === 'text') {
        return (
          <View
            key={item.id}
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                marginBottom: scale(5),
                fontSize: scale(14),
                fontFamily: 'SourceSansPro-Regular',
                color: '#24262F',
                marginTop: scale(5),
              }}>
              {item.label}
              {item.required ? <Text style={{color: 'red'}}>*</Text> : null}
            </Text>
            <CustomInput
              name={item.name}
              placeholder={item.placeholder}
              placeholderTextColor={item.placeholderTextColor || '#4D4F5C'}
              value={values[item?.name]}
              onBlur={handleBlur(`${item?.name}`)}
              onChangeText={handleChange(`${item?.name}`)}
              autoCorrect={false}
              style={item.style ? item.style : {}}
              multiline={item.multiline}
              secureTextEntry={item.secureTextEntry}
              keyboardType={item.keyboardType || 'default'}
            />
            {touched[item?.name] && errors[item?.name] && (
              <Text
                style={{
                  fontSize: scale(10),
                  fontFamily: 'SourceSansPro-Regular',
                  color: 'red',
                  marginLeft: scale(5),
                  marginBottom: scale(5),
                }}>
                {errors[item?.name]}
              </Text>
            )}
          </View>
        );
      }
      if (item.type === 'email') {
        return (
          <View
            key={item.id}
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                marginBottom: scale(5),
                fontSize: scale(14),
                fontFamily: 'SourceSansPro-Regular',
                color: '#24262F',
                marginTop: scale(5),
              }}>
              {item.label}
              {item.required ? <Text style={{color: 'red'}}>*</Text> : null}
            </Text>
            <CustomInput
              name={item.name}
              placeholder={item.placeholder}
              placeholderTextColor={item.placeholderTextColor || '#4D4F5C'}
              //   value={values.email}
              onBlur={handleBlur(`${item?.name}`)}
              onChangeText={handleChange(`${item?.name}`)}
              autoCorrect={false}
              style={item.style ? item.style : {}}
              multiline={item.multiline}
              secureTextEntry={item.secureTextEntry}
            />
            {touched[item?.name] && errors[item?.name] && (
              <Text
                style={{
                  fontSize: scale(10),
                  fontFamily: 'SourceSansPro-Regular',
                  color: 'red',
                  marginLeft: scale(5),
                  marginBottom: scale(5),
                }}>
                {errors[item?.name]}
              </Text>
            )}
          </View>
        );
      }
      if (item.type === 'password') {
        return (
          <View key={item.id} style={{flex: 1, paddingLeft: scale(2)}}>
            <Text
              style={{
                marginBottom: scale(5),
                fontSize: scale(14),
                fontFamily: 'SourceSansPro-Regular',
                color: '#24262F',
                marginTop: scale(5),
              }}>
              {item.label}
              {item.required ? <Text style={{color: 'red'}}>*</Text> : null}
            </Text>
            <CustomInput
              name={item.name}
              placeholder={item.placeholder}
              placeholderTextColor={item.placeholderTextColor || '#4D4F5C'}
              // value={item.value}
              onBlur={handleBlur(`${item?.name}`)}
              onChangeText={handleChange(`${item?.name}`)}
              autoCorrect={false}
              style={item.style ? item.style : {}}
              multiline={item.multiline}
              secureTextEntry={item.secureTextEntry}
            />
            {touched[item?.name] && errors[item?.name] && (
              <Text
                style={{
                  fontSize: scale(10),
                  fontFamily: 'SourceSansPro-Regular',
                  color: 'red',
                  marginLeft: scale(5),
                  marginBottom: scale(5),
                }}>
                {errors[item?.name]}
              </Text>
            )}
          </View>
        );
      }
      if (item.type === 'phoneInput') {
        return (
          <View key={item.id} style={{marginBottom: scale(5)}}>
            <Text
              style={{
                marginBottom: scale(5),
                fontSize: scale(14),
                fontFamily: 'SourceSansPro-Regular',
                color: '#24262F',
                marginTop: scale(5),
              }}>
              {item.label}
              {item.required ? <Text style={{color: 'red'}}>*</Text> : null}
            </Text>
            <View>
              <PhoneInput
                ref={phoneInput}
                defaultValue={values[item?.name]}
                defaultCode={values[item?.countryName]}
                // layout="second"
                layout="first"
                onChangeText={text => {
                  setFieldValue(`${item?.name}`, text);
                  console.log('phone number', text);
                  console.log('values', values);
                }}
                // onChangeFormattedText={text => {
                //   console.log('onChangeFormattedText', text);
                // }}
                onChangeCountry={value => {
                  console.log('selected country', value);
                  setFieldValue(`${item?.countryName}`, value.cca2);
                }}
                // withDarkTheme
                // withShadow
                // autoFocus55
                // disableArrowIcon
                containerStyle={{
                  width: '100%',
                  backgroundColor: 'white',
                  borderColor: '#C3D0DE',
                  borderWidth: 1,
                  borderRadius: 3,
                  height: scale(40),
                }}
                textContainerStyle={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
                textInputStyle={{
                  height: scale(40),
                  fontSize: scale(14),
                  fontFamily: 'SourceSansPro-Regular',
                  color: '#24262F',
                }}
                codeTextStyle={{
                  paddingVertical: scale(10),
                  height: scale(35),
                  fontSize: scale(14),
                  fontFamily: 'SourceSansPro-Regular',
                  color: '#4D4F5C',
                }}
                flagButtonStyle={{
                  height: scale(40),
                  // backgroundColor: 'white',
                }}
                countryPickerButtonStyle={{}}
              />
            </View>
            {errors[item?.name] && (
              <Text
                style={{
                  fontSize: scale(10),
                  fontFamily: 'SourceSansPro-Regular',
                  color: 'red',
                  marginLeft: scale(5),
                  marginBottom: scale(5),
                }}>
                {errors[item?.name]}
              </Text>
            )}
          </View>
        );
      }
      if (item.type === 'dropdown') {
        return (
          <View key={item.id} style={{zIndex: 80, marginBottom: scale(5)}}>
            <Text
              style={{
                marginBottom: scale(5),
                fontSize: scale(14),
                fontFamily: 'SourceSansPro-Regular',
                color: '#24262F',
                // marginTop: scale(5),
              }}>
              {item.label}
              {item.required ? <Text style={{color: 'red'}}>*</Text> : null}
            </Text>
            <CustomDropdownPicker
              listMode={Platform.OS == 'ios' ? 'SCROLLVIEW' : 'MODAL'}
              open={isOpen}
              value={selectedValue}
              items={item.data}
              setOpen={setIsOpen}
              setValue={setSelectedValue}
              // setItems={item.data}
              onChangeValue={handleChange(`${item.name}`)}
              placeholder={item.placeholder || 'Select'}
              placeholderStyle={
                item.placeholderStyle || {
                  color: '#4D4F5C',
                }
              }
              maxHeight={scale(250)}
              style={
                item.style || {
                  minHeight: scale(40),
                  borderRadius: scale(5),
                  borderColor: '#C3D0DE',
                  paddingVertical: -20,
                  width: '100%',
                  height: scale(40),
                }
              }
            />
            {touched[item.name] && errors[item.name] && (
              <Text
                style={{
                  fontSize: scale(10),
                  fontFamily: 'SourceSansPro-Regular',
                  color: 'red',
                  marginLeft: scale(5),
                  marginBottom: scale(5),
                }}>
                {errors[item.name]}
              </Text>
            )}
          </View>
        );
      }
      if (item.type === 'radio') {
        return (
          <>
            <View>
              <Text
                style={{
                  fontSize: scale(14),
                  fontFamily: 'SourceSansPro-Regular',
                  color: '#24262F',
                  marginTop: scale(5),
                }}>
                {item.label}
                {item.required ? <Text style={{color: 'red'}}>*</Text> : null}
              </Text>
              <CustomRadioButton
                onValueChange={handleChange(`${item?.name}`)}
                value={values[item?.name]}
                itemList={item.data || []}
                color="#0089CF"
                uncheckedColor="grey"
                radioTitleStyle={{
                  fontSize: scale(14),
                  color: '#4D4F5C',
                  fontFamily: 'SourceSansPro-Regular',
                }}
              />
              {touched[item?.name] && errors[item?.name] && (
                <Text
                  style={{
                    fontSize: scale(10),
                    fontFamily: 'SourceSansPro-Regular',
                    color: 'red',
                    marginLeft: scale(5),
                    marginBottom: scale(5),
                  }}>
                  {errors[item?.name]}
                </Text>
              )}
            </View>
          </>
        );
      }
      if (item.type === 'button') {
        return (
          <View key={item.id} style={{marginBottom: scale(5)}}>
            <Text
              style={{
                marginBottom: scale(5),
                fontSize: scale(14),
                fontFamily: 'SourceSansPro-Regular',
                color: '#24262F',
                marginTop: scale(5),
              }}>
              {item.label}
              {item.required ? <Text style={{color: 'red'}}>*</Text> : null}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <CustomButton
                buttonText={'Upload'}
                buttonTextStyle={{
                  fontSize: scale(14),
                  fontFamily: 'SourceSansPro-SemiBold',
                  color: '#349beb',
                }}
                buttonStyle={{
                  backgroundColor: '#fff',
                  height: scale(35),
                  width: scale(80),
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderRadius: scale(4),
                  borderWidth: 1,
                  borderColor: '#349beb',
                }}
                onPressHandler={() => {}}
              />
              {errors[item?.name] && (
                <Text
                  style={{
                    fontSize: scale(10),
                    fontFamily: 'SourceSansPro-Regular',
                    color: 'red',
                    marginLeft: scale(5),
                    marginBottom: scale(5),
                  }}>
                  {errors[item?.name]}
                </Text>
              )}
            </View>
          </View>
        );
      }
      if (item.type === 'date') {
        return (
          <View>
            <Text
              style={{
                marginBottom: scale(5),
                fontSize: scale(14),
                fontFamily: 'SourceSansPro-Regular',
                color: '#24262F',
                marginTop: scale(5),
              }}>
              {item.label}
              {item.required ? <Text style={{color: 'red'}}>*</Text> : null}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setFieldValue(
                  `${item?.isOpenTitle}`,
                  !values[item?.isOpenTitle],
                );
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: scale(5),
                }}>
                <CustomInput
                  name={item.name}
                  placeholder={item.placeholder}
                  placeholderTextColor="#4D4F5C"
                  value={
                    values[item?.name] === ''
                      ? ''
                      : moment(values[item?.name]).format('MM/DD/YYYY')
                    // emptyDate === ''
                    //   ? studentInfo?.dob
                    //     ? moment(studentInfo?.dob).format('MM/DD/YYYY')
                    //     : ''
                    //   : dateformat
                  }
                  editable={false}
                  autoCorrect={false}
                  style={item.style || {}}
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
              {touched[item?.name] && errors[item?.name] && (
                <Text
                  style={{
                    fontSize: scale(10),
                    fontFamily: 'SourceSansPro-Regular',
                    color: 'red',
                    marginLeft: scale(5),
                    marginBottom: scale(5),
                  }}>
                  {errors[item?.name]}
                </Text>
              )}
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={values[item?.isOpenTitle]}
              date={date}
              onConfirm={date => {
                setFieldValue(
                  `${item?.isOpenTitle}`,
                  !values[item?.isOpenTitle],
                );
                // setOpen(!open);
                setFieldValue(`${item?.name}`, date);
                // setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        );
      }
    }
  };
  const multiViewController = item => {
    return (
      <View
        key={item?.content?.[0]?.id}
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: item?.content?.[0]?.type === 'dropdown' ? 100 : 0,
        }}>
        <View style={{flex: 1, paddingRight: scale(2), zIndex: 90}}>
          {item.content?.[0]?.type === 'text' ? (
            <View
              key={item?.content?.[0]?.id}
              style={{
                flex: 1,
              }}>
              <Text
                style={{
                  marginBottom: scale(5),
                  fontSize: scale(14),
                  fontFamily: 'SourceSansPro-Regular',
                  color: '#24262F',
                  marginTop: scale(5),
                }}>
                {item.content?.[0]?.label}
                {item.content?.[0]?.required ? (
                  <Text style={{color: 'red'}}>*</Text>
                ) : null}
              </Text>
              <CustomInput
                name={item?.content?.[0]?.name}
                placeholder={item?.content?.[0]?.placeholder}
                placeholderTextColor={
                  item?.content?.[0]?.placeholderTextColor || '#4D4F5C'
                }
                value={item?.content?.[0]?.value}
                onBlur={handleBlur(`${item?.content?.[0]?.name}`)}
                onChangeText={handleChange(`${item?.content?.[0]?.name}`)}
                autoCorrect={false}
                style={
                  item?.content?.[0]?.style ? item?.content?.[0]?.style : {}
                }
                multiline={item?.content?.[0]?.multiline}
                secureTextEntry={item?.content?.[0]?.secureTextEntry}
                keyboardType={item.content?.[0]?.keyboardType || 'default'}
              />
              {touched[item.content?.[0]?.name] &&
                errors[item.content?.[0]?.name] && (
                  <Text
                    style={{
                      fontSize: scale(10),
                      fontFamily: 'SourceSansPro-Regular',
                      color: 'red',
                      marginLeft: scale(5),
                      marginBottom: scale(5),
                    }}>
                    {errors[item.content?.[0]?.name]}
                  </Text>
                )}
            </View>
          ) : null}
          {item.content?.[0]?.type === 'password' ? (
            <View
              key={item.content?.[0]?.id}
              style={{flex: 1, paddingLeft: scale(2)}}>
              <Text
                style={{
                  marginBottom: scale(5),
                  fontSize: scale(14),
                  fontFamily: 'SourceSansPro-Regular',
                  color: '#24262F',
                  marginTop: scale(5),
                }}>
                {item.content?.[0]?.label}
                {item.content?.[0]?.required ? (
                  <Text style={{color: 'red'}}>*</Text>
                ) : null}
              </Text>
              <CustomInput
                name={item.content?.[0]?.name}
                placeholder={item.content?.[0]?.placeholder}
                placeholderTextColor={
                  item.content?.[0]?.placeholderTextColor || '#4D4F5C'
                }
                value={item.content?.[0]?.value}
                onBlur={handleBlur(`${item.content?.[0]?.name}`)}
                onChangeText={handleChange(`${item.content?.[0]?.name}`)}
                autoCorrect={false}
                style={item.content?.[0]?.style ? item.content?.[0]?.style : {}}
                multiline={item.content?.[0]?.multiline}
                secureTextEntry={item.content?.[0]?.secureTextEntry}
                keyboardType={item.content?.[0]?.keyboardType || 'default'}
              />
              {touched[item.content?.[0]?.name] &&
                errors[item.content?.[0]?.name] && (
                  <Text
                    style={{
                      fontSize: scale(10),
                      fontFamily: 'SourceSansPro-Regular',
                      color: 'red',
                      marginLeft: scale(5),
                      marginBottom: scale(5),
                    }}>
                    {errors[item.content?.[0]?.name]}
                  </Text>
                )}
            </View>
          ) : null}
          {item.content?.[0]?.type === 'dropdown' ? (
            <View
              key={item.content?.[0]?.id}
              style={{zIndex: 80, marginBottom: scale(5)}}>
              <Text
                style={{
                  marginBottom: scale(5),
                  fontSize: scale(14),
                  fontFamily: 'SourceSansPro-Regular',
                  color: '#24262F',
                  // marginTop: scale(5),
                }}>
                {item.content?.[0]?.label}
                {item.content?.[0]?.required ? (
                  <Text style={{color: 'red'}}>*</Text>
                ) : null}
              </Text>
              <CustomDropdownPicker
                listMode={Platform.OS == 'ios' ? 'SCROLLVIEW' : 'MODAL'}
                open={values[item.content?.[0]?.isOpen]}
                value={values[item.content?.[0]?.name]}
                items={item.content?.[0]?.data}
                setOpen={() => {
                  setFieldValue(
                    `${item.content?.[0]?.isOpen}`,
                    !values[item.content?.[0]?.isOpen],
                  );
                }}
                // setValue={setSelectedValue}
                // setItems={item.data}
                onChangeValue={handleChange(`${item.content?.[0]?.name}`)}
                placeholder={item.content?.[0]?.placeholder || 'Select'}
                placeholderStyle={
                  item.content?.[0]?.placeholderStyle || {
                    color: '#4D4F5C',
                  }
                }
                maxHeight={scale(250)}
                style={
                  item.content?.[0]?.style || {
                    minHeight: scale(40),
                    borderRadius: scale(5),
                    borderColor: '#C3D0DE',
                    paddingVertical: -20,
                    width: '100%',
                    height: scale(40),
                  }
                }
              />
              {touched[item.content?.[0]?.name] &&
                errors[item.content?.[0]?.name] && (
                  <Text
                    style={{
                      fontSize: scale(10),
                      fontFamily: 'SourceSansPro-Regular',
                      color: 'red',
                      marginLeft: scale(5),
                      marginBottom: scale(5),
                    }}>
                    {errors[item.content?.[0]?.name]}
                  </Text>
                )}
            </View>
          ) : null}
        </View>
        <View style={{flex: 1, paddingLeft: scale(2), zIndex: 90}}>
          {item.content?.[1]?.type === 'text' ? (
            <View
              key={item.content?.[1]?.id}
              style={{
                flex: 1,
              }}>
              <Text
                style={{
                  marginBottom: scale(5),
                  fontSize: scale(14),
                  fontFamily: 'SourceSansPro-Regular',
                  color: '#24262F',
                  marginTop: scale(5),
                }}>
                {item.content?.[1]?.label}
                {item.content?.[1]?.required ? (
                  <Text style={{color: 'red'}}>*</Text>
                ) : null}
              </Text>
              <CustomInput
                name={item.content?.[1]?.name}
                placeholder={item.content?.[1]?.placeholder}
                placeholderTextColor={
                  item.content?.[1]?.placeholderTextColor || '#4D4F5C'
                }
                value={item.content?.[1]?.value}
                onBlur={handleBlur(`${item.content?.[1]?.name}`)}
                onChangeText={handleChange(`${item.content?.[1]?.name}`)}
                autoCorrect={false}
                style={item.content?.[1]?.style ? item.content?.[1]?.style : {}}
                multiline={item.content?.[1]?.multiline}
                secureTextEntry={item.content?.[1]?.secureTextEntry}
                keyboardType={item.content?.[1]?.keyboardType || 'default'}
              />
              {touched[item.content?.[1]?.name] &&
                errors[item.content?.[1]?.name] && (
                  <Text
                    style={{
                      fontSize: scale(10),
                      fontFamily: 'SourceSansPro-Regular',
                      color: 'red',
                      marginLeft: scale(5),
                      marginBottom: scale(5),
                    }}>
                    {errors[item.content?.[1]?.name]}
                  </Text>
                )}
            </View>
          ) : null}
          {item.content?.[1]?.type === 'password' ? (
            <View
              key={item.content?.[1]?.id}
              style={{flex: 1, paddingLeft: scale(2)}}>
              <Text
                style={{
                  marginBottom: scale(5),
                  fontSize: scale(14),
                  fontFamily: 'SourceSansPro-Regular',
                  color: '#24262F',
                  marginTop: scale(5),
                }}>
                {item.content?.[1]?.label}
                {item.content?.[1]?.required ? (
                  <Text style={{color: 'red'}}>*</Text>
                ) : null}
              </Text>
              <CustomInput
                name={item.content?.[1]?.name}
                placeholder={item.content?.[1]?.placeholder}
                placeholderTextColor={
                  item.content?.[1]?.placeholderTextColor || '#4D4F5C'
                }
                // value={item.value}
                onBlur={handleBlur(`${item.content?.[1]?.name}`)}
                onChangeText={handleChange(`${item.content?.[1]?.name}`)}
                autoCorrect={false}
                style={item.content?.[1]?.style ? item.content?.[1]?.style : {}}
                multiline={item.content?.[1]?.multiline}
                secureTextEntry={item.content?.[1]?.secureTextEntry}
                keyboardType={item.content?.[1]?.keyboardType || 'default'}
              />
              {touched[item.content?.[1]?.name] &&
                errors[item.content?.[1]?.name] && (
                  <Text
                    style={{
                      fontSize: scale(10),
                      fontFamily: 'SourceSansPro-Regular',
                      color: 'red',
                      marginLeft: scale(5),
                      marginBottom: scale(5),
                    }}>
                    {errors[item.content?.[1]?.name]}
                  </Text>
                )}
            </View>
          ) : null}
          {item.content?.[1]?.type === 'dropdown' ? (
            <View
              key={item.content?.[1]?.id}
              style={{zIndex: 100, marginBottom: scale(5)}}>
              <Text
                style={{
                  marginBottom: scale(5),
                  fontSize: scale(14),
                  fontFamily: 'SourceSansPro-Regular',
                  color: '#24262F',
                  marginTop: scale(5),
                }}>
                {item.content?.[1]?.label}
                {item.content?.[1]?.required ? (
                  <Text style={{color: 'red'}}>*</Text>
                ) : null}
              </Text>
              <CustomDropdownPicker
                listMode={Platform.OS == 'ios' ? 'SCROLLVIEW' : 'MODAL'}
                open={isOpen}
                value={selectedValue}
                items={item.content?.[1]?.data}
                setOpen={setIsOpen}
                setValue={setSelectedValue}
                // setItems={item.data}
                onChangeValue={handleChange(`${item.content?.[1]?.name}`)}
                placeholder={item.content?.[1]?.placeholder || 'Select'}
                placeholderStyle={
                  item.content?.[1]?.placeholderStyle || {
                    color: '#4D4F5C',
                  }
                }
                maxHeight={scale(250)}
                style={
                  item.content?.[1]?.style || {
                    marginTop: scale(5),
                    minHeight: scale(40),
                    borderRadius: scale(5),
                    borderColor: '#C3D0DE',
                    paddingVertical: -20,
                    width: '100%',
                  }
                }
              />
              {touched[item.content?.[1]?.name] &&
                errors[item.content?.[1]?.name] && (
                  <Text
                    style={{
                      fontSize: scale(10),
                      fontFamily: 'SourceSansPro-Regular',
                      color: 'red',
                      marginLeft: scale(5),
                      marginBottom: scale(5),
                    }}>
                    {errors[item.content?.[1]?.name]}
                  </Text>
                )}
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const contentDetails = apiData => {
    console.log('apiData', apiData);
    return apiData.map(item => {
      return item.view === 'single'
        ? singleViewController(item)
        : multiViewController(item);
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
            {PersonalDetailsJSON?.fields?.map(item => {
              return (
                <>
                  <View style={{marginVertical: scale(5)}}>
                    <Accordion
                      title={item.name}
                      noMarginVertical={true}
                      data={contentDetails(item.contents)}
                      expanded={item.expanded || false}
                      noMarginLeft={true}
                      backgroundColor={true}
                    />
                  </View>
                </>
              );
            })}
          </View>
        </ScrollView>
        <View
          style={{
            justifyContent: 'flex-end',
            backgroundColor: 'red',
          }}>
          <CustomButton
            buttonText={'PROCEED'}
            buttonTextStyle={{
              fontSize: scale(18),
              fontFamily: 'SourceSansPro-SemiBold',
              color: '#fff',
            }}
            buttonStyle={{
              backgroundColor: '#349beb',
              height: scale(54),
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

export default memo(PersonalDetails);
