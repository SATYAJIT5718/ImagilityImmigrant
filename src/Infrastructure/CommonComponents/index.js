import React, {useRef} from 'react';
import {TextInput, TouchableOpacity, Text, View} from 'react-native';
import {Checkbox, RadioButton} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import PhoneInput from 'react-native-phone-input';
import {scale} from '../utils/screenUtility';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

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
      keyboardType={props.keyboardType || 'default'}
      multiline={props.multiline}
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
      // {...props}

      listMode={props.listMode}
      searchable={props.searchable}
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
      onSelectItem={props.onSelectItem}
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
      labelStyle={props.labelStyle}
    />
  );
};

export const CustomRadioButton = props => {
  return (
    <RadioButton.Group onValueChange={props.onValueChange} value={props.value}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
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
                  <Text style={props.radioTitleStyle}>{item.title}</Text>
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

export const CustomDatePicker = props => {
  return (
    <>
      <TouchableOpacity onPress={props.openToggler}>
        <View
          style={
            props.parentStyle || {
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: scale(5),
            }
          }>
          <CustomInput
            name={props.name}
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor || '#4D4F5C'}
            value={
              props.value
              // values[item?.name] === ''
              //   ? ''
              //   : moment(values[item?.name]).format('MM/DD/YYYY')
              // // emptyDate === ''
              // //   ? studentInfo?.dob
              // //     ? moment(studentInfo?.dob).format('MM/DD/YYYY')
              // //     : ''
              // //   : dateformat
            }
            editable={props.editable || false}
            autoCorrect={props.autoCorrect || false}
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
        {props.dateError && (
          <Text
            style={{
              fontSize: scale(10),
              fontFamily: 'SourceSansPro-Regular',
              color: 'red',
              marginLeft: scale(5),
              marginBottom: scale(5),
            }}>
            {props.dateErrorTitle}
          </Text>
        )}
      </TouchableOpacity>
      <DatePicker
        modal
        mode={props.mode || 'date'}
        open={props.open}
        date={props.date}
        onConfirm={props.onConfirm}
        onCancel={props.onCancel}
      />
    </>
  );
};

{
  /* <CustomDatePicker
  openToggler={setFieldValue(
    `${item?.isOpenTitle}`,
    !values[item?.isOpenTitle],
  )}
  parentStyle={{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(5),
  }}
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
  style={item.style || {}}
  dateError={touched[item?.name] && errors[item?.name]}
  dateErrorTitle={errors[item?.name]}
  mode="date"
  open={values[item?.isOpenTitle]}
  date={date}
  onConfirm={date => {
    setFieldValue(`${item?.isOpenTitle}`, !values[item?.isOpenTitle]);
    setFieldValue(`${item?.name}`, date);
    console.log('date', date);
    console.log('date2', new Date(date));
  }}
  onCancel={() => {
    setOpen(false);
  }}
/>; */
}
