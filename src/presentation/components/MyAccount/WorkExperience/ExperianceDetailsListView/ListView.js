import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {scale} from '../../../../../Infrastructure/utils/screenUtility';
import LifeCycleAccordion from '../../../../../Infrastructure/component/lifeCycleAccordion/LifeCycleAccordion';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getAuthToken} from '../../../../../Infrastructure/utils/storageUtility';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import Loader from '../../../../../Infrastructure/component/Loader/Loader';
import {
  ExperienceDetails,
  deleteWorkDetails,
} from '../../../../../application/store/actions/sponsorDetails';
const ListView = props => {
  const ExperienceList = props?.ExperienceList?.data
    ? props.ExperienceList.data
    : 0;
  const beneficiaryInfo = props?.userInformation?.data;
  const [beneficiaryMOC, setbeneficiaryMOC] = useState(true);

  const navigation = useNavigation();
  const [status, setStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const familyId = props?.indivisualFamilyInfo?.data?.id
    ? props.indivisualFamilyInfo.data.id
    : null;
  const deleteHandler = async () => {
    let token = await getAuthToken();
    let beneficiaryID = beneficiaryInfo.id;
    setStatus(true);
    props
      .deleteDetails(token, beneficiaryID, deleteID)
      .then(async res => {
        Toast.show(res.message, Toast.LONG);
        setStatus(true);
        props
          .getExperience(token, beneficiaryID, familyId)
          .then(async res => {
            setModalVisible(!modalVisible);
            setStatus(false);
          })
          .catch(e => {
            console.log('error', e);
            setStatus(false);
          });
      })
      .catch(e => {
        console.log('error', e);
        setStatus(false);
      });
  };

  const model = id => {
    setModalVisible(true);
    setDeleteID(id);
  };
  const renderCLientItem = (item, index) => {
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
              {item.clientName ? item.clientName : '_ _'}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#898989',
                  fontSize: scale(12),
                  fontFamily: 'SourceSansPro-Regular',
                }}>
                {item.startDate ? moment(item.startDate).format('ll') : '_ _'}
              </Text>
              <View style={{marginRight: scale(25)}} />
              <Text
                style={{
                  color: '#898989',
                  fontSize: scale(12),
                  fontFamily: 'SourceSansPro-Regular',
                }}>
                {item.endDate === null ? '' : moment(item.endDate).format('ll')}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  };
  const renderToolsItem = (item, index) => {
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
              {item.skillName ? item.skillName : '_ _'}
            </Text>
          </View>
        </View>
      </>
    );
  };
  const renderJobdutiesItem = (item, index) => {
    return (
      <>
        <View
          key={item.id}
          style={{
            flex: 1,
            marginTop: index === 0 ? scale(20) : 0,
            marginHorizontal: scale(10),
            borderWidth: scale(1),
            borderColor: '#D6D6D6',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.3,
              marginTop: scale(5),
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
              marginTop: scale(5),
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                color: '#505050',
                fontSize: scale(14),
                fontFamily: 'SourceSansPro-Regular',
              }}>
              {item.duty}
            </Text>
            {item.subDuties.map((item, index) => (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    marginTop: scale(5),
                    color: '#898989',
                    fontSize: scale(12),
                    fontFamily: 'SourceSansPro-Regular',
                  }}>
                  {item.subDutyDescription}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </>
    );
  };
  const renderDocumentItem = item => {
    return (
      <>
        <View
          key={item.id}
          style={{
            flex: 1,
            flexDirection: 'row',
            height: scale(56),
            marginBottom: scale(5),
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingLeft: scale(15),
            }}>
            <Text
              style={{
                fontSize: scale(14),
                color: '#24262F',
                fontFamily: 'SourceSansPro-Regular',
              }}>
              {item.fileCategory.name}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.documentText}>{item.fileName}</Text>
          </View>
        </View>
      </>
    );
  };
  const renderExperienceItem = item => {
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
            <Text style={styles.accordianBodyText}>Employment Type</Text>
            <View style={{marginBottom: scale(7)}} />
            <Text style={styles.yearText}>
              {item.employmentType.description
                ? item.employmentType.description
                : '--'}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.accordianBodyText}>Salary</Text>
            <View style={{marginBottom: scale(7)}} />
            <Text style={styles.yearText}>
              {item.salary ? item.salary : '--'}
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
            <Text style={styles.accordianBodyText}>From</Text>
            <View style={{marginBottom: scale(7)}} />
            <Text style={styles.yearText}>
              {item.startDate ? moment(item.startDate).format('ll') : '--'}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.accordianBodyText}>To</Text>
            <View style={{marginBottom: scale(7)}} />
            <Text style={styles.yearText}>
              {item.endDate === null
                ? 'Present'
                : moment(item.endDate).format('ll')}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: scale(10),
            marginTop: scale(10),
          }}>
          <Text
            style={{
              fontSize: scale(16),
              color: '#4A4A4A',
              fontFamily: 'SourceSansPro-Semibold',
            }}>
            List of Tools
          </Text>
        </View>
        {item.tools.length > 0 ? (
          item.tools.map((i, index) => {
            return renderToolsItem(i, index);
          })
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
              {'No Tools Added'}
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            marginLeft: scale(10),
            marginTop: scale(10),
          }}>
          <Text
            style={{
              fontSize: scale(16),
              color: '#4A4A4A',
              fontFamily: 'SourceSansPro-Semibold',
            }}>
            List of Clients
          </Text>
        </View>

        {item.clients.length > 0 ? (
          item.clients.map((i, index) => {
            return renderCLientItem(i, index);
          })
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
              {'No Clients Added'}
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            marginLeft: scale(10),
            marginTop: scale(10),
          }}>
          <Text
            style={{
              fontSize: scale(16),
              color: '#4A4A4A',
              fontFamily: 'SourceSansPro-Semibold',
            }}>
            List of Duties
          </Text>
        </View>
        {item.jobDuties.length > 0 ? (
          item.jobDuties.map((item, index) => {
            return renderJobdutiesItem(item, index);
          })
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
              {'No Duties Added'}
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            marginLeft: scale(10),
            marginTop: scale(10),
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
            marginTop: scale(5),
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
        {item.documents !== null ? (
          item.documents.map(item => {
            return renderDocumentItem(item);
          })
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: scale(10),
              marginTop: scale(10),
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
                // alignItems: 'center',
                // marginLeft: scale(5),
                alignItems: beneficiaryMOC ? 'center' : 'flex-start',
                marginLeft: beneficiaryMOC ? scale(10) : scale(55),
              }}>
              <Text style={styles.formInputTitle}>Designation</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                // alignItems: 'flex-end',
                alignItems: beneficiaryMOC ? 'flex-end' : 'flex-start',
                marginLeft: beneficiaryMOC ? 0 : scale(-20),
              }}>
              <Text style={styles.formInputTitle}>Company</Text>
            </View>
            {beneficiaryMOC ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: scale(15),
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
            title={item.designation ? item.designation : '--'}
            Studytitle={item.companyName ? item.companyName : '--'}
            data={renderExperienceItem(item)}
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
                marginLeft: scale(35),
                fontFamily: 'SourceSansPro-Regular',
                fontSize: scale(13),
                color: '#505050',
                overflow: 'hidden',
              },
            }}
            backgroundColor={index % 2 !== 0 ? '#F2F2F2' : null}
            edit={() =>
              navigation.navigate('WorkExperienceIndex', {
                item: item,
                edit: true,
              })
            }
            removeEdit={beneficiaryMOC ? false : true}
            deleteIcon={beneficiaryMOC ? true : false}
            delete={() => model(item.id)}
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
                backgroundColor: '#00000040',
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
                      Confirm
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
                    Do you wish to remove this item?
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: scale(30)}}>
                    <TouchableOpacity
                      onPress={() => deleteHandler()}
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
                        Delete
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
    <View style={styles.container}>
      <View style={styles.bodycontainer}>
        <Loader status={status} />
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
              You have not yet added any related details. add now to complete
              your profile.
            </Text>
          </View>
        )}
      </View>
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
  beneficiaryFamilyReducer: {indivisualFamilyInfo},
  timeLine: {userInformation},
}) => ({
  ExperienceList,
  indivisualFamilyInfo,
  getBeneficiaryStatus,
  userInformation,
});

const mapDispatchToProps = {
  deleteDetails: (token, beneficiaryId, experienceId) =>
    deleteWorkDetails(token, beneficiaryId, experienceId),
  getExperience: (token, beneficiaryId, familyId) =>
    ExperienceDetails(token, beneficiaryId, familyId),
};
export default connect(mapStateToProps, mapDispatchToProps)(ListView);
