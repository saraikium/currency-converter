import "react-native-gesture-handler";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {Home} from "./screens/Home";
import {Options} from "./screens/Options";

type MainStackParamsList = {
  Home: undefined;
  Options: undefined;
};

const MainStack = createStackNavigator<MainStackParamsList>();

const MainStackScreen = () => (
  <MainStack.Navigator initialRouteName="Options">
    <MainStack.Screen name="Home" component={Home} />
    <MainStack.Screen name="Options" component={Options} />
  </MainStack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  );
};

export default App;
