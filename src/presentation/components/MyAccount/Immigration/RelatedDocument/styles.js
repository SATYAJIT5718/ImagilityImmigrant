import { StyleSheet, Dimensions } from "react-native";
import { scale } from "../../../../../Infrastructure/utils/screenUtility";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputdropdown: {
    borderRadius: scale(5),
    borderColor: "#C3D0DE",
    minHeight: scale(40),
    marginTop: scale(5),
    marginBottom: scale(10),
  },
  formInputTitle: {
    fontSize: scale(14),
    color: "#24262F",
    fontFamily: "SourceSansPro-Regular",
  },
  documentText: {
    fontSize: scale(14),
    color: "#00A0DA",
    fontFamily: "SourceSansPro-Regular",
  },
  buttonText: {
    color: "#FFFFFF",
  },
  dashedLine: {
    borderWidth: scale(0.6),
    borderStyle: "solid",
    borderColor: "#0000000D",
    marginHorizontal: scale(10),
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(15),
    borderRadius: scale(5),
  },
});

export default styles;
