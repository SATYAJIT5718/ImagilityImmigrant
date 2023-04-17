import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TrianingTimelineView from "./TrianingTimelineView";
import TrianingListView from "./TrianingListView";
import { scale } from "../../../../../Infrastructure/utils/screenUtility";
const Tab = createMaterialTopTabNavigator();
const TrianingDetailsListView = () => {
  return (
    <>
      <Tab.Navigator
        activeColor="#4D4F5C"
        initialRouteName="Timeline View"
        screenOptions={{
          tabBarActiveTintColor: "#00A0DA",
          tabBarInactiveTintColor: "#4D4F5C",
          tabBarIndicatorStyle: {
            borderBottomColor: "#00A0DA",
            borderBottomWidth: 4,
          },
          tabBarLabelStyle: {
            fontSize: scale(14),
            fontFamily: "SourceSansPro-SemiBold",
            textTransform: "none",
          },
          tabBarIconStyle: {
            position: "absolute",
            marginLeft: scale(-50),
            marginTop: scale(8),
          },
        }}
      >
        <Tab.Screen name="Timeline View" component={TrianingTimelineView} />
        <Tab.Screen name="List View" component={TrianingListView} />
      </Tab.Navigator>
    </>
  );
};
export default TrianingDetailsListView;