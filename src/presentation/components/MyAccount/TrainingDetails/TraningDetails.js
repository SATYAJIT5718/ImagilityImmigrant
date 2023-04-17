import {View, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import React from 'react';
import styles from '../styles';
import {scale} from '../../../../Infrastructure/utils/screenUtility';
import {useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import Training from './Training';
import TopicsCovered from './TopicsCovered';
import RelatedDocument from './RelatedDocument/RelatedDocument';
import {
  sendTrainingInfo,
  getTrainingInfo,
} from '../../../../application/store/actions/sponsorDetails';
import {connect} from 'react-redux';
import {
  getAuthToken,
  getBeneficiaryUserID,
} from '../../../../Infrastructure/utils/storageUtility';
import Toast from 'react-native-simple-toast';
import Loader from '../../../../Infrastructure/component/Loader/Loader';
import EducationAccordion from '../../../../Infrastructure/component/EducatonAccordion/EducationAccordion';

const ValidationSchema = yup.object().shape({
  name: yup.string().required('Name Required'),
  subjects: yup.string(),
  institution: yup.string().required('Institution Required'),

  startDate: yup.string().required('Start Date Required'),
  endDate: yup.string().required('End Date Required'),
});
const TrainingDetails = props => {
  const [apidDataToShow, setApidDataToShow] = useState('');
  const [trainingId, setTrainingId] = useState();
  const [courseList, setCourseList] = useState(null);
  const [status, setStatus] = useState(false);
  const [trainingExpanded, setTrainingExpanded] = useState(true);
  const [relatedCoveredExpanded, setRelatedCoveredExpanded] = useState(false);
  const [relatedDocExpanded, setRelatedDocExpanded] = useState(false);
  const [trainingDisabled, setTrainingDisabled] = useState(false);
  const [relatedDisabled, setRelatedDisabled] = useState(
    props.route?.params?.item ? false : true,
  );
  const [relatedDcoDisabled, setRelatedDcoDisabled] = useState(
    props.route?.params?.item ? false : true,
  );
  const beneficiaryInfo = props?.userInformation?.data;
  const familyId = props?.indivisualFamilyInfo?.data?.id
    ? props.indivisualFamilyInfo.data.id
    : null;
  const formSubmitHandler = async formData => {
    setStatus(true);
    const token = await getAuthToken();
    const beneficiaryId = beneficiaryInfo.id;
    const payload = {
      id: props.route?.params?.item?.id
        ? props.route.params.item.id
        : trainingId
        ? trainingId
        : 0,
      name: formData.name,
      subjects: formData.subjects,
      institution: formData.institution,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    await props
      .sendTrainingData(token, payload, beneficiaryId, familyId)
      .then(res => {
        console.log('ress-train', res);
        setApidDataToShow(res.data.profEducation);
        props
          .getTrainindData(token, beneficiaryId, familyId)
          .then(res => {
            setStatus(false);
            console.log('getTrainingInfo---res', res.data);
          })
          .catch(e => {
            setStatus(false);
            console.log('getTrainingInfo-erro', e);
          });
        setCourseList(res.data.profEducation[0]);
        setTrainingExpanded(false);
        setRelatedCoveredExpanded(true);
        {
          props.route?.params?.item ? null : setRelatedDisabled(false);
        }
        Toast.show(res.message), setTrainingId(res.data.profEducation[0].id);
      })
      .catch(error => {
        setStatus(false);
        Toast.show(error.message ? error.message : 'Something went wrong'),
          console.log('SendaEduData-Error--------', error);
      });
  };
  const toggleExpand = title => {
    if (title == 'Training Details') {
      setTrainingExpanded(!trainingExpanded);
    } else if (title == 'Topics Covered') {
      setRelatedCoveredExpanded(!relatedCoveredExpanded);
    } else if (title == 'Related Documents') {
      setRelatedDocExpanded(!relatedDocExpanded);
    }
  };
  const courseToggle = () => {
    setRelatedCoveredExpanded(false), setRelatedDcoDisabled(false);
    setRelatedDocExpanded(true);
  };
  return (
    <>
      <Loader status={status} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{
          flex: 1,
          paddingHorizontal: scale(10),
          paddingVertical: scale(10),
          backgroundColor: '#FFFFFF',
        }}>
        <ScrollView>
          <Formik
            initialValues={{
              name: props.route?.params?.item?.name
                ? props.route.params.item.name
                : '',
              subjects: props.route?.params?.item?.subjects
                ? props.route.params.item.subjects
                : '',
              institution: props.route?.params?.item?.institution
                ? props.route.params.item.institution
                : '',
              startDate: props.route?.params?.item?.startDate
                ? props.route.params.item.startDate
                : '',
              endDate: props.route?.params?.item?.endDate
                ? props.route.params.item.endDate
                : '',
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
                <View>
                  <View style={styles.dashedLine} />

                  <EducationAccordion
                    title={'Training Details'}
                    data={
                      <Training
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
                            : ''
                        }
                      />
                    }
                    style={{
                      body: {marginHorizontal: scale(10)},
                    }}
                    expanded={trainingExpanded}
                    removeEdit={true}
                    toggleExpand={toggleExpand}
                    disabled={trainingDisabled}
                  />
                  <View style={styles.dashedLine} />

                  <EducationAccordion
                    title={'Topics Covered'}
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
                      body: {marginHorizontal: scale(10)},
                    }}
                    removeEdit={true}
                    expanded={relatedCoveredExpanded}
                    toggleExpand={toggleExpand}
                    disabled={relatedDisabled}
                  />
                  <View style={styles.dashedLine} />

                  <EducationAccordion
                    title={'Related Documents'}
                    data={
                      <RelatedDocument
                        profEducationId={
                          props.route?.params?.item?.id
                            ? props.route.params.item.id
                            : trainingId
                            ? trainingId
                            : ''
                        }
                      />
                    }
                    style={{
                      body: {marginHorizontal: scale(10)},
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

const mapStateToProps = ({
  beneficiaryFamilyReducer: {indivisualFamilyInfo},
  timeLine: {userInformation},
}) => ({
  userInformation,
  indivisualFamilyInfo,
});

const mapDispatchToProps = {
  sendTrainingData: (authToken, payload, beneficiaryId, familyId) =>
    sendTrainingInfo(authToken, payload, beneficiaryId, familyId),
  getTrainindData: (authToken, beneficiaryId, familyId) =>
    getTrainingInfo(authToken, beneficiaryId, familyId),
};

export default connect(mapStateToProps, mapDispatchToProps)(TrainingDetails);
