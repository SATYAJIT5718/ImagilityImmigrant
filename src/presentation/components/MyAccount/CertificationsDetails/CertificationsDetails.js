import { View, KeyboardAvoidingView, ScrollView } from "react-native";
import React from "react";
import styles from "../styles";
import { scale } from "../../../../Infrastructure/utils/screenUtility";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import LicensesorCertificationsDetails from "./LicensesorCertificationsDetails";
import TopicsCovered from "./TopicsCovered";
import RelatedDocument from "./RelatedDocument/RelatedDocument";
import LifeCycleAccordion from "../../../../Infrastructure/component/lifeCycleAccordion/LifeCycleAccordion";
import {
  sendCertificationsInfo,
  getCertificationsInfo,
} from "../../../../application/store/actions/student";
import { connect } from "react-redux";
import {
  getAuthToken,
  getBeneficiaryUserID,
} from "../../../../Infrastructure/utils/storageUtility";
import Toast from "react-native-simple-toast";
import Loader from "../../../../Infrastructure/component/Loader/Loader";
import EducationAccordion from "../../../../Infrastructure/component/EducatonAccordion/EducationAccordion";
const ValidationSchema = yup.object().shape({
  name: yup.string().required("Name Required"),
  subjects: yup.string(),
  institution: yup.string().required("Institution Required"),
  startDate: yup.string().required("Start Date Required"),
  endDate: yup.string().when("credential", {
    is: (credential) => credential === true,
    then: yup.string().required("End Date Required"),
  }),
});
const CertificationsDetails = (props) => {
  const [apidDataToShow, setApidDataToShow] = useState("");
  const [certificationsId, setCertificationsId] = useState();
  const [courseList, setCourseList] = useState(null);
  const [trainingDetailsToggle, setTrainingDetailsToggle] = useState(true);
  const [status, setStatus] = useState(false);
  const [licensesExpanded, setLicensesExpanded] = useState(true);
  const [relatedCoveredExpanded, setRelatedCoveredExpanded] = useState(false);
  const [relatedDocExpanded, setRelatedDocExpanded] = useState(false);
  const [trainingDisabled, setTrainingDisabled] = useState(false);
  const [relatedDisabled, setRelatedDisabled] = useState(
    props.route?.params?.item ? false : true,
  );
  const [relatedDcoDisabled, setRelatedDcoDisabled] = useState(
    props.route?.params?.item ? false : true,
  );
  const formSubmitHandler = async (formData) => {
    setStatus(true);
    const token = await getAuthToken();
    const beneficiaryId = await getBeneficiaryUserID();
    const payload = {
      id: props.route?.params?.item?.id
        ? props.route.params.item.id
        : certificationsId
        ? certificationsId
        : 0,
      name: formData.name,
      subjects: formData.subjects,
      institution: formData.institution,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    await props
      .sendCertificationsData(token, payload, beneficiaryId)
      .then((res) => {
        setApidDataToShow(res.data.profEducation);
        props
          .getCertificationsData(token, beneficiaryId)
          .then((res) => {
            setStatus(false);
          })
          .catch((e) => {
            setStatus(false);
          });
        setCourseList(res.data.profEducation[0]);
        setCertificationsId(res.data.profEducation[0].id);
        setLicensesExpanded(false);
        setRelatedCoveredExpanded(true);
        {
          props.route?.params?.item ? null : setRelatedDisabled(false);
        }
        Toast.show(res.message);
      })
      .catch((error) => {
        setStatus(false);
        Toast.show(error?.message ? error.message : "Something went wrong");
      });
  };
  const toggleExpand = (title) => {
    if (title == "Licenses or Certifications Details") {
      setLicensesExpanded(!licensesExpanded);
    } else if (title == "Topics Covered") {
      setRelatedCoveredExpanded(!relatedCoveredExpanded);
    } else if (title == "Related Documents") {
      setRelatedDocExpanded(!relatedDocExpanded);
    }
  };
  const courseToggle = () => {
    setRelatedCoveredExpanded(false), setRelatedDcoDisabled(false);
    setRelatedDocExpanded(true);
  };
  const trainingtoggleExpand = () => {
    setTrainingDetailsToggle(!trainingDetailsToggle);
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
              name: props.route?.params?.item?.name
                ? props.route.params.item.name
                : "",
              subjects: props.route?.params?.item?.subjects
                ? props.route.params.item.subjects
                : "",
              institution: props.route?.params?.item?.institution
                ? props.route.params.item.institution
                : "",
              startDate: props.route?.params?.item?.startDate
                ? props.route.params.item.startDate
                : "",
              endDate: props.route?.params?.item?.endDate
                ? props.route.params.item.endDate
                : "",
              credential:
                props.route?.params?.item?.endDate === null ? false : true,
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
                  <View style={styles.dashedLine} />

                  <EducationAccordion
                    title={"Licenses or Certifications Details"}
                    data={
                      <LicensesorCertificationsDetails
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
                        trainingtoggleExpand={trainingtoggleExpand}
                      />
                    }
                    style={{
                      body: { marginHorizontal: scale(10) },
                    }}
                    expanded={licensesExpanded}
                    removeEdit={true}
                    toggleExpand={toggleExpand}
                    disabled={trainingDisabled}
                  />
                  <View style={styles.dashedLine} />

                  <EducationAccordion
                    title={"Topics Covered"}
                    data={
                      <TopicsCovered
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
                    expanded={relatedCoveredExpanded}
                    toggleExpand={toggleExpand}
                    disabled={relatedDisabled}
                  />
                  <View style={styles.dashedLine} />

                  <EducationAccordion
                    title={"Related Documents"}
                    data={
                      <RelatedDocument
                        values={values}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        isValid={isValid}
                        setFieldValue={setFieldValue}
                        certificationsId={
                          props.route?.params?.item?.id
                            ? props.route.params.item.id
                            : certificationsId
                            ? certificationsId
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
  sendCertificationsData: (authToken, payload, beneficiaryId) =>
    sendCertificationsInfo(authToken, payload, beneficiaryId),
  getCertificationsData: (authToken, beneficiaryId) =>
    getCertificationsInfo(authToken, beneficiaryId),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CertificationsDetails);
