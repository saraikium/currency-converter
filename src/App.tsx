import "react-native-gesture-handler";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions
} from "@react-navigation/stack";
import {Home} from "./screens/Home";
import {Options} from "./screens/Options";
import {MainStackParamsList, ModalStackParamsList} from "./types/types";
import {CurrencyList} from "./screens/CurrencyList";
import {TouchableOpacity} from "react-native-gesture-handler";
import Entypo from "react-native-vector-icons/Entypo";
import colors from "./constants/colors";

const MainStack = createStackNavigator<MainStackParamsList>();
const ModalStack = createStackNavigator<ModalStackParamsList>();

const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Home"
      component={Home}
      options={{headerShown: false}}
    />
    <MainStack.Screen name="Options" component={Options} />
  </MainStack.Navigator>
);

const ModalStackScreen = () => (
  <ModalStack.Navigator mode="modal">
    <ModalStack.Screen
      name="Main"
      component={MainStackScreen}
      options={{headerShown: false}}
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

const App = () => {
  return (
    <NavigationContainer>
      <ModalStackScreen />
    </NavigationContainer>
  );
};

export default App;
