import {StyleSheet} from 'react-native';
import {scale} from '../../../../Infrastructure/utils/screenUtility';
import colors from '../../../../Infrastructure/assets/colors/colors';
const styles = StyleSheet.create({
  formInputData: {
    color: '#4A4A4A',
    fontSize: scale(16),
    fontFamily: 'SourceSansPro-Regular',
  },
  btn: {
    backgroundColor: '#00A0DA',
    height: scale(54),
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btntext: {
    color: colors.mainWhite,
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: scale(18),
  },
  inputdropdown: {
    borderRadius: scale(5),
    borderColor: '#C3D0DE',
    minHeight: scale(40),
    marginTop: scale(5),
  },
  errorMessage: {
    fontSize: scale(10),
    color: 'red',
  },
});

export default styles;
