import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {scale} from '../../../../../Infrastructure/utils/screenUtility';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import immigrateIcon from '../../../../../Infrastructure/assets/images/immigrateIcon.png';
import LifeStoryStepper from '../../../../../Infrastructure/component/LifeStoryStepper/LifeStoryStepper';
const TimelineView = props => {
  const navigation = useNavigation();
  const immigratationList = props?.immigratationList?.data
    ? props.immigratationList.data
    : 0;
  const [beneficiaryMOC, setbeneficiaryMOC] = useState(true);

  const renderItem = ({item, index}) => {
    return (
      <LifeStoryStepper
        index={index}
        endYear={item.receiptDate ? item.receiptDate.substring(0, 4) : ''}
        Image={immigrateIcon}
        degreeTypename={
          item.immigrationStatusCode ? item.immigrationStatusCode : '--'
        }
        university={item.companyName ? item.companyName : '--'}
        arraylength={immigratationList.length}
        ImageStyle={{width: scale(28), height: scale(28)}}
      />
    );
  };
  return (
    <View style={styles.container}>
      {immigratationList.length > 0 ? (
        <FlatList
          data={immigratationList}
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
          onPress={() => navigation.navigate('ImmigrationVisa')}
          style={{
            ...styles.button,
            backgroundColor: '#00A0DA',
          }}
          disabled={false}>
          <Text style={styles.buttontext}>ADD IMMIGRATION DETAILS</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
const mapStateToProps = ({
  sponsorDetailsReducer: {immigratationList, getBeneficiaryStatus},
}) => ({
  immigratationList,
  getBeneficiaryStatus,
});

export default connect(mapStateToProps, null)(TimelineView);
