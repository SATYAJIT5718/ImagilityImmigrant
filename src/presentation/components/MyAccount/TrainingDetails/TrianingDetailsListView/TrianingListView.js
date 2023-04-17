import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { scale } from "../../../../../Infrastructure/utils/screenUtility";
import LifeCycleAccordion from "../../../../../Infrastructure/component/lifeCycleAccordion/LifeCycleAccordion";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";
import {
  getAuthToken,
  getBeneficiaryUserID,
} from "../../../../../Infrastructure/utils/storageUtility";
import Loader from "../../../../../Infrastructure/component/Loader/Loader";
import {
  getTrainingInfo,
  deleteTrainingInfo,
} from "../../../../../application/store/actions/student";
import Toast from "react-native-simple-toast";
const TrianingListView = (props) => {
  const navigation = useNavigation();
  const [status, setStatus] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const trainingData = props.trainingInfo?.data?.profEducation
    ? props.trainingInfo.data.profEducation
    : [];
  const deleteHandler = async (id) => {
    const authToken = await getAuthToken();
    const beneficiaryId = await getBeneficiaryUserID();
    const professionalId = id;
    const type = `Training`;
    setStatus(true);
    await props
      .deleteTrainingData(authToken, beneficiaryId, professionalId, type)
      .then((res) => {
        props
          .getTrainindData(authToken, beneficiaryId)
          .then((res) => {
            setStatus(false);
            setModalVisible(!modalVisible);
            console.log("getTrainindData---res", res.data);
          })
          .catch((e) => {
            setStatus(false);
            console.log("getTrainindData-erro", e);
          });
        Toast.show(res.message, Toast.SHORT);
      })
      .catch((e) => {
        setStatus(false);
        console.log("Delete Error--", e);
      });
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
            borderColor: "#D6D6D6",
            height: scale(42),
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 0.3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#EDF4FB",
                height: scale(21),
                width: scale(22),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#4A4A4A",
                  fontSize: scale(14),
                  fontFamily: "SourceSansPro-SemiBold",
                }}
              >
                {index + 1}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                color: "#505050",
                fontSize: scale(14),
                fontFamily: "SourceSansPro-Regular",
              }}
            >
              {item.courseName ? item.courseName : "bjbbkk"}
            </Text>
          </View>
        </View>
      </>
    );
  };
  const renderEducationItem = (item) => {
    const data = item?.subjects
      ? item.subjects.split(",").map((item, index) => {
          return { id: index, courseName: item };
        })
      : [];

    const formateStartDate =
      item.startDate && item.startDate !== null
        ? moment(item.startDate).format("ll")
        : "--";
    const formateEndDate =
      item.endDate && item.endDate !== null
        ? moment(item.endDate).format("ll")
        : "--";
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            height: scale(56),
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: scale(15),
            }}
          >
            <Text style={styles.accordianBodyText}>Start Date</Text>
            <Text style={styles.yearText}>
              {formateStartDate ? formateStartDate : "--"}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.accordianBodyText}>End Date</Text>
            <Text style={styles.yearText}>
              {formateEndDate ? formateEndDate : "--"}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: scale(10),
            marginTop: scale(20),
          }}
        >
          <Text
            style={{
              fontSize: scale(16),
              color: "#505050",
              fontFamily: "SourceSansPro-Semibold",
            }}
          >
            Topics Covered
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
              borderColor: "#D6D6D6",
              height: scale(42),
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "flex-start",
                marginHorizontal: scale(10),
              }}
            >
              <Text
                style={{
                  color: "#505050",
                  fontSize: scale(14),
                  fontFamily: "SourceSansPro-Regular",
                }}
              >
                {"No Topics Added by you."}
              </Text>
            </View>
          </View>
        ) : null}
      </>
    );
  };
  const renderItem = ({ item, index }) => {
    return (
      <>
        {index === 0 ? (
          <View style={{ ...styles.body, paddingLeft: scale(15) }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: scale(20),
              }}
            >
              <Text style={styles.formInputTitle}>Training Name</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Text style={styles.formInputTitle}>Institute Name</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-end",
                paddingRight: scale(15),
              }}
            >
              <Text style={styles.formInputTitle}>Action</Text>
            </View>
          </View>
        ) : null}
        <View
          style={{
            paddingVertical: scale(5),
          }}
        >
          <LifeCycleAccordion
            title={item.name ? item.name : "--"}
            Studytitle={item.institution ? item.institution : "--"}
            data={renderEducationItem(item)}
            style={{
              body: { marginHorizontal: scale(10) },
              titleContent: {
                fontFamily: "SourceSansPro-Regular",
                fontSize: scale(13),
                color: "#505050",
                overflow: "hidden",
              },
              Studytitle: {
                marginLeft: scale(10),
                fontFamily: "SourceSansPro-Regular",
                fontSize: scale(13),
                color: "#505050",
                overflow: "hidden",
              },
            }}
            backgroundColor={index % 2 !== 0 ? "#F2F2F2" : null}
            edit={() =>
              navigation.navigate("TrainingDetails", {
                item: item,
                edit: true,
              })
            }
            deleteIcon={true}
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
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "#0000000D",
              }}
            >
              <View
                style={{
                  margin: scale(20),
                  backgroundColor: "#FFFFFF",
                  padding: scale(20),
                  shadowOpacity: 0.25,
                  elevation: 5,
                  height: scale(213),
                  width: scale(328),
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: scale(18),
                        color: "#4D4F5C",
                        fontFamily: "SourceSansPro-Semibold",
                      }}
                    >
                      Confirm Delete
                    </Text>

                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                      <AntDesign
                        name="close"
                        size={23}
                        style={{
                          color: "grey",
                          marginBottom: scale(10),
                        }}
                      />
                    </Pressable>
                  </View>
                  <View
                    style={{
                      marginVertical: scale(10),
                      borderBottomWidth: scale(1),
                      borderBottomColor: "#00000029",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: scale(16),
                      color: "#4D4F5C",
                      fontFamily: "SourceSansPro-Regular",
                    }}
                  >
                    Do you wish to Delete the File?
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: scale(30) }}>
                    <TouchableOpacity
                      onPress={() => deleteHandler(selectedItem)}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: scale(12),
                        borderRadius: scale(5),
                        backgroundColor: "#00A0DA",
                        width: "30%",
                      }}
                      disabled={false}
                    >
                      <Text
                        style={{
                          fontSize: scale(14),
                          fontFamily: "SourceSansPro-SemiBold",
                          color: "#FFFFFF",
                        }}
                      >
                        Confirm
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}
                      style={{
                        marginLeft: scale(30),
                        justifyContent: "center",
                        alignItems: "center",
                        padding: scale(12),
                        borderRadius: scale(5),
                        backgroundColor: "#EFEFEF",
                        width: "30%",
                      }}
                      disabled={false}
                    >
                      <Text
                        style={{
                          fontSize: scale(14),
                          fontFamily: "SourceSansPro-SemiBold",
                          color: "#656565",
                        }}
                      >
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
        <View style={styles.bodycontainer}>
          {trainingData.length > 0 ? (
            <FlatList
              data={trainingData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <View style={styles.noDataTextContainer}>
              <AntDesign
                name="warning"
                size={60}
                style={{
                  color: "grey",
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
        <TouchableOpacity
          onPress={() => navigation.navigate("TrainingDetails")}
          style={{
            ...styles.button,
            backgroundColor: "#00A0DA",
          }}
          disabled={false}
        >
          <Text style={styles.buttontext}>ADD TRAINING</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const mapStateToProps = ({ studentReducer: { trainingInfo } }) => ({
  trainingInfo,
});
const mapDispatchToProps = {
  deleteTrainingData: (authToken, beneficiaryId, professionalId, type) =>
    deleteTrainingInfo(authToken, beneficiaryId, professionalId, type),
  getTrainindData: (authToken, beneficiaryId) =>
    getTrainingInfo(authToken, beneficiaryId),
};

export default connect(mapStateToProps, mapDispatchToProps)(TrianingListView);
