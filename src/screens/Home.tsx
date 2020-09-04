import React from "react";
import {StyleSheet, View, StatusBar, Image, Dimensions} from "react-native";
import colors from "../constants/colors";
// images
import backgroundImage from "../assets/images/background.png";
import logo from "../assets/images/logo.png";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.blue
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  logoBackground: {
    width: screen.width * 0.45,
    height: screen.width * 0.45
  },
  logo: {
    position: "absolute",
    width: screen.width * 0.25,
    height: screen.width * 0.25
  }
});

export function Home() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
      <View style={styles.logoContainer}>
        <Image
          source={backgroundImage}
          style={styles.logoBackground}
          resizeMode="contain"
        />
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>
    </View>
  );
}
