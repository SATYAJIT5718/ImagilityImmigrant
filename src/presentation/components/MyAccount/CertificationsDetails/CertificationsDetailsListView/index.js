import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CertificationsTimelineView from "./CertificationsTimelineView";
import CertificationsListView from "./CertificationsListView";
import { scale } from "../../../../../Infrastructure/utils/screenUtility";
const Tab = createMaterialTopTabNavigator();
const CertificationsDetailsListView = () => {
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
        <Tab.Screen name="Timeline View" component={CertificationsTimelineView} />
        <Tab.Screen name="List View" component={CertificationsListView} />
      </Tab.Navigator>
    </>
  );
};
export default CertificationsDetailsListView;