import {StyleSheet} from 'react-native';
import {scale} from '../../../../../Infrastructure/utils/screenUtility';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: scale(10),
  },
  bodycontainer: {
    flex: 1,
    flexDirection: 'column',
  },
  body: {
    flexDirection: 'row',
    backgroundColor: '#EDF4FB',
    height: scale(56),
  },
  inputdropdown: {
    borderRadius: scale(5),
    borderColor: '#C3D0DE',
    minHeight: scale(40),
    marginTop: scale(5),
    marginBottom: scale(10),
  },
  formInputTitle: {
    fontSize: scale(14),
    color: '#2C2C2C',
    fontFamily: 'SourceSansPro-SemiBold',
  },
  accordianBodyText: {
    fontSize: scale(14),
    color: '#4A4A4A',
    fontFamily: 'SourceSansPro-Light',
  },
  yearText: {
    fontSize: scale(16),
    color: '#4A4A4A',
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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(15),
    borderRadius: scale(5),
  },
  buttontext: {
    fontSize: scale(16),
    fontFamily: 'SourceSansPro-SemiBold',
    color: '#FFFFFF',
  },
  noDataText: {
    fontSize: scale(16),
    color: '#A6A7AE',
    fontFamily: 'SourceSansPro-Regular',
  },
  noDataTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(45),
  },
});

export default styles;
