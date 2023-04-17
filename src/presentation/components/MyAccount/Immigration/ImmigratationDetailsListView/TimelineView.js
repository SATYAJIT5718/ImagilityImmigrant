import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { scale } from "../../../../../Infrastructure/utils/screenUtility";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";

const TimelineView = (props) => {
  const navigation = useNavigation();
  const immigratationList = props?.immigratationList?.data
    ? props.immigratationList.data
    : 0;
  console.log(
    immigratationList,
    "immigratationListimmigratationListimmigratationListimmigratationListimmigratationList"
  );
  const renderItem = ({ item, index }) => {
    return (
      <>
        {index === 0 ? (
          <View
            style={{
              flexDirection: "row",
              paddingLeft: scale(5),
            }}
          >
            <View
              style={{
                flex: 0.6,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../../../Infrastructure/assets/images/LandMark.png")}
                style={{
                  width: scale(41),
                  height: scale(45),
                }}
              />
            </View>
            <View
              style={{
                flex: 6,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            />
          </View>
        ) : null}

        <View
          style={{
            flexDirection: "row",
            paddingLeft: scale(10),
          }}
        >
          <View
            style={{
              flex: 0.4,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                height: scale(55),
                width: scale(3),
                backgroundColor: "#4F6783",
              }}
            />

            <Image
              source={require("../../../../../Infrastructure/assets/images/Round.png")}
              style={{
                width: scale(20),
                height: scale(20),
              }}
            />
            <View
              style={{
                height: scale(40),
                width: scale(3),
                backgroundColor: "#4F6783",
              }}
            />
          </View>

          <View
            style={{
              flex: 6,
              flexDirection: "column",
              alignItems: "center",
              paddingRight: scale(5),
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: scale(18),
                  color: "#0091FF",
                  fontFamily: "SourceSansPro-Regular",
                }}
              >
                {item.receiptDate ? item.receiptDate.substring(0, 4) : ""}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flex: 0.1,
                  borderStyle: "dotted",
                  borderBottomWidth: scale(2),
                  borderColor: "#189CD5",
                }}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    padding: scale(19),
                    justifyContent: "center",
                    borderRadius: scale(42),
                    borderWidth: scale(2),
                    borderColor: "#19A0DA",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: scale(10),
                    }}
                  >
                    <Image
                      source={require("../../../../../Infrastructure/assets/images/immigrateIcon.png")}
                      style={{
                        width: scale(16),
                        height: scale(21),
                      }}
                    />
                    <View
                      style={{
                        paddingLeft: scale(15),
                        flex: 1,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: scale(16),
                          color: "#000000D9",
                          fontFamily: "SourceSansPro-Semibold",
                        }}
                      >
                        {item.immigrationStatusCode
                          ? item.immigrationStatusCode
                          : "--"}
                      </Text>
                      <Text
                        style={{
                          fontSize: scale(16),
                          color: "#000000D9",
                          fontFamily: "SourceSansPro-Regular",
                        }}
                      >
                        {item.companyName ? item.companyName : "--"},
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        {index === immigratationList.length - 1 ? (
          <View
            style={{
              flexDirection: "row",
              paddingLeft: scale(5),
            }}
          >
            <View
              style={{
                flex: 0.6,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../../../Infrastructure/assets/images/Radio.png")}
                style={{
                  width: scale(17),
                  height: scale(17),
                }}
              />
            </View>
            <View
              style={{
                flex: 6,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            />
          </View>
        ) : null}
      </>
    );
  };
  return (
    <View style={styles.container}>
      {immigratationList.length > 0 ? (
        <FlatList
          data={immigratationList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.noDataTextContainer}>
          <AntDesign
            name="warning"
            size={60}
            style={{
              color: "grey",
              marginBottom: scale(10),
            }}
          />
          <Text style={styles.noDataText}>
            You have not yet added any related details. add now to complete your
            profile.
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("ImmigrationVisa")}
        style={{
          ...styles.button,
          backgroundColor: "#00A0DA",
        }}
        disabled={false}
      >
        <Text style={styles.buttontext}>ADD IMMIGRATION DETAILS</Text>
      </TouchableOpacity>
    </View>
  );
};
const mapStateToProps = ({ studentReducer: { immigratationList } }) => ({
  immigratationList,
});

export default connect(mapStateToProps, null)(TimelineView);
