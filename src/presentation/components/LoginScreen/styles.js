import {StyleSheet} from 'react-native';
import {scale} from '../../../Infrastructure/utils/screenUtility';
const styles = StyleSheet.create({
  forgotContent: {
    marginTop: scale(16),
  },
  linkText: {
    textDecorationLine: 'underline',
    fontSize: scale(14),
    color: '#00A0DA',
    fontFamily: 'SourceSansPro-Regular',
  },
  loginButton: {
    backgroundColor: '#349beb',
    height: scale(40),
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scale(20),
  },
  errorMessage: {
    fontSize: scale(11),
    fontFamily: 'SourceSansPro-Regular',
    color: 'red',
    marginLeft: scale(5),
    marginBottom: scale(5),
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
  header: {
    color: '#818181',
    fontSize: scale(16),
    fontFamily: 'SourceSansPro-Regular',
    marginBottom: scale(10),
  },
  registerButton: {
    borderColor: '#00A0DA',
    borderWidth: 1,
    borderRadius: 4,
    width: scale(120),
    height: scale(40),
    marginLeft: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(10),
  },
});
export default styles;
