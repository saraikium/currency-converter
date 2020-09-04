import React from "react";
import {View, TouchableOpacity, TextInput} from "react-native";

interface CurrencyInputProps {
  text: string;
  value: string;
  onChangeCurrency(): void;
}

export function CurrencyInput({
  text,
  value,
  onChangeCurrency
}: CurrencyInputProps) {
  return (
    <View>
      <TouchableOpacity onPress={onChangeCurrency}>{text}</TouchableOpacity>
      <TextInput value={value} />
    </View>
  );
}
