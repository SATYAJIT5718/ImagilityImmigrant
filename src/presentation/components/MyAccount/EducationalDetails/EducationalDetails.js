import { View, KeyboardAvoidingView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import styles from "../styles";
import { scale } from "../../../../Infrastructure/utils/screenUtility";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import DegreeDetails from "./DegreeDetails";
import RelatedCourse from "./RelatedCourse";
import RelatedDocument from "../RelatedDocument/RelatedDocument";
import EducationAccordion from "../../../../Infrastructure/component/EducatonAccordion/EducationAccordion";
import {
  sendEducationInfo,
  getEducationInfo,
} from "../../../../application/store/actions/student";
import { connect } from "react-redux";
import {
  getAuthToken,
  getBeneficiaryUserID,
} from "../../../../Infrastructure/utils/storageUtility";
import Toast from "react-native-simple-toast";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import Loader from "../../../../Infrastructure/component/Loader/Loader";
const SpaceRegex = /^\S*$/;
const ValidationSchema = yup.object().shape({
  degree: yup.string().nullable().required("Degree Required"),
  fieldofStudy: yup
    .string()
    // .matches(/^\S*$/, "Space is not allowed")
    .required("Field of Study Required"),
  universityName: yup
    .string()
    // .matches(SpaceRegex, "Space is not allowed")
    .required("University Required"),
  addressLine1: yup.string().required("Address Required"),
  country: yup.string().required("Country Required"),
  stateProvinceName: yup.string().required("State Required"),
  city: yup.string().required("City Required"),
  startYear: yup.string().required("Start Year Required"),
  endYear: yup.string().required("End Year Required"),
});
const EducationalDetails = (props) => {
  const [educationId, setEducationId] = useState("");
  const [courseList, setCourseList] = useState(null);
  const [status, setStatus] = useState(false);
  const [degreeExpanded, setDegreeExpanded] = useState(true);
  const [relatedCourseExpanded, setRelatedCourseExpanded] = useState(false);
  const [relatedDocExpanded, setRelatedDocExpanded] = useState(false);
  const [degreeDisabled, setDegreeDisabled] = useState(false);
  const [apidDataToShow, setApidDataToShow] = useState("");
  const [relatedDisabled, setRelatedDisabled] = useState(
    props.route?.params?.item ? false : true
  );
  const [relatedDcoDisabled, setRelatedDcoDisabled] = useState(
    props.route?.params?.item ? false : true
  );
  const formSubmitHandler = async (formData) => {
    setStatus(true);
    const token = await getAuthToken();
    const beneficiaryId = await getBeneficiaryUserID();
    const payload = {
      education: [
        {
          id: props.route?.params?.item?.id
            ? props.route.params.item.id
            : educationId
            ? educationId
            : 0,
          country: {
            countryCode: formData.country,
          },
          university: formData.universityName,
          degree: formData.degree,
          grade: formData.grade,
          equivalance: "",
          fieldOfStudy: formData.fieldofStudy,
          startYear: formData.startYear,
          endYear: formData.endYear,
          degreeAwardedDate: formData.degreeAwardedDate, //YYYY-MM-DD
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          stateProvinceCode: formData.stateProvinceCode,
          stateProvinceName: formData.stateProvinceName,
          postCode: formData.postCode,
          city: formData.city,
          degreeType: {
            id: formData.degreeTypeId,
          },
          courses: [
            {
              createdBy: null,
              modifiedBy: null,
              courseName: formData.courseName,
              courseId: null,
            },
          ],
        },
      ],
    };
    console.log("educationpayload", payload);
    await props
      .sendEducationData(token, payload, beneficiaryId)
      .then((res) => {
        setApidDataToShow(res.data.education);
        console.log("send res", res);
        const message = res.message;
        props
          .getEducationData(token, beneficiaryId)
          .then((res) => {
            setStatus(false);
            console.log("get res", res);
          })
          .catch((error) => {
            setStatus(false);
            console.log("error", error);
          });
        setCourseList(res.data.education[0]);
        setRelatedCourseExpanded(true);
        setDegreeExpanded(false);
        {
          props.route?.params?.item ? null : setRelatedDisabled(false);
        }
        Toast.show(message), setEducationId(res.data.education[0].id);
      })
      .catch((error) => {
        setStatus(false);
        // Toast.show(error.message ? error.message : "Something went wrong");
      });
  };
  const toggleExpand = (title) => {
    if (title == "Degree Details") {
      setDegreeExpanded(!degreeExpanded);
    } else if (title == "Related Courses") {
      setRelatedCourseExpanded(!relatedCourseExpanded);
    } else if (title == "Related Documents") {
      setRelatedDocExpanded(!relatedDocExpanded);
    }
  };
  const courseToggle = () => {
    setRelatedCourseExpanded(false), setRelatedDcoDisabled(false);
    setRelatedDocExpanded(true);
  };
  return (
    <>
      <Loader status={status} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{
          flex: 1,
          paddingHorizontal: scale(10),
          paddingVertical: scale(10),
          backgroundColor: "#FFFFFF",
        }}
      >
        <ScrollView>
          <Formik
            initialValues={{
              //EducationalDetails
              degree: props.route?.params?.item?.degree
                ? props.route.params.item.degree
                : "",
              fieldofStudy: props.route?.params?.item?.fieldOfStudy
                ? props.route.params.item.fieldOfStudy
                : "",
              grade: props.route?.params?.item?.grade
                ? props.route.params.item.grade
                : "",
              universityName: props.route?.params?.item?.university
                ? props.route.params.item.university
                : "",
              addressLine1: props.route?.params?.item?.addressLine1
                ? props.route.params.item.addressLine1
                : "",
              addressLine2: props.route?.params?.item?.addressLine2
                ? props.route.params.item.addressLine2
                : "",
              postCode: props.route?.params?.item?.postCode
                ? props.route.params.item.postCode
                : "",
              country: props.route?.params?.item?.country.countryCode
                ? props.route.params.item.country.countryCode
                : "",
              stateProvinceName: props.route?.params?.item?.stateProvinceName
                ? props.route.params.item.stateProvinceName
                : "",
              stateProvinceCode: props.route?.params?.item?.stateProvinceCode
                ? props.route.params.item.stateProvinceCode
                : null,
              city: props.route?.params?.item?.city
                ? props.route.params.item.city
                : "",
              startYear: props.route?.params?.item?.startYear
                ? `${props.route.params.item.startYear}`
                : "",
              endYear: props.route?.params?.item?.endYear
                ? `${props.route.params.item.endYear}`
                : "",
              degreeAwardedDate: props.route?.params?.item?.degreeAwardedDate
                ? `${props.route.params.item.degreeAwardedDate}`
                : "",
              courseName: props.route?.params?.item?.courses?.[0]?.courseName
                ? props.route.params.item.courses[0].courseName
                : "",
              degreeTypeId: props.route?.params?.item?.degreeType.id
                ? props.route.params.item.degreeType.id
                : "",
            }}
            enableReinitialize={true}
            validateOnBlur={true}
            validateOnChange={true}
            onSubmit={(values) => formSubmitHandler(values)}
            validationSchema={ValidationSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
              setFieldValue,
              isValid,
            }) => (
              <>
                <View>
                  {console.log("values", values)}
                  <View style={styles.dashedLine} />

                  <EducationAccordion
                    title={"Degree Details"}
                    data={
                      <DegreeDetails
                        values={values}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        isValid={isValid}
                        setFieldValue={setFieldValue}
                        handleSubmit={handleSubmit}
                        apidDataToShow={apidDataToShow}
                        editData={
                          props.route?.params?.item
                            ? props.route.params.item
                            : ""
                        }
                      />
                    }
                    style={{
                      body: { marginHorizontal: scale(10) },
                    }}
                    expanded={degreeExpanded}
                    removeEdit={true}
                    toggleExpand={toggleExpand}
                    disabled={degreeDisabled}
                  />
                  <View style={styles.dashedLine} />

                  <EducationAccordion
                    title={"Related Courses"}
                    data={
                      <RelatedCourse
                        setFieldValue={setFieldValue}
                        handleSubmit={handleSubmit}
                        courseToggle={courseToggle}
                        editData={
                          courseList
                            ? courseList
                            : props.route?.params?.item
                            ? props.route.params.item
                            : null
                        }
                      />
                    }
                    style={{
                      body: { marginHorizontal: scale(10) },
                    }}
                    removeEdit={true}
                    expanded={relatedCourseExpanded}
                    toggleExpand={toggleExpand}
                    disabled={relatedDisabled}
                  />
                  <View style={styles.dashedLine} />

                  <EducationAccordion
                    title={"Related Documents"}
                    data={
                      <RelatedDocument
                        educationId={
                          props.route?.params?.item?.id
                            ? props.route.params.item.id
                            : educationId
                            ? educationId
                            : ""
                        }
                      />
                    }
                    style={{
                      body: { marginHorizontal: scale(10) },
                    }}
                    expanded={relatedDocExpanded}
                    removeEdit={true}
                    toggleExpand={toggleExpand}
                    disabled={relatedDcoDisabled}
                  />
                  <View style={styles.dashedLine} />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const mapStateToProps = null;

const mapDispatchToProps = {
  sendEducationData: (authToken, payload, beneficiaryId) =>
    sendEducationInfo(authToken, payload, beneficiaryId),
  getEducationData: (authToken, beneficiaryId) =>
    getEducationInfo(authToken, beneficiaryId),
};

export default connect(mapStateToProps, mapDispatchToProps)(EducationalDetails);
