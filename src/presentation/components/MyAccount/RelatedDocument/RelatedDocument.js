import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import {scale} from '../../../../Infrastructure/utils/screenUtility';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import {
  sendEducDocDataInfo,
  getEducationInfo,
  relatedDocDelete,
} from '../../../../application/store/actions/sponsorDetails';
import {
  getAuthToken,
  getBeneficiaryUserID,
} from '../../../../Infrastructure/utils/storageUtility';
import {decode as atob, encode as btoa} from 'base-64';
import RNFS from 'react-native-fs';
import {baseURL} from '../../../../application/config';
import Toast from 'react-native-simple-toast';
import Loader from '../../../../Infrastructure/component/Loader/Loader';
const RelatedDocument = props => {
  const {
    educationId,
    educdoctyp,
    getEducationData,
    educationalInfo,
    DeleterelatedDoc,
  } = props;
  const [status, setStatus] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const beneficiaryInfo = props?.userInformation?.data;
  const [educdoc, setEducdoc] = useState(
    educdoctyp?.data
      ? educdoctyp.data.map(item => {
          return {
            label: item.name,
            value: item.code,
          };
        })
      : [],
  );
  const [singleFile, setSingleFile] = useState('');
  const docToShow = educationalInfo?.data?.education
    ? educationalInfo.data.education.filter(value => {
        return value.id === educationId;
      })
    : [];
  const familyId = props?.indivisualFamilyInfo?.data?.id
    ? props.indivisualFamilyInfo.data.id
    : null;
  const selectOneFile = async () => {
    const authToken = await getAuthToken();
    const beneficiaryId = beneficiaryInfo.id;
    const categoryName = `BENEDUDOC`;
    const fileCategory = value;
    const entityId = educationId ? educationId : '';
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
                getEducationData(authToken, beneficiaryId, familyId)
                  .then(res => {
                    console.log('getEducationData---', res);
                    setStatus(false);
                  })
                  .catch(e => {
                    console.log('getEducationData---error', e);
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
  const deleteHandler = async item => {
    console.log('item', item);
    const authToken = await getAuthToken();
    const beneficiaryId = beneficiaryInfo.id;
    const categoryName = `BENEDUDOC`;
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
        props
          .getEducationData(authToken, beneficiaryId, familyId)
          .then(res => {
            setStatus(false);
            setModalVisible(!modalVisible);
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
        console.log('eee--ee--', e);
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
            listMode={Platform.OS == 'ios' ? 'SCROLLVIEW' : 'MODAL'}
            open={open}
            value={value}
            items={educdoc}
            setOpen={setOpen}
            setItems={setEducdoc}
            setValue={setValue}
            placeholder="Select"
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
                justifyContent: 'center',
                alignItems: 'center',
                height: scale(49),
                borderWidth: 1,
                backgroundColor: '#FFFFF',
                borderColor: '#10A0DA',
                borderRadius: 4,
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
          {docToShow[0]?.documents.length > 0 ? (
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
          onPress={() => navigation.navigate('EducationalDetailsListView')}
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
  sponsorDetailsReducer: {educdoctyp, educationalInfo},
  beneficiaryFamilyReducer: {indivisualFamilyInfo},
  timeLine: {userInformation},
}) => ({
  educdoctyp,
  educationalInfo,
  indivisualFamilyInfo,
  userInformation,
});
const mapDispatchToProps = {
  sendEducDocData: (
    authToken,
    payload,
    beneficiaryId,
    categoryName,
    entityId,
    fileCategory,
  ) =>
    sendEducDocDataInfo(
      authToken,
      payload,
      beneficiaryId,
      categoryName,
      entityId,
      fileCategory,
    ),
  getEducationData: (authToken, beneficiaryId, familyId) =>
    getEducationInfo(authToken, beneficiaryId, familyId),
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
