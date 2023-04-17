import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import {scale} from '../../../../../Infrastructure/utils/screenUtility';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import {
  getCertificationsInfo,
  relatedDocDelete,
} from '../../../../../application/store/actions/sponsorDetails';
import {
  getAuthToken,
  getBeneficiaryUserID,
} from '../../../../../Infrastructure/utils/storageUtility';
import {decode as atob, encode as btoa} from 'base-64';
import RNFS from 'react-native-fs';
import {baseURL} from '../../../../../application/config/index';
import Toast from 'react-native-simple-toast';
import Loader from '../../../../../Infrastructure/component/Loader/Loader';
const RelatedDocument = props => {
  const {
    certificationsId,
    liccdoctyp,
    getCertificationsData,
    certificationsInfo,
    DeleterelatedDoc,
  } = props;
  const [status, setStatus] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const beneficiaryInfo = props?.userInformation?.data;

  const [licdoc, setLicdoc] = useState(
    liccdoctyp?.data
      ? liccdoctyp.data.map(item => {
          return {
            label: item.name,
            value: item.code,
          };
        })
      : [],
  );
  const [singleFile, setSingleFile] = useState('');
  const familyId = props?.indivisualFamilyInfo?.data?.id
    ? props.indivisualFamilyInfo.data.id
    : null;
  const docToShow = certificationsInfo?.data?.profEducation
    ? certificationsInfo.data.profEducation.filter(value => {
        return value.id === certificationsId;
      })
    : [];
  const selectOneFile = async () => {
    const authToken = await getAuthToken();
    const beneficiaryId = beneficiaryInfo.id;
    const categoryName = `BENLICDOC`;
    const fileCategory = value;
    const entityId = certificationsId ? certificationsId : '';
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
        setStatus(true);
        let uri = decodeURI(res[0].uri);
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
                getCertificationsData(authToken, beneficiaryId, familyId)
                  .then(res => {
                    setStatus(false);
                  })
                  .catch(e => {
                    setStatus(false);
                  });
                setTimeout(() => {
                  Toast.show(`Document update successful`, Toast.SHORT);
                }, 1000);
              } else {
                setStatus(false);
                Toast.show('Failed to update Document', Toast.SHORT);
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
  const deleteHandler = async item => {
    const authToken = await getAuthToken();
    const beneficiaryId = beneficiaryInfo.id;
    const categoryName = `BENLICDOC`;
    const fileCategory = item.fileCategory.code;
    const fileId = item.id;
    setStatus(true);
    DeleterelatedDoc(
      authToken,
      beneficiaryId,
      categoryName,
      fileCategory,
      fileId,
    )
      .then(res => {
        getCertificationsData(authToken, beneficiaryId, familyId)
          .then(res => {
            setModalVisible(!modalVisible);
            setStatus(false);
          })
          .catch(e => {
            setStatus(false);
          });
        setTimeout(() => {
          Toast.show(res.message, Toast.SHORT);
        }, 1000);
      })
      .catch(e => {
        setStatus(false);
      });
  };
  const renderItem = item => {
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
            onPress={() => {
              setSelectedItem(item), setModalVisible(true);
            }}
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
                    Do you wish to Delete the Item?
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
  return (
    <>
      <Loader status={status} />
      <View style={styles.container}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.formInputTitle}>Select Document Type</Text>
          <DropDownPicker
            name="document"
            listMode={Platform.OS == 'android' ? 'MODAL' : 'SCROLLVIEW'}
            open={open}
            value={value}
            items={licdoc}
            setOpen={setOpen}
            setItems={setLicdoc}
            setValue={setValue}
            placeholder="Enter"
            placeholderStyle={{
              color: '#4D4F5C',
            }}
            textStyle={{
              color: '#4D4F5C',
            }}
            style={styles.inputdropdown}
          />
          <Text style={styles.formInputTitle}>
            {singleFile[0]?.name ? singleFile[0]?.name : null}
          </Text>
          <View
            style={{
              flex: 1,
              marginBottom: scale(40),
            }}>
            <TouchableOpacity
              onPress={selectOneFile}
              style={{
                width: '100%',
                marginTop: scale(8.5),
                height: scale(49),
                backgroundColor: '#FFFFFF',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#349beb',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              disabled={value ? false : true}>
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
          {docToShow[0]?.documents?.length > 0 ? (
            docToShow[0].documents.map(item => {
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
          onPress={() => navigation.navigate('CertificationsDetailsListView')}
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
  sponsorDetailsReducer: {liccdoctyp, certificationsInfo},
  beneficiaryFamilyReducer: {indivisualFamilyInfo},
  timeLine: {userInformation},
}) => ({
  liccdoctyp,
  certificationsInfo,
  indivisualFamilyInfo,
  userInformation,
});
const mapDispatchToProps = {
  getCertificationsData: (authToken, beneficiaryId, familyId) =>
    getCertificationsInfo(authToken, beneficiaryId, familyId),
  DeleterelatedDoc: (
    authToken,
    beneficiaryId,
    categoryName,
    fileCategory,
    fileId,
  ) =>
    relatedDocDelete(
      authToken,
      beneficiaryId,
      categoryName,
      fileCategory,
      fileId,
    ),
};

export default connect(mapStateToProps, mapDispatchToProps)(RelatedDocument);
