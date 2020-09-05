import React from "react";
import {FlatList} from "react-native-gesture-handler";
import {RowItem, RowSeparator} from "../components/RowItem";
import {View, StyleSheet} from "react-native";
const themes = [
  {name: "Blue", color: "#4f6d7a"},
  {name: "Orange", color: "#d37a68"},
  {name: "Green", color: "#1dbc9c"},
  {name: "Pruple", color: "#9c788f"}
];

const styles = StyleSheet.create({
  preview: {
    width: 30,
    height: 30,
    borderRadius: 15
  }
});

export const Themes: React.FC = () => {
  return (
    <FlatList
      data={themes}
      keyExtractor={(item) => item.color}
      renderItem={({item}) => (
        <RowItem
          title={item.name}
          onPress={() => {}}
          rightIcon={
            <View style={[styles.preview, {backgroundColor: item.color}]} />
          }
        />
      )}
      ItemSeparatorComponent={() => <RowSeparator />}
    />
  );
};
