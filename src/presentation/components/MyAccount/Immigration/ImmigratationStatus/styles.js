import {StyleSheet, Dimensions} from 'react-native';
import {scale} from '../../../../../Infrastructure/utils/screenUtility';
const styles = StyleSheet.create({
  checkboxcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: scale(10),
    marginBottom: scale(5),
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
