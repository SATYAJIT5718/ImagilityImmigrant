import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {scale} from '../../../../Infrastructure/utils/screenUtility';
import styles from './styles';
import {connect} from 'react-redux';
import {
  getProfileDocInfo,
  relatedDocDelete,
} from '../../../../application/store/actions/sponsorDetails';
import {getAuthToken} from '../../../../Infrastructure/utils/storageUtility';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from '../../../../Infrastructure/component/Loader/Loader';
import PdfViewer from '../../../../Infrastructure/component/PdfViewer/PdfViewer';
import Octicons from 'react-native-vector-icons/Octicons';
import {baseURL} from '../../../../application/config';
import Feather from 'react-native-vector-icons/Feather';

const DocumentComponent = props => {
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [exDocToShow, setExDocToShow] = useState([]);
  const [eduDocToShow, setEduDocToShow] = useState([]);
  const [immDocToShow, setImmDocToShow] = useState([]);
  const [perDocToShow, setPerDocToShow] = useState([]);
  const [pdfModal, setPdfModal] = useState(false);
  const [selectedPDFURL, setSelectedPDFURL] = useState('');
  const [items, setItems] = useState([]);
  const [titleValue, setTitleValue] = useState('');
  const beneficiaryInfo = props?.indivisualBenInfo?.data;
  const familyData = props?.beneficiariesFamily?.data;
  const dropdownItem = () => {
    const benItem = [beneficiaryInfo].map(item => {
      return {
        label: `SELF - ${item.fName}`,
        value: `SELF - ${item.fName}`,
        userType: `SELF`,
        id: item.id,
      };
    });
    const spouseItem = familyData
      .filter(item => item.relationShipType?.code === 'SPOUSE')
      .map(item => {
        return {
          label: `${item.relationShipType?.code} - ${item.fName}`,
          value: `${item.relationShipType?.code} - ${item.fName}`,
          userType: `FAMILY`,
          id: item.id,
        };
      });
    const childItem = familyData
      .filter(item => item.relationShipType?.code === 'CHILD')
      .map(item => {
        return {
          label: `${item.relationShipType?.code} - ${item.fName}`,
          value: `${item.relationShipType?.code} - ${item.fName}`,
          userType: `FAMILY`,
          id: item.id,
        };
      });
    setTitleValue(benItem[0].value); //default value to display
    setItems([...benItem, ...spouseItem, ...childItem]);
  };
  const renderItem = item => {
    let docPath = decodeURI(
      `${baseURL}docs/${item.fileLocation.substring(
        item.fileLocation.indexOf('documents'),
        item.fileLocation.length,
      )}`,
    );
    return (
      <>
        <View
          key={item.id}
          style={{
            flexDirection: 'row',
            height: scale(40),
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingLeft: scale(18),
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
              setPdfModal(true), setSelectedPDFURL(docPath);
            }}
            disabled={
              item?.fileLocation === null ||
              item?.fileLocation === undefined ||
              item?.fileLocation === ''
                ? true
                : false
            }
            style={{
              flex: 0.38,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              right: scale(10),
            }}>
            {item?.fileLocation === null ||
            item?.fileLocation === undefined ||
            item?.fileLocation === '' ? (
              <Feather name="eye-off" size={scale(20)} color="#10A0DA" />
            ) : (
              <Octicons name="eye" size={scale(20)} color="#10A0DA" />
            )}
          </TouchableOpacity>
        </View>
      </>
    );
  };
  const init = async id => {
    dropdownItem();
    setStatus(true);
    const token = await getAuthToken();
    const beneficiaryId = beneficiaryInfo.id;
    const familyId = id !== undefined ? id : null;
    await props
      .getProfileDoc(token, beneficiaryId, familyId)
      .then(res => {
        setEduDocToShow(res.data.Education);
        setExDocToShow(res.data.Experience);
        setImmDocToShow(res.data.Immigration);
        setPerDocToShow(res.data.Personal);
        setStatus(false);
        console.log('doc-res-', res);
      })
      .catch(e => {
        setStatus(false);
        console.log('e', e);
      });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Loader status={status} />
      {pdfModal ? (
        <PdfViewer modalToClose={setPdfModal} source={selectedPDFURL} />
      ) : null}
      <ScrollView style={styles.container}>
        <View style={{backgroundColor: '#fff'}}>
          <View style={{margin: scale(10), zIndex: 100}}>
            <View style={{flexDirection: 'row', marginBottom: scale(5)}}>
              <Text style={styles.formInputTitle}>
                Select Family/Dependent
                {/* <Text style={{color: 'red'}}>*</Text> */}
              </Text>
            </View>
            <DropDownPicker
              name="Family/Dependent"
              listMode="MODAL"
              open={open}
              value={titleValue}
              items={items}
              setOpen={setOpen}
              setItems={setItems}
              setValue={setTitleValue}
              onSelectItem={item => {
                item.userType !== 'SELF' ? init(item.id) : init();
              }}
              placeholder="Select"
              placeholderStyle={{
                color: '#4D4F5C',
              }}
              textStyle={{
                color: '#4D4F5C',
              }}
              maxHeight={scale(115)}
              style={{...styles.dropdown}}
            />
          </View>
          <Text style={styles.headerText}>My Personal Documents</Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#EDF4FB',
              height: scale(56),
              margin: scale(10),
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
                flex: 0.38,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.formInputTitle}>Actions</Text>
            </View>
          </View>
          <View>
            {perDocToShow.length > 0 ? (
              perDocToShow.map(item => {
                return renderItem(item);
              })
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: scale(10),
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
        </View>
        <View style={{backgroundColor: '#fff'}}>
          <Text style={styles.headerText}>My Educational Documents</Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#EDF4FB',
              height: scale(56),
              margin: scale(10),
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
                flex: 0.38,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.formInputTitle}>Actions</Text>
            </View>
          </View>
          <View>
            {eduDocToShow.length > 0 ? (
              eduDocToShow.map(item => {
                return renderItem(item);
              })
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: scale(10),
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
        </View>
        <View style={{backgroundColor: '#fff'}}>
          <Text style={styles.headerText}>My Work Experiance Documents</Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#EDF4FB',
              height: scale(56),
              margin: scale(10),
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
                flex: 0.38,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.formInputTitle}>Actions</Text>
            </View>
          </View>
          <View>
            {exDocToShow.length > 0 ? (
              exDocToShow.map(item => {
                return renderItem(item);
              })
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: scale(10),
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
        </View>
        <View style={{backgroundColor: '#fff'}}>
          <Text style={styles.headerText}>My Immigration Documents</Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#EDF4FB',
              height: scale(56),
              margin: scale(10),
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
                flex: 0.38,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.formInputTitle}>Actions</Text>
            </View>
          </View>
          <View style={{marginBottom: scale(20)}}>
            {immDocToShow.length > 0 ? (
              immDocToShow.map(item => {
                return renderItem(item);
              })
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: scale(10),
                  paddingBottom: scale(20),
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
        </View>
      </ScrollView>
    </>
  );
};
const mapStateToProps = ({
  beneficiaryAccountReducer: {
    educationalInfo,
    getProfileDoc,
    indivisualBenInfo,
    getBenDoc,
  },
  beneficiaryFamilyReducer: {beneficiariesFamily},
}) => ({
  educationalInfo,
  getProfileDoc,
  indivisualBenInfo,
  getBenDoc,
  beneficiariesFamily,
});
const mapDispatchToProps = {
  getProfileDoc: (authToken, beneficiaryId, familyId) =>
    getProfileDocInfo(authToken, beneficiaryId, familyId),
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentComponent);
