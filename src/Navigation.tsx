import "react-native-gesture-handler";

import React, {useEffect} from "react";
import {TouchableOpacity} from "react-native";
import SplashScreen from "react-native-splash-screen";
import Entypo from "react-native-vector-icons/Entypo";
import {useDispatch} from "react-redux";

import {NavigationContainer} from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions
} from "@react-navigation/stack";

import colors from "./constants/themes";
import {CurrencyList} from "./screens/CurrencyList";
import {Home} from "./screens/Home";
import {Options} from "./screens/Options";
import {Themes} from "./screens/Themes";
import {loadTheme} from "./store/reducersAndActions/theme";
import {
  MainStackParamsList,
  ModalStackParamsList,
  AuthStackParamsList
} from "./types/types";
import {LoginScreen} from "./screens/Login";

/**
 * @format
 *
 */
// Creating stacks
const MainStack = createStackNavigator<MainStackParamsList>();
const ModalStack = createStackNavigator<ModalStackParamsList>();
const AuthStack = createStackNavigator<AuthStackParamsList>();

const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
        headerTitleStyle: {fontFamily: "OpenSans-SemiBold"}
      }}
    />
    <MainStack.Screen
      name="Options"
      component={Options}
      options={{
        headerShown: true,
        headerTitleStyle: {fontFamily: "OpenSans-SemiBold"}
      }}
    />
    <MainStack.Screen
      name="Themes"
      component={Themes}
      options={{
        headerTitleStyle: {fontFamily: "OpenSans-SemiBold"}
      }}
    />
  </MainStack.Navigator>
);

const ModalStackScreen = () => (
  <ModalStack.Navigator mode="modal">
    <ModalStack.Screen
      name="Main"
      component={MainStackScreen}
      options={{
        headerShown: false,
        headerTitleStyle: {fontFamily: "OpenSans-SemiBold"}
      }}
    />
    <ModalStack.Screen
      name="CurrencyList"
      component={CurrencyList}
      options={({route, navigation}): StackNavigationOptions => ({
        title: route.params && route.params.title,
        headerLeft: () => null,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{paddingHorizontal: 10}}
          >
            <Entypo name="cross" size={30} color={colors.blue} />
          </TouchableOpacity>
        )
      })}
    />
  </ModalStack.Navigator>
);

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

const Navigation = () => {
  const dispatch = useDispatch();
  // Hide the splash screen when application is ready
  useEffect(() => {
    SplashScreen.hide();
    dispatch(loadTheme());
  }, []);

  return (
    <NavigationContainer>
      <AuthStackScreen />
    </NavigationContainer>
  );
};

export default Navigation;
