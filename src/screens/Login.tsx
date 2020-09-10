import React from "react";
import {View, StatusBar} from "react-native";
import {BoldText} from "../components/styledComponents/StyledComponents";
import styled, {ThemeProvider} from "styled-components/native";
import {Themed} from "../types/styledComponentTypes";
import {useSelector} from "react-redux";
import {themeSelector} from "../store/selectors";
import {KeyboardAwareScrollView} from "../components/KeyboardAwareScrollView";
import {Logo} from "../components/Logo";

const StyledSafeAreaView = styled.SafeAreaView<Themed>`
  flex: 1;
  justify-content: center;
  background-color: ${({theme}) => theme.themeColor};
`;

const FormContainer = styled.View`
  margin: 10px 20px;
`;

const InputContainer = styled.View`
  margin-bottom: 10px;
`;

export const LoginScreen: React.FC = () => {
  const theme = useSelector(themeSelector);
  return (
    <ThemeProvider theme={theme}>
      <StyledSafeAreaView>
        <KeyboardAwareScrollView>
          <StatusBar barStyle="light-content" backgroundColor={theme.theme} />
          <Logo />
          <FormContainer>
            <BoldText color={theme.white} fontSize="18px">
              Login to Continue
            </BoldText>
            <InputContainer />
          </FormContainer>
        </KeyboardAwareScrollView>
      </StyledSafeAreaView>
    </ThemeProvider>
  );
};
