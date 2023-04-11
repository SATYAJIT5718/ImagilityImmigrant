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
const PersonalDetails = props => {
  const navigation = useNavigation();
  const FormFields = PersonalDetailsJSON;
  const [selectedValue, setSelectedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const phoneInput = useRef(null);
  const [checkBoxStatus, setCheckBoxStatus] = useState(false);
  const [checkBoxMessage, setCheckBoxMessage] = useState('');
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
          break;
        case 'checkbox':
          initialValue[itemz.name] = '';
          break;
        case 'phoneInput':
          initialValue[itemz.name] = '';
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
          default:
            break;
        }
      });
    });
    return yup.object().shape(schema);
  };
  const validationSchema = createValidationSchema(FormFields?.fields);
  const formHnadler = value => {
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
    onSubmit: value => formHnadler(value),
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
                defaultValue={values.phoneNumber}
                defaultCode={values.countryName}
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

              {/* <Text              // Upload text
                style={{
                  fontSize: scale(16),
                  fontFamily: 'SourceSansPro-SemiBold',
                  color: '#349beb',
                  left: scale(5),
                }}>
                ssfsd
              </Text> */}
            </View>
          </View>
        );
      }
    }
  };
  const multiViewController = item => {
    console.log('multi item', item);
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
                open={isOpen}
                value={selectedValue}
                items={item.content?.[0]?.data}
                setOpen={setIsOpen}
                setValue={setSelectedValue}
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
