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
import {
  getBeneficiaryUserID,
  getAuthToken,
} from "../../../../../Infrastructure/utils/storageUtility";
import Toast from "react-native-simple-toast";
import moment from "moment";
import Loader from "../../../../../Infrastructure/component/Loader/Loader";
import {
  fetchImmigratationSelf,
  deleteImmigratationSelf,
} from "../../../../../application/store/actions/student";
const ListView = (props) => {
  const immigratationList = props?.immigratationList?.data
    ? props.immigratationList.data
    : 0;
  console.log(
    immigratationList,
    "immigratationListimmigratationListimmigratationListimmigratationListimmigratationList"
  );
  const navigation = useNavigation();
  const [status, setStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

  const deleteHandler = async () => {
    console.log(deleteID, "id");
    let token = await getAuthToken();
    let beneficiaryID = await getBeneficiaryUserID();
    setStatus(true);
    props
      .deleteImmigratation(token, beneficiaryID, deleteID)
      .then(async (res) => {
        Toast.show(res.message, Toast.LONG);
        setStatus(true);
        props
          .getImmigratation(token, beneficiaryID)
          .then(async (res) => {
            setModalVisible(!modalVisible);
            setStatus(false);
          })
          .catch((e) => {
            console.log("error", e);
            setStatus(false);
          });
      })
      .catch((e) => {
        console.log("error", e);
        setStatus(false);
      });
  };

  const model = (id) => {
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
              {item.clientName ? item.clientName : "_ _"}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#898989",
                  fontSize: scale(12),
                  fontFamily: "SourceSansPro-Regular",
                }}
              >
                {item.startDate ? moment(item.startDate).format("ll") : "_ _"}
              </Text>
              <View style={{ marginRight: scale(25) }} />
              <Text
                style={{
                  color: "#898989",
                  fontSize: scale(12),
                  fontFamily: "SourceSansPro-Regular",
                }}
              >
                {item.endDate === null ? "" : moment(item.endDate).format("ll")}
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
            borderColor: "#D6D6D6",
            // height: scale(42),
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              paddingLeft: scale(15),
              marginTop: scale(8),
            }}
          >
            <View style={{ flex: 1 }}>
              <View>
                <Text style={styles.accordianBodyText}>Mode Of Travel</Text>
                <View style={{ marginBottom: scale(1) }} />
                <Text style={styles.yearText}>
                  {item.meansOfTravel ? item.meansOfTravel : "--"}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.accordianBodyText}>Port</Text>
              <View style={{ marginBottom: scale(1) }} />
              <Text style={styles.yearText}>
                {item.portOfEntry ? item.portOfEntry : "--"}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              paddingLeft: scale(15),
              marginTop: scale(8),
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.accordianBodyText}>Arrival Date</Text>
              <View style={{ marginBottom: scale(1) }} />
              <Text style={styles.yearText}>
                {item.arrivalDate
                  ? moment(item.arrivalDate).format("ll")
                  : "--"}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.accordianBodyText}>Exit Date</Text>
              <View style={{ marginBottom: scale(1) }} />
              <Text style={styles.yearText}>
                {item.exitDate ? moment(item.exitDate).format("ll") : "--"}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              paddingLeft: scale(15),
              marginVertical: scale(8),
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.accordianBodyText}>I94 Number</Text>
              <View style={{ marginBottom: scale(1) }} />
              <Text style={styles.yearText}>
                {item.i94Number ? item.i94Number : "--"}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.accordianBodyText}>I94 Expiry Date</Text>
              <View style={{ marginBottom: scale(1) }} />
              <Text style={styles.yearText}>
                {item.i94ExpiryDate
                  ? moment(item.i94ExpiryDate).format("ll")
                  : "--"}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  const renderDocumentItem = (item) => {
    return (
      <>
        <View
          key={item.id}
          style={{
            flex: 1,
            flexDirection: "row",
            height: scale(56),
            marginBottom: scale(5),
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              paddingLeft: scale(15),
            }}
          >
            <Text
              style={{
                fontSize: scale(14),
                color: "#24262F",
                fontFamily: "SourceSansPro-Regular",
              }}
            >
              {item.fileCategory.name}
            </Text>
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
        </View>
      </>
    );
  };
  const renderExperienceItem = (item) => {
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
            <Text style={styles.accordianBodyText}>Visa</Text>
            <View style={{ marginBottom: scale(7) }} />
            <Text style={styles.yearText}>
              {item.immigrationStatusCode ? item.immigrationStatusCode : "--"}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.accordianBodyText}>Petition</Text>
            <View style={{ marginBottom: scale(7) }} />
            <Text style={styles.yearText}>
              {item.petitionTypeCode ? item.petitionTypeCode : "--"}
            </Text>
          </View>
        </View>
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
              marginTop: scale(15),
            }}
          >
            <Text style={styles.accordianBodyText}>Petitioner Name</Text>
            <View style={{ marginBottom: scale(2) }} />
            <Text style={styles.yearText}>
              {item.companyName ? item.companyName : "--"}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            marginTop: scale(15),
            paddingLeft: scale(15),
          }}
        >
          <Text style={styles.accordianBodyText}>Receipt Number</Text>
          <View style={{ marginBottom: scale(2) }} />
          <Text style={styles.yearText}>
            {item.noticeNo ? item.noticeNo : "--"}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            marginTop: scale(15),
            paddingLeft: scale(15),
          }}
        >
          <Text style={styles.accordianBodyText}>Receipt Date</Text>
          <View style={{ marginBottom: scale(2) }} />
          <Text style={styles.yearText}>
            {item.receiptDate ? moment(item.receiptDate).format("ll") : "--"}
          </Text>
        </View>
        <View
          style={{
            marginVertical: scale(8),
            width: "100%",
            borderColor: "#0000003D",
            borderWidth: scale(0.5),
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: scale(15),
          }}
        >
          <Text style={styles.accordianBodyText}>Approved Date</Text>
          <View style={{ marginBottom: scale(2) }} />
          <Text style={styles.yearText}>
            {item.outcomeDate ? moment(item.outcomeDate).format("ll") : "--"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: scale(56),
            marginTop: scale(15),
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
            <Text style={styles.accordianBodyText}>Validity Start Date</Text>
            <View style={{ marginBottom: scale(7) }} />
            <Text style={styles.yearText}>
              {item.validityStartDate
                ? moment(item.validityStartDate).format("ll")
                : "--"}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.accordianBodyText}>Validity End Date</Text>
            <View style={{ marginBottom: scale(7) }} />
            <Text style={styles.yearText}>
              {item.validityEndDate
                ? moment(item.validityEndDate).format("ll")
                : "--"}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: scale(56),
            marginTop: scale(15),
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
            <Text style={styles.accordianBodyText}>EAD Number</Text>
            <View style={{ marginBottom: scale(7) }} />
            <Text style={styles.yearText}>
              {item.eadNo ? item.eadNo : "--"}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.accordianBodyText}>SEVIS Number</Text>
            <View style={{ marginBottom: scale(7) }} />
            <Text style={styles.yearText}>
              {item.sevisNo ? item.sevisNo : "--"}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: scale(10),
            marginTop: scale(10),
          }}
        >
          <Text
            style={{
              fontSize: scale(16),
              color: "#4A4A4A",
              fontFamily: "SourceSansPro-Semibold",
            }}
          >
            Travel History
          </Text>
        </View>
        {item.travelInfo.length > 0 ? (
          item.travelInfo.map((i, index) => {
            return renderToolsItem(i, index);
          })
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: scale(10),
              marginVertical: scale(10),
            }}
          >
            <Text
              style={{
                color: "#505050",
                fontSize: scale(14),
                fontFamily: "SourceSansPro-Regular",
              }}
            >
              {"No Travel History"}
            </Text>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            marginLeft: scale(10),
            marginTop: scale(10),
          }}
        >
          <Text
            style={{
              fontSize: scale(16),
              color: "#4A4A4A",
              fontFamily: "SourceSansPro-Semibold",
            }}
          >
            List of Documents
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#EDF4FB",
            height: scale(56),
            marginTop: scale(5),
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
        </View>
        {item.documentList.length > 0 ? (
          item.documentList.map((item) => {
            return renderDocumentItem(item);
          })
        ) : (
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
              {"No Document Added."}
            </Text>
          </View>
        )}
      </>
    );
  };
  const renderItem = ({ item, index }) => {
    return (
      <>
        {index === 0 ? (
          <View style={styles.body}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: scale(5),
              }}
            >
              <Text style={styles.formInputTitle}>Current Visa Type</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Text style={styles.formInputTitle}>Visa Status</Text>
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
            title={
              item.immigrationStatusCode ? item.immigrationStatusCode : "--"
            }
            Studytitle={item.outcomeIdName ? item.outcomeIdName : "--"}
            data={renderExperienceItem(item)}
            style={{
              body: { marginHorizontal: scale(10) },
              titleContent: {
                marginLeft: scale(5),
                fontFamily: "SourceSansPro-Regular",
                fontSize: scale(13),
                color: "#505050",
                overflow: "hidden",
              },
              Studytitle: {
                marginLeft: scale(35),
                fontFamily: "SourceSansPro-Regular",
                fontSize: scale(13),
                color: "#505050",
                overflow: "hidden",
              },
            }}
            backgroundColor={index % 2 !== 0 ? "#F2F2F2" : null}
            edit={() =>
              navigation.navigate("ImmigrationVisa", {
                item: item,
                edit: true,
              })
            }
            deleteIcon={true}
            delete={() => model(item.id)}
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
                backgroundColor: "#00000040",
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
                      Confirm
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
                    Do you wish to remove this item?
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: scale(30) }}>
                    <TouchableOpacity
                      onPress={() => deleteHandler()}
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
                        Delete
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
    <View style={styles.container}>
      <View style={styles.bodycontainer}>
        <Loader status={status} />
        {immigratationList.length > 0 ? (
          <FlatList
            data={immigratationList}
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
        onPress={() => navigation.navigate("ImmigrationVisa")}
        style={{
          ...styles.button,
          backgroundColor: "#00A0DA",
        }}
        disabled={false}
      >
        <Text style={styles.buttontext}>ADD IMMIGRATION DETAILS</Text>
      </TouchableOpacity>
    </View>
  );
};
const mapStateToProps = ({ studentReducer: { immigratationList } }) => ({
  immigratationList,
});

const mapDispatchToProps = {
  deleteImmigratation: (token, beneficiaryId, immigrationId) =>
    deleteImmigratationSelf(token, beneficiaryId, immigrationId),
  getImmigratation: (token, beneficiaryId) =>
    fetchImmigratationSelf(token, beneficiaryId),
};
export default connect(mapStateToProps, mapDispatchToProps)(ListView);
