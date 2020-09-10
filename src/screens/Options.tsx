import React from "react";
import {Alert, Linking, ScrollView, StatusBar} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import {useSelector} from "react-redux";
import {StackNavigationProp} from "@react-navigation/stack";

import {RowItem} from "../components/RowItem";
import {
  Separator,
  StyledSafeAreaView
} from "../components/styledComponents/Misc";
import {themeSelector} from "../store/selectors";
import {MainStackParamsList} from "../types/types";

const openLink = (url: string) =>
  Linking.openURL(url).catch(() =>
    Alert.alert("Sorry, something went wrong.", "Please try again later.")
  );

type Props = {
  navigation: StackNavigationProp<MainStackParamsList, "Options">;
};
export const Options = ({navigation}: Props) => {
  const theme = useSelector(themeSelector);
  return (
    <StyledSafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={theme.white} />
      <ScrollView>
        <RowItem
          title="Themes"
          onPress={() => {
            navigation.navigate("Themes");
          }}
          rightIcon={
            <Entypo name="chevron-right" size={20} color={theme.themeColor} />
          }
        />
        <Separator />
        <RowItem
          title="Fixer.io"
          onPress={() => openLink("https://aakhan.me")}
          rightIcon={<Entypo name="link" size={20} color={theme.themeColor} />}
        />
        <Separator />
        <RowItem
          title="Logout"
          onPress={() => {
            Alert.alert("todo");
          }}
          rightIcon={<Entypo name="back" size={20} color={theme.themeColor} />}
        />
      </ScrollView>
    </StyledSafeAreaView>
  );
};
