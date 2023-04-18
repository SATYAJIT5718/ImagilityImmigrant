import {View, Text, TouchableOpacity, Modal, Pressable} from 'react-native';
import React, {useState} from 'react';
import {scale} from '../../../../Infrastructure/utils/screenUtility';
import styles from '../styles';
import {CustomButton} from '../../../../Infrastructure/component/Custom';
import TagInput from 'react-native-tags-input';
// import {sendEducationInfo} from '../../../../application/store/actions/student';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';

const TopicsCovered = ({
  handleSubmit,
  setFieldValue,
  editData,
  courseToggle,
}) => {
  const [tags, setTags] = useState({
    tag: '',
    tagsArray: [],
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const data = editData?.subjects
    ? editData.subjects.split(',').map((item, index) => {
        return {id: index, subjects: item};
      })
    : [];
  const [errorMessage, setErrorMessage] = useState('');
  const updateTagState = state => {
    if (
      state.tagsArray.includes(' ') ||
      state.tagsArray.includes('  ') ||
      state.tagsArray.includes('   ') ||
      state.tagsArray.includes('    ') ||
      state.tagsArray.includes('     ') ||
      state.tagsArray.includes('      ') ||
      state.tagsArray.includes('       ') ||
      state.tagsArray.includes('        ') ||
      state.tagsArray.includes('         ') ||
      state.tagsArray.includes('          ') ||
      state.tagsArray.includes('           ')
    ) {
      setErrorMessage('Please enter Valid Curses Name');
    } else {
      setTags(state), setErrorMessage('');
    }
  };

  const addHanderler = () => {
    let previousData = editData?.subjects ? editData.subjects.split(',') : [];
    let data = [...previousData, ...tags.tagsArray].toString();
    setFieldValue('subjects', data),
      tags.tagsArray.length > 0
        ? (setTags({tagsArray: []}), handleSubmit())
        : Toast.show('Please Enter Courses Name to ADD', Toast.SHORT);
  };
  const deleteHandler = id => {
    const filterData = data
      .filter(item => {
        return item.id !== id;
      })
      .map(value => {
        return value.subjects;
      })
      .join(',');
    setFieldValue('subjects', filterData);
    handleSubmit();
    setModalVisible(!modalVisible);
  };
  const renderItem = (item, index) => {
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
              {item.subjects}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(item.id);
              setModalVisible(!modalVisible);
            }}
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign
              name="delete"
              size={17}
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
                    Do you wish to delete the Item?
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
    <View style={{marginTop: scale(10), marginBottom: scale(10)}}>
      <Text style={styles.formInputData}>
        Add Topics or Subjects Covered in the Training
      </Text>
      <Text style={styles.bodyText}>
        Enter all relevant Topics or Subjects Covered as a part of your training
        using a comma to separate.
      </Text>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.formInputTitle}>Topics or Subjects Covered</Text>
        <View style={{flexDirection: 'row', marginHorizontal: scale(-10)}}>
          <TagInput
            updateState={updateTagState}
            tags={tags}
            placeholder="Enter"
            tagStyle={{
              backgroundColor: '#E5E5E5',
              borderColor: '#E5E5E5',
              justifyContent: 'center',
              height: scale(30),
            }}
            tagTextStyle={{color: '#4A4A4A'}}
            autoCorrect={false}
            keysForTag={','}
            inputStyle={{color: '#4A4A4A'}}
            inputContainerStyle={{
              height: scale(50),
              borderColor: '#C3D0DE',
              borderWidth: scale(1),
              marginTop: scale(8),
              borderRadius: scale(5),
            }}
          />
        </View>
        {errorMessage !== '' ? (
          <Text style={{color: 'red', marginLeft: scale(10)}}>
            {errorMessage}
          </Text>
        ) : null}
        <CustomButton
          onPress={addHanderler}
          borderradius={scale(5)}
          style={{
            width: '20%',
            marginTop: scale(20),
            height: scale(40),
          }}
          bgcolor={'#FFFFFF'}
          borderradiuscolor={'#349beb'}
          borderwidth={1}>
          <Text
            style={{
              fontSize: scale(16),
              fontFamily: 'SourceSansPro-SemiBold',
              color: '#10A0DA',
            }}>
            ADD
          </Text>
        </CustomButton>
        {data.map((item, index) => {
          return renderItem(item, index);
        })}
      </View>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: scale(20),

          padding: scale(10),
          borderRadius: scale(5),
          backgroundColor: '#FFFFFF',
          borderColor: '#349beb',
          borderWidth: 1,
        }}
        disabled={false}
        onPress={courseToggle}>
        <Text
          style={{
            fontSize: scale(16),
            fontFamily: 'SourceSansPro-SemiBold',
            color: '#10A0DA',
          }}>
          SAVE & NEXT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = null;

const mapDispatchToProps = {
  // sendEducationData: (authToken, payload, beneficiaryId) =>
  //   sendEducationInfo(authToken, payload, beneficiaryId),
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicsCovered);
