import React from "react";
import {SafeAreaView, View, Text} from "react-native";

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <SafeAreaView>
        <View>
          <Text>Welcome to React Native</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
