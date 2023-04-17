import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { scale } from "../../../../../Infrastructure/utils/screenUtility";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import {
  fetchImmigratationStatus,
  updateImmigratationStatus,
  fetchImmigratationSelf,
} from "../../../../../application/store/actions/student";
import { connect } from "react-redux";
import {
  getAuthToken,
  getBeneficiaryUserID,
} from "../../../../../Infrastructure/utils/storageUtility";
import Toast from "react-native-simple-toast";
import Loader from "../../../../../Infrastructure/component/Loader/Loader";
import { Checkbox } from "react-native-paper";
import { CustomInput } from "../../../../../Infrastructure/component/Custom";
import Immigration from "../index";

const VisaValidationSchema = yup.object().shape({
  alienRegNo: yup.string().when("hasNonImmVisa", {
    is: (credential) => credential === false,
    then: yup.string().when("hasAlienRegnNo", {
      is: (credential) => credential === false,
      then: yup.string().required("Field Required"),
    }),
  }),
});
const ImmigrationVisa = (props) => {
  const navigation = useNavigation();
  const [immigrationID, setimmigrationID] = useState(
    props?.route?.params?.item?.id ? props?.route?.params?.item?.id : null
  );
  let hasNonImmVisaconvert = !Boolean(
    props?.immigratationStatus?.data?.hasNonImmVisa
  );
  let hasAlienRegnNocheckbox = !Boolean(
    props?.immigratationStatus?.data?.hasAlienRegnNo
  );

  const [status, setStatus] = useState(false);
  const [immigrationstatus, setImmigrationstatus] = useState(true);

  const [toggleCheckBox, setToggleCheckBox] = useState(
    hasNonImmVisaconvert || false
  );
  const [apptoggleCheckBox, setApptoggleCheckBox] = useState(
    hasAlienRegnNocheckbox || false
  );
  const [buttonHide, setButtonHide] = useState(true);
  const immigrantVisaHandler = async (formData) => {
    const token = await getAuthToken();
    const beneficiaryId = await getBeneficiaryUserID();
    const payload = {
      alienRegNo: formData.hasNonImmVisa ? null : formData.alienRegNo,
      hasAlienRegnNo: formData.hasAlienRegnNo ? 0 : 1,
      hasNonImmVisa: formData.hasNonImmVisa ? 0 : 1,
    };

    await props
      .sendImmigrationData(token, beneficiaryId, payload)
      .then((res) => {
        console.log("sendImigrationData-erro", res);
        Toast.show(res.message);
        immigrationID === null ? setButtonHide(false) : null;
        // setImmigrationstatus(!immigrationstatus);
        // setToggleCheckBox(!toggleCheckBox);
        props
          .getImigrationData(token, beneficiaryId)
          .then((res) => {
            console.log("getImigrationData---res", res.data);
            res.data.hasNonImmVisa === 1
              ? setImmigrationstatus(false)
              : navigation.goBack();
            setStatus(false);
          })
          .catch((e) => {
            setStatus(false);
            // console.log("getImigrationData-erro", e);
          });
        props
          .getImmigratation(token, beneficiaryId)
          .then(async (res) => {
            // console.log("ImmigratationList", res.data);
            setStatus(false);
          })
          .catch((e) => {
            console.log("error", e);
            setStatus(false);
          });
      })
      .catch((error) => {
        setStatus(false);
        Toast.show(error.message ? error.message : "Something went wrong");
        // console.log("SendaEduData-Error--------", error);
      });
  };
  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, backgroundColor: "#ffff" }}
        >
          <Loader status={status} />

          <Formik
            initialValues={{
              alienRegNo: props?.immigratationStatus?.data?.alienRegNo
                ? props?.immigratationStatus?.data?.alienRegNo
                : "",
              hasNonImmVisa: toggleCheckBox || false,
              hasAlienRegnNo: apptoggleCheckBox || false,
            }}
            enableReinitialize={true}
            validateOnBlur={true}
            validateOnChange={true}
            onSubmit={(values) => immigrantVisaHandler(values)}
            validationSchema={VisaValidationSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
              setFieldValue,
            }) => (
              <View style={{ marginHorizontal: scale(10) }}>
                <View style={{ marginTop: scale(10) }}>
                  <Text
                    style={{
                      fontSize: scale(16),
                      color: "#4D4F5C",
                      fontFamily: "SourceSansPro-SemiBold",
                    }}
                  >
                    Enter the Non- Immigrant visa info to begin
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.checkboxcontainer,
                  }}
                >
                  <Checkbox.Android
                    name="checkbox"
                    status={toggleCheckBox ? "checked" : "unchecked"}
                    color="#0D89CF"
                    uncheckedColor="#0D89CF"
                    onPress={() => {
                      setToggleCheckBox(!toggleCheckBox);
                      setFieldValue("hasNonImmVisa", !toggleCheckBox);
                    }}
                    // disabled={immigrationstatus ? false : true}
                  />
                  <Text
                    style={{
                      fontSize: scale(15),
                      color: "#4D4F5C",
                      fontFamily: "SourceSansPro-Regular",
                    }}
                  >
                    I never applied for any non-immigrant Visa
                  </Text>
                </View>
                {toggleCheckBox === true ? (
                  <View>
                    <Text
                      style={{
                        fontSize: scale(15),
                        color: "#24262F",
                        fontFamily: "SourceSansPro-Regular",
                        marginBottom: scale(20),
                      }}
                    >
                      Thank you for your response. You do not have to enter any
                      further details.
                    </Text>
                  </View>
                ) : (
                  <>
                    <View
                      style={{ flexDirection: "column", marginTop: scale(5) }}
                    >
                      <Text
                        style={{
                          fontSize: scale(15),
                          color: "#24262F",
                          fontFamily: "SourceSansPro-Regular",
                          marginBottom: scale(10),
                        }}
                      >
                        Do you have an Alien Registration Number?
                        <Text style={{ color: "red" }}>*</Text>
                      </Text>
                      <CustomInput
                        name="alienRegNo"
                        placeholder="Alien Registration Number (A-Number)"
                        placeholderTextColor="#B4BECA"
                        value={values.alienRegNo}
                        onBlur={handleBlur("alienRegNo")}
                        onChangeText={handleChange("alienRegNo")}
                        editable={
                          toggleCheckBox || apptoggleCheckBox ? false : true
                        }
                        backgroundColor={
                          toggleCheckBox || apptoggleCheckBox ? "#C3D0DE" : null
                        }
                      />
                      {touched.alienRegNo && errors.alienRegNo && (
                        <Text style={{ color: "red" }}>
                          {errors.alienRegNo}
                        </Text>
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: scale(20),
                      }}
                    >
                      <Checkbox.Android
                        name="checkbox"
                        status={apptoggleCheckBox ? "checked" : "unchecked"}
                        color="#0D89CF"
                        uncheckedColor="#0D89CF"
                        onPress={() => {
                          setApptoggleCheckBox(!apptoggleCheckBox),
                            setFieldValue("hasAlienRegnNo", !apptoggleCheckBox);
                        }}
                        // disabled={
                        //   toggleCheckBox || !immigrationstatus ? true : false
                        // }
                      />
                      <Text
                        style={{
                          fontSize: scale(14),
                          color: "#4D4F5C",
                          fontFamily: "SourceSansPro-Regular",
                        }}
                      >
                        Not Applicable
                      </Text>
                    </View>
                  </>
                )}
                {/* {!immigrationstatus ? null : ( */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop:
                      immigrationID !== null
                        ? 0
                        : buttonHide
                        ? toggleCheckBox === true
                          ? scale(400)
                          : scale(325)
                        : 0,
                  }}
                >
                  <View style={{ flex: 2 }}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: scale(10),
                        borderRadius: scale(4),
                        backgroundColor: "#B4BECA",
                        // marginTop: scale(400),
                        marginRight: scale(10),
                      }}
                      disabled={false}
                      onPress={() => {
                        navigation.goBack();
                      }}
                    >
                      <Text
                        style={{
                          fontSize: scale(16),
                          fontFamily: "SourceSansPro-SemiBold",
                          color: "#FFFFFF",
                        }}
                      >
                        CANCEL
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 3 }}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: scale(10),
                        borderRadius: scale(4),
                        backgroundColor: "#349beb",
                        // marginTop: scale(400),
                      }}
                      disabled={false}
                      onPress={handleSubmit}
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
                </View>
                {/* )} */}
              </View>
            )}
          </Formik>
          {!immigrationstatus || immigrationID !== null ? (
            <Immigration immigratationId={immigrationID} />
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const mapStateToProps = ({ studentReducer: { immigratationStatus } }) => ({
  immigratationStatus,
});

const mapDispatchToProps = {
  sendImmigrationData: (authToken, beneficiaryId, payload) =>
    updateImmigratationStatus(authToken, beneficiaryId, payload),
  getImigrationData: (authToken, beneficiaryId) =>
    fetchImmigratationStatus(authToken, beneficiaryId),
  getImmigratation: (token, beneficiaryId) =>
    fetchImmigratationSelf(token, beneficiaryId),
};

export default connect(mapStateToProps, mapDispatchToProps)(ImmigrationVisa);
