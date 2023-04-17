import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {scale} from '../../../../../Infrastructure/utils/screenUtility';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {getBeneficiaryType} from '../../../../../Infrastructure/utils/storageUtility';
import LifeStoryStepper from '../../../../../Infrastructure/component/LifeStoryStepper/LifeStoryStepper';
import TrainingDetails from '../../../../../Infrastructure/assets/images/TrainingDetails.png';
const TrianingTimelineView = props => {
  const navigation = useNavigation();
  const trainingData = props.trainingInfo?.data?.profEducation
    ? props.trainingInfo.data.profEducation
    : [];
  const [beneficiaryMOC, setbeneficiaryMOC] = useState(true);

  const renderItem = ({item, index}) => {
    const formatDate = moment(item.endDate).format('YYYY');

    return (
      <LifeStoryStepper
        index={index}
        endYear={formatDate ? formatDate : '--'}
        Image={TrainingDetails}
        degreeTypename={item.name ? item.name : '--'}
        university={item.institution ? item.institution : '--'}
        arraylength={trainingData.length}
        ImageStyle={{width: scale(50), height: scale(50)}}
      />
    );
  };
  return (
    <View style={styles.container}>
      {trainingData.length > 0 ? (
        <FlatList
          data={trainingData}
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
          onPress={() => navigation.navigate('TrainingDetails')}
          style={{
            ...styles.button,
            backgroundColor: '#00A0DA',
          }}
          disabled={false}>
          <Text style={styles.buttontext}>ADD TRAINING</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
const mapStateToProps = ({
  sponsorDetailsReducer: {trainingInfo, getBeneficiaryStatus},
}) => ({
  trainingInfo,
  getBeneficiaryStatus,
});

export default connect(mapStateToProps, null)(TrianingTimelineView);
