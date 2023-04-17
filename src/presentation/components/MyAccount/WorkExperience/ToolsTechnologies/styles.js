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
  },
  bodyText: {
    fontFamily: "SourceSansPro-Regular",
    fontSize: scale(14),
    color: "#24262F",
  },
  textHeadBold: {
    fontFamily: "SourceSansPro-SemiBold",
    fontSize: scale(18),
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
});

export default styles;
