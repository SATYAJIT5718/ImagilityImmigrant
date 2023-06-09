import {View, Platform, KeyboardAvoidingView, ScrollView} from 'react-native';
import React from 'react';
import styles from '../styles';
import {scale} from '../../../../Infrastructure/utils/screenUtility';
import {useRef, useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import Employment from './Employment/Employment';
import Clients from './Clients/Clients';
import ListOfDuties from './ListOfDuties/ListOfDuties';
import ToolsTechnologies from './ToolsTechnologies/ToolsTechnologies';
import RelatedDocument from './RelatedDocument/RelatedDocument';
import EducationAccordion from '../../../../Infrastructure/component/EducatonAccordion/EducationAccordion';

import {getAuthToken} from '../../../../Infrastructure/utils/storageUtility';

import {
  ExperienceDetails,
  fetchStateList,
  updateWorkDetails,
} from '../../../../application/store/actions/sponsorDetails';

const ValidationSchema = yup.object().shape({
  title: yup.string().nullable().required('Title Required'),
  type: yup.string().nullable().required('Employment Type Required'),

  enddate: yup.string().when('togglebox', {
    is: togglebox => togglebox !== true,
    then: yup.string().nullable().required('Employed To Required'),
  }),
  fromdate: yup.string().nullable().required('EmployedFrom Required'),
  curr: yup.string().nullable().required('Currancy'),
  salary: yup.string().nullable().required('Salary Required'),
  company: yup.string().nullable().required('Company Required'),
  AddressLine1: yup.string().nullable().required('AddressLine1 Required'),
  countrycode: yup.string().nullable().required('CountryName Required'),
  city: yup.string().nullable().required('City Required'),
  stateName: yup.string().nullable().required('stateName Required'),
  postalcode: yup.string().nullable().required('ZIP/postalcode Required'),
});
const WorkExperience = props => {
  const [loading, setLoading] = useState(false);
  const [initialId, setInitialId] = useState(
    props.route?.params?.item?.id ? props.route.params.item.id : null,
  );
  const reducer = props?.ExperienceList?.data
    ? props?.ExperienceList?.data
    : null;
  const filterData = reducer
    ? reducer.filter(item => item.id === initialId)
    : null;
  const routeData = filterData ? filterData[0] : null;
  const [employmentToggle, setEmploymentToggle] = useState(true);
  const [clientsToggle, setClientsToggle] = useState(false);
  const [listOfDutiesToggle, setListOfDutiesToggle] = useState(false);
  const [toolsTechnologiesToggle, setToolsTechnologiesToggle] = useState(false);
  const [relatedDocumentToggle, setRelatedDocumentToggle] = useState(false);
  const [employmentDisabled, setEmploymentDisabled] = useState(false);
  const beneficiaryInfo = props?.userInformation?.data;
  const [clientsDisabled, setClientsDisabled] = useState(
    initialId === null ? true : false,
  );
  const [listOfDutiesToggleDisabled, setListOfDutiesToggleDisabled] = useState(
    initialId === null ? true : false,
  );
  const [toolsTechnologiesToggleDisabled, settoolsTechnologiesToggleDisabled] =
    useState(initialId === null ? true : false);
  const [relatedDocumentToggleDisabled, setRelatedDocumentToggleDisabled] =
    useState(initialId === null ? true : false);
  const familyId = props?.indivisualFamilyInfo?.data?.id
    ? props.indivisualFamilyInfo.data.id
    : null;
  const formSubmitHandler = async formData => {
    let token = await getAuthToken();
    let beneficiaryID = beneficiaryInfo.id;

    const countryListData = props.CountryList.data
      ? props.CountryList.data
      : '';
    const phoneCountryData = countryListData.filter(
      country =>
        country.shortCountryCode === formData.countryName.toUpperCase(),
    );
    const officeCountryCode = phoneCountryData[0]?.countryCode
      ? phoneCountryData[0]?.countryCode
      : null;

    let date = formData?.enddate ? formData.enddate : null;
    let empEndDate = date === null ? '' : formData.enddate;
    let toggleEndDate = +formData.togglebox === 1 ? '' : empEndDate;
    console.log(initialId, 'intial value');
    const payload = {
      workExpDetailsReq: [
        {
          id: initialId || null,
          addressLine1: formData.AddressLine1 || null,
          addressLine2: formData.AddressLine2 || null,
          city: formData.city || null,
          companyName: formData.company || null,
          employmentType: formData.type || null,
          country: formData.countrycode || null,
          countryCode: formData.countrycode || null,
          currency: formData.curr || null,
          designation: formData.title || null,
          isCurrentRole: +formData.togglebox || 0,
          mobileCountryCode: null,
          mobileNo: null,
          officeCountryCode: officeCountryCode || null,
          officeNo: formData.phoneNumber || null,
          salary: Number(formData.salary) || null,
          startDate: formData.fromdate || null,
          endDate: toggleEndDate || null,
          stateProvinceCode: formData.stateCode || null,
          stateProvinceName: formData.stateName || null,
          workExpDetailId: initialId || null,
          zipCode: formData.postalcode || null,
          duty: null,
          subDutyDescription: null,
          skillName: null,
          jobDuties: routeData?.jobDuties || null,
          tools: routeData?.tools || null,
          clients: routeData?.clients || null,
        },
      ],
    };
    console.log(payload, 'payload');

    setLoading(true);
    props
      .saveWorkDetails(token, beneficiaryID, payload, familyId)
      .then(async res => {
        Toast.show(res.message, Toast.LONG);
        setInitialId(res.data.workExpDetailsReq[0].id);
        setClientsDisabled(false),
          setListOfDutiesToggleDisabled(false),
          settoolsTechnologiesToggleDisabled(false),
          setRelatedDocumentToggleDisabled(false);
        props
          .getExperience(token, beneficiaryID, familyId)
          .then(async res => {
            setLoading(false);
            setClientsToggle(true);
            setEmploymentToggle(false);
          })
          .catch(e => {
            console.log('error', e);
            setLoading(false);
          });
      })
      .catch(e => {
        console.log('error', e);
        setLoading(false);
      });
  };
  const clientAccordion = () => {
    setListOfDutiesToggle(true);
    setClientsToggle(false);
  };
  const dutiesAccordion = () => {
    setToolsTechnologiesToggle(true);
    setListOfDutiesToggle(false);
  };
  const toolsAccordion = () => {
    setRelatedDocumentToggle(true);
    setToolsTechnologiesToggle(false);
  };
  const toggleExpand = title => {
    if (title == 'Employment') {
      setEmploymentToggle(!employmentToggle);
    } else if (title == 'Clients') {
      setClientsToggle(!clientsToggle);
    } else if (title == 'List of Duties') {
      setListOfDutiesToggle(!listOfDutiesToggle);
    } else if (title == 'Tools & Technologies') {
      setToolsTechnologiesToggle(!toolsTechnologiesToggle);
    } else if (title == 'Related Documents') {
      setRelatedDocumentToggle(!relatedDocumentToggle);
    }
  };
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1, backgroundColor: '#ffff'}}>
        <Formik
          initialValues={{
            enddate: routeData?.endDate || '',
            fromdate: routeData?.startDate || '',
            title: routeData?.designation || '',
            type: routeData?.employmentType?.code || '',
            curr: routeData?.currency || '',
            salary: routeData?.salary?.toString() || '',
            company: routeData?.companyName || '',
            phoneNumber: routeData?.officeNo || '',
            AddressLine1: routeData?.addressLine1 || '',
            AddressLine2: routeData?.addressLine2 || '',
            togglebox: Boolean(routeData?.isCurrentRole) || '',
            countryName: routeData?.countryCode || '',
            countrycode: routeData?.countryCode || '',
            stateName: routeData?.stateProvinceName || '',
            stateCode: routeData?.stateProvinceCode || '',
            city: routeData?.city || '',
            postalcode: routeData?.zipCode || '',
          }}
          enableReinitialize={true}
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={values => formSubmitHandler(values)}
          validationSchema={ValidationSchema}>
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
              <ScrollView
                ContentContainerStyle={{
                  backgroundColor: '#ffff',
                }}>
                <View style={styles.dashedLine} />
                <EducationAccordion
                  title={'Employment'}
                  data={
                    <Employment
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
                    body: {marginHorizontal: scale(10)},
                  }}
                  removeEdit={true}
                  expanded={employmentToggle}
                  toggleExpand={toggleExpand}
                  disabled={employmentDisabled}
                />
                <View style={styles.dashedLine} />
                <EducationAccordion
                  title={'Clients'}
                  data={
                    <Clients
                      routeData={initialId}
                      toggleAccordion={clientAccordion}
                    />
                  }
                  style={{
                    body: {marginHorizontal: scale(10)},
                  }}
                  removeEdit={true}
                  expanded={clientsToggle}
                  toggleExpand={toggleExpand}
                  disabled={clientsDisabled}
                />
                <View style={styles.dashedLine} />
                <EducationAccordion
                  title={'List of Duties'}
                  data={
                    <ListOfDuties
                      routeData={initialId}
                      toggleAccordion={dutiesAccordion}
                    />
                  }
                  style={{
                    body: {marginHorizontal: scale(10)},
                  }}
                  removeEdit={true}
                  expanded={listOfDutiesToggle}
                  toggleExpand={toggleExpand}
                  disabled={listOfDutiesToggleDisabled}
                />
                <View style={styles.dashedLine} />
                <EducationAccordion
                  title={'Tools & Technologies'}
                  data={
                    <ToolsTechnologies
                      routeData={initialId}
                      toggleAccordion={toolsAccordion}
                    />
                  }
                  style={{
                    body: {marginHorizontal: scale(10)},
                  }}
                  removeEdit={true}
                  expanded={toolsTechnologiesToggle}
                  toggleExpand={toggleExpand}
                  disabled={toolsTechnologiesToggleDisabled}
                />
                <View style={styles.dashedLine} />
                <EducationAccordion
                  title={'Related Documents'}
                  data={<RelatedDocument routeData={initialId} />}
                  style={{
                    body: {marginHorizontal: scale(10)},
                  }}
                  removeEdit={true}
                  expanded={relatedDocumentToggle}
                  toggleExpand={toggleExpand}
                  disabled={relatedDocumentToggleDisabled}
                />
                <View style={styles.dashedLine} />
              </ScrollView>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </>
  );
};

const mapStateToProps = ({
  sponsorDetailsReducer: {ExperienceList},
  beneficiaryFamilyReducer: {indivisualFamilyInfo},
  timeLine: {userInformation, CountryList},
}) => ({
  ExperienceList,
  CountryList,
  indivisualFamilyInfo,
  userInformation,
});
const mapDispatchToProps = {
  saveWorkDetails: (token, beneficiaryId, payload, familyId) =>
    updateWorkDetails(token, beneficiaryId, payload, familyId),
  getExperience: (token, beneficiaryId, familyId) =>
    ExperienceDetails(token, beneficiaryId, familyId),
  getstate: code => fetchStateList(code),
};
export default connect(mapStateToProps, mapDispatchToProps)(WorkExperience);
