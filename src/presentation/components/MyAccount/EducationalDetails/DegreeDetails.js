import { View, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import styles from "../styles";
import { scale } from "../../../../Infrastructure/utils/screenUtility";
import { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { CustomInput } from "../../../../Infrastructure/component/Custom";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { connect } from "react-redux";
import { fetchStateList } from "../../../../application/store/actions/student";
import Loader from "../../../../Infrastructure/component/Loader/Loader";

const DegreeDetails = ({
  values,
  errors,
  handleChange,
  handleBlur,
  touched,
  isValid,
  setFieldValue,
  handleSubmit,
  CountryList,
  Degree,
  getState,
  editData,
  apidDataToShow,
}) => {
  const [countryopen, setCountryopen] = useState(false);
  const [stateopen, setStateopen] = useState(false);
  const [degreeopen, setDegreeopen] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [degree, setDegree] = useState(
    Degree?.data
      ? Degree.data.map((item) => {
          return {
            id: item.id,
            label: item.name,
            value: item.code,
          };
        })
      : []
  );
  const [state, setState] = useState([]);
  const [selectedcountry, setSelectedcountry] = useState(
    editData.country?.countryCode
      ? editData.country.countryCode
      : apidDataToShow?.[0]?.country?.countryCode
      ? apidDataToShow[0].country.countryCode
      : null
  );
  const [selectedDegree, setSelectedDegree] = useState(
    editData.degree
      ? editData.degree
      : apidDataToShow?.[0]?.degree
      ? apidDataToShow[0].degree
      : null
  );
  const [selectedState, setSelectedState] = useState(
    editData?.stateProvinceCode ? editData.stateProvinceCode : null
  );
  const [show, setShow] = useState(false);
  const [endateShow, setEndateShow] = useState(false);
  const [startdateShow, setStartdateShow] = useState(false);
  const [emptyendDate, setEmptyendDate] = useState("");
  const [emptystartDate, setEmptystartDate] = useState("");
  const [awardeddate, setAwardeddate] = useState(
    apidDataToShow?.[0]?.degreeAwardedDate
      ? apidDataToShow?.[0]?.degreeAwardedDate
      : editData.degreeAwardedDate
      ? new Date(editData.degreeAwardedDate)
      : new Date()
  );
  const [enddate, setEnddate] = useState(
    editData.endYear
      ? new Date(editData.endYear, 2)
      : apidDataToShow?.[0]?.endYear
      ? new Date(apidDataToShow[0].endYear, 2)
      : new Date()
  );
  const [startdate, setStartdate] = useState(
    editData.startYear
      ? new Date(editData.startYear, 1)
      : apidDataToShow?.[0]?.startYear
      ? new Date(apidDataToShow[0].startYear, 1)
      : new Date()
  );
  const [status, setStatus] = useState(false);
  const dateformat = awardeddate
    ? moment(awardeddate).format("MM/DD/YYYY")
    : "";
  const enddateformat = enddate ? moment(enddate).format("YYYY") : "";
  const startdateformat = startdate ? moment(startdate).format("YYYY") : "";
  const [emptyDate, setEmptyDate] = useState(
    apidDataToShow?.[0]?.degreeAwardedDate
      ? apidDataToShow?.[0]?.degreeAwardedDate
      : editData.degreeAwardedDate
      ? new Date(editData.degreeAwardedDate)
      : ""
  );
  const onChange = (type, selectedDate) => {
    Platform.OS === "ios" ? null : setShow(false);
    console.log("award", selectedDate);
    setAwardeddate(selectedDate);
    setFieldValue(
      "degreeAwardedDate",
      moment(selectedDate).format("YYYY-MM-DD")
    );
    setEmptyDate(selectedDate);
  };
  const onChangeEndYear = (type, selectedDate) => {
    Platform.OS === "ios" ? null : setEndateShow(false);
    setEnddate(selectedDate);
    setFieldValue("endYear", moment(selectedDate).format("YYYY"));
    setEmptyendDate(selectedDate);
    setEmptyDate("");
    setFieldValue("degreeAwardedDate", "");
  };
  const onChangeStartYear = (type, selectedDate) => {
    console.log("select start", moment(selectedDate).format("YYYY"));
    Platform.OS === "ios" ? null : setStartdateShow(false);
    setStartdate(selectedDate);
    setFieldValue("startYear", moment(selectedDate).format("YYYY"));
    setEmptystartDate(selectedDate);
  };
  const showDatepicker = () => {
    setShow(true);
  };
  const endate = () => {
    setEndateShow(true);
  };
  const startdateToShow = () => {
    setStartdateShow(true);
  };
  const fetchStateData = (code) => {
    setStatus(true);
    getState(code)
      .then((res) => {
        const stateList = res.data.map((item) => {
          return {
            label: item.stateProvinceName,
            value: item.stateProvinceCode,
          };
        });
        setState(stateList);
        setStatus(false);
      })
      .catch((e) => {
        setStatus(false);
      });
  };
  CountryList?.data
    ? CountryList.data.map((item) => {
        countryList.push({
          label: item.countryName,
          value: item.countryCode,
        });
      })
    : null;
  useEffect(() => {
    editData.country?.countryCode
      ? fetchStateData(editData.country.countryCode)
      : null;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Loader status={status} />
      <View style={{ flexDirection: "column", zIndex: 100 }}>
        <Text style={styles.formInputTitle}>
          Degree<Text style={{ color: "red" }}>*</Text>
        </Text>
        <DropDownPicker
          name="degree"
          listMode="MODAL"
          open={degreeopen}
          value={selectedDegree}
          items={degree}
          setOpen={setDegreeopen}
          setItems={setDegree}
          setValue={setSelectedDegree}
          onChangeValue={(value) => setFieldValue("degree", value)}
          onSelectItem={(value) => {
            setFieldValue("degreeTypeId", value.id);
          }}
          placeholder="Enter"
          style={styles.inputdropdown}
        />
        {touched.degree && errors.degree && (
          <Text style={styles.errorMessage}>{errors.degree}</Text>
        )}
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.formInputTitle}>
          Field of Study<Text style={{ color: "red" }}>*</Text>
        </Text>
        <CustomInput
          name="fieldofStudy"
          placeholder="Enter"
          placeholderTextColor="#4D4F5C"
          value={values.fieldofStudy}
          onBlur={handleBlur("fieldofStudy")}
          onChangeText={handleChange("fieldofStudy")}
          editable={true}
        />
        {touched.fieldofStudy && errors.fieldofStudy && (
          <Text style={styles.errorMessage}>{errors.fieldofStudy}</Text>
        )}
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.formInputTitle}>Grade</Text>
        <CustomInput
          name="grade"
          placeholder="Enter"
          placeholderTextColor="#4D4F5C"
          value={values.grade}
          onBlur={handleBlur("grade")}
          onChangeText={handleChange("grade")}
          editable={true}
        />
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.formInputTitle}>
          University Name<Text style={{ color: "red" }}>*</Text>
        </Text>
        <CustomInput
          name="universityName"
          placeholder="Enter"
          placeholderTextColor="#4D4F5C"
          value={values.universityName}
          onBlur={handleBlur("universityName")}
          onChangeText={handleChange("universityName")}
          editable={true}
        />
        {touched.universityName && errors.universityName && (
          <Text style={styles.errorMessage}>{errors.universityName}</Text>
        )}
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.formInputTitle}>
          Address Line 1<Text style={{ color: "red" }}>*</Text>
        </Text>
        <CustomInput
          multiline
          name="addressLine1"
          placeholder="Enter"
          placeholderTextColor="#4D4F5C"
          value={values.addressLine1}
          onBlur={handleBlur("addressLine1")}
          onChangeText={handleChange("addressLine1")}
          editable={true}
          style={{ height: scale(60), marginTop: scale(6) }}
        />
        {touched.addressLine1 && errors.addressLine1 && (
          <Text style={styles.errorMessage}>{errors.addressLine1}</Text>
        )}
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.formInputTitle}>Address Line 2</Text>
        <CustomInput
          multiline
          name="addressLine2"
          placeholder="Enter"
          placeholderTextColor="#4D4F5C"
          value={values.addressLine2}
          onBlur={handleBlur("addressLine2")}
          onChangeText={handleChange("addressLine2")}
          editable={true}
          style={{ height: scale(60), marginTop: scale(6) }}
        />
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.formInputTitle}>ZIP / Postal Code</Text>
        <CustomInput
          name="postCode"
          placeholder="Enter"
          placeholderTextColor="#4D4F5C"
          value={values.postCode}
          onBlur={handleBlur("postCode")}
          onChangeText={handleChange("postCode")}
          keyboardType="numeric"
          editable={true}
        />
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.formInputTitle}>
          Country<Text style={{ color: "red" }}>*</Text>
        </Text>
        <DropDownPicker
          name="country"
          listMode="MODAL"
          open={countryopen}
          value={selectedcountry}
          items={countryList}
          setOpen={setCountryopen}
          setItems={setCountryList}
          setValue={setSelectedcountry}
          onChangeValue={(value) => setFieldValue("country", value)}
          onSelectItem={(value) => {
            fetchStateData(value.value);
          }}
          placeholder="Enter"
          style={styles.inputdropdown}
        />
        {touched.country && errors.country && (
          <Text style={styles.errorMessage}>{errors.country}</Text>
        )}
      </View>

      {state.length > 0 ? (
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.formInputTitle}>
            State<Text style={{ color: "red" }}>*</Text>
          </Text>
          <DropDownPicker
            name="stateProvinceName"
            listMode="MODAL"
            open={stateopen}
            value={selectedState}
            items={state}
            setOpen={setStateopen}
            setItems={setState}
            setValue={setSelectedState}
            onChangeValue={(value) => setFieldValue("stateProvinceCode", value)}
            onSelectItem={(value) => {
              setFieldValue("stateProvinceName", value.label);
            }}
            placeholder="Enter"
            style={styles.inputdropdown}
          />
          {touched.stateProvinceName && errors.stateProvinceName && (
            <Text style={styles.errorMessage}>{errors.stateProvinceName}</Text>
          )}
        </View>
      ) : (
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.formInputTitle}>
            State<Text style={{ color: "red" }}>*</Text>
          </Text>
          <CustomInput
            name="postCode"
            placeholder="Enter"
            placeholderTextColor="#4D4F5C"
            value={values.stateProvinceName}
            onBlur={handleBlur("stateProvinceName")}
            onChangeText={handleChange("stateProvinceName")}
            onChange={() => setFieldValue("stateProvinceCode", null)}
            editable={true}
          />
          {touched.stateProvinceName && errors.stateProvinceName && (
            <Text style={styles.errorMessage}>{errors.stateProvinceName}</Text>
          )}
        </View>
      )}

      <View style={{ flexDirection: "column" }}>
        <Text style={styles.formInputTitle}>
          City<Text style={{ color: "red" }}>*</Text>
        </Text>
        <CustomInput
          name="city"
          placeholder="Enter"
          placeholderTextColor="#4D4F5C"
          value={values.city}
          onBlur={handleBlur("city")}
          onChangeText={handleChange("city")}
          editable={true}
        />
        {touched.city && errors.city && (
          <Text style={styles.errorMessage}>{errors.city}</Text>
        )}
      </View>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            marginRight: scale(5),
          }}
        >
          <Text style={styles.formInputTitle}>
            Start Year<Text style={{ color: "red" }}>*</Text>
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
              <CustomInput
                name="date"
                placeholder="Select"
                placeholderTextColor="#4D4F5C"
                value={
                  emptystartDate === "" &&
                  !editData.startYear &&
                  !apidDataToShow?.[0]?.startYear
                    ? // editData.startYear
                      //   ? moment(new Date(editData.startYear, 1)).format("YYYY")
                      //   : apidDataToShow?.[0]?.startYear
                      //   ? moment(new Date(apidDataToShow[0].startYear, 1)).format(
                      //       "YYYY"
                      //     )
                      //   :
                      ""
                    : startdateformat
                }
                editable={false}
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
            {touched.startYear && errors.startYear && (
              <Text style={styles.errorMessage}>{errors.startYear}</Text>
            )}
          </TouchableOpacity>
          {startdateShow && (
            <DateTimePicker
              testID="dateTimePicker"
              value={startdate}
              mode="date"
              // maximumDate={
              //   editData.endYear
              //     ? new Date(editData.endYear, 1, 3)
              //     : enddate
              //     ? new Date(enddate)
              //     : ""
              // }
              // maximumDate={
              //   enddate
              //     ? new Date(enddate)
              //     : editData.endYear
              //     ? new Date(editData.endYear, 0)
              //     : ""
              // }
              maximumDate={
                values.endYear === ""
                  ? new Date()
                  : new Date(values.endYear - 1, new Date().getMonth()) >=
                    new Date()
                  ? new Date()
                  : new Date(values.endYear - 1, new Date().getMonth())
              }
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
          <Text style={styles.formInputTitle}>
            End Year<Text style={{ color: "red" }}>*</Text>
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
              <CustomInput
                name="date"
                placeholder="Select"
                placeholderTextColor="#4D4F5C"
                value={
                  emptyendDate === "" &&
                  !editData.endYear &&
                  !apidDataToShow?.[0]?.endYear
                    ? // editData.endYear
                      //   ? moment(new Date(editData.endYear, 1)).format("YYYY")
                      //   : apidDataToShow?.[0]?.endYear
                      //   ? moment(new Date(apidDataToShow[0].endYear, 1)).format(
                      //       "YYYY"
                      //     )
                      //   :
                      ""
                    : enddateformat
                }
                editable={false}
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
            {touched.endYear && errors.endYear && (
              <Text style={styles.errorMessage}>{errors.endYear}</Text>
            )}
          </TouchableOpacity>
          {endateShow && (
            <DateTimePicker
              testID="dateTimePicker"
              value={enddate}
              mode="date"
              onChange={onChangeEndYear}
              minimumDate={new Date(startdate)}
              // minmumDate={
              //   values.startYear === "" ? "" : new Date(values.startYear + 1, 2)
              // }
              // minimumDate={
              //   startdate
              //     ? new Date(startdate)
              //     : editData.startYear
              //     ? new Date(editData.startYear, 0)
              //     : ""
              // }
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
      <View
        style={{ flexDirection: "column", flex: 1, marginBottom: scale(10) }}
      >
        <View>
          <Text style={styles.formInputTitle}>Awarded Date</Text>
          <TouchableOpacity
            onPress={() => {
              showDatepicker();
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
                value={emptyDate === "" ? "" : dateformat}
                editable={false}
                autoCorrect={false}
                style={{ marginTop: scale(6), flex: 1 }}
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
            {touched.degreeAwardedDate && errors.degreeAwardedDate && (
              <Text style={styles.errorMessage}>
                {errors.degreeAwardedDate}
              </Text>
            )}
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={awardeddate}
              mode="date"
              onChange={onChange}
              // minimumDate={
              //   enddate
              //     ? new Date(enddate)
              //     : editData.endYear
              //     ? new Date(editData.endYear, 1)
              //     : ""
              // }
              minimumDate={new Date(enddate)}
              style={{
                accentColor: "red",
                textColor: "red",
              }}
              themeVariant="dark"
              textColor="blue"
            />
          )}
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: scale(20),
            padding: scale(10),
            borderRadius: scale(5),
            backgroundColor: "#FFFFFF",
            borderColor: "#349beb",
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
      </View>
    </View>
  );
};
const mapStateToProps = ({
  studentReducer: { studentInformation, CountryList, StateList, Degree },
}) => ({
  studentInformation,
  CountryList,
  StateList,
  Degree,
});

const mapDispatchToProps = {
  getState: (code) => fetchStateList(code),
};

export default connect(mapStateToProps, mapDispatchToProps)(DegreeDetails);
