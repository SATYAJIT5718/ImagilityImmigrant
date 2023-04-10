import React, {useRef} from 'react';
import {TextInput, TouchableOpacity, Text, View} from 'react-native';
import {Checkbox, RadioButton} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import PhoneInput from 'react-native-phone-input';
import {scale} from '../utils/screenUtility';

export const CustomInput = props => {
  return (
    <TextInput
      name={props.name}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor || '#4D4F5C'}
      value={props.value}
      onBlur={props.onBlur}
      onChangeText={props.onChangeText}
      autoCorrect={false}
      style={props.style}
      secureTextEntry={props.secureTextEntry}
    />
  );
};

export const CustomButton = props => {
  return (
    <TouchableOpacity style={props.buttonStyle} onPress={props.onPressHandler}>
      <Text style={props.buttonTextStyle}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
};

export const CustomCheckBox = props => {
  return (
    <Checkbox.Android
      name={props.name}
      status={props.status ? 'checked' : 'unchecked'}
      color={props.color || '#00A0DA'}
      uncheckedColor={props.uncheckedColor || '#00A0DA'}
      onPress={props.onPressHandler}
    />
  );
};

export const CustomDropdownPicker = props => {
  return (
    <DropDownPicker
      listMode={props.listMode}
      open={props.open}
      value={props.value}
      items={props.items}
      setOpen={props.setOpen}
      setValue={props.setValue}
      setItems={props.setItems}
      onChangeValue={props.onChangeValue}
      placeholder={props.placeholder || 'Select'}
      placeholderStyle={
        props.placeholderStyle || {
          color: '#4D4F5C',
        }
      }
      style={
        props.style || {
          marginTop: scale(5),
          minHeight: scale(40),
          borderRadius: scale(5),
          borderColor: '#C3D0DE',
          paddingVertical: -20,
          width: '100%',
        }
      }
    />
  );
};

export const CustomRadioButton = props => {
  return (
    <RadioButton.Group onValueChange={props.onValueChange} value={props.value}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {props.itemList
          ? props.itemList.map(item => {
              return (
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <RadioButton.Android
                    value={item.value}
                    uncheckedColor={props.uncheckedColor || 'grey'}
                    color={props.color || '#0089CF'}
                    label={props.label}
                  />
                  <Text style={props.radioTitle}>{item.title}</Text>
                </View>
              );
            })
          : null}
      </View>
    </RadioButton.Group>
  );
};
// code for Radio Button
{
  /* <CustomRadioButton
  onValueChange={handleChange('gender')}
  value={values.gender}
  itemList={[
    {
      id: 1,
      value: 'others',
      uncheckedColor: 'grey',
      color: '#0089CF',
      title: 'others',
    },
    {
      id: 2,
      value: 'trans',
      uncheckedColor: 'grey',
      color: '#0089CF',
      title: 'trans',
    },
    {
      id: 3,
      value: 'Male',
      uncheckedColor: 'grey',
      color: '#0089CF',
      title: 'Male',
    },
  ]}
/>;
{
  touched.gender && errors.gender && (
    <Text style={styles.errorMessage}>{errors.gender}</Text>
  );
} */
}
// code for Radio Button

export const CustomPhoneInput = props => {
  const phoneInput = useRef(null);
  return (
    <View
      style={
        props.style || {
          flex: 1,
          height: scale(40),
          borderWidth: 1,
          borderColor: '#CCD5E6',
          borderRadius: 4,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
          marginTop: scale(5),
        }
      }>
      <PhoneInput
        name="phoneNumber"
        ref={phoneInput}
        initialCountry={props.initialCountry || ''}
        layout="first"
        withShadow
        autoFocus
        pickerBackgroundColor={props.pickerBackgroudColor || '#A2D3EA'}
        onChangePhoneNumber={value => console.log('selected country =>', value)}
        onSelectCountry={props.countryPickerHandler}
      />
    </View>
  );
};
