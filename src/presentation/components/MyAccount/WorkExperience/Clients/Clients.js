import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { scale } from "../../../../../Infrastructure/utils/screenUtility";
import Loader from "../../../../../Infrastructure/component/Loader/Loader";
import { connect } from "react-redux";
import * as yup from "yup";
import Toast from "react-native-simple-toast";
import {
  CustomInput,
  CustomButton,
} from "../../../../../Infrastructure/component/Custom";
import {
  getBeneficiaryUserID,
  getAuthToken,
} from "../../../../../Infrastructure/utils/storageUtility";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFormik } from "formik";
import { updateWorkDetails } from "../../../../../application/store/actions/student";
import { ExperienceDetails } from "../../../../../application/store/actions/student";
const validationSchema = yup.object().shape({
  clientName: yup.string().nullable().required("Client Name Required"),
  startDate: yup.string().nullable().required("Employed From Required"),
});
const Clients = (props) => {
  // console.log(props, "props");
  const reducer = props?.ExperienceList?.data
    ? props?.ExperienceList?.data
    : null;
  const filterData = reducer.filter((item) => item.id === props.routeData);
  // console.log(filterData[0], "filtered_____________");
  const routeData = filterData[0];
  console.log(routeData, "routeData");
  const [loading, setLoading] = useState(false);
  const [startdate, setStartdate] = useState(new Date());
  const [emptystartDate, setEmptystartDate] = useState("");
  const [startdateShow, setStartdateShow] = useState(false);
  const startdateformat = moment(startdate).format("MM/DD/YYYY");
  const startdateToShow = () => {
    setStartdateShow(true);
  };
  const onChangeStartYear = (type, selectedDate) => {
    Platform.OS === "ios" ? null : setStartdateShow(false);
    setStartdate(selectedDate);
    setFieldValue("startDate", moment(selectedDate).format("YYYY-MM-DD"));
    setEmptystartDate(selectedDate);
  };

  const [endateShow, setEndateShow] = useState(false);
  const [emptyendDate, setEmptyendDate] = useState("");
  const [enddate, setEnddate] = useState(new Date());
  const enddateformat = moment(enddate).format("MM/DD/YYYY");
  const endate = () => {
    setEndateShow(true);
  };
  const onChangeEndYear = (type, selectedDate) => {
    Platform.OS === "ios" ? null : setEndateShow(false);
    setEnddate(selectedDate);
    setFieldValue("endDate", moment(selectedDate).format("YYYY-MM-DD"));
    setEmptyendDate(selectedDate);
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
    handleReset,
  } = useFormik({
    initialValues: {
      clientName: "",
      endDate: "",
      startDate: "",
    },
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => formSubmitHandler(values),
    validationSchema,
  });
  const formSubmitHandler = async (formData) => {
    console.log(formData.startDate, "startDate from formik");
    console.log(formData.endDate, "endDate from formik");
    let EndDate =
      formData.endDate !== ""
        ? moment(formData.endDate).format("YYYY-MM-DD")
        : null;
    console.log(EndDate, "date___________");
    const prepayload = {
      id: null,
      clientName: formData.clientName,
      startDate: formData.startDate,
      endDate: EndDate,
      clientCompanyId: null,
      selected: false,
    };
    const addClient = [...routeData.clients];
    addClient.push(prepayload);
    submit(addClient);
  };

  const submit = async (clients) => {
    let token = await getAuthToken();
    let beneficiaryID = await getBeneficiaryUserID();
    const payload = {
      workExpDetailsReq: [
        {
          id: routeData?.id || null,
          addressLine1: routeData?.addressLine1 || null,
          addressLine2: routeData?.addressLine2 || null,
          city: routeData?.city || null,
          companyName: routeData?.companyName || null,
          employmentType: routeData?.employmentType?.code || null,
          country: routeData?.countryCode || null,
          countryCode: routeData?.countryCode || null,
          currency: routeData?.currency || null,
          designation: routeData?.designation || null,
          isCurrentRole: routeData?.isCurrentRole || null,
          mobileCountryCode: null,
          mobileNo: null,
          officeCountryCode: routeData?.officeCountryCode?.countryCode || null,
          officeNo: routeData?.officeNo || null,
          salary: routeData?.salary || null,
          startDate: routeData?.startDate || null,
          endDate: routeData?.endDate || null,
          stateProvinceCode: routeData?.stateProvinceCode || null,
          stateProvinceName: routeData?.stateProvinceName || null,
          workExpDetailId: routeData?.id || null,
          zipCode: routeData?.zipCode || null,
          duty: null,
          subDutyDescription: null,
          skillName: null,
          jobDuties: routeData?.jobDuties || null,
          tools: routeData?.tools || null,
          clients: clients,
        },
      ],
    };
    console.log(payload, "payload");
    setLoading(true);
    props
      .saveWorkDetails(token, beneficiaryID, payload)
      .then(async (res) => {
        Toast.show(res.message, Toast.LONG);
        setLoading(true);
        props
          .getExperience(token, beneficiaryID)
          .then(async (res) => {
            handleReset();
            setEmptystartDate("");
            setEmptyendDate("");
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

  const deleteHandler = (id) => {
    const tempArra = routeData.clients;
    const filtered = tempArra.filter((item) => item.id !== id);
    submit(filtered);
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
              {item.clientName}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#898989",
                  fontSize: scale(12),
                  fontFamily: "SourceSansPro-Regular",
                }}
              >
                {moment(item.startDate).format("ll")}
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
          <TouchableOpacity
            onPress={() => deleteHandler(item.id)}
            style={{
              flex: 0.3,
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "green",
            }}
          >
            <AntDesign
              name="delete"
              size={17}
              style={{
                color: "#00A8DB",
                // marginBottom: scale(10),
              }}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <View style={styles.container}>
      <Loader status={loading} />
      <View>
        <View style={{ flexDirection: "row", marginTop: scale(10) }}>
          <Text style={styles.textHead}>
            Client name<Text style={{ color: "red" }}>*</Text>
          </Text>
        </View>
        <CustomInput
          multiline
          // numberOfLines={4}
          name="clientName"
          placeholder="Ex: Associate Human Factor Professional (AEP)"
          placeholderTextColor="#4D4F5C"
          value={values.clientName}
          autoCorrect={false}
          onBlur={handleBlur("clientName")}
          onChangeText={handleChange("clientName")}
          style={{ height: 80, marginTop: scale(6) }}
        />
        {touched.clientName && errors.clientName && (
          <Text style={styles.errorMessage}>{errors.clientName}</Text>
        )}
      </View>

      <View style={{ flexDirection: "row", flex: 1, marginTop: scale(5) }}>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            marginRight: scale(5),
          }}
        >
          <Text style={styles.text}>
            From<Text style={{ color: "red" }}>*</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              startdateToShow();
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                name="date"
                placeholder="Select"
                placeholderTextColor="#4D4F5C"
                value={emptystartDate === "" ? "" : startdateformat}
                editable={false}
                autoCorrect={false}
                onBlur={handleBlur("from")}
                onChangeText={handleChange("from")}
                style={{
                  marginTop: scale(5),
                  borderRadius: 4,
                  borderColor: "#C3D0DE",
                  borderWidth: 1,
                  height: scale(40),
                  fontSize: scale(14),
                  fontFamily: "SourceSansPro-Regular",
                  paddingHorizontal: scale(10),
                  color: "#4D4F5C",
                  flex: 1,
                }}
              />
              <AntDesign
                name="calendar"
                size={20}
                style={{
                  position: "absolute",
                  right: scale(10),
                  color: "grey",
                }}
              />
            </View>
            {touched.startDate && errors.startDate && (
              <Text style={styles.errorMessage}>{errors.startDate}</Text>
            )}
          </TouchableOpacity>
          {startdateShow && (
            <DateTimePicker
              testID="dateTimePicker"
              value={startdate}
              mode="date"
              // maximumDate={new Date(enddateformat)}
              onChange={onChangeStartYear}
              style={{
                accentColor: "red",
                textColor: "red",
              }}
              themeVariant="dark"
              textColor="blue"
            />
          )}
        </View>
        <View
          style={{ flexDirection: "column", flex: 1, marginLeft: scale(5) }}
        >
          <Text style={styles.text}>
            To<Text style={{ color: "red" }}></Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              endate();
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                name="date"
                placeholder="Select"
                placeholderTextColor="#4D4F5C"
                value={emptyendDate === "" ? "" : enddateformat}
                editable={false}
                autoCorrect={false}
                onBlur={handleBlur("to")}
                onChangeText={handleChange("to")}
                style={{
                  marginTop: scale(5),
                  borderRadius: 4,
                  borderColor: "#C3D0DE",
                  borderWidth: 1,
                  height: scale(40),
                  fontSize: scale(14),
                  fontFamily: "SourceSansPro-Regular",
                  paddingHorizontal: scale(10),
                  color: "#4D4F5C",
                  flex: 1,
                }}
              />
              <AntDesign
                name="calendar"
                size={20}
                style={{
                  position: "absolute",
                  right: scale(10),
                  color: "grey",
                }}
              />
            </View>
          </TouchableOpacity>
          {endateShow && (
            <DateTimePicker
              testID="dateTimePicker"
              value={enddate}
              mode="date"
              onChange={onChangeEndYear}
              minimumDate={new Date(startdateformat)}
              style={{
                accentColor: "red",
                textColor: "red",
              }}
              themeVariant="dark"
              textColor="blue"
            />
          )}
        </View>
      </View>

      <View style={{ marginTop: scale(10) }}>
        <CustomButton
          borderradius="4px"
          bgcolor="#fff"
          borderradiuscolor="#00A0DA"
          borderwidth="1px"
          height="28px"
          width="88px"
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={{ ...styles.text, color: "#00A0DA" }}>ADD CLIENT</Text>
        </CustomButton>
      </View>
      {routeData.clients.map((item, index) => {
        return renderItem(item, index);
      })}
      <View style={{ marginTop: scale(10) }}>
        <CustomButton
          borderradius="4px"
          bgcolor="#fff"
          borderradiuscolor="#00A0DA"
          borderwidth="1px"
          height="40px"
          width="100%"
          onPress={props.toggleAccordion}
        >
          <Text
            style={{
              fontFamily: "SourceSansPro-SemiBold",
              fontSize: scale(16),
              color: "#4D4F5C",
              color: "#00A0DA",
            }}
          >
            SAVE & NEXT
          </Text>
        </CustomButton>
      </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Clients);
