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
import DropDownPicker from "react-native-dropdown-picker";
import { CustomButton } from "../../../../../Infrastructure/component/Custom";
import { scale } from "../../../../../Infrastructure/utils/screenUtility";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import DocumentPicker from "react-native-document-picker";
import { deleteExperienceDoc } from "../../../../../application/store/actions/student";
import { ExperienceDetails } from "../../../../../application/store/actions/student";
import {
  getAuthToken,
  getBeneficiaryUserID,
} from "../../../../../Infrastructure/utils/storageUtility";
import { decode as atob, encode as btoa } from "base-64";
import RNFS from "react-native-fs";
import { baseURL } from "../../../../../application/config";
import Toast from "react-native-simple-toast";
import Loader from "../../../../../Infrastructure/component/Loader/Loader";
const RelatedDocument = (props) => {
  console.log(props, "props");
  const reducer = props?.ExperienceList?.data
    ? props.ExperienceList.data
    : null;
  console.log(reducer, "reducer");
  const filterData = reducer.filter((item) => item.id === props.routeData);
  console.log(filterData[0], "filtered_____________");
  const routeData = filterData[0];
  console.log(routeData, "routeData");

  const [status, setStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [educdoc, setEducdoc] = useState(
    props?.educdoctyp?.data
      ? props.educdoctyp.data.map((item) => {
          return {
            label: item.name,
            value: item.code,
          };
        })
      : null
  );
  const [singleFile, setSingleFile] = useState("");
  const docToShow = routeData.documents;

  console.log("doc to show______", docToShow);
  console.log("educationalInfo", props.educationalInfo);
  console.log("educationId", routeData);
  console.log("docToShow+++++++", docToShow);

  const selectOneFile = async () => {
    const authToken = await getAuthToken();
    const beneficiaryId = await getBeneficiaryUserID();
    const categoryName = `BENWEDOC`;
    const fileCategory = "EXPLTR";
    const entityId = props.routeData ? props.routeData : "";

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log("PickerRes", res);
      if (res[0].size >= 5000000) {
        Toast.show(
          "The file is too large to upload, please try a file with less than 5MB",
          Toast.LONG
        );
      } else {
        setStatus(true);
        let uri = decodeURI(res[0].uri);
        uri
          ? RNFS.readFile(uri, "base64").then(async (base64data) => {
              const binary = atob(base64data);
              let formData = new FormData();
              formData.append("file", {
                uri: uri,
                type: res[0].type,
                name: res[0].name,
                data: binary,
              });
              let resp = await fetch(
                `${baseURL}student/v1/document/beneficiary/${beneficiaryId}/category/${categoryName}/entity/${entityId}/fileCategory/${fileCategory}`,
                {
                  method: "post",
                  body: formData,
                  headers: {
                    "Content-Type": "multipart/form-data; ",
                    Authorization: `Bearer ${authToken}`,
                  },
                }
              );
              let responseJson = await resp.json();
              console.log("resAPI", responseJson);
              if (responseJson.status === 200) {
                console.log("responseJson", responseJson);
                Toast.show(`Document update successful`, Toast.SHORT);
                props
                  .getExperience(authToken, beneficiaryId)
                  .then(async (res) => {
                    console.log("workexperience", res);
                    setStatus(false);
                  })
                  .catch((e) => {
                    console.log("error", e);
                    setStatus(false);
                  });
                console.log("success");
                console.log("updatepic res", responseJson.data.profilePic);
              } else {
                console.log("false");
                setStatus(false);
                Toast.show("Failed to update Document", Toast.SHORT);
              }
            })
          : null;
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        //For Unknown Error
        alert("Unknown Error: " + JSON.stringify(err));
        throw err;
      }
    }
  };
  console.log("value", value);
  const navigation = useNavigation();

  const model = (id) => {
    setModalVisible(true);
    setDeleteID(id);
  };

  const deleteHandler = async () => {
    let token = await getAuthToken();
    let beneficiaryId = await getBeneficiaryUserID();
    let categoryName = `BENWEDOC`;
    let fileCategory = "EXPLTR";
    let fileId = deleteID;
    console.log("id", fileId, token, beneficiaryId, categoryName, fileCategory);
    // setStatus(true);
    props
      .deleteDocuments(token, beneficiaryId, categoryName, fileCategory, fileId)
      .then(async (res) => {
        Toast.show(res.message, Toast.LONG);
        setStatus(true);
        props
          .getExperience(token, beneficiaryId)
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

  const renderItem = (item) => {
    console.log("item", item);
    return (
      <>
        <View
          key={item.id}
          style={{
            flex: 1,
            flexDirection: "row",
            height: scale(56),
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              paddingLeft: scale(15),
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
          <TouchableOpacity
            onPress={() => model(item.id)}
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
          </TouchableOpacity>
        </View>
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
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  // justifyContent: "space-between",
                  // alignItems: "center",
                  // backgroundColor: "red",
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
                <Text>Do you wish to Delete the File?</Text>
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
      </>
    );
  };

  return (
    <>
      <Loader status={status} />
      <View style={styles.container}>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.formInputTitle}>Document Type</Text>
          <CustomButton
            borderradius={scale(5)}
            style={{
              width: "100%",
              marginTop: scale(8.5),
              height: scale(49),
            }}
            bgcolor={"#0000001F"}
            borderradiuscolor={"#C3D0DE"}
            borderwidth={scale(1)}
            disabled={false}
          >
            <Text
              style={{
                fontSize: scale(15),
                fontFamily: "SourceSansPro-Regular",
                color: "#4D4F5C",
              }}
            >
              Experience Letter
            </Text>
          </CustomButton>
          <Text style={styles.formInputTitle}>
            {singleFile[0]?.name ? singleFile[0]?.name : null}
          </Text>
          <View
            style={{
              flex: 1,
              // marginTop: scale(30),
              marginBottom: scale(40),
            }}
          >
            <CustomButton
              onPress={selectOneFile}
              borderradius={scale(5)}
              style={{
                width: "100%",
                marginTop: scale(8.5),
                height: scale(49),
              }}
              bgcolor={"#FFFFFF"}
              borderradiuscolor={"#10A0DA"}
              borderwidth={1}
              // disabled={value ? false : true}
              disabled={false}
            >
              <Text
                style={{
                  fontSize: scale(16),
                  fontFamily: "SourceSansPro-SemiBold",
                  color: "#10A0DA",
                }}
              >
                UPLOAD
              </Text>
            </CustomButton>
          </View>
          <View
            style={{
              flex: 1,
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
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.formInputTitle}>Actions</Text>
            </View>
          </View>
          {docToShow !== null ? (
            docToShow.map((item) => {
              return renderItem(item);
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
                {"No Document Added by you."}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("WorkExperience")}
          style={{
            ...styles.button,
            backgroundColor:
              // '#A2D3EA'
              "#00A0DA",
            marginTop: scale(50),
          }}
          disabled={false}
        >
          <Text
            style={{
              fontSize: scale(16),
              fontFamily: "SourceSansPro-SemiBold",
              color: "#FFFFFF",
            }}
          >
            SAVE
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const mapStateToProps = ({
  studentReducer: { ExperienceList, educdoctyp, educationalInfo },
}) => ({
  educdoctyp,
  educationalInfo,
  ExperienceList,
});
const mapDispatchToProps = {
  deleteDocuments: (token, beneficiaryId, categoryName, fileCategory, fileId) =>
    deleteExperienceDoc(
      token,
      beneficiaryId,
      categoryName,
      fileCategory,
      fileId
    ),
  getExperience: (token, beneficiaryId) =>
    ExperienceDetails(token, beneficiaryId),
};

export default connect(mapStateToProps, mapDispatchToProps)(RelatedDocument);
