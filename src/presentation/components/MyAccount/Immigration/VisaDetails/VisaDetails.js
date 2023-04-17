import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useEffect } from "react";
import styles from "./styles";
import { scale } from "../../../../../Infrastructure/utils/screenUtility";
import { useState, useRef } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Loader from "../../../../../Infrastructure/component/Loader/Loader";
import { connect } from "react-redux";
import { CustomInput } from "../../../../../Infrastructure/component/Custom";
import { RadioButton, Checkbox } from "react-native-paper";
import { useFormik } from "formik";
import * as yup from "yup";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { fetchStateList } from "../../../../../application/store/actions/student";

const VisaDetails = ({
  petitionList,
  routeData,
  vsaoutList,
  visatypeList,
  handleChange,
  handleBlur,
  handleSubmit,
  values,
  touched,
  errors,
  setFieldValue,
}) => {
  const [loading, setLoading] = useState(false);
  const [openVisa, setOpenVisa] = useState(false);
  const [visa, setVisa] = useState(
    routeData?.immigrationStatusCode ? routeData.immigrationStatusCode : ""
  );
  const [visaItems, setVisaItems] = useState(visatypeList?.data || null);
  const VisaList = [];
  visaItems
    ? visaItems.map((item) => {
        VisaList.push({
          label: item.desc,
          value: item.code,
        });
      })
    : null;
  const [openPetition, setOpenpetition] = useState(false);
  const [petition, setPetition] = useState(
    routeData?.petitionTypeCode ? routeData.petitionTypeCode : ""
  );
  const [petitionItems, setPetitionItems] = useState(petitionList?.data || "");
  const petitionData = [];
  petitionItems
    ? petitionItems.map((item) => {
        petitionData.push({
          label: item.desc,
          value: item.code,
        });
      })
    : null;
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
    setFieldValue("receiptDate", moment(selectedDate).format("YYYY-MM-DD"));
    setEmptystartDate(selectedDate);
  };

  const [approveddate, setApproveddate] = useState(new Date());
  const [emptyapprovedDate, setEmptyapprovedDate] = useState("");
  const [approveddateShow, setApproveddateShow] = useState(false);
  const approveddateformat = moment(approveddate).format("MM/DD/YYYY");
  const approveddateToShow = () => {
    setApproveddateShow(true);
  };
  const onChangeapprovedYear = (type, selectedDate) => {
    Platform.OS === "ios" ? null : setApproveddateShow(false);
    setApproveddate(selectedDate);
    setFieldValue("approveDate", moment(selectedDate).format("YYYY-MM-DD"));
    setEmptyapprovedDate(selectedDate);
  };

  const [validitydate, setValiditydate] = useState(new Date());
  const [emptyvalidityDate, setEmptyvalidityDate] = useState("");
  const [validitydateShow, setValiditydateShow] = useState(false);
  const validitydateformat = moment(validitydate).format("MM/DD/YYYY");
  const validitydateToShow = () => {
    setValiditydateShow(true);
  };
  const onChangevalidityYear = (type, selectedDate) => {
    Platform.OS === "ios" ? null : setValiditydateShow(false);
    setValiditydate(selectedDate);
    setFieldValue(
      "validityStartDate",
      moment(selectedDate).format("YYYY-MM-DD")
    );
    setEmptyvalidityDate(selectedDate);
  };

  const [validityenddate, setValidityenddate] = useState(new Date());
  const [emptyvalidityendDate, setEmptyvalidityendDate] = useState("");
  const [validityenddateShow, setValidityenddateShow] = useState(false);
  const validityenddateformat = moment(validityenddate).format("MM/DD/YYYY");
  const validityenddateToShow = () => {
    setValidityenddateShow(true);
  };
  const onChangevalidityendYear = (type, selectedDate) => {
    Platform.OS === "ios" ? null : setValidityenddateShow(false);
    setValidityenddate(selectedDate);
    setFieldValue("validityEnddate", moment(selectedDate).format("YYYY-MM-DD"));
    setEmptyvalidityendDate(selectedDate);
  };

  const [toggleCheckBoxead, setToggleCheckBoxead] = useState(
    routeData?.isEadNo ? routeData.isEadNo : false
  );
  const [toggleCheckBoxsevis, setToggleCheckBoxsevis] = useState(
    routeData?.isSevisNo ? routeData.isSevisNo : false
  );
  const [toggleCheckBoxus, setToggleCheckBoxus] = useState(
    routeData?.currentlyStayInUS ? routeData.currentlyStayInUS : false
  );

  const [denialdate, setDenialdate] = useState(new Date());
  const [emptydenialDate, setEmptydenialDate] = useState("");
  const [denialdateShow, setDenialdateShow] = useState(false);
  const denialdateformat = moment(denialdate).format("MM/DD/YYYY");
  const denialdateToShow = () => {
    setDenialdateShow(true);
  };
  const onChangedenialYear = (type, selectedDate) => {
    Platform.OS === "ios" ? null : setDenialdateShow(false);
    setDenialdate(selectedDate);
    setFieldValue("denialdate", moment(selectedDate).format("YYYY-MM-DD"));
    setEmptydenialDate(selectedDate);
  };

  const [withdrawndate, setWithdrawndate] = useState(new Date());
  const [emptywithdrawnDate, setEmptywithdrawnDate] = useState("");
  const [withdrawndateShow, setWithdrawndateShow] = useState(false);
  const withdrawndateformat = moment(withdrawndate).format("MM/DD/YYYY");
  const withdrawndateToShow = () => {
    setWithdrawndateShow(true);
  };
  const onChangewithdrawnYear = (type, selectedDate) => {
    Platform.OS === "ios" ? null : setWithdrawndateShow(false);
    setWithdrawndate(selectedDate);
    setFieldValue("WithdrawnDate", moment(selectedDate).format("YYYY-MM-DD"));
    setEmptywithdrawnDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Loader status={loading} />
      <>
        <View style={{ zIndex: 100 }}>
          <View style={{ flexDirection: "row", marginTop: scale(10) }}>
            <Text style={styles.textHead}>
              Which Visa did you apply for?
              <Text style={{ color: "red" }}>*</Text>
            </Text>
          </View>
          <DropDownPicker
            listMode="MODAL"
            open={openVisa}
            value={visa}
            items={VisaList}
            setOpen={setOpenVisa}
            setValue={setVisa}
            setItems={setVisaItems}
            placeholder="Select the visa type"
            onChangeValue={(value) => setFieldValue("visaType", value)}
            style={{
              height: scale(40),
              marginTop: scale(5),
              borderRadius: scale(4),
              borderColor: "#C3D0DE",
              zIndex: 100,
            }}
            textStyle={styles.dropdownText}
          />
          {touched.visaType && errors.visaType && (
            <Text style={styles.errorMessage}>{errors.visaType}</Text>
          )}
        </View>
        <View style={{ zIndex: 50 }}>
          <View style={{ flexDirection: "row", marginTop: scale(10) }}>
            <Text style={styles.textHead}>
              What is the petition type?
              <Text style={{ color: "red" }}></Text>
            </Text>
          </View>
          {/* <TouchableOpacity onPress={petitionType()}> */}
          <DropDownPicker
            listMode="MODAL"
            open={openPetition}
            value={petition}
            items={petitionData}
            setOpen={setOpenpetition}
            setValue={setPetition}
            setItems={setPetitionItems}
            placeholder="Select the petition type"
            onChangeValue={(value) => setFieldValue("petitionType", value)}
            style={{
              height: scale(40),
              marginTop: scale(5),
              borderRadius: scale(4),
              borderColor: "#C3D0DE",
              zIndex: 100,
            }}
            textStyle={styles.dropdownText}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: scale(10) }}>
          <Text style={styles.textHead}>
            What is the Petitioner Name?<Text style={{ color: "red" }}>*</Text>
          </Text>
        </View>
        <CustomInput
          multiline
          name="petitionername"
          placeholder="Enter"
          placeholderTextColor="#4D4F5C"
          value={values.petitionername}
          autoCorrect={false}
          onBlur={handleBlur("petitionername")}
          onChangeText={handleChange("petitionername")}
          style={{ height: 40, marginTop: scale(6) }}
        />
        {touched.petitionername && errors.petitionername && (
          <Text style={styles.errorMessage}>{errors.petitionername}</Text>
        )}

        <View>
          <View style={{ marginTop: scale(10), marginBottom: scale(10) }}>
            <Text style={{ ...styles.textHead, fontSize: scale(14) }}>
              What is the outcome ?<Text style={{ color: "red" }}>*</Text>
            </Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "#F2F2F2" }}>
            <RadioButton.Group
              onValueChange={handleChange("outcome")}
              value={values.outcome}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <RadioButton.Android
                    value="VSPROCESS"
                    color="#0089CF"
                    uncheckedColor="grey"
                    label="In-Process"
                  />
                  <Text
                    style={{
                      ...styles.radioTitle,
                    }}
                  >
                    In-Process
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <RadioButton.Android
                    value="VSAAPP"
                    color="#0089CF"
                    uncheckedColor="grey"
                    label="Approved"
                  />
                  <Text
                    style={{
                      ...styles.radioTitle,
                    }}
                  >
                    Approved
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <RadioButton.Android
                    value="VSADENY"
                    color="#0089CF"
                    uncheckedColor="grey"
                    label="Denied"
                  />
                  <Text
                    style={{
                      ...styles.radioTitle,
                    }}
                  >
                    Denied
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <RadioButton.Android
                    value="VSAWTDN"
                    color="#0089CF"
                    uncheckedColor="grey"
                    label="Withdrawn"
                  />
                  <Text
                    style={{
                      ...styles.radioTitle,
                    }}
                  >
                    Withdrawn
                  </Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
          {touched.MaritalStatus && errors.MaritalStatus && (
            <Text style={{ ...styles.errorMessage, marginLeft: scale(5) }}>
              {errors.MaritalStatus}
            </Text>
          )}
        </View>
        {values.outcome === "VSAWTDN" ? (
          <>
            <View
              style={{
                marginTop: scale(10),
              }}
            >
              <Text
                style={{
                  marginTop: scale(10),
                  fontFamily: "SourceSansPro-SemiBold",
                  fontSize: scale(16),
                  color: "#4D4F5C",
                }}
              >
                Enter the following Visa Details
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: scale(10) }}>
              <Text style={styles.textHead}>
                Receipt Number
                <Text style={{ color: "red" }}></Text>
              </Text>
            </View>
            <CustomInput
              multiline
              name="Receipt"
              placeholder="Enter"
              placeholderTextColor="#4D4F5C"
              value={values.Receipt}
              autoCorrect={false}
              onBlur={handleBlur("Receipt")}
              onChangeText={handleChange("Receipt")}
              style={{ height: 40, marginTop: scale(6) }}
            />
            <View style={{ flexDirection: "row", marginTop: scale(10) }}>
              <Text style={styles.textHead}>
                Receipt Date
                <Text style={{ color: "red" }}></Text>
              </Text>
            </View>
            <View style={{ marginBottom: scale(5) }}>
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
                  <CustomInput
                    name="date"
                    placeholder="Select"
                    placeholderTextColor="#4D4F5C"
                    value={
                      emptystartDate === ""
                        ? routeData?.receiptDate
                          ? moment(routeData?.receiptDate).format("MM/DD/YYYY")
                          : ""
                        : startdateformat
                    }
                    editable={false}
                    autoCorrect={false}
                    onBlur={handleBlur("from")}
                    onChangeText={handleChange("from")}
                    style={styles.input}
                    autoCorrect={false}
                    style={{ flex: 1 }}
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
            <View style={{ flexDirection: "row", marginTop: scale(10) }}>
              <Text style={styles.textHead}>
                Reason for Withdrawn
                <Text style={{ color: "red" }}>*</Text>
              </Text>
            </View>
            <CustomInput
              multiline
              name="Withdrawn"
              placeholder="Enter"
              placeholderTextColor="#4D4F5C"
              value={values.Withdrawn}
              autoCorrect={false}
              onBlur={handleBlur("Withdrawn")}
              onChangeText={handleChange("Withdrawn")}
              style={{ height: 40, marginTop: scale(6) }}
            />
            {touched.Withdrawn && errors.Withdrawn && (
              <Text style={styles.errorMessage}>{errors.Withdrawn}</Text>
            )}

            <View style={{ flexDirection: "row", marginTop: scale(10) }}>
              <Text style={styles.textHead}>
                Withdrawn Date
                <Text style={{ color: "red" }}>*</Text>
              </Text>
            </View>
            <View style={{ marginBottom: scale(5) }}>
              <TouchableOpacity
                onPress={() => {
                  withdrawndateToShow();
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
                  <CustomInput
                    name="date"
                    placeholder="Select"
                    placeholderTextColor="#4D4F5C"
                    value={
                      emptywithdrawnDate === ""
                        ? routeData?.outcomeDate
                          ? moment(routeData?.outcomeDate).format("MM/DD/YYYY")
                          : ""
                        : withdrawndateformat
                    }
                    editable={false}
                    autoCorrect={false}
                    style={styles.input}
                    autoCorrect={false}
                    style={{ flex: 1 }}
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
                {touched.WithdrawnDate && errors.WithdrawnDate && (
                  <Text style={styles.errorMessage}>
                    {errors.WithdrawnDate}
                  </Text>
                )}
              </TouchableOpacity>
              {withdrawndateShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={withdrawndate}
                  mode="date"
                  // maximumDate={new Date(enddateformat)}
                  onChange={onChangewithdrawnYear}
                  style={{
                    accentColor: "red",
                    textColor: "red",
                  }}
                  themeVariant="dark"
                  textColor="blue"
                />
              )}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: scale(-8),
                }}
              >
                <Checkbox.Android
                  name="checkbox"
                  status={toggleCheckBoxus ? "checked" : "unchecked"}
                  color="#00A0DA"
                  uncheckedColor="grey"
                  onPress={() => {
                    setToggleCheckBoxus(!toggleCheckBoxus);
                    setFieldValue("toggleboxUS", !toggleCheckBoxus);
                  }}
                />
                <Text style={styles.text}>Currently in the U.S</Text>
              </View>
            </View>
          </>
        ) : null}
        {values.outcome === "VSADENY" ? (
          <>
            <View
              style={{
                marginTop: scale(10),
              }}
            >
              <Text
                style={{
                  marginTop: scale(10),
                  fontFamily: "SourceSansPro-SemiBold",
                  fontSize: scale(16),
                  color: "#4D4F5C",
                }}
              >
                Enter the following Visa Details
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: scale(10) }}>
              <Text style={styles.textHead}>
                Receipt Number
                <Text style={{ color: "red" }}></Text>
              </Text>
            </View>
            <CustomInput
              multiline
              name="Receipt"
              placeholder="Enter"
              placeholderTextColor="#4D4F5C"
              value={values.Receipt}
              autoCorrect={false}
              onBlur={handleBlur("Receipt")}
              onChangeText={handleChange("Receipt")}
              style={{ height: 40, marginTop: scale(6) }}
            />
            <View style={{ flexDirection: "row", marginTop: scale(10) }}>
              <Text style={styles.textHead}>
                Receipt Date
                <Text style={{ color: "red" }}></Text>
              </Text>
            </View>
            <View style={{ marginBottom: scale(5) }}>
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
                  <CustomInput
                    name="date"
                    placeholder="Select"
                    placeholderTextColor="#4D4F5C"
                    value={
                      emptystartDate === ""
                        ? routeData?.receiptDate
                          ? moment(routeData?.receiptDate).format("MM/DD/YYYY")
                          : ""
                        : startdateformat
                    }
                    editable={false}
                    autoCorrect={false}
                    onBlur={handleBlur("from")}
                    onChangeText={handleChange("from")}
                    style={styles.input}
                    autoCorrect={false}
                    style={{ flex: 1 }}
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
            <View style={{ flexDirection: "row", marginTop: scale(10) }}>
              <Text style={styles.textHead}>
                Reason for Denial
                <Text style={{ color: "red" }}>*</Text>
              </Text>
            </View>
            <CustomInput
              multiline
              name="Denial"
              placeholder="Enter"
              placeholderTextColor="#4D4F5C"
              value={values.Denial}
              autoCorrect={false}
              onBlur={handleBlur("Denial")}
              onChangeText={handleChange("Denial")}
              style={{ height: 40, marginTop: scale(6) }}
            />
            {touched.Denial && errors.Denial && (
              <Text style={styles.errorMessage}>{errors.Denial}</Text>
            )}

            <View style={{ flexDirection: "row", marginTop: scale(10) }}>
              <Text style={styles.textHead}>
                Denial Date
                <Text style={{ color: "red" }}>*</Text>
              </Text>
            </View>
            <View style={{ marginBottom: scale(5) }}>
              <TouchableOpacity
                onPress={() => {
                  denialdateToShow();
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
                  <CustomInput
                    name="date"
                    placeholder="Select"
                    placeholderTextColor="#4D4F5C"
                    value={
                      emptydenialDate === ""
                        ? routeData?.outcomeDate
                          ? moment(routeData?.outcomeDate).format("MM/DD/YYYY")
                          : ""
                        : denialdateformat
                    }
                    editable={false}
                    autoCorrect={false}
                    onBlur={handleBlur("from")}
                    onChangeText={handleChange("from")}
                    style={styles.input}
                    autoCorrect={false}
                    style={{ flex: 1 }}
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
                {touched.denialdate && errors.denialdate && (
                  <Text style={styles.errorMessage}>{errors.denialdate}</Text>
                )}
              </TouchableOpacity>
              {denialdateShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={denialdate}
                  mode="date"
                  // maximumDate={new Date(enddateformat)}
                  onChange={onChangedenialYear}
                  style={{
                    accentColor: "red",
                    textColor: "red",
                  }}
                  themeVariant="dark"
                  textColor="blue"
                />
              )}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: scale(-8),
                }}
              >
                <Checkbox.Android
                  name="checkbox"
                  status={toggleCheckBoxus ? "checked" : "unchecked"}
                  color="#00A0DA"
                  uncheckedColor="grey"
                  onPress={() => {
                    setToggleCheckBoxus(!toggleCheckBoxus);
                    setFieldValue("toggleboxUS", !toggleCheckBoxus);
                  }}
                />
                <Text style={styles.text}>Currently in the U.S</Text>
              </View>
            </View>
          </>
        ) : null}
        {values.outcome === "VSAAPP" ? (
          <>
            <View
              style={{
                marginTop: scale(10),
              }}
            >
              <Text
                style={{
                  marginTop: scale(10),
                  fontFamily: "SourceSansPro-SemiBold",
                  fontSize: scale(16),
                  color: "#4D4F5C",
                }}
              >
                Enter the following Visa Details
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: scale(10) }}>
              <Text style={styles.textHead}>
                Receipt Number
                <Text style={{ color: "red" }}></Text>
              </Text>
            </View>
            <CustomInput
              multiline
              name="Receipt"
              placeholder="Enter"
              placeholderTextColor="#4D4F5C"
              value={values.Receipt}
              autoCorrect={false}
              onBlur={handleBlur("Receipt")}
              onChangeText={handleChange("Receipt")}
              style={{ height: 40, marginTop: scale(6) }}
            />
            <View style={{ flexDirection: "row", marginTop: scale(10) }}>
              <Text style={styles.textHead}>
                Receipt Date
                <Text style={{ color: "red" }}></Text>
              </Text>
            </View>
            <View style={{ marginBottom: scale(5) }}>
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
                  <CustomInput
                    name="date"
                    placeholder="MM/DD/YYYY"
                    placeholderTextColor="#4D4F5C"
                    value={
                      emptystartDate === ""
                        ? routeData?.receiptDate
                          ? moment(routeData?.receiptDate).format("MM/DD/YYYY")
                          : ""
                        : startdateformat
                    }
                    editable={false}
                    autoCorrect={false}
                    // onBlur={handleBlur("from")}
                    // onChangeText={handleChange("from")}
                    style={styles.input}
                    autoCorrect={false}
                    style={{ flex: 1 }}
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
            <View style={{ flexDirection: "row", marginTop: scale(10) }}>
              <Text style={styles.textHead}>
                Approval Date
                <Text style={{ color: "red" }}>*</Text>
              </Text>
            </View>
            <View style={{ marginBottom: scale(5) }}>
              <TouchableOpacity
                onPress={() => {
                  approveddateToShow();
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
                  <CustomInput
                    name="date"
                    placeholder="MM/DD/YYYY"
                    placeholderTextColor="#4D4F5C"
                    value={
                      emptyapprovedDate === ""
                        ? routeData?.outcomeDate
                          ? moment(routeData?.outcomeDate).format("MM/DD/YYYY")
                          : ""
                        : approveddateformat
                    }
                    editable={false}
                    autoCorrect={false}
                    // onBlur={handleBlur("from")}
                    // onChangeText={handleChange("from")}
                    style={styles.input}
                    autoCorrect={false}
                    style={{ flex: 1 }}
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
                {touched.approveDate && errors.approveDate && (
                  <Text style={styles.errorMessage}>{errors.approveDate}</Text>
                )}
              </TouchableOpacity>
              {approveddateShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={approveddate}
                  mode="date"
                  // maximumDate={new Date(enddateformat)}
                  onChange={onChangeapprovedYear}
                  style={{
                    accentColor: "red",
                    textColor: "red",
                  }}
                  themeVariant="dark"
                  textColor="blue"
                />
              )}
            </View>
            <View style={{ flexDirection: "row", marginTop: scale(10) }}>
              <Text style={styles.textHead}>
                Validity Start Date
                <Text style={{ color: "red" }}>*</Text>
              </Text>
            </View>
            <View style={{ marginBottom: scale(5) }}>
              <TouchableOpacity
                onPress={() => {
                  validitydateToShow();
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
                  <CustomInput
                    name="date"
                    placeholder="MM/DD/YYYY"
                    placeholderTextColor="#4D4F5C"
                    value={
                      emptyvalidityDate === ""
                        ? routeData?.validityStartDate
                          ? moment(routeData?.validityStartDate).format(
                              "MM/DD/YYYY"
                            )
                          : ""
                        : validitydateformat
                    }
                    editable={false}
                    autoCorrect={false}
                    onBlur={handleBlur("from")}
                    onChangeText={handleChange("from")}
                    style={styles.input}
                    autoCorrect={false}
                    style={{ flex: 1 }}
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
                {touched.validityStartDate && errors.validityStartDate && (
                  <Text style={styles.errorMessage}>
                    {errors.validityStartDate}
                  </Text>
                )}
              </TouchableOpacity>
              {validitydateShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={validitydate}
                  mode="date"
                  // maximumDate={new Date(enddateformat)}
                  onChange={onChangevalidityYear}
                  style={{
                    accentColor: "red",
                    textColor: "red",
                  }}
                  themeVariant="dark"
                  textColor="blue"
                />
              )}
            </View>
            <View style={{ flexDirection: "row", marginTop: scale(10) }}>
              <Text style={styles.textHead}>
                Validity End Date
                <Text style={{ color: "red" }}>*</Text>
              </Text>
            </View>
            <View style={{ marginBottom: scale(5) }}>
              <TouchableOpacity
                onPress={() => {
                  validityenddateToShow();
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
                  <CustomInput
                    name="date"
                    placeholder="MM/DD/YYYY"
                    placeholderTextColor="#4D4F5C"
                    value={
                      emptyvalidityendDate === ""
                        ? routeData?.validityEndDate
                          ? moment(routeData?.validityEndDate).format(
                              "MM/DD/YYYY"
                            )
                          : ""
                        : validityenddateformat
                    }
                    editable={false}
                    autoCorrect={false}
                    onBlur={handleBlur("from")}
                    onChangeText={handleChange("from")}
                    style={styles.input}
                    autoCorrect={false}
                    style={{ flex: 1 }}
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
                {touched.validityEnddate && errors.validityEnddate && (
                  <Text style={styles.errorMessage}>
                    {errors.validityEnddate}
                  </Text>
                )}
              </TouchableOpacity>
              {validityenddateShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={validityenddate}
                  mode="date"
                  minimumDate={new Date(validitydate)}
                  // maximumDate={new Date(enddateformat)}
                  onChange={onChangevalidityendYear}
                  style={{
                    accentColor: "red",
                    textColor: "red",
                  }}
                  themeVariant="dark"
                  textColor="blue"
                />
              )}
            </View>
            <View style={{ flexDirection: "row", marginTop: scale(10) }}>
              <Text style={styles.textHead}>
                EAD Number
                <Text style={{ color: "red" }}>*</Text>
              </Text>
            </View>
            <CustomInput
              multiline
              name="ead"
              placeholder="Enter"
              placeholderTextColor="#4D4F5C"
              value={values.ead}
              autoCorrect={false}
              onBlur={handleBlur("ead")}
              onChangeText={handleChange("ead")}
              style={{ height: 40, marginTop: scale(6) }}
            />
            {touched.ead && errors.ead && (
              <Text style={styles.errorMessage}>{errors.ead}</Text>
            )}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: scale(-8),
              }}
            >
              <Checkbox.Android
                name="checkbox"
                status={toggleCheckBoxead ? "checked" : "unchecked"}
                color="#00A0DA"
                uncheckedColor="grey"
                onPress={() => {
                  setToggleCheckBoxead(!toggleCheckBoxead);
                  setFieldValue("toggleboxEAD", !toggleCheckBoxead);
                }}
              />
              <Text style={styles.text}>Not Applicable</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: scale(10) }}>
              <Text style={styles.textHead}>
                SEVIS Number
                <Text style={{ color: "red" }}>*</Text>
              </Text>
            </View>
            <CustomInput
              multiline
              name="sevis"
              placeholder="Enter"
              placeholderTextColor="#4D4F5C"
              value={values.sevis}
              autoCorrect={false}
              onBlur={handleBlur("sevis")}
              onChangeText={handleChange("sevis")}
              style={{ height: 40, marginTop: scale(6) }}
            />
            {touched.sevis && errors.sevis && (
              <Text style={styles.errorMessage}>{errors.sevis}</Text>
            )}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: scale(-8),
              }}
            >
              <Checkbox.Android
                name="checkbox"
                status={toggleCheckBoxsevis ? "checked" : "unchecked"}
                color="#00A0DA"
                uncheckedColor="grey"
                onPress={() => {
                  setToggleCheckBoxsevis(!toggleCheckBoxsevis);
                  setFieldValue("toggleboxSEVIS", !toggleCheckBoxsevis);
                }}
              />
              <Text style={styles.text}>Not Applicable</Text>
            </View>
            <View style={{ marginTop: scale(10), marginBottom: scale(10) }}>
              <Text style={{ ...styles.textHead, fontSize: scale(14) }}>
                Have you used this visa?<Text style={{ color: "red" }}></Text>
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton.Group
                onValueChange={handleChange("usedvisa")}
                value={values.usedvisa}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <RadioButton.Android
                      value="YES"
                      uncheckedColor="grey"
                      color="#0089CF"
                      label="yes"
                    />
                    <Text style={styles.radioTitle}>Yes</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <RadioButton.Android
                      value="NO"
                      uncheckedColor="grey"
                      color="#0089CF"
                      label="No"
                    />
                    <Text style={styles.radioTitle}>No</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: scale(-8),
              }}
            >
              <Checkbox.Android
                name="checkbox"
                status={toggleCheckBoxus ? "checked" : "unchecked"}
                color="#00A0DA"
                uncheckedColor="grey"
                onPress={() => {
                  setToggleCheckBoxus(!toggleCheckBoxus);
                  setFieldValue("toggleboxUS", !toggleCheckBoxus);
                }}
              />
              <Text style={styles.text}>Currently in the U.S</Text>
            </View>
          </>
        ) : null}
        {values.outcome === "VSPROCESS" ? (
          <>
            <View
              style={{
                marginTop: scale(10),
              }}
            >
              <Text
                style={{
                  marginTop: scale(10),
                  fontFamily: "SourceSansPro-SemiBold",
                  fontSize: scale(16),
                  color: "#4D4F5C",
                }}
              >
                Enter the following Visa Details
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: scale(10) }}>
              <Text style={styles.textHead}>
                Receipt Number
                <Text style={{ color: "red" }}></Text>
              </Text>
            </View>
            <CustomInput
              multiline
              name="Receipt"
              placeholder="Enter"
              placeholderTextColor="#4D4F5C"
              value={values.Receipt}
              autoCorrect={false}
              onBlur={handleBlur("Receipt")}
              onChangeText={handleChange("Receipt")}
              style={{ height: 40, marginTop: scale(6) }}
            />
            <View style={{ flexDirection: "row", marginTop: scale(10) }}>
              <Text style={styles.textHead}>
                Receipt Date
                <Text style={{ color: "red" }}></Text>
              </Text>
            </View>
            <View style={{ marginBottom: scale(5) }}>
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
                  <CustomInput
                    name="date"
                    placeholder="Select"
                    placeholderTextColor="#4D4F5C"
                    value={
                      emptystartDate === ""
                        ? routeData?.receiptDate
                          ? moment(routeData?.receiptDate).format("MM/DD/YYYY")
                          : ""
                        : startdateformat
                    }
                    editable={false}
                    autoCorrect={false}
                    onBlur={handleBlur("from")}
                    onChangeText={handleChange("from")}
                    style={styles.input}
                    autoCorrect={false}
                    style={{ flex: 1 }}
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: scale(-8),
                }}
              >
                <Checkbox.Android
                  name="checkbox"
                  status={toggleCheckBoxus ? "checked" : "unchecked"}
                  color="#00A0DA"
                  uncheckedColor="grey"
                  onPress={() => {
                    setToggleCheckBoxus(!toggleCheckBoxus);
                    setFieldValue("toggleboxUS", !toggleCheckBoxus);
                  }}
                />
                <Text style={styles.text}>Currently in the U.S</Text>
              </View>
            </View>
          </>
        ) : null}
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
          onPress={handleSubmit}
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
    </View>
  );
};
const mapStateToProps = ({
  studentReducer: { visatypeList, petitionList, vsaoutList },
}) => ({
  visatypeList,
  petitionList,
  vsaoutList,
});
const mapDispatchToProps = {
  getstate: (code) => fetchStateList(code),
};
export default connect(mapStateToProps, mapDispatchToProps)(VisaDetails);
