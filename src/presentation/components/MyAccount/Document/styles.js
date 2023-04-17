import {StyleSheet, Dimensions} from 'react-native';
import {scale} from '../../../../Infrastructure/utils/screenUtility';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    paddingHorizontal: scale(10),
    paddingVertical: scale(20),
  },
  headerText: {
    fontSize: scale(16),
    color: '#4A4A4A',
    fontFamily: 'SourceSansPro-SemiBold',
    marginLeft: scale(10),
    marginTop: scale(10),
  },
  formInputTitle: {
    fontSize: scale(14),
    color: '#24262F',
    fontFamily: 'SourceSansPro-Regular',
  },
  documentText: {
    fontSize: scale(14),
    color: '#00A0DA',
    fontFamily: 'SourceSansPro-Regular',
  },
  buttonText: {
    color: '#FFFFFF',
  },
  dashedLine: {
    borderWidth: scale(0.6),
    borderStyle: 'solid',
    borderColor: '#0000000D',
    marginHorizontal: scale(10),
  },
  dropdown: {
    minHeight: scale(40),
    width: scale(333),
    borderRadius: scale(5),
    borderColor: '#C3D0DE',
    backgroundColor: null,
  },
});

export default styles;
