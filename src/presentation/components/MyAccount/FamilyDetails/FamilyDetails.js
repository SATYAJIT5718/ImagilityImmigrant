import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  FlatList,
  Text,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import React, {useState, useEffect} from 'react';
import TimelineCard from '../../../../Infrastructure/component/TimelineCards/TimelineCard';
import {scale} from '../../../../Infrastructure/utils/screenUtility';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';

import NoDataFound from '../../../../Infrastructure/component/NoDataFound/NoDataFound';
import {indivisualFamilyInfo} from '../../../../application/store/actions/beneficiaryFamily';
const FamilyDetails = props => {
  const [childList, setChildList] = useState([]);
  const [count, setCount] = useState(0);
  const [spouseDetails, setSpouseDetails] = useState(0);
  const [childDetails, setChildDetails] = useState(0);
  const [familyType, setFamilyType] = useState(
    props?.beneficiariesFamily?.beneficiariesFamily?.data
      ? props.beneficiariesFamily.beneficiariesFamily.data
      : [],
  );
  const [familyModal, setFamilyModal] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const navigation = useNavigation();
  // const {items} = props.route.params;
  const isFocused = useIsFocused();
  const AddChild = () => {
    setFamilyModal(!familyModal);
    setCount(count + 1);
    familyType.push({
      id: 0,
      titleName: `Child ${count} Details`,
      relationShipType: {id: 13, name: 'Child'},
      newCreated: true,
      // status: items.status,
    });
    familyType.filter(item => {
      item.newCreated === true ? setIsCreated(true) : setIsCreated(false);
    });
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.storeIndivisualFamilyInfo({data: item});
          navigation.navigate('Beneficiary Details');
        }}>
        <TimelineCard
          Title={item.titleName}
          iconName="filetext1"
          bgColor={'#fff'}
          iconSize={{
            width: scale(25),
            height: scale(25),
            marginLeft: scale(1.5),
          }}
          style={{
            titleContent: {
              marginLeft: scale(15),
            },
          }}
        />
      </TouchableOpacity>
    );
  };
  const FamilyDetailsList = () => {
    let familyDataReducer = props?.beneficiariesFamily?.beneficiariesFamily
      ?.data
      ? props.beneficiariesFamily?.beneficiariesFamily?.data
      : [];

    let data = familyDataReducer
      .filter(item => {
        if (item?.relationShipType?.name === 'Child') {
          return item;
        }
      })
      .map((item, index) => {
        if (item?.relationShipType?.name === 'Child') {
          return {
            ...item,
            titleName: `Child ${index + 1} Details`,
            newCreated: false,
            // status: items.status,
          };
        }
      });
    let arrangeData = familyDataReducer
      .filter(item => item?.relationShipType?.name === 'Spouse')
      .map(item => {
        return {
          ...item,
          titleName: `Spouse Details`,
          newCreated: false,
          // status: items.status,
        };
      });
    arrangeData.length === 0 //When There is no Spouse Data
      ? arrangeData.push({
          id: 1,
          titleName: `Spouse Details`,
          relationShipType: {id: 14, name: 'Spouse'},
          newCreated: true,
          // status: items.status,
        })
      : null;
    data.length === 0 //When There is no Child Data
      ? (setChildDetails(0),
        data.push({
          id: 0,
          titleName: `Child ${data.length + 1} Details`,
          relationShipType: {id: 13, name: 'Child'},
          newCreated: true,
          // status: items.status,
        }))
      : setChildDetails(data.length);
    let concat = [...arrangeData, ...data];
    setFamilyType(concat);
    setChildList(data);
    setCount(data.length + 1);
    concat.filter(item => {
      item.newCreated === true ? setIsCreated(true) : setIsCreated(false);
    });
  };
  useEffect(() => {
    FamilyDetailsList();
  }, [props, isFocused]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={150}
      style={{flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: scale(10)}}>
        {familyType.length > 0 ? (
          <FlatList
            data={familyType}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        ) : (
          <NoDataFound Text={`No Family Records Found.`} />
        )}
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          disabled={childDetails === 0 || isCreated ? true : false}
          onPress={() => {
            setFamilyModal(!familyModal);
          }}>
          <Button
            borderradius="0px"
            width="100%"
            height="54px"
            style={{
              ...styles.btn,
              opacity: childDetails === 0 || isCreated ? 0.5 : 1,
            }}>
            <Text style={styles.btntext}>ADD CHILD</Text>
          </Button>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={familyModal}
          onRequestClose={() => {
            setFamilyModal(!familyModal);
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{flex: 1}}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 8,
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#00000040',
              }}>
              <View
                style={{
                  margin: scale(20),
                  backgroundColor: '#FFFFFF',
                  padding: scale(20),
                  shadowOpacity: 0.25,
                  elevation: 5,
                  height: scale(250),
                  width: scale(328),
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: scale(18),
                        color: '#3D3D63',
                        fontFamily: 'SourceSansPro-Bold',
                      }}>
                      Family Details
                    </Text>

                    <Pressable onPress={() => setFamilyModal(!familyModal)}>
                      <AntDesign
                        name="close"
                        size={23}
                        style={{
                          color: 'grey',
                          marginBottom: scale(10),
                        }}
                      />
                    </Pressable>
                  </View>
                  <View
                    style={{
                      marginVertical: scale(10),
                      borderBottomWidth: scale(1),
                      borderBottomColor: '#00000029',
                    }}
                  />
                  <View>
                    <Text style={styles.formInputData}>
                      Are you sure you want to Create another Child Profile?
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: scale(50),
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={AddChild}
                        style={{width: scale(90)}}>
                        <Button
                          style={{
                            height: scale(40),
                            borderRadius: scale(4),
                            backgroundColor: '#19A0DA',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              color: '#FFFFFF',
                              fontSize: scale(14),
                              fontFamily: 'SourceSansPro-Semibold',
                            }}>
                            ADD
                          </Text>
                        </Button>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setFamilyModal(!familyModal)}
                        style={{width: scale(90)}}>
                        <Button
                          style={{
                            height: scale(40),
                            borderRadius: scale(4),
                            backgroundColor: '#EFEFEF',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              color: '#656565',
                              fontSize: scale(14),
                              fontFamily: 'SourceSansPro-Semibold',
                            }}>
                            CANCEL
                          </Text>
                        </Button>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = ({
  beneficiaryFamilyReducer: beneficiariesFamily,
  beneficiariesFamilyType,
  indivisualFamilyInfo,
  // beneficiaryAccountReducer: {getBeneficiaryStatus},
}) => ({
  beneficiariesFamily,
  beneficiariesFamilyType,
  indivisualFamilyInfo,
  // getBeneficiaryStatus,
});

const mapDispatchToProps = {
  storeIndivisualFamilyInfo: indivisualfamilyInfo =>
    indivisualFamilyInfo(indivisualfamilyInfo),
};

export default connect(mapStateToProps, mapDispatchToProps)(FamilyDetails);
