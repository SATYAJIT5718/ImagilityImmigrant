import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {scale} from '../../../../../Infrastructure/utils/screenUtility';
import LifeCycleAccordion from '../../../../../Infrastructure/component/lifeCycleAccordion/LifeCycleAccordion';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  deleteEducationInfo,
  getEducationInfo,
} from '../../../../../application/store/actions/sponsorDetails';
import {
  getAuthToken,
  getBeneficiaryUserID,
  getBeneficiaryType,
} from '../../../../../Infrastructure/utils/storageUtility';
import Toast from 'react-native-simple-toast';
import Loader from '../../../../../Infrastructure/component/Loader/Loader';
const ListView = props => {
  const navigation = useNavigation();
  const [status, setStatus] = useState(false);
  const [pdfToShow, setPdfToShaow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const beneficiaryInfo = props?.userInformation?.data;
  const educationData = props.educationalInfo?.data?.education
    ? props.educationalInfo.data.education
    : [];
  const [beneficiaryMOC, setbeneficiaryMOC] = useState(true);
  console.log(
    '🚀 ~ file: ListView.js ~ line 39 ~ beneficiaryMOC',
    beneficiaryMOC,
  );
  const familyId = props?.indivisualFamilyInfo?.data?.id
    ? props?.indivisualFamilyInfo?.data?.id
    : null;
  console.log(
    'props.getBeneficiaryStatus',
    props?.getBeneficiaryStatus?.status,
  );
  const deleteHandler = async educationId => {
    const authToken = await getAuthToken();
    const beneficiaryId = beneficiaryInfo.id;
    setStatus(true);
    await props
      .deleteEducationData(authToken, beneficiaryId, educationId)
      .then(res => {
        props
          .getEducationData(authToken, beneficiaryId, familyId)
          .then(res => {
            setModalVisible(false);

            setStatus(false);
          })
          .catch(e => {
            setStatus(false);
            setModalVisible(false);
          });
        Toast.show(res.message, Toast.SHORT);
      })
      .catch(e => {
        setStatus(false);
        setModalVisible(false);
      });
  };
  const document = item => {
    return (
      <>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: scale(56),
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingLeft: scale(15),
              flexWrap: 'wrap',
            }}>
            <Text style={styles.formInputTitle}>{item.fileCategory.name}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingRight: scale(10),
              }}>
              <Text style={styles.documentText}>{item.fileName}</Text>
            </View>
          </View>
        </View>
      </>
    );
  };
  const renderSubjectItem = (item, index) => {
    return (
      <>
        <View
          key={item.id}
          style={{
            flex: 1,
            marginTop: index === 0 ? scale(10) : 0,
            marginHorizontal: scale(10),
            borderWidth: scale(1),
            borderColor: '#D6D6D6',
            height: scale(42),
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#EDF4FB',
                height: scale(21),
                width: scale(22),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#4A4A4A',
                  fontSize: scale(14),
                  fontFamily: 'SourceSansPro-SemiBold',
                }}>
                {index + 1}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                color: '#505050',
                fontSize: scale(14),
                fontFamily: 'SourceSansPro-Regular',
              }}>
              {item.courseName ? item.courseName : 'bjbbkk'}
            </Text>
          </View>
        </View>
      </>
    );
  };
  const renderEducationItem = item => {
    const data = item?.courses[0]?.courseName
      ? item.courses[0].courseName.split(',').map((item, index) => {
          return {id: index, courseName: item};
        })
      : [];
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            height: scale(56),
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: scale(15),
            }}>
            <Text style={styles.accordianBodyText}>Start Year</Text>
            <Text style={styles.yearText}>
              {item.startYear ? item.startYear : '--'}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.accordianBodyText}>End Year</Text>
            <Text style={styles.yearText}>
              {item.endYear ? item.endYear : '--'}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: scale(56),
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: scale(15),
            }}>
            <Text style={styles.accordianBodyText}>Grade</Text>
            <Text style={styles.yearText}>
              {item.grade ? item.grade : '--'}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.accordianBodyText}>University</Text>
            <Text style={styles.yearText}>
              {item.university ? item.university : '--'}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginLeft: scale(10),
            marginTop: scale(20),
          }}>
          <Text
            style={{
              fontSize: scale(16),
              color: '#505050',
              fontFamily: 'SourceSansPro-Semibold',
            }}>
            List of Cources
          </Text>
        </View>
        {data.map((item, index) => {
          return renderSubjectItem(item, index);
        })}
        {data.length === 0 ? (
          <View
            style={{
              flex: 1,
              marginHorizontal: scale(10),
              marginVertical: scale(10),
              borderWidth: scale(1),
              borderColor: '#D6D6D6',
              height: scale(42),
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginHorizontal: scale(10),
              }}>
              <Text
                style={{
                  color: '#505050',
                  fontSize: scale(14),
                  fontFamily: 'SourceSansPro-Regular',
                }}>
                {'No courses Added by you.'}
              </Text>
            </View>
          </View>
        ) : null}

        <View style={{flexDirection: 'column', marginTop: scale(20)}}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: scale(10),
              marginBottom: scale(10),
            }}>
            <Text
              style={{
                fontSize: scale(16),
                color: '#4A4A4A',
                fontFamily: 'SourceSansPro-Semibold',
              }}>
              List of Documents
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: '#EDF4FB',
              height: scale(56),
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingLeft: scale(15),
                flexWrap: 'wrap',
              }}>
              <Text style={styles.formInputTitle}>Document Type</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.formInputTitle}>Document Name</Text>
            </View>
          </View>

          {item.documents.length > 0 ? (
            item.documents ? (
              item.documents.map((value, index) => {
                return document(value, index);
              })
            ) : null
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: scale(10),
                marginVertical: scale(10),
              }}>
              <Text
                style={{
                  color: '#505050',
                  fontSize: scale(14),
                  fontFamily: 'SourceSansPro-Regular',
                }}>
                {'No Document Added by you.'}
              </Text>
            </View>
          )}
        </View>
      </>
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <>
        {index === 0 ? (
          <View style={styles.body}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: beneficiaryMOC ? 'center' : 'flex-start',
                marginLeft: beneficiaryMOC ? scale(10) : scale(50),
              }}>
              <Text style={styles.formInputTitle}>Degree</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: beneficiaryMOC ? 'flex-end' : 'flex-start',
                marginLeft: beneficiaryMOC ? 0 : scale(-50),
              }}>
              <Text style={styles.formInputTitle}>Field of Study</Text>
            </View>
            {beneficiaryMOC ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: beneficiaryMOC ? scale(15) : 0,
                }}>
                <Text style={styles.formInputTitle}>Action</Text>
              </View>
            ) : null}
          </View>
        ) : null}

        <View
          style={{
            paddingVertical: scale(5),
          }}>
          <LifeCycleAccordion
            title={item.degreeType?.name ? item.degreeType.name : '--'}
            Studytitle={item.fieldOfStudy ? item.fieldOfStudy : '--'}
            data={renderEducationItem(item)}
            style={{
              body: {marginHorizontal: scale(10)},
              titleContent: {
                marginLeft: scale(5),
                fontFamily: 'SourceSansPro-Regular',
                fontSize: scale(13),
                color: '#505050',
                overflow: 'hidden',
              },
              Studytitle: {
                marginLeft: scale(11),
                fontFamily: 'SourceSansPro-Regular',
                fontSize: scale(13),
                color: '#505050',
                overflow: 'hidden',
              },
            }}
            backgroundColor={index % 2 !== 0 ? '#F2F2F2' : null}
            removeEdit={beneficiaryMOC ? false : true}
            edit={() =>
              navigation.navigate('EducationalDetails', {
                item: item,
                edit: true,
              })
            }
            deleteIcon={beneficiaryMOC ? true : false}
            delete={() => {
              setSelectedItem(item.id);
              setModalVisible(true);
            }}
          />
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#0000000D',
              }}>
              <View
                style={{
                  margin: scale(20),
                  backgroundColor: '#FFFFFF',
                  padding: scale(20),
                  shadowOpacity: 0.25,
                  elevation: 5,
                  height: scale(213),
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
                        color: '#4D4F5C',
                        fontFamily: 'SourceSansPro-Semibold',
                      }}>
                      Confirm Delete
                    </Text>

                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
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
                  <Text
                    style={{
                      fontSize: scale(16),
                      color: '#4D4F5C',
                      fontFamily: 'SourceSansPro-Regular',
                    }}>
                    Do you wish to Delete the File?
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: scale(30)}}>
                    <TouchableOpacity
                      onPress={() => deleteHandler(selectedItem)}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: scale(12),
                        borderRadius: scale(5),
                        backgroundColor: '#00A0DA',
                        width: '30%',
                      }}
                      disabled={false}>
                      <Text
                        style={{
                          fontSize: scale(14),
                          fontFamily: 'SourceSansPro-SemiBold',
                          color: '#FFFFFF',
                        }}>
                        Confirm
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}
                      style={{
                        marginLeft: scale(30),
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: scale(12),
                        borderRadius: scale(5),
                        backgroundColor: '#EFEFEF',
                        width: '30%',
                      }}
                      disabled={false}>
                      <Text
                        style={{
                          fontSize: scale(14),
                          fontFamily: 'SourceSansPro-SemiBold',
                          color: '#656565',
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </>
    );
  };
  // useEffect(() => {
  //   getBeneficiaryType()
  //     .then(res =>
  //       res !== 'Created'
  //         ? (setbeneficiaryMOC(false), setStatus(false))
  //         : props.getBeneficiaryStatus.status === 'TERMINATED'
  //         ? (setbeneficiaryMOC(false), setStatus(false))
  //         : (setbeneficiaryMOC(true), setStatus(false)),
  //     )
  //     .catch(error => {
  //       setStatus(false);
  //     });
  // });
  return (
    <>
      <Loader status={status} />
      <View style={styles.container}>
        <View style={styles.bodycontainer}>
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
                You have not yet added any related details. add now to complete
                your profile.
              </Text>
            </View>
          )}
        </View>
        {beneficiaryMOC ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('EducationalDetails')}
            style={{
              ...styles.button,
              backgroundColor: '#00A0DA',
            }}
            disabled={false}>
            <Text style={styles.buttontext}>ADD DEGREE</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};
const mapStateToProps = ({
  sponsorDetailsReducer: {educationalInfo, getBeneficiaryStatus},
  beneficiaryFamilyReducer: {indivisualFamilyInfo},
  timeLine: {userInformation},
}) => ({
  educationalInfo,
  indivisualFamilyInfo,
  getBeneficiaryStatus,
  userInformation,
});
const mapDispatchToProps = {
  deleteEducationData: (authToken, beneficiaryId, educationId) =>
    deleteEducationInfo(authToken, beneficiaryId, educationId),
  getEducationData: (authToken, beneficiaryId, familyId) =>
    getEducationInfo(authToken, beneficiaryId, familyId),
};
export default connect(mapStateToProps, mapDispatchToProps)(ListView);
