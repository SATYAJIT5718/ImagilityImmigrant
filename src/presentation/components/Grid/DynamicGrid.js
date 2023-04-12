import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const data = [
  {id: '1', title: 'Item 1'},
  {id: '2', title: 'Item 2'},
  {id: '3', title: 'Item 3'},
  {id: '4', title: 'Item 4'},
  {id: '5', title: 'Item 5'},
  {id: '6', title: 'Item 6'},
  {id: '7', title: 'Item 7'},
  {id: '8', title: 'Item 8'},
  {id: '9', title: 'Item 9'},
  {id: '10', title: 'Item 10'},
];

const numColumns = 3;

const renderItem = ({item}) => (
  <View style={styles.item}>
    <Text>{item.title}</Text>
  </View>
);

const keyExtractor = item => item.id;

const DynamicGrid = () => (
  <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={keyExtractor}
    numColumns={numColumns}
  />
);

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 5,
    height: 100,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DynamicGrid;
