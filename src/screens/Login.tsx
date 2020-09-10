import React from "react";
import {StatusBar, View} from "react-native";
import {ErrorMessage, Formik} from "formik";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components/native";
import * as Yup from "yup";

import {requestLogin} from "../store/reducersAndActions/auth";
import {KeyboardAwareScrollView} from "../components/KeyboardAwareScrollView";
import {Logo} from "../components/Logo";
import {TextBold} from "../components/styledComponents";
import {themeSelector} from "../store/selectors";
import {Themed} from "../types/styledComponentTypes";

const StyledSafeAreaView = styled.SafeAreaView<Themed>`
  flex: 1;
  justify-content: center;
  background-color: ${({theme}) => theme.themeColor};
`;

const FormContainer = styled.View`
  margin: 10px 20px;
  flex: 1;
  flex-direction: column;
`;

const Button = styled.TouchableOpacity<Themed>`
  border-radius: 5px;
  background-color: white;
  padding: 10px;
  color: ${({theme}) => theme.themeColor};
`;

const InputContainer = styled.View`
  margin: 10px 20px;
  flex: 1;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  justify-content: center;
`;

const ButtonContainer = styled.View`
  margin: 10px 20px;
  flex: 1;
  background-color: white;
  border-radius: 5px;
  justify-content: center;
`;
const StyledTextInput = styled.TextInput<Themed>`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  color: ${({theme}) => theme.textLight};
  font-family: OpenSans-Bold;
`;

const ErrorText = styled.Text`
  font-family: OpenSans-Regular;
  font-weight: 500;
  font-size: 14px;
  padding: 10px;
  margin-left: 10px;
  color: white;
`;

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long.")
    .max(15, "Max password length is 15 charactors.")
    .required()
});
export const LoginScreen: React.FC = () => {
  const theme = useSelector(themeSelector);
  const dispatch = useDispatch();

  return (
    <StyledSafeAreaView>
      <KeyboardAwareScrollView>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.themeColor}
        />
        <Logo />
        <FormContainer>
          <TextBold color={theme.white} fontSize="24px">
            Login to Continue
          </TextBold>
          <Formik
            validationSchema={validationSchema}
            initialValues={{email: "", password: ""}}
            onSubmit={(values) => {
              dispatch(requestLogin(values));
            }}
          >
            {({handleChange, handleSubmit, handleBlur, values}) => (
              <View>
                <InputContainer>
                  <StyledTextInput
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="Enter you email.."
                  />
                </InputContainer>
                <ErrorMessage name="email" component={ErrorText} />
                <InputContainer>
                  <StyledTextInput
                    secureTextEntry={true}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    placeholder="Enter password..."
                  />
                </InputContainer>
                <ErrorMessage name="password" component={ErrorText} />
                <ButtonContainer>
                  <Button onPress={handleSubmit}>
                    <TextBold color={theme.themeColor} fontSize="20px">
                      Login
                    </TextBold>
                  </Button>
                </ButtonContainer>
              </View>
            )}
          </Formik>
        </FormContainer>
      </KeyboardAwareScrollView>
    </StyledSafeAreaView>
  );
};
