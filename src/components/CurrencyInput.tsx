import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet
} from "react-native";
import colors from "../constants/colors";

interface CurrencyInputProps {
  currency: string;
  value: string;
  disabled?: boolean;
  onChangeCurrency(): void;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  containerDisabled: {
    backgroundColor: colors.offWhite
  },
  inputButton: {
    padding: 15,
    backgroundColor: colors.white,
    borderRightColor: colors.border,
    borderRightWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  buttonText: {
    fontSize: 18,
    color: colors.blue,
    fontWeight: "bold"
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: colors.textLight
  }
});

export function CurrencyInput({
  currency,
  value,
  disabled = false,
  onChangeCurrency
}: CurrencyInputProps) {
  const containerStyles: any[] = [styles.container];
  if (disabled) containerStyles.push(styles.containerDisabled);

  return (
    <View style={containerStyles}>
      <TouchableOpacity onPress={onChangeCurrency} style={styles.inputButton}>
        <Text style={styles.buttonText}>{currency}</Text>
      </TouchableOpacity>
      <TextInput
        value={value}
        onChange={() => {}}
        style={styles.input}
        editable={!disabled}
        keyboardType="numeric"
      />
    </View>
  );
}
