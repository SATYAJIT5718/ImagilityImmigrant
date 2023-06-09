import {View, Text, Image} from 'react-native';
import React from 'react';
// import norecord from '../../assets/images/norecord.png';
import styles from './styles';
import LOGOSVG from '../../assets/images/NoDataFound.svg';

const NoDataFound = props => {
  return (
    <View style={styles.container}>
      {/* <Image
        source={norecord}
        style={props.style?.Image ? props.style.Image : styles.Image}
      /> */}
      <LOGOSVG width="250px" height="200px" />
      <Text style={props.style?.Text ? props.style?.Text : styles.Text}>
        {props.Text}
      </Text>
    </View>
  );
};

export default NoDataFound;
