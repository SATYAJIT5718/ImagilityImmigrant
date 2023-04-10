import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  CustomInput,
  CustomButton,
} from '../../../Infrastructure/CommonComponents/index';
import {
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import {useFormik} from 'formik';
import * as yup from 'yup';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../Infrastructure/utils/context';
import {LoginJSON} from '../../../Infrastructure/JSONData/LoginScreen';
const LoginScreen = props => {
  const {signIn} = React.useContext(AuthContext);
  const FormFields = LoginJSON;
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(true);
  let initialValue = {};
  FormFields?.fields?.forEach(property => {
    switch (property.type) {
      case 'text':
        initialValue[property.name] = '';
        break;
      case 'password':
        initialValue[property.name] = '';
        break;
      // Add cases for other data types as needed
      default:
        // initialValue[property.name] = '';
        break;
    }
  });

  const createValidationSchema = fields => {
    const schema = {};
    fields?.forEach(field => {
      switch (field.type) {
        case 'text':
          schema[field?.name] = field?.required
            ? yup.string().required(`${field?.label} is required`)
            : yup.string();
          break;
        case 'password':
          schema[field?.name] = field?.required
            ? yup.string().required(`${field?.label} is required`)
            : yup.string();
          break;
        default:
          break;
      }
    });
    return yup.object().shape(schema);
  };

  const validationSchema = createValidationSchema(FormFields?.fields);
  const formHandler = value => {
    signIn();
    console.log('fianl submit handler =>>>>>', value);
    signIn();
  };
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: value => formHandler(value),
    validationSchema,
  });

  return (
    <KeyboardAvoidingView
      style={{flexGrow: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? scale(0) : scale(135)}>
      <SafeAreaView
        style={{
          flexGrow: 1,
          backgroundColor: '#fff',
        }}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingHorizontal: scale(10)}}>
          {FormFields?.logo ? (
            <View
              style={{
                marginVertical: scale(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: scale(50),
                  width: scale(200),
                  resizeMode: 'contain',
                }}
                source={require('../../../Infrastructure/assets/images/ImagilityLogo.png')}
              />
            </View>
          ) : null}
          <View>
            <Text
              style={{
                fontSize: scale(20),
                fontFamily: 'SourceSansPro-Regular',
                color: '#4D4F5C',
                marginVertical: scale(10),
              }}>
              {FormFields?.title ? FormFields?.title : ''}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              {FormFields?.fields?.map((item, index) => {
                if (item.type === 'text') {
                  return (
                    <View
                      style={{
                        marginTop: scale(5),
                      }}>
                      <View key={item.id} style={{flex: 1}}>
                        <Text
                          style={{
                            marginBottom: scale(5),
                            fontSize: scale(16),
                            fontFamily: 'SourceSansPro-Regular',
                            color: '#24262F',
                            marginTop: scale(5),
                          }}>
                          {item.label}
                          {item.required ? (
                            <Text style={{color: 'red'}}>*</Text>
                          ) : null}
                        </Text>
                        <CustomInput
                          name={item.name}
                          placeholder={item.placeholder}
                          placeholderTextColor={
                            item.placeholderTextColor || '#4D4F5C'
                          }
                          onBlur={handleBlur(`${item?.name}`)}
                          onChangeText={handleChange(`${item?.name}`)}
                          autoCorrect={false}
                          style={
                            item.style ? item.style : {...styles.TextInput}
                          }
                          multiline={item.multiline}
                          secureTextEntry={item.secureTextEntry}
                        />
                        {touched[item?.name] && errors[item?.name] && (
                          <Text style={styles.errorMessage}>
                            {errors[item?.name]}
                          </Text>
                        )}
                      </View>
                    </View>
                  );
                }
                if (item.type === 'password') {
                  return (
                    <View>
                      <View key={item.id}>
                        <Text
                          style={{
                            fontSize: scale(16),
                            fontFamily: 'SourceSansPro-Regular',
                            color: '#24262F',
                            marginTop: scale(10),
                          }}>
                          {item.label}
                          {item.required ? (
                            <Text style={{color: 'red'}}>*</Text>
                          ) : null}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <CustomInput
                            name={item.name}
                            placeholder={item.placeholder}
                            placeholderTextColor={
                              item.placeholderTextColor || '#4D4F5C'
                            }
                            onBlur={handleBlur(`${item?.name}`)}
                            onChangeText={handleChange(`${item?.name}`)}
                            autoCorrect={false}
                            style={
                              item.style
                                ? item.style
                                : {...styles.TextInput, flex: 1}
                            }
                            secureTextEntry={passwordVisible}
                          />
                          <Feather
                            name={passwordVisible ? 'eye-off' : 'eye'}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                            size={scale(15)}
                            color="grey"
                            style={{
                              position: 'absolute',
                              right: scale(10),
                            }}
                          />
                        </View>
                        {touched[item?.name] && errors[item?.name] && (
                          <Text style={styles.errorMessage}>
                            {errors[item?.name]}
                          </Text>
                        )}
                      </View>
                    </View>
                  );
                }
                if (item.type === 'button') {
                  return (
                    <View key={item.id}>
                      <CustomButton
                        buttonText={item.label}
                        buttonTextStyle={{
                          fontSize: scale(18),
                          fontFamily: 'SourceSansPro-SemiBold',
                          color: '#fff',
                        }}
                        buttonStyle={
                          item.style ? item.style : {...styles.loginButton}
                        }
                        onPressHandler={handleSubmit}
                      />
                    </View>
                  );
                }
                if (item.type === 'link') {
                  return (
                    <View key={item.id}>
                      <TouchableOpacity
                        style={styles.forgotContent}
                        onPress={item.navigation}>
                        <Text style={{...styles.linkText}}>{item.label}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }
              })}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: scale(10),
              }}>
              <View>
                <Text style={styles.header}>Don’t have an account ?</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => {
                    navigation.navigate('Registration');
                  }}>
                  <Text
                    style={{
                      color: '#00A0DA',
                      fontSize: scale(14),
                      fontFamily: 'SourceSansPro-SemiBold',
                    }}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
