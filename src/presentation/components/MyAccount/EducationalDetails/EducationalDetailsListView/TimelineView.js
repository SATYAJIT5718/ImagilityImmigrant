import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {scale} from '../../../../../Infrastructure/utils/screenUtility';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getBeneficiaryType} from '../../../../../Infrastructure/utils/storageUtility';
import Graduate from '../../../../../Infrastructure/assets/images/Graduate.png';
import LifeStoryStepper from '../../../../../Infrastructure/component/LifeStoryStepper/LifeStoryStepper';
const TimelineView = props => {
  const navigation = useNavigation();
  const educationData = props.educationalInfo?.data?.education
    ? props.educationalInfo.data.education
    : [];
  const [beneficiaryMOC, setbeneficiaryMOC] = useState(true);
  const familyId = props.familyId;
  const renderItem = ({item, index}) => {
    return (
      <LifeStoryStepper
        index={index}
        endYear={item.endYear}
        Image={Graduate}
        degreeTypename={item.degreeType.name}
        fieldOfStudy={item.fieldOfStudy}
        university={item.university}
        countryCode={item.country.countryCode}
        arraylength={educationData.length}
        ImageStyle={{width: scale(30), height: scale(30)}}
      />
    );
  };
  return (
    <View style={styles.container}>
      {educationData.length > 0 ? (
        <FlatList
          data={educationData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={styles.noDataTextContainer}>
          <AntDesign
            name="warning"
            size={60}
            style={{
              color: 'grey',
              marginBottom: scale(10),
            }}
          />
          <Text style={styles.noDataText}>
            You have not yet added any related details. add now to complete your
            profile.
          </Text>
        </View>
      )}
      {beneficiaryMOC ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EducationalDetails', {familyId: familyId})
          }
          style={{
            ...styles.button,
            backgroundColor: '#00A0DA',
          }}
          disabled={false}>
          <Text style={styles.buttontext}>ADD DEGREE</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
const mapStateToProps = ({
  sponsorDetailsReducer: {educationalInfo, getBeneficiaryStatus},
}) => ({
  educationalInfo,
  getBeneficiaryStatus,
});

export default connect(mapStateToProps, null)(TimelineView);
