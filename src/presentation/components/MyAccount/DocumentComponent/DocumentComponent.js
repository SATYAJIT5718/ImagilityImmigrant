import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { scale } from "../../../../Infrastructure/utils/screenUtility";
import styles from "./styles";
import { connect } from "react-redux";
import {
  getProfileDocInfo,
  relatedDocDelete,
} from "../../../../application/store/actions/student";
import { initialWindowMetrics } from "react-native-safe-area-context";
import {
  getAuthToken,
  getBeneficiaryUserID,
} from "../../../../Infrastructure/utils/storageUtility";
import AntDesign from "react-native-vector-icons/AntDesign";
import Loader from "../../../../Infrastructure/component/Loader/Loader";

const DocumentComponent = (props) => {
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [exDocToShow, setExDocToShow] = useState([]);
  const [eduDocToShow, setEduDocToShow] = useState([]);
  const [immDocToShow, setImmDocToShow] = useState([]);
  const [perDocToShow, setPerDocToShow] = useState([]);
  const renderItem = (item) => {
    return (
      <>
        <View
          key={item.id}
          style={{
            flexDirection: "row",
            height: scale(56),
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              paddingLeft: scale(18),
            }}
          >
            <Text style={styles.formInputTitle}>{item.fileCategory.name}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text style={styles.documentText}>{item.fileName}</Text>
          </View>
          {/* <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign
              name="delete"
              size={20}
              style={{
                color: "#00A8DB",
              }}
            />
          </TouchableOpacity> */}
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
                    Do you wish to Delete the Item?
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: scale(30) }}>
                    <TouchableOpacity
                      onPress={() => deleteHandler(item)}
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
  const init = async () => {
    setStatus(true);
    const token = await getAuthToken();
    const beneficiaryId = await getBeneficiaryUserID();
    await props
      .getProfileDoc(token, beneficiaryId)
      .then((res) => {
        setEduDocToShow(res.data.Education);
        setExDocToShow(res.data.Experience);
        setImmDocToShow(res.data.Immigration);
        setPerDocToShow(res.data.Personal);
        setStatus(false);
        console.log("doc-res-", res);
      })
      .catch((e) => {
        setStatus(false);
        console.log("e", e);
      });
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Loader status={status} />
      <View style={styles.container}>
        <View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#EDF4FB",
              height: scale(56),
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingLeft: scale(15),
                flexWrap: "wrap",
              }}
            >
              <Text style={styles.formInputTitle}>Document Type</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Text style={styles.formInputTitle}>Document Name</Text>
            </View>
            {/* <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.formInputTitle}>Actions</Text>
            </View> */}
          </View>
          <ScrollView>
            {eduDocToShow.length > 0
              ? eduDocToShow.map((item) => {
                  return renderItem(item);
                })
              : null}
            {exDocToShow.length > 0
              ? exDocToShow.map((item) => {
                  return renderItem(item);
                })
              : null}
            {immDocToShow.length > 0
              ? immDocToShow.map((item) => {
                  return renderItem(item);
                })
              : null}
            {perDocToShow.length > 0
              ? perDocToShow.map((item) => {
                  return renderItem(item);
                })
              : null}
            {eduDocToShow.length === 0 &&
            exDocToShow.length === 0 &&
            immDocToShow.length === 0 &&
            perDocToShow.length === 0 ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: scale(10),
                  marginTop: scale(10),
                }}
              >
                <Text
                  style={{
                    color: "#505050",
                    fontSize: scale(14),
                    fontFamily: "SourceSansPro-Regular",
                  }}
                >
                  {"No Document Added by you."}
                </Text>
              </View>
            ) : null}
          </ScrollView>
        </View>
      </View>
    </>
  );
};
const mapStateToProps = ({
  studentReducer: { educationalInfo, getProfileDoc },
}) => ({
  educationalInfo,
  getProfileDoc,
});
const mapDispatchToProps = {
  getProfileDoc: (authToken, beneficiaryId) =>
    getProfileDocInfo(authToken, beneficiaryId),
  DeleterelatedDoc: (
    authToken,
    beneficiaryId,
    categoryName,
    fileCategory,
    fileId
  ) =>
    relatedDocDelete(
      authToken,
      beneficiaryId,
      categoryName,
      fileCategory,
      fileId
    ),
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentComponent);
