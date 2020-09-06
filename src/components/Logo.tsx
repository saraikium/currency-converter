import React from "react";
import {Dimensions} from "react-native";
import styled from "styled-components/native";

import backgroundImage from "../assets/images/background.png";
import logo from "../assets/images/logo.png";

const screen = Dimensions.get("window");

const LogoContainer = styled.View`
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BackgroundImage = styled.Image`
  width: ${screen.width * 0.4}px;
  height: ${screen.height * 0.4}px;
`;

const FrontImage = styled.Image`
  position: absolute;
  width: ${screen.width * 0.2};
  height: ${screen.height * 0.2};
`;

export const Logo = () => (
  <LogoContainer>
    <BackgroundImage source={backgroundImage} resizeMode="contain" />
    <FrontImage source={logo} resizeMode="contain" />
  </LogoContainer>
);
