import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps
} from "react-native";
import colors from "../constants/colors";

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

interface CurrencyInputProps extends TextInputProps {
  currency: string;
  value: string;
  disabled?: boolean;
  onChangeCurrency(): void;
}

export function CurrencyInput({
  currency,
  disabled = false,
  onChangeCurrency,
  ...props
}: CurrencyInputProps) {
  const containerStyles: any[] = [styles.container];
  if (disabled) containerStyles.push(styles.containerDisabled);

  return (
    <View style={containerStyles}>
      <TouchableOpacity onPress={onChangeCurrency} style={styles.inputButton}>
        <Text style={styles.buttonText}>{currency}</Text>
      </TouchableOpacity>
      <TextInput editable={!disabled} style={styles.input} {...props} />
    </View>
  );
}
