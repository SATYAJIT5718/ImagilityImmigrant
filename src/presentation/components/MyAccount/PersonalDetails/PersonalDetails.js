import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useRef, memo} from 'react';
import {
  CustomInput,
  CustomButton,
  CustomCheckBox,
  CustomDropdownPicker,
  CustomRadioButton,
} from '../../../../Infrastructure/CommonComponents/index';
import PhoneInput from 'react-native-phone-number-input';
import {SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {scale} from '../../../../Infrastructure/utils/screenUtility';
import {useFormik, ErrorMessage} from 'formik';
import * as yup from 'yup';
import {PersonalDetailsJSON} from '../../../../Infrastructure/JSONData/PersonalDetails';
import Accordion from '../../../../Infrastructure/component/Accordion/Accordion';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
const PersonalDetails = props => {
  const navigation = useNavigation();
  const FormFields = PersonalDetailsJSON;
  const phoneInput = useRef(null);

  let initialValue = {};

  FormFields?.fields?.forEach(property => {
    property.contents.map(itemz => {
      switch (itemz.type) {
        case 'text':
          initialValue[itemz.name] = itemz?.value || '';
          break;
        case 'email':
          initialValue[itemz.name] = itemz?.value || '';
          break;
        case 'multi':
          itemz?.content.map(val => {
            val.type === 'dropdown'
              ? ((initialValue[val?.name] = val?.value || ''),
                (initialValue[itemz?.content?.[0]?.isOpenTitle] = false))
              : (initialValue[val?.name] = val?.value || '');
          });
          break;
        case 'password':
          initialValue[itemz.name] = itemz?.value || '';
          break;
        case 'radio':
          itemz.name === 'maritalStatus'
            ? ((initialValue[itemz.name] = itemz?.value || ''),
              itemz.content.map(val => {
                initialValue[val.name] = val?.value || '';
                val.type === 'dropdown'
                  ? (initialValue[val.isOpenTitle] = false)
                  : null;
              }))
            : (initialValue[itemz.name] = itemz?.value || '');
          break;
        case 'dropdown':
          initialValue[itemz.name] = itemz?.value || '';
          initialValue[itemz.isOpenTitle] = false;
          break;
        case 'checkbox':
          initialValue[itemz.name] = itemz.isSelected;
          break;
        case 'phoneInput':
          initialValue[itemz.name] = itemz?.value || '';
          initialValue[itemz.countryName] = itemz.selectedCountry || 'IN';
          break;
        case 'date':
          initialValue[itemz.name] = itemz.value
            ? moment(itemz.value).format('MM/DD/YYYY')
            : '';
          initialValue[itemz.isOpenTitle] = itemz.isOpen;
          break;
        case 'alias':
          initialValue[itemz.name] = itemz.value || false;
          itemz.content.map(val => {
            initialValue[val.name] = val?.value || '';
            val.type === 'dropdown'
              ? (initialValue[val.isOpenTitle] = false)
              : null;
          });
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
              ? yup.string().required(`${itemz?.errorTile} is required`)
              : yup.string();
            break;
          case 'email':
            schema[itemz?.name] = itemz?.required
              ? yup
                  .string()
                  .email('Please enter valid Email')
                  .required(`${itemz?.errorTile} is required`)
              : yup.string();
            break;
          case 'multi':
            itemz?.content?.map(val => {
              schema[val?.name] = val?.required
                ? yup.string().required(`${val?.errorTile} is required`)
                : yup.string();
            });
            break;
          case 'password':
            itemz.view === 'multi'
              ? itemz.content.map(val => {
                  schema[val?.name] = val?.required
                    ? yup.string().required(`${val?.errorTile} is required`)
                    : yup.string();
                })
              : (schema[itemz?.name] = itemz?.required
                  ? yup.string().required(`${itemz?.errorTile} is required`)
                  : yup.string());
            break;
          case 'dropdown':
            schema[itemz?.name] = itemz?.required
              ? yup.string().required(`${itemz?.errorTile} is required`)
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
                  .min(10, 'Number should not be less than 10 Digit')
                  .max(10, 'Number should not be more than 10 Digit')
                  .typeError("That doesn't look like a phone number")
                  .required(`${itemz?.errorTile} is required`)
              : yup.number();
            break;
          case 'radio':
            itemz.name === 'maritalStatus'
              ? ((schema[itemz?.name] = itemz?.required
                  ? yup.string().required(`${itemz?.errorTile} is required`)
                  : yup.string().nullable()),
                (schema[itemz?.content?.[0]?.name] = itemz?.content?.[0]
                  ?.required
                  ? yup.string().when(`${itemz.name}`, {
                      is: selected => selected !== 'SINGLE',
                      then: yup
                        .string()
                        .required(
                          `${itemz?.content?.[0]?.errorTile} is required`,
                        ),
                    })
                  : yup.string()),
                (schema[itemz?.content?.[1]?.name] = itemz?.content?.[1]
                  ?.required
                  ? yup.string().when(`${itemz.name}`, {
                      is: selected => selected !== 'SINGLE',
                      then: yup
                        .string()
                        .required(
                          `${itemz?.content?.[1]?.errorTile} is required`,
                        ),
                    })
                  : yup.string()),
                (schema[itemz?.content?.[2]?.name] = itemz?.content?.[2]
                  ?.required
                  ? yup.string().when(`${itemz.name}`, {
                      is: selected => selected !== 'SINGLE',
                      then: yup
                        .string()
                        .required(
                          `${itemz?.content?.[2]?.errorTile} is required`,
                        ),
                    })
                  : yup.string()),
                (schema[itemz?.content?.[3]?.name] = itemz?.content?.[3]
                  ?.required
                  ? yup.string().when(`${itemz.name}`, {
                      is: selected => selected !== 'SINGLE',
                      then: yup
                        .string()
                        .required(
                          `${itemz?.content?.[3]?.errorTile} is required`,
                        ),
                    })
                  : yup.string()))
              : (schema[itemz?.name] = itemz?.required
                  ? yup.string().required(`${itemz?.errorTile} is required`)
                  : yup.string().nullable());

            break;
          case 'checkbox':
            schema[itemz?.name] = itemz?.required
              ? yup
                  .boolean()
                  .oneOf([true], `You must accept ${itemz?.errorTile}`)
              : yup.boolean();
            break;

          case 'alias':
            schema[itemz?.name] = itemz?.required
              ? yup.boolean().oneOf([true], `${itemz?.errorTile}`)
              : yup.boolean();

            schema[itemz?.content?.[0]?.name] = itemz?.content?.[0]?.required
              ? yup.string().when(`${itemz.name}`, {
                  is: selected => selected === true,
                  then: yup
                    .string()
                    .required(`${itemz?.content?.[0]?.errorTile} is required`),
                })
              : yup.string();
            schema[itemz?.content?.[1]?.name] = itemz?.content?.[1]?.required
              ? yup.string().when(`${itemz.name}`, {
                  is: selected => selected === true,
                  then: yup
                    .string()
                    .required(`${itemz?.content?.[1]?.errorTile} is required`),
                })
              : yup.string();

            // schema[itemz?.content?.[0]?.name] = itemz?.content?.[0]?.required
            //   ? yup.string().required('TOEFL Score Required')
            //   : yup.string();
            break;
          case 'date':
            schema[itemz?.name] = itemz?.required
              ? yup.string().required(`${itemz?.errorTile} is required`)
              : yup.string();
            break;
          case 'alias':
            schema[itemz?.name] = itemz?.required
              ? yup.boolean().oneOf([true], `${itemz?.errorTile}`)
              : yup.boolean();
            schema[itemz?.content?.[0]?.name] = itemz?.content?.[0]?.required
              ? yup.string().when(`${itemz.name}`, {
                  is: selected => selected === true,
                  then: yup
                    .string()
                    .required(`${itemz?.content?.[0]?.errorTile} is required`),
                })
              : yup.string();
            schema[itemz?.content?.[1]?.name] = itemz?.content?.[1]?.required
              ? yup.string().when(`${itemz.name}`, {
                  is: selected => selected === true,
                  then: yup
                    .string()
                    .required(`${itemz?.content?.[1]?.errorTile} is required`),
                })
              : yup.string(); // schema[itemz?.content?.[0]?.name] = itemz?.content?.[0]?.required // ? yup.string().required('TOEFL Score Required') // : yup.string(); break;
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
    validateOnMount: true,
    validateOnChange: true,
  });

  console.log('initialValue', initialValue);

  const addressToggler = selectedValue => {
    setFieldValue('foreignAddressDetails', selectedValue);
    if (selectedValue === 'uca') {
      setFieldValue('faAddress1', values.caAddress1),
        setFieldValue('faAddress2', values.caAddress2);
      setFieldValue('faCountry', values.caCountry);
      setFieldValue('faState', values.caState);
      setFieldValue('faCity', values.caCity);
      setFieldValue('faLocality', values.caLocality);
      setFieldValue('faPostalCode', values.caPostalCode);
    } else if (selectedValue === 'upa') {
      setFieldValue('faAddress1', values.paAddress1),
        setFieldValue('faAddress2', values.paAddress2);
      setFieldValue('faCountry', values.paCountry);
      setFieldValue('faState', values.paState);
      setFieldValue('faCity', values.paCity);
      setFieldValue('faLocality', values.paLocality);
      setFieldValue('faPostalCode', values.paPostalCode);
    } else {
      setFieldValue('faAddress1', ''), setFieldValue('faAddress2', '');
      setFieldValue('faCountry', '');
      setFieldValue('faState', '');
      setFieldValue('faCity', '');
      setFieldValue('faLocality', '');
      setFieldValue('faPostalCode', '');
    }
  };
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
                fontSize: scale(14),
                fontFamily: 'SourceSansPro-Regular',
                color: '#24262F',
                marginVertical: scale(5),
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
              style={
                item.style
                  ? item.style
                  : {
                      backgroundColor: 'white',
                      borderColor: '#C3D0DE',
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 10,
                      height: item.multiline ? scale(60) : scale(40),
                      fontSize: scale(14),
                      fontFamily: 'SourceSansPro-Regular',
                      color: '#4D4F5C',
                    }
              }
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
                fontSize: scale(14),
                fontFamily: 'SourceSansPro-Regular',
                color: '#24262F',
                marginVertical: scale(5),
              }}>
              {item.label}
              {item.required ? <Text style={{color: 'red'}}>*</Text> : null}
            </Text>
            <CustomInput
              name={item?.name}
              placeholder={item.placeholder}
              placeholderTextColor={item.placeholderTextColor || '#4D4F5C'}
              value={values[item?.name]}
              onBlur={handleBlur(`${item?.name}`)}
              onChangeText={handleChange(`${item?.name}`)}
              autoCorrect={false}
              style={
                item.style
                  ? item.style
                  : {
                      backgroundColor: 'white',
                      borderColor: '#C3D0DE',
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 10,
                      marginBottom: 10,
                      height: scale(40),
                      fontSize: scale(14),
                      fontFamily: 'SourceSansPro-Regular',
                      color: '#4D4F5C',
                    }
              }
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
                fontSize: scale(14),
                fontFamily: 'SourceSansPro-Regular',
                color: '#24262F',
                marginVertical: scale(5),
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
              style={
                item.style
                  ? item.style
                  : {
                      backgroundColor: 'white',
                      borderColor: '#C3D0DE',
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 10,
                      height: item.multiline ? scale(60) : scale(40),
                      color: '#4D4F5C',
                      fontSize: scale(14),
                      fontFamily: 'SourceSansPro-Regular',
                    }
              }
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
                marginVertical: scale(5),
                fontSize: scale(14),
                fontFamily: 'SourceSansPro-Regular',
                color: '#24262F',
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
                onChangeCountry={value => {
                  console.log('selected country', value);
                  setFieldValue(`${item?.countryName}`, value.cca2);
                }}
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
          <View
            key={item.id}
            style={{zIndex: item.zIndex || 90, marginVertical: scale(5)}}>
            <Text
              style={{
                marginBottom: scale(5),
                fontSize: scale(14),
                fontFamily: 'SourceSansPro-Regular',
                color: '#24262F',
              }}>
              {item.label}
              {item.required ? <Text style={{color: 'red'}}>*</Text> : null}
            </Text>
            <CustomDropdownPicker
              listMode={Platform.OS == 'ios' ? 'MODAL' : 'MODAL'}
              searchable={true}
              open={values[item?.isOpenTitle]}
              value={values[item?.name]}
              items={item.data}
              setOpen={() => {
                setFieldValue(
                  `${item?.isOpenTitle}`,
                  !values[item?.isOpenTitle],
                );
              }}
              onSelectItem={value => {
                setFieldValue(`${item.name}`, value.value);
              }}
              // onChangeValue={handleChange(`${item.name}`)}
              placeholder={item.placeholder || 'Select'}
              placeholderStyle={
                item.placeholderStyle || {
                  color: '#4D4F5C',
                }
              }
              labelStyle={{
                color: '#4D4F5C',
              }}
              maxHeight={scale(250)}
              style={
                item.style || {
                  minHeight: scale(40),
                  borderRadius: scale(5),
                  borderColor: '#C3D0DE',
                  paddingVertical: -20,
                  width: '100%',
                  height: scale(40),
                  fontSize: scale(14),
                  fontFamily: 'SourceSansPro-Regular',
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
                }}>
                <CustomInput
                  name={item.name}
                  placeholder={item.placeholder}
                  placeholderTextColor="#4D4F5C"
                  value={
                    values[item?.name] === ''
                      ? ''
                      : moment(values[item?.name]).format('MM/DD/YYYY')
                  }
                  editable={false}
                  autoCorrect={false}
                  style={
                    item.style || {
                      backgroundColor: 'white',
                      borderColor: '#C3D0DE',
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 10,
                      flex: 1,
                      height: scale(40),
                      color: '#4D4F5C',
                      fontSize: scale(14),
                      fontFamily: 'SourceSansPro-Regular',
                    }
                  }
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
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={values[item?.isOpenTitle]}
              date={
                values[item?.name] === ''
                  ? new Date()
                  : new Date(values[item?.name])
              }
              onConfirm={date => {
                setFieldValue(
                  `${item?.isOpenTitle}`,
                  !values[item?.isOpenTitle],
                );
                setFieldValue(`${item?.name}`, date);
              }}
              onCancel={() => {
                setFieldValue(
                  `${item?.isOpenTitle}`,
                  !values[item?.isOpenTitle],
                );
              }}
            />
          </View>
        );
      }
      if (item.type === 'checkbox') {
        return (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: scale(5),
              }}>
              <CustomCheckBox
                name={item.name}
                status={values[item?.name]}
                color={'#00A0DA'}
                uncheckedColor={'#00A0DA'}
                onPressHandler={() => {
                  setFieldValue(`${item.name}`, !values[item.name]);
                }}
              />
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: scale(12),
                    fontFamily: 'SourceSansPro-Regular',
                    color: '#24262F',
                  }}>
                  {item.label}
                </Text>
              </View>
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
          </>
        );
      }
      if (item.type === 'alias') {
        return (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: scale(5),
              }}>
              <CustomCheckBox
                name={item.name}
                status={values[item?.name]}
                color={'#00A0DA'}
                uncheckedColor={'#00A0DA'}
                onPressHandler={() => {
                  setFieldValue(`${item.name}`, !values[item.name]);
                }}
              />
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: scale(12),
                    fontFamily: 'SourceSansPro-Regular',
                    color: '#24262F',
                  }}>
                  {item.label}
                </Text>
              </View>
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
            {values[item?.name] ? multiViewController(item) : null}
          </>
        );
      }
      if (
        item.type === 'radio' &&
        item.name !== 'maritalStatus' &&
        item.name !== 'foreignAddressDetails'
      ) {
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
      if (item.type === 'radio' && item.name === 'maritalStatus') {
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
              {values[item?.name] !== 'SINGLE' ? (
                <View>
                  {/* date of marraige */}
                  <View>
                    <Text
                      style={{
                        fontSize: scale(14),
                        fontFamily: 'SourceSansPro-Regular',
                        color: '#24262F',
                        marginVertical: scale(5),
                      }}>
                      {item?.content?.[0]?.label}
                      {item?.content?.[0]?.required ? (
                        <Text style={{color: 'red'}}>*</Text>
                      ) : null}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setFieldValue(
                          `${item?.content?.[0]?.isOpenTitle}`,
                          !values[item?.content?.[0]?.isOpenTitle],
                        );
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <CustomInput
                          name={item?.content?.[0]?.name}
                          placeholder={item?.content?.[0]?.placeholder}
                          placeholderTextColor="#4D4F5C"
                          value={
                            values[item?.content?.[0]?.name] === ''
                              ? ''
                              : moment(values[item?.content?.[0]?.name]).format(
                                  'MM/DD/YYYY',
                                )
                          }
                          editable={false}
                          autoCorrect={false}
                          style={
                            item.style || {
                              backgroundColor: 'white',
                              borderColor: '#C3D0DE',
                              borderWidth: 1,
                              borderRadius: 5,
                              padding: 10,
                              flex: 1,
                              height: scale(40),
                              color: '#4D4F5C',
                              fontSize: scale(14),
                              fontFamily: 'SourceSansPro-Regular',
                            }
                          }
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
                      {touched[item?.content?.[0]?.name] &&
                        errors[item?.content?.[0]?.name] && (
                          <Text
                            style={{
                              fontSize: scale(10),
                              fontFamily: 'SourceSansPro-Regular',
                              color: 'red',
                              marginBottom: scale(5),
                            }}>
                            {errors[item?.content?.[0]?.name]}
                          </Text>
                        )}
                    </TouchableOpacity>
                    <DatePicker
                      modal
                      mode="date"
                      open={values[item?.content?.[0]?.isOpenTitle]}
                      date={
                        values[item?.content?.[0]?.name] === ''
                          ? new Date()
                          : new Date(values[item?.content?.[0]?.name])
                      }
                      onConfirm={date => {
                        setFieldValue(
                          `${item?.content?.[0]?.isOpenTitle}`,
                          !values[item?.content?.[0]?.isOpenTitle],
                        );
                        setFieldValue(`${item?.content?.[0]?.name}`, date);
                      }}
                      onCancel={() => {
                        setFieldValue(
                          `${item?.content?.[0]?.isOpenTitle}`,
                          !values[item?.content?.[0]?.isOpenTitle],
                        );
                      }}
                    />
                  </View>
                  {/* date of marraige */}

                  {/* country of marraige */}
                  <View
                    key={item?.content?.[1]?.id}
                    style={{
                      zIndex: item?.content?.[1]?.zIndex || 90,
                      marginVertical: scale(5),
                    }}>
                    <Text
                      style={{
                        marginBottom: scale(5),
                        fontSize: scale(14),
                        fontFamily: 'SourceSansPro-Regular',
                        color: '#24262F',
                      }}>
                      {item?.content?.[1]?.label}
                      {item?.content?.[1]?.required ? (
                        <Text style={{color: 'red'}}>*</Text>
                      ) : null}
                    </Text>
                    <CustomDropdownPicker
                      listMode={Platform.OS == 'ios' ? 'SCROLLVIEW' : 'MODAL'}
                      searchable={true}
                      open={values[item?.content?.[1]?.isOpenTitle]}
                      value={values[item?.content?.[1]?.name]}
                      items={item?.content?.[1]?.data}
                      setOpen={() => {
                        setFieldValue(
                          `${item?.content?.[1]?.isOpenTitle}`,
                          !values[item?.content?.[1]?.isOpenTitle],
                        );
                      }}
                      onSelectItem={value => {
                        setFieldValue(
                          `${item?.content?.[1]?.name}`,
                          value.value,
                        );
                      }}
                      placeholder={item?.content?.[1]?.placeholder || 'Select'}
                      placeholderStyle={
                        item?.content?.[1]?.placeholderStyle || {
                          color: '#4D4F5C',
                        }
                      }
                      labelStyle={{
                        color: '#4D4F5C',
                      }}
                      maxHeight={scale(250)}
                      style={
                        item?.content?.[2].style || {
                          minHeight: scale(40),
                          borderRadius: scale(5),
                          borderColor: '#C3D0DE',
                          paddingVertical: -20,
                          width: '100%',
                          height: scale(40),
                        }
                      }
                    />
                    {touched[item?.content?.[1]?.name] &&
                      errors[item?.content?.[1]?.name] && (
                        <Text
                          style={{
                            fontSize: scale(10),
                            fontFamily: 'SourceSansPro-Regular',
                            color: 'red',
                            marginLeft: scale(5),
                            marginBottom: scale(5),
                          }}>
                          {errors[item?.content?.[1]?.name]}
                        </Text>
                      )}
                  </View>
                  {/* country of marraige */}

                  {/* state of marraige */}
                  <View
                    key={item?.content?.[2]?.id}
                    style={{
                      zIndex: item?.content?.[2]?.zIndex || 90,
                      marginVertical: scale(5),
                    }}>
                    <Text
                      style={{
                        marginBottom: scale(5),
                        fontSize: scale(14),
                        fontFamily: 'SourceSansPro-Regular',
                        color: '#24262F',
                      }}>
                      {item?.content?.[2]?.label}
                      {item?.content?.[2]?.required ? (
                        <Text style={{color: 'red'}}>*</Text>
                      ) : null}
                    </Text>
                    <CustomDropdownPicker
                      listMode={Platform.OS == 'ios' ? 'MODAL' : 'MODAL'}
                      searchable={true}
                      open={values[item?.content?.[2]?.isOpenTitle]}
                      value={values[item?.content?.[2]?.name]}
                      items={item?.content?.[2]?.data}
                      setOpen={() => {
                        setFieldValue(
                          `${item?.content?.[2]?.isOpenTitle}`,
                          !values[item?.content?.[2]?.isOpenTitle],
                        );
                      }}
                      onSelectItem={value => {
                        setFieldValue(
                          `${item?.content?.[2]?.name}`,
                          value.value,
                        );
                      }}
                      placeholder={item?.content?.[2]?.placeholder || 'Select'}
                      placeholderStyle={
                        item?.content?.[2]?.placeholderStyle || {
                          color: '#4D4F5C',
                        }
                      }
                      labelStyle={{
                        color: '#4D4F5C',
                      }}
                      maxHeight={scale(250)}
                      style={
                        item?.content?.[2].style || {
                          minHeight: scale(40),
                          borderRadius: scale(5),
                          borderColor: '#C3D0DE',
                          paddingVertical: -20,
                          width: '100%',
                          height: scale(40),
                        }
                      }
                    />
                    {touched[item?.content?.[2]?.name] &&
                      errors[item?.content?.[2]?.name] && (
                        <Text
                          style={{
                            fontSize: scale(10),
                            fontFamily: 'SourceSansPro-Regular',
                            color: 'red',
                            marginLeft: scale(5),
                            marginBottom: scale(5),
                          }}>
                          {errors[item?.content?.[2]?.name]}
                        </Text>
                      )}
                  </View>
                  {/* country of marraige */}

                  {/* city of marraige */}
                  <View
                    key={item?.content?.[3]?.id}
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
                      {item?.content?.[3]?.label}
                      {item?.content?.[3]?.required ? (
                        <Text style={{color: 'red'}}>*</Text>
                      ) : null}
                    </Text>
                    <CustomInput
                      name={item?.content?.[3]?.name}
                      placeholder={item?.content?.[3]?.placeholder}
                      placeholderTextColor={
                        item?.content?.[3]?.placeholderTextColor || '#4D4F5C'
                      }
                      value={values[item?.content?.[3]?.name]}
                      onBlur={handleBlur(`${item?.content?.[3]?.name}`)}
                      onChangeText={handleChange(`${item?.content?.[3]?.name}`)}
                      autoCorrect={false}
                      style={
                        item.style
                          ? item.style
                          : {
                              backgroundColor: 'white',
                              borderColor: '#C3D0DE',
                              borderWidth: 1,
                              borderRadius: 5,
                              padding: 10,
                              color: '#4D4F5C',
                              fontSize: scale(14),
                              fontFamily: 'SourceSansPro-Regular',
                              height: item?.content?.[3]?.multiline
                                ? scale(60)
                                : scale(40),
                            }
                      }
                      multiline={item?.content?.[3]?.multiline}
                      secureTextEntry={item?.content?.[3]?.secureTextEntry}
                      keyboardType={
                        item?.content?.[3]?.keyboardType || 'default'
                      }
                    />
                    {touched[item?.content?.[3]?.name] &&
                      errors[item?.content?.[3]?.name] && (
                        <Text
                          style={{
                            fontSize: scale(10),
                            fontFamily: 'SourceSansPro-Regular',
                            color: 'red',
                            marginLeft: scale(5),
                          }}>
                          {errors[item?.content?.[3]?.name]}
                        </Text>
                      )}
                  </View>
                  {/* city of marraige */}
                </View>
              ) : null}
            </View>
          </>
        );
      }
      if (item.type === 'radio' && item.name === 'foreignAddressDetails') {
        return (
          <>
            <View>
              <CustomRadioButton
                onValueChange={value => {
                  addressToggler(value);
                }}
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
                value={values[item?.content?.[0]?.name]}
                onBlur={handleBlur(`${item?.content?.[0]?.name}`)}
                onChangeText={handleChange(`${item?.content?.[0]?.name}`)}
                autoCorrect={false}
                style={
                  item?.content?.[0]?.style
                    ? item?.content?.[0]?.style
                    : {
                        backgroundColor: 'white',
                        borderColor: '#C3D0DE',
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 10,
                        color: '#4D4F5C',
                        fontSize: scale(14),
                        fontFamily: 'SourceSansPro-Regular',
                        height: item?.content?.[0]?.multiline
                          ? scale(60)
                          : scale(40),
                      }
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
                value={values[item.content?.[0]?.name]}
                onBlur={handleBlur(`${item.content?.[0]?.name}`)}
                onChangeText={handleChange(`${item.content?.[0]?.name}`)}
                autoCorrect={false}
                style={
                  item.content?.[0]?.style
                    ? item.content?.[0]?.style
                    : {
                        backgroundColor: 'white',
                        borderColor: '#C3D0DE',
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 10,
                        color: '#4D4F5C',
                        fontSize: scale(14),
                        fontFamily: 'SourceSansPro-Regular',
                        height: scale(40),
                      }
                }
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
                  marginTop: scale(5),
                }}>
                {item.content?.[0]?.label}
                {item.content?.[0]?.required ? (
                  <Text style={{color: 'red'}}>*</Text>
                ) : null}
              </Text>
              <CustomDropdownPicker
                listMode={Platform.OS == 'ios' ? 'SCROLLVIEW' : 'MODAL'}
                open={values[item.content?.[0]?.isOpenTitle]}
                value={values[item.content?.[0]?.name]}
                items={item.content?.[0]?.data}
                setOpen={() => {
                  setFieldValue(
                    `${item.content?.[0]?.isOpenTitle}`,
                    !values[item.content?.[0]?.isOpenTitle],
                  );
                }}
                onSelectItem={value => {
                  setFieldValue(`${item.content?.[0]?.name}`, value.value);
                }}
                placeholder={item.content?.[0]?.placeholder || 'Select'}
                placeholderStyle={
                  item.content?.[0]?.placeholderStyle || {
                    color: '#4D4F5C',
                  }
                }
                labelStyle={{
                  color: '#4D4F5C',
                }}
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
                value={values[item?.content?.[1]?.name]}
                onBlur={handleBlur(`${item.content?.[1]?.name}`)}
                onChangeText={handleChange(`${item.content?.[1]?.name}`)}
                autoCorrect={false}
                style={
                  item.content?.[1]?.style
                    ? item.content?.[1]?.style
                    : item?.content?.[0]?.style
                    ? item?.content?.[0]?.style
                    : {
                        backgroundColor: 'white',
                        borderColor: '#C3D0DE',
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 10,
                        color: '#4D4F5C',
                        fontSize: scale(14),
                        fontFamily: 'SourceSansPro-Regular',
                        height: item?.content?.[0]?.multiline
                          ? scale(60)
                          : scale(40),
                      }
                }
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
                value={values[item.content?.[1]?.name]}
                onBlur={handleBlur(`${item.content?.[1]?.name}`)}
                onChangeText={handleChange(`${item.content?.[1]?.name}`)}
                autoCorrect={false}
                style={
                  item.content?.[1]?.style
                    ? item.content?.[1]?.style
                    : {
                        backgroundColor: 'white',
                        borderColor: '#C3D0DE',
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 10,
                        color: '#4D4F5C',
                        fontSize: scale(14),
                        fontFamily: 'SourceSansPro-Regular',
                        height: scale(40),
                      }
                }
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
                open={values[item.content?.[1]?.isOpenTitle]}
                value={values[item.content?.[1]?.name]}
                items={item.content?.[1]?.data}
                setOpen={() => {
                  setFieldValue(
                    `${item.content?.[1]?.isOpenTitle}`,
                    !values[item.content?.[1]?.isOpenTitle],
                  );
                }}
                onSelectItem={value => {
                  setFieldValue(`${item.content?.[1]?.name}`, value.value);
                }}
                placeholder={item.content?.[1]?.placeholder || 'Select'}
                placeholderStyle={
                  item.content?.[1]?.placeholderStyle || {
                    color: '#4D4F5C',
                  }
                }
                labelStyle={{
                  color: '#4D4F5C',
                }}
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

export default memo(PersonalDetails);
