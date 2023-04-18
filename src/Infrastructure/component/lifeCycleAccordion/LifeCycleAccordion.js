import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EditIcon from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale} from '../../utils/screenUtility';
import {useNavigation} from '@react-navigation/native';
const LifeCycleAccordion = props => {
  // console.log('props.expanded',props.expanded)
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(
    props.expanded ? props.expanded : false,
  );
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    {
      props.selectedItem
        ? props.selectedItem(props.id)
        : setExpanded(!expanded);
    }
  };
  const editHandler = () => {
    props.editHandler(props.title);
  };
  return (
    <>
      <View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}
        />
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: scale(5),
            paddingVertical: scale(10),
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : null,
            // backgroundColor: expanded ? null : "#E0F0F7",
            marginTop: props.icon === false ? scale(10) : null,
            flexWrap: 'wrap',
          }}
          onPress={() => toggleExpand()}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name={
                props.open || expanded
                  ? 'keyboard-arrow-up'
                  : 'keyboard-arrow-down'
              }
              size={30}
              color="#10A0DA"
            />
          </View>
          <View
            style={{
              flex: 8,
              flexDirection: 'row',
              justifyContent: 'center',
              marginLeft: props.count ? null : scale(10),
            }}>
            <View style={{flex: 1.2}}>
              <Text
                style={
                  props.style?.titleContent
                    ? props.style.titleContent
                    : {
                        fontFamily: 'SourceSansPro-SemiBold',
                        fontSize: scale(14),
                        color: '#4D4F5C',
                        overflow: 'hidden',
                      }
                }>
                {props.title}
              </Text>
            </View>
            {props.Studytitle ? (
              <View style={{flex: 2}}>
                <Text
                  style={
                    props.style?.Studytitle
                      ? props.style.Studytitle
                      : {
                          fontFamily: 'SourceSansPro-SemiBold',
                          fontSize: scale(14),
                          color: '#4D4F5C',
                          overflow: 'hidden',
                        }
                  }>
                  {props.Studytitle}
                </Text>
              </View>
            ) : null}
          </View>
          {props.removeEdit ? null : (
            <TouchableOpacity
              style={{marginRight: scale(15), marginLeft: scale(15)}}
              onPress={props.edit ? props.edit : () => editHandler()}>
              <EditIcon name="pencil" size={scale(17)} color="#10A0DA" />
            </TouchableOpacity>
          )}
          {props.deleteIcon ? (
            <TouchableOpacity
              style={{marginRight: scale(5)}}
              onPress={props.delete ? props.delete : () => {}}>
              <AntDesign name="delete" size={scale(17)} color="#10A0DA" />
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>
        {(props.open || expanded) && (
          <>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              scrollEnabled={true}
              nestedScrollEnabled={true}>
              <View
                style={
                  props.style?.body
                    ? props.style.body
                    : {padding: scale(10), marginLeft: scale(25)}
                }>
                {props.data}
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </>
  );
};

export default LifeCycleAccordion;
