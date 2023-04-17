import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import React from "react";
import styles from "../styles";
import { scale } from "../../../../Infrastructure/utils/screenUtility";
import { useRef, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Toast from "react-native-simple-toast";
import moment from "moment";
import { connect } from "react-redux";
import VisaDetails from "./VisaDetails/VisaDetails";
import USStayHistory from "./USStayHistory/USStayHistory";
import RelatedDocument from "./RelatedDocument/RelatedDocument";
import EducationAccordion from "../../../../Infrastructure/component/EducatonAccordion/EducationAccordion";
import {
  getBeneficiaryUserID,
  getAuthToken,
} from "../../../../Infrastructure/utils/storageUtility";
import {
  updateImmigratationSelf,
  fetchImmigratationSelf,
} from "../../../../application/store/actions/student";

const SpaceRegex = /^\S*$/;
const ValidationSchema = yup.object().shape({
  visaType: yup.string().nullable().required("Visa Required"),
  petitionername: yup.string().nullable().required("Petitioner Name Required"),
  approveDate: yup.string().when("outcome", {
    is: (outcome) => outcome === "VSAAPP",
    then: yup.string().nullable().required("Approval Date Required"),
  }),
  validityStartDate: yup.string().when("outcome", {
    is: (outcome) => outcome === "VSAAPP",
    then: yup.string().nullable().required("Validity Start Date Required"),
  }),
  validityEnddate: yup.string().when("outcome", {
    is: (outcome) => outcome === "VSAAPP",
    then: yup.string().nullable().required("Validity End Date Required"),
  }),
  ead: yup.string().when("outcome", {
    is: (outcome) => outcome === "VSAAPP",
    then: yup.string().when("toggleboxEAD", {
      is: (toggleboxEAD) => toggleboxEAD !== true,
      then: yup.string().nullable().required("EAD Number Required"),
    }),
  }),
  sevis: yup.string().when("outcome", {
    is: (outcome) => outcome === "VSAAPP",
    then: yup.string().when("toggleboxSEVIS", {
      is: (toggleboxSEVIS) => toggleboxSEVIS !== true,
      then: yup.string().nullable().required("SAVIS Number Required"),
    }),
  }),
  Denial: yup.string().when("outcome", {
    is: (outcome) => outcome === "VSADENY",
    then: yup.string().nullable().required("Denial Reason Required"),
  }),
  denialdate: yup.string().when("outcome", {
    is: (outcome) => outcome === "VSADENY",
    then: yup.string().nullable().required("Denial Date Required"),
  }),
  Withdrawn: yup.string().when("outcome", {
    is: (outcome) => outcome === "VSAWTDN",
    then: yup.string().nullable().required("Denial Date Required"),
  }),
  WithdrawnDate: yup.string().when("outcome", {
    is: (outcome) => outcome === "VSAWTDN",
    then: yup.string().nullable().required("Withdrawn Date Required"),
  }),
});

const Immigration = (props) => {
  const [loading, setLoading] = useState(false);
  const [initialId, setInitialId] = useState(
    props?.immigratationId ? props.immigratationId : null
  );

  const reducer = props?.immigratationList?.data
    ? props?.immigratationList?.data
    : null;
  const filterData = reducer
    ? reducer.filter((item) => item.id === initialId)
    : null;
  const routeData = filterData ? filterData[0] : null;

  const [employmentToggle, setEmploymentToggle] = useState(true);
  const [clientsToggle, setClientsToggle] = useState(false);
  const [relatedDocumentToggle, setRelatedDocumentToggle] = useState(false);
  const [employmentDisabled, setEmploymentDisabled] = useState(false);
  const [clientsDisabled, setClientsDisabled] = useState(
    initialId === null ? true : false
  );
  const [relatedDocumentToggleDisabled, setRelatedDocumentToggleDisabled] =
    useState(initialId === null ? true : false);
  const formSubmitHandler = async (formData) => {
    let token = await getAuthToken();
    let beneficiaryID = await getBeneficiaryUserID();
    let outputDate =
      formData.outcome === "VSADENY"
        ? formData.denialdate
        : formData.outcome === "VSAAPP"
        ? formData.approveDate
        : formData.outcome === "VSAWTDN"
        ? formData.WithdrawnDate
        : null;
    let toggleEad = formData.toggleboxEAD === true ? 1 : 0;
    let toggleSEVIS = formData.toggleboxSEVIS === true ? 1 : 0;
    let travelUS = formData.usedvisa === "YES" ? true : false;
    let toggleUS = formData.toggleboxUS === true ? 1 : 0;
    let outcomeReason =
      formData.outcome === "VSADENY"
        ? formData.Denial
        : formData.outcome === "VSAWTDN"
        ? formData.Withdrawn
        : null;

    console.log(initialId, "intial value");
    const payload = {
      id: initialId || 0,
      immigrationStatusCode: formData.visaType || null,
      immigrationStatusName: routeData?.immigrationStatusName || null,
      receiptDate: formData.receiptDate || null,
      noticeNo: formData.Receipt || "",
      companyName: formData.petitionername || "",
      companyId: routeData?.companyId || 0,
      isEadNo: toggleEad || 0,
      eadNo: formData.ead || "",
      isSevisNo: toggleSEVIS || 0,
      sevisNo: formData.sevis || "",
      validityStartDate: formData.validityStartDate || null,
      validityEndDate: formData.validityEnddate || null,
      outcomeIdCode: formData.outcome || null,
      outcomeIdName: routeData?.outcomeIdName || null,
      outcomeReason: outcomeReason || "",
      outcomeDate: outputDate || null,
      familyId: routeData?.familyId || null,
      beneficiaryId: Number(beneficiaryID) || null,
      ssnNo: routeData?.ssnNo || null,
      isSsnNo: routeData?.isSsnNo || null,
      travelInfo: routeData?.travelInfo || [],
      documentList: routeData?.documentList || [],
      statusId: routeData?.statusId || 0,
      hasTravelToUs: travelUS || false,
      petitionTypeCode: formData.petitionType || "",
      petitionTypeName: routeData?.petitionTypeName || null,
      immigrationDays: routeData?.immigrationDays || null,
      immigrationInUS: routeData?.immigrationInUS || null,
      currentlyStayInUS: toggleUS || false,
    };
    console.log(payload, "payload");

    setLoading(true);
    props
      .updateImmigratation(token, beneficiaryID, payload)
      .then(async (res) => {
        Toast.show(res.message, Toast.LONG);
        console.log(res.data, "post Data________________________________");
        setInitialId(res.data.id);
        setClientsDisabled(false), setRelatedDocumentToggleDisabled(false);
        props
          .fetchImmigratation(token, beneficiaryID)
          .then(async (res) => {
            setLoading(false);
            initialId === null ? null : setClientsDisabled(false),
              setRelatedDocumentToggleDisabled(false);
            payload.hasTravelToUs === true
              ? setClientsToggle(true)
              : setRelatedDocumentToggle(true);
            setEmploymentToggle(false);
            console.log(initialId, "initialId");
            console.log(
              "get Data---------------------------------------",
              res.data
            );
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
  const clientAccordion = () => {
    console.log("fire");
    setRelatedDocumentToggle(true);
    setClientsToggle(false);
  };

  const toggleExpand = (title) => {
    if (title == "Visa Details") {
      setEmploymentToggle(!employmentToggle);
    } else if (title == "US. Stay History") {
      setClientsToggle(!clientsToggle);
    } else if (title == "Related Documents") {
      setRelatedDocumentToggle(!relatedDocumentToggle);
    }
  };

  console.log("routeData", routeData);
  return (
    <>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1, backgroundColor: "green" }}
      > */}
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "#fff",
          flexGrow: 1,
        }}
      >
        <Formik
          initialValues={{
            visaType: routeData?.immigrationStatusCode || "",
            petitionType: routeData?.petitionTypeCode || "",
            petitionername: routeData?.companyName || "",
            outcome: routeData?.outcomeIdCode || "VSPROCESS",
            Receipt: routeData?.noticeNo || "",
            receiptDate: routeData?.receiptDate || "",
            approveDate: routeData?.outcomeDate || "",
            validityStartDate: routeData?.validityStartDate || "",
            validityEnddate: routeData?.validityEndDate || "",
            ead: routeData?.eadNo || "",
            toggleboxEAD: Boolean(routeData?.isEadNo) || "",
            sevis: routeData?.sevisNo || "",
            toggleboxSEVIS: Boolean(routeData?.isSevisNo) || "",
            usedvisa: routeData?.hasTravelToUs === true ? "YES" : "NO" || "NO",
            toggleboxUS: Boolean(routeData?.currentlyStayInUS) || "",
            Denial: routeData?.outcomeReason || "",
            denialdate: routeData?.outcomeDate || "",
            Withdrawn: routeData?.outcomeReason || "",
            WithdrawnDate: routeData?.outcomeDate || "",
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
              <View style={styles.dashedLine} />
              <EducationAccordion
                title={"Visa Details"}
                data={
                  <VisaDetails
                    values={values}
                    errors={errors}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    touched={touched}
                    isValid={isValid}
                    setFieldValue={setFieldValue}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    routeData={routeData}
                  />
                }
                style={{
                  body: { marginHorizontal: scale(10) },
                }}
                removeEdit={true}
                expanded={employmentToggle}
                toggleExpand={toggleExpand}
                disabled={employmentDisabled}
              />
              <View style={styles.dashedLine} />
              {values.usedvisa === "YES" ? (
                <>
                  <EducationAccordion
                    title={"US. Stay History"}
                    data={
                      <USStayHistory
                        routeData={initialId}
                        toggle={clientAccordion}
                        toggleAccordion={clientAccordion}
                        validityStartDate={
                          routeData?.validityStartDate
                            ? routeData?.validityStartDate
                            : ""
                        }
                        validityEndDate={
                          routeData?.validityEndDate
                            ? routeData?.validityEndDate
                            : ""
                        }
                      />
                    }
                    style={{
                      body: { marginHorizontal: scale(10) },
                    }}
                    removeEdit={true}
                    expanded={clientsToggle}
                    toggleExpand={toggleExpand}
                    disabled={clientsDisabled}
                  />
                  <View style={styles.dashedLine} />
                </>
              ) : null}
              <EducationAccordion
                title={"Related Documents"}
                data={<RelatedDocument routeData={initialId} />}
                style={{
                  body: { marginHorizontal: scale(10) },
                }}
                removeEdit={true}
                expanded={relatedDocumentToggle}
                toggleExpand={toggleExpand}
                disabled={relatedDocumentToggleDisabled}
              />
              <View style={styles.dashedLine} />
            </>
          )}
        </Formik>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </>
  );
};

const mapStateToProps = ({ studentReducer: { immigratationList } }) => ({
  immigratationList,
});
const mapDispatchToProps = {
  updateImmigratation: (token, beneficiaryId, payload) =>
    updateImmigratationSelf(token, beneficiaryId, payload),
  fetchImmigratation: (token, beneficiaryId) =>
    fetchImmigratationSelf(token, beneficiaryId),
  getstate: (code) => fetchStateList(code),
};
export default connect(mapStateToProps, mapDispatchToProps)(Immigration);
