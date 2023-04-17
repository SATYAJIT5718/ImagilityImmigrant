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
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import {
  deleteExperienceDoc,
  ExperienceDetails,
} from '../../../../../application/store/actions/sponsorDetails';
import {
  getAuthToken,
  getBeneficiaryUserID,
} from '../../../../../Infrastructure/utils/storageUtility';
import {decode as atob, encode as btoa} from 'base-64';
import RNFS from 'react-native-fs';
import {baseURL} from '../../../../../application/config';
import Toast from 'react-native-simple-toast';
import Loader from '../../../../../Infrastructure/component/Loader/Loader';
const RelatedDocument = props => {
  console.log(props, 'props');
  const reducer = props?.ExperienceList?.data
    ? props.ExperienceList.data
    : null;
  const filterData = reducer.filter(item => item.id === props.routeData);
  const routeData = filterData[0];
  const beneficiaryInfo = props?.userInformation?.data;
  const [status, setStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [educdoc, setEducdoc] = useState(
    props?.educdoctyp?.data
      ? props.educdoctyp.data.map(item => {
          return {
            label: item.name,
            value: item.code,
          };
        })
      : null,
  );
  const [singleFile, setSingleFile] = useState('');
  const docToShow = routeData.documents;
  const familyId = props?.indivisualFamilyInfo?.data?.id
    ? props.indivisualFamilyInfo.data.id
    : null;
  const selectOneFile = async () => {
    const authToken = await getAuthToken();
    const beneficiaryId = beneficiaryInfo.id;
    const categoryName = `BENWEDOC`;
    const fileCategory = 'EXPLTR';
    const entityId = props.routeData ? props.routeData : '';

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      if (res[0].size >= 5000000) {
        Toast.show(
          'The file is too large to upload, please try a file with less than 5MB',
          Toast.LONG,
        );
      } else {
        let uri = decodeURI(res[0].uri);
        setStatus(true);
        uri
          ? RNFS.readFile(uri, 'base64').then(async base64data => {
              const binary = atob(base64data);
              let formData = new FormData();
              formData.append('file', {
                uri: uri,
                type: res[0].type,
                name: res[0].name,
                data: binary,
              });
              let resp = await fetch(
                `${baseURL}api/v1/document/beneficiary/${beneficiaryId}/category/${categoryName}/entity/${entityId}/fileCategory/${fileCategory}${
                  familyId !== null ? `?familyId=${familyId}` : ''
                }`,
                {
                  method: 'post',
                  body: formData,
                  headers: {
                    'Content-Type': 'multipart/form-data; ',
                    Authorization: `Bearer ${authToken}`,
                  },
                },
              );
              let responseJson = await resp.json();
              if (responseJson.status === 200) {
                props
                  .getExperience(authToken, beneficiaryId, familyId)
                  .then(async res => {
                    setStatus(false);
                  })
                  .catch(e => {
                    console.log('error', e);
                    setStatus(false);
                  });
                setTimeout(() => {
                  Toast.show(`Document update successful`, Toast.SHORT);
                }, 1000);
              } else {
                setStatus(false);
                setTimeout(() => {
                  Toast.show('Failed to update Document', Toast.SHORT);
                }, 1000);
              }
            })
          : setStatus(false);
      }
    } catch (err) {
      setStatus(false);
      if (DocumentPicker.isCancel(err)) {
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const navigation = useNavigation();

  const model = id => {
    setModalVisible(true);
    setDeleteID(id);
  };

  const deleteHandler = async () => {
    let token = await getAuthToken();
    let beneficiaryId = beneficiaryInfo.id;
    let categoryName = `BENWEDOC`;
    let fileCategory = 'EXPLTR';
    let fileId = deleteID;
    setStatus(true);
    props
      .deleteDocuments(token, beneficiaryId, categoryName, fileCategory, fileId)
      .then(async res => {
        props
          .getExperience(token, beneficiaryId, familyId)
          .then(async res => {
            setModalVisible(!modalVisible);
            setStatus(false);
          })
          .catch(e => {
            console.log('error', e);
            setStatus(false);
          });
        setTimeout(() => {
          Toast.show(res.message, Toast.SHORT);
        }, 1000);
      })
      .catch(e => {
        console.log('error', e);
        setStatus(false);
      });
  };

  const renderItem = item => {
    console.log('item', item);
    return (
      <>
        <View
          key={item.id}
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
            }}>
            <Text style={styles.formInputTitle}>{item.fileCategory.name}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.documentText}>{item.fileName}</Text>
          </View>
          <TouchableOpacity
            onPress={() => model(item.id)}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign
              name="delete"
              size={20}
              style={{
                color: '#00A8DB',
              }}
            />
          </TouchableOpacity>
        </View>
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
                // alignItems: "center",
                // shadowColor: "#000",
                // shadowOffset: {
                //   width: 0,
                //   height: 2,
                // },
                shadowOpacity: 0.25,
                // shadowRadius: 4,
                elevation: 5,
                height: scale(213),
                width: scale(328),
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  // justifyContent: "space-between",
                  // alignItems: "center",
                  // backgroundColor: "red",
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
                <Text>Do you wish to Delete the File?</Text>
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
      </>
    );
  };

  return (
    <>
      <Loader status={status} />
      <View style={styles.container}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.formInputTitle}>Document Type</Text>
          <TouchableOpacity
            borderradius={scale(5)}
            style={{
              width: '100%',
              marginTop: scale(8.5),
              height: scale(49),
              borderRadius: 4,
              borderColor: '#C3D0DE',
              backgroundColor: '#0000001F',
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disabled={false}>
            <Text
              style={{
                fontSize: scale(15),
                fontFamily: 'SourceSansPro-Regular',
                color: '#4D4F5C',
              }}>
              Experience Letter
            </Text>
          </TouchableOpacity>
          <Text style={styles.formInputTitle}>
            {singleFile[0]?.name ? singleFile[0]?.name : null}
          </Text>
          <View
            style={{
              flex: 1,
              // marginTop: scale(30),
              marginBottom: scale(40),
            }}>
            <TouchableOpacity
              onPress={selectOneFile}
              style={{
                width: '100%',
                marginTop: scale(8.5),
                height: scale(49),
                borderWidth: 1,
                backgroundColor: '#FFFFF',
                borderRadius: 4,
                borderColor: '#10A0DA',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              disabled={false}>
              <Text
                style={{
                  fontSize: scale(16),
                  fontFamily: 'SourceSansPro-SemiBold',
                  color: '#10A0DA',
                }}>
                UPLOAD
              </Text>
            </TouchableOpacity>
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
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.formInputTitle}>Actions</Text>
            </View>
          </View>
          {docToShow !== null ? (
            docToShow.map(item => {
              return renderItem(item);
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
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('WorkExperience')}
          style={{
            ...styles.button,
            backgroundColor:
              // '#A2D3EA'
              '#00A0DA',
            marginTop: scale(50),
          }}
          disabled={false}>
          <Text
            style={{
              fontSize: scale(16),
              fontFamily: 'SourceSansPro-SemiBold',
              color: '#FFFFFF',
            }}>
            SAVE
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const mapStateToProps = ({
  sponsorDetailsReducer: {ExperienceList, educdoctyp, educationalInfo},
  beneficiaryFamilyReducer: {indivisualFamilyInfo},
  timeLine: {userInformation},
}) => ({
  educdoctyp,
  educationalInfo,
  ExperienceList,
  indivisualFamilyInfo,
  userInformation,
});
const mapDispatchToProps = {
  deleteDocuments: (token, beneficiaryId, categoryName, fileCategory, fileId) =>
    deleteExperienceDoc(
      token,
      beneficiaryId,
      categoryName,
      fileCategory,
      fileId,
    ),
  getExperience: (token, beneficiaryId, familyId) =>
    ExperienceDetails(token, beneficiaryId, familyId),
};

export default connect(mapStateToProps, mapDispatchToProps)(RelatedDocument);
