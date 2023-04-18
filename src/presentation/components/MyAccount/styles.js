import {StyleSheet} from 'react-native';
import {scale} from '../../../Infrastructure/utils/screenUtility';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  texttitle: {
    fontSize: scale(16),
    color: '#4A4A4A',
    fontFamily: 'SourceSansPro-SemiBold',
  },
  formContent: {
    flexDirection: 'row',
    flex: 1,
    marginTop: scale(5),
  },
  dropdown: {
    height: scale(40),
    width: scale(100),
    borderRadius: scale(5),
    borderColor: '#C3D0DE',
    backgroundColor: null,
  },
  inputdropdown: {
    borderRadius: scale(5),
    borderColor: '#C3D0DE',
    height: scale(40),
    marginTop: scale(5),
    marginBottom: scale(10),
    // backgroundColor: null,
  },
  input: {
    flex: 1,
  },
  bodyText: {
    fontSize: scale(12),
    color: '#4A4A4A',
    fontFamily: 'SourceSansPro-Regular',
    marginTop: scale(10),
  },
  flexDropdown: {
    height: scale(40),
    borderRadius: scale(5),
    borderColor: '#C3D0DE',
    backgroundColor: null,
    textColor: '#24262F',
  },
  formInputTitle: {
    fontSize: scale(14),
    color: '#24262F',
    fontFamily: 'SourceSansPro-Regular',
    marginTop: scale(10),
  },
  formInputData: {
    color: '#4A4A4A',
    fontSize: scale(16),
    fontFamily: 'SourceSansPro-SemiBold',
  },
  formInput: {
    marginTop: scale(5),
  },
  footerBottonText: {color: '#FFF'},
  errorMessage: {
    fontSize: scale(10),
    color: 'red',
  },
  buttonText: {
    color: '#fff',
  },
  barLine: {
    marginVertical: scale(10),
    marginRight: scale(20),
    borderWidth: scale(0.7),
    borderStyle: 'solid',
    borderColor: '#EDEDED',
  },
  dashedLine: {
    borderWidth: scale(0.9),
    borderStyle: 'dashed',
    borderColor: '#C3D0DE',
    marginHorizontal: scale(10),
    marginVertical: scale(5),
  },
  documentNameText: {
    color: '#10A0DA',
    fontSize: scale(12),
    fontFamily: 'SourceSansPro-Regular',
  },
  documentTypeText: {
    color: '#24262F',
    fontSize: scale(14),
    fontFamily: 'SourceSansPro-Regular',
  },

  radioTitle: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(14),
    color: '#4A4A4A',
  },
  multilineTextInput: {
    height: scale(60),
    marginTop: scale(5),
    borderWidth: 1,
    borderColor: '#C3D0DE',
    borderRadius: 4,
    padding: scale(10),
    color: '#24262F',
  },
  singleLineTextInput: {
    height: scale(40),
    marginTop: scale(5),
    borderWidth: 1,
    borderColor: '#C3D0DE',
    borderRadius: 4,
    paddingLeft: scale(10),
    textColor: '#24262F',
  },
  documentText: {
    color: '#10A0DA',
    fontSize: scale(12),
    fontFamily: 'SourceSansPro-Regular',
  },
  subTitle: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(14),
    color: '#4A4A4A',
  },
});

export default styles;
