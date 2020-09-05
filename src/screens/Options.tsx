import React from "react";
import {ScrollView, Linking, Alert, StatusBar} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Entypo from "react-native-vector-icons/Entypo";

import colors from "../constants/colors";
import {RowItem, RowSeparator} from "../components/RowItem";

const openLink = (url: string) =>
  Linking.openURL(url).catch(() =>
    Alert.alert("Sorry, something went wrong.", "Please try again later.")
  );

export const Options = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView>
        <RowItem
          title="Themes"
          onPress={() => Alert.alert("todo!")}
          rightIcon={
            <Entypo name="chevron-right" size={20} color={colors.blue} />
          }
        />

        <RowSeparator />

        <RowItem
          title="Fixer.io"
          onPress={() => openLink("http://fixer.handlebarlabs.com")}
          rightIcon={<Entypo name="link" size={20} color={colors.blue} />}
        />

        <RowSeparator />

        <RowItem
          title="Logout"
          onPress={() => {}}
          rightIcon={<Entypo name="back" size={20} color={colors.blue} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
