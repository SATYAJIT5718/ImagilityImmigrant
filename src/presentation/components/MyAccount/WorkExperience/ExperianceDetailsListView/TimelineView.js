import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {scale} from '../../../../../Infrastructure/utils/screenUtility';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WorkExperience from '../../../../../Infrastructure/assets/images/WorkExperience.png';
import LifeStoryStepper from '../../../../../Infrastructure/component/LifeStoryStepper/LifeStoryStepper';
const TimelineView = props => {
  const navigation = useNavigation();
  const ExperienceList = props?.ExperienceList?.data
    ? props.ExperienceList.data
    : 0;
  const [beneficiaryMOC, setbeneficiaryMOC] = useState(true);

  const renderItem = ({item, index}) => {
    return (
      <LifeStoryStepper
        index={index}
        endYear={item.endDate ? item.endDate.substring(0, 4) : 'Present'}
        Image={WorkExperience}
        degreeTypename={item.designation ? item.designation : '--'}
        university={item.companyName ? item.companyName : '--'}
        arraylength={ExperienceList.length}
        ImageStyle={{width: scale(22), height: scale(22)}}
      />
    );
  };
  return (
    <View style={styles.container}>
      {ExperienceList.length > 0 ? (
        <FlatList
          data={ExperienceList}
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
          onPress={() => navigation.navigate('WorkExperienceIndex')}
          style={{
            ...styles.button,
            backgroundColor: '#00A0DA',
          }}
          disabled={false}>
          <Text style={styles.buttontext}>ADD WORK EXPERIENCE</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
const mapStateToProps = ({
  sponsorDetailsReducer: {ExperienceList, getBeneficiaryStatus},
}) => ({
  ExperienceList,
  getBeneficiaryStatus,
});

export default connect(mapStateToProps, null)(TimelineView);
