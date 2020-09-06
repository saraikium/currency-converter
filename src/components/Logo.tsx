import React from "react";
import {View, Image, StyleSheet, Dimensions} from "react-native";
import backgroundImage from "../assets/images/background.png";
import logo from "../assets/images/logo.png";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  logoBackground: {
    width: screen.width * 0.45,
    height: screen.height * 0.45
  },
  logo: {
    position: "absolute",
    width: screen.width * 0.25,
    height: screen.height * 0.25
  }
});

export const Logo = () => (
  <View style={styles.logoContainer}>
    <Image
      source={backgroundImage}
      style={styles.logoBackground}
      resizeMode="contain"
    />
    <Image source={logo} style={styles.logo} resizeMode="contain" />
  </View>
);
