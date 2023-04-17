import { StyleSheet } from "react-native";
import { scale } from "../../../../../Infrastructure/utils/screenUtility";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    padding: scale(10),
  },
  text: {
    fontFamily: "SourceSansPro-Regular",
    fontSize: scale(14),
    color: "#4D4F5C",
  },
  textHead: {
    fontFamily: "SourceSansPro-Regular",
    fontSize: scale(16),
    color: "#24262F",
    // marginBottom: scale(5),
    marginTop: scale(10),
  },
  textHeadBold: {
    fontFamily: "SourceSansPro-SemiBold",
    fontSize: scale(16),
    color: "#4D4F5C",
  },
  dropdown: {
    height: scale(40),
    marginTop: scale(5),
    marginBottom: scale(10),
    borderRadius: scale(4),
    borderColor: "#C3D0DE",
    zIndex: 100,
  },
  dropdownText: {
    fontSize: scale(15.8),
    fontFamily: "SourceSansPro-Regular",
    color: "#3F3356",
  },
  input: {
    fontSize: scale(18),
    fontFamily: "SourceSansPro-Regular",
    color: "red",
  },
  errorMessage: {
    fontSize: scale(10),
    color: "red",
  },
  dashedLine: {
    borderWidth: scale(0.9),
    borderStyle: "dashed",
    borderColor: "#C3D0DE",
    marginHorizontal: scale(5),
    marginVertical: scale(5),
  },
  radioTitle: {
    fontFamily: "SourceSansPro-Regular",
    fontSize: scale(14),
    color: "#4D4F5C",
  },
  formInputTitle: {
    fontFamily: "SourceSansPro-Regular",
    fontSize: scale(14),
    color: "#2C2C2C",
  },
  infotext: {
    fontFamily: "SourceSansPro-Regular",
    fontSize: scale(14),
    color: "#2C2C2C",
    marginTop: scale(5),
  },
});

export default styles;
