import {StyleSheet} from 'react-native';
import {scale} from '../../../../../Infrastructure/utils/screenUtility';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    padding: scale(10),
  },
  text: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(14),
    color: '#4D4F5C',
  },
  textHead: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(16),
    color: '#24262F',
  },
  textHeadBold: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: scale(18),
    color: '#4D4F5C',
  },
  dropdown: {
    minHeight: scale(40),
    marginTop: scale(5),
    marginBottom: scale(10),
    borderRadius: scale(4),
    borderColor: '#C3D0DE',
    zIndex: 100,
  },
  dropdownText: {
    fontSize: scale(15.8),
    fontFamily: 'SourceSansPro-Regular',
    color: '#3F3356',
  },
  input: {
    fontSize: scale(18),
    fontFamily: 'SourceSansPro-Regular',
    color: 'red',
  },
  errorMessage: {
    fontSize: scale(10),
    color: 'red',
  },
  TextInput: {
    marginTop: scale(5),
    borderRadius: 4,
    borderColor: '#C3D0DE',
    borderWidth: 1,
    height: scale(40),
    fontSize: scale(14),
    fontFamily: 'SourceSansPro-Regular',
    paddingHorizontal: scale(10),
    color: '#4D4F5C',
  },
});

export default styles;
