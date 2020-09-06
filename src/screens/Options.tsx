import React from "react";
import {Alert, Linking, ScrollView, StatusBar} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import Entypo from "react-native-vector-icons/Entypo";

import {RowItem} from "../components/RowItem";
import {Separator, StyledSafeAreaView} from "../components/StyledComponents";
import colors from "../constants/colors";
import {MainStackParamsList} from "../types/types";

const openLink = (url: string) =>
  Linking.openURL(url).catch(() =>
    Alert.alert("Sorry, something went wrong.", "Please try again later.")
  );

type Props = {
  navigation: StackNavigationProp<MainStackParamsList, "Options">;
};
export const Options = ({navigation}: Props) => {
  return (
    <StyledSafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView>
        <RowItem
          title="Themes"
          onPress={() => {
            navigation.navigate("Themes");
          }}
          rightIcon={
            <Entypo name="chevron-right" size={20} color={colors.blue} />
          }
        />
        <Separator />
        <RowItem
          title="Fixer.io"
          onPress={() => openLink("aakhan.me")}
          rightIcon={<Entypo name="link" size={20} color={colors.blue} />}
        />
        <Separator />
        <RowItem
          title="Logout"
          onPress={() => {
            Alert.alert("todo");
          }}
          rightIcon={<Entypo name="back" size={20} color={colors.blue} />}
        />
      </ScrollView>
    </StyledSafeAreaView>
  );
};
