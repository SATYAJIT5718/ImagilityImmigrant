import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import Loader from "../../../../../Infrastructure/component/Loader/Loader";
import { scale } from "../../../../../Infrastructure/utils/screenUtility";
import { useState, useRef } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import {
  CustomInput,
  CustomButton,
} from "../../../../../Infrastructure/component/Custom";
import {
  getBeneficiaryUserID,
  getAuthToken,
} from "../../../../../Infrastructure/utils/storageUtility";
import Toast from "react-native-simple-toast";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as yup from "yup";
import { updateWorkDetails } from "../../../../../application/store/actions/student";
import { ExperienceDetails } from "../../../../../application/store/actions/student";
const validationSchema = yup.object().shape({
  duty: yup.string().nullable().required("duty Required"),
});
const ListOfDuties = (props) => {
  const reducer = props?.ExperienceList?.data
    ? props.ExperienceList.data
    : null;
  const filterData = reducer.filter((item) => item.id === props.routeData);
  const routeData = filterData[0];
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState([
    { subDutyDescription: "", subDutyId: null, sequenceNo: null },
  ]);
  console.log(inputs, "inputs");
  const inputHandler = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].subDutyDescription = text;
    setInputs(_inputs);
  };
  const deleteHandler = (key) => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  };
  const addHandler = () => {
    const _inputs = [...inputs];
    _inputs.push({ subDutyDescription: "", subDutyId: null, sequenceNo: null });
    setInputs(_inputs);
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
            borderColor: "#D6D6D6",
            // height: scale(42),
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 0.3,
              marginTop: scale(5),
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
              marginTop: scale(5),
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
              {item.duty}
            </Text>
            {item.subDuties.map((item, index) => (
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    marginTop: scale(5),
                    color: "#898989",
                    fontSize: scale(12),
                    fontFamily: "SourceSansPro-Regular",
                  }}
                >
                  {item.subDutyDescription}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            onPress={() => deleteJobItem(item.dutyId)}
            style={{
              flex: 0.3,
              marginTop: scale(5),
              alignItems: "center",
            }}
          >
            <AntDesign
              name="delete"
              size={17}
              style={{
                color: "#00A8DB",
              }}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const deleteJobItem = (id) => {
    const tempArra = routeData.jobDuties;
    const filtered = tempArra.filter((item) => item.dutyId !== id);
    submit(filtered);
  };
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      duty: "",
    },
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => formSubmitHandler(values, routeData),
    validationSchema,
  });
  const formSubmitHandler = (values) => {
    const prepayload = {
      duty: values.duty,
      dutyId: 0,
      sequenceNo: 0,
      subDuties: inputs,
    };
    const addjob = [...routeData.jobDuties];
    addjob.push(prepayload);
    submit(addjob);
  };
  const submit = async (jobDuties) => {
    let token = await getAuthToken();
    let beneficiaryID = await getBeneficiaryUserID();
    const payload = {
      workExpDetailsReq: [
        {
          id: routeData?.id || null,
          addressLine1: routeData?.addressLine1 || null,
          addressLine2: routeData?.addressLine2 || null,
          beneficiaryWorkDetailId: null,
          city: routeData?.city || null,
          clients: routeData?.clients || null,
          companyName: routeData?.companyName || null,
          country: routeData?.countryCode || null,
          countryCode: routeData?.countryCode || null,
          currency: routeData?.currency || null,
          designation: routeData?.designation || null,
          employmentType: routeData?.employmentType?.code || null,
          endDate: routeData?.endDate || null,
          isCurrentRole: routeData?.isCurrentRole || null,
          jobDuties: jobDuties,
          mobileCountryCode: null,
          mobileNo: null,
          officeCountryCode: routeData?.officeCountryCode?.countryCode || null,
          officeNo: routeData?.officeNo || null,
          salary: routeData?.salary || null,
          skills: null,
          startDate: routeData?.startDate || null,
          stateProvinceCode: routeData?.stateProvinceCode || null,
          stateProvinceName: routeData?.stateProvinceName || null,
          tools: routeData?.tools || null,
          workCompanyId: null,
          workExpDetailId: routeData?.id || null,
          zipCode: routeData?.zipCode || null,
        },
      ],
    };
    setLoading(true);
    props
      .saveWorkDetails(token, beneficiaryID, payload)
      .then(async (res) => {
        Toast.show(res.message, Toast.LONG);
        values.duty = "";
        setInputs([
          { subDutyDescription: "", subDutyId: null, sequenceNo: null },
        ]);
        props
          .getExperience(token, beneficiaryID)
          .then(async (res) => {
            setLoading(false);
          })
          .catch((e) => {
            console.log("error", e);
            setLoading(false);
          });
      })
      .catch((e) => {
        console.log("error", e);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Loader status={loading} />
      <>
        <View style={{ flexDirection: "row", marginTop: scale(10) }}>
          <Text style={styles.textHead}>
            Duty<Text style={{ color: "red" }}>*</Text>
          </Text>
        </View>
        <CustomInput
          multiline
          // numberOfLines={4}
          name="duty"
          placeholder="Ex: Associate Human Factor Professional (AEP)"
          placeholderTextColor="#4D4F5C"
          value={values.duty}
          autoCorrect={false}
          onBlur={handleBlur("duty")}
          onChangeText={handleChange("duty")}
          style={{ height: 80, marginTop: scale(6) }}
        />
        {touched.duty && errors.duty && (
          <Text style={styles.errorMessage}>{errors.duty}</Text>
        )}
        <View style={{ flexDirection: "row", marginTop: scale(10) }}>
          <Text style={styles.textHead}>
            Sub Duty<Text style={{ color: "red" }}></Text>
          </Text>
        </View>
        {inputs.map((input, key) => (
          <>
            <CustomInput
              multiline
              // numberOfLines={4}
              name="subduty"
              placeholder="Ex: Associate Human Factor Professional (AEP)"
              placeholderTextColor="#4D4F5C"
              value={input.subDutyDescription}
              onChangeText={(text) => inputHandler(text, key)}
              autoCorrect={false}
              style={{ height: 80, marginTop: scale(6) }}
            />
            {key > 0 ? (
              <TouchableOpacity onPress={() => deleteHandler(key)}>
                <View
                  style={{
                    alignItems: "flex-end",
                  }}
                >
                  <View
                    style={{
                      alignItems: "flex-end",
                      flexDirection: "row",
                      alignItems: "center",
                      borderBottomEndRadius: scale(5),
                      borderBottomStartRadius: scale(5),
                      backgroundColor: "#FFFFFF",
                      borderColor: "#00A0DA",
                      borderWidth: 1,
                      padding: scale(2),
                    }}
                  >
                    <AntDesign
                      name="close"
                      size={14}
                      style={{
                        color: "#00A8DB",
                      }}
                    />
                    <Text
                      style={{
                        color: "#00A8DB",
                        fontSize: scale(14),
                        fontFamily: "SourceSansPro-Regular",
                      }}
                    >
                      Remove
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ) : null}
          </>
        ))}
        <View style={{ marginTop: scale(10) }}>
          <TouchableOpacity onPress={addHandler}>
            <Text style={{ ...styles.text, color: "#00A0DA" }}>
              +Add more sub-duty
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: scale(10) }}>
          <CustomButton
            borderradius="4px"
            bgcolor="#fff"
            borderradiuscolor="#00A0DA"
            borderwidth="1px"
            height="28px"
            width="70px"
            onPress={handleSubmit}
          >
            <Text style={{ ...styles.text, color: "#00A0DA" }}>ADD</Text>
          </CustomButton>
        </View>
        {routeData.jobDuties.map((item, index) => {
          return renderItem(item, index);
        })}
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: scale(20),
            padding: scale(10),
            borderRadius: scale(5),
            backgroundColor: "#FFFFFF",
            borderColor: "#00A0DA",
            borderWidth: 1,
          }}
          disabled={false}
          onPress={props.toggleAccordion}
        >
          <Text
            style={{
              fontSize: scale(16),
              fontFamily: "SourceSansPro-SemiBold",
              color: "#10A0DA",
            }}
          >
            SAVE & NEXT
          </Text>
        </TouchableOpacity>
      </>
      {/* )}
      </Formik> */}
    </View>
  );
};
const mapStateToProps = ({ studentReducer: { ExperienceList } }) => ({
  ExperienceList,
});

const mapDispatchToProps = {
  saveWorkDetails: (token, beneficiaryId, payload) =>
    updateWorkDetails(token, beneficiaryId, payload),
  getExperience: (token, beneficiaryId) =>
    ExperienceDetails(token, beneficiaryId),
};
export default connect(mapStateToProps, mapDispatchToProps)(ListOfDuties);
