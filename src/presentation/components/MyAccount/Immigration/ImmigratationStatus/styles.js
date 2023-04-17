import { StyleSheet, Dimensions } from "react-native";
import { scale } from "../../../../../Infrastructure/utils/screenUtility";
const styles = StyleSheet.create({
  checkboxcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: scale(10),
    marginBottom: scale(5),
  },
  errorMessage: {
    fontSize: scale(10),
    color: "red",
  },
});

export default styles;
