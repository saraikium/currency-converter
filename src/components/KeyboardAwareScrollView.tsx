import React, {useState, useEffect} from "react";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  View,
  ScrollView,
  KeyboardEvent,
  Dimensions
} from "react-native";

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
  keyboardSpacer: {
    left: 0,
    right: 0,
    bottom: 0
  }
});
export const KeyboardAwareScrollView: React.FC = ({children}) => {
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [spacerHeight, setSpacerHeight] = useState(0);

  useEffect(() => {
    const showKeyboardListener = Keyboard.addListener(
      "keyboardDidShow",
      (event: KeyboardEvent) => {
        const {screenY} = event.endCoordinates;
        const {height} = Dimensions.get("window");
        // Adjust the keyboardSpacerView height and enable scrolling
        setSpacerHeight(height - screenY);
        setScrollEnabled(true);
      }
    );

    const hideKeyboardListener = Keyboard.addListener("keyboardDidHide", () => {
      setSpacerHeight(0);
      setScrollEnabled(false);
    });

    // Cleanup Keypboard listeners
    return () => {
      showKeyboardListener.remove();
      hideKeyboardListener.remove();
    };
  }, []);

  return (
    <ScrollView scrollEnabled={scrollEnabled}>
      <View style={styles.container}>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.container}>{children}</View>
        </TouchableWithoutFeedback>
        <View style={[styles.keyboardSpacer, {height: spacerHeight}]} />
      </View>
    </ScrollView>
  );
};
