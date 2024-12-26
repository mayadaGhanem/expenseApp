import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

export default function Input({label, textInputConfig, style, isInValid}) {
  let inputStyles = [styles.input];
  if (textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiLine);
  }
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, isInValid && styles.labelError]}>
        {label}
      </Text>
      <TextInput
        style={[inputStyles, isInValid && styles.invalidInput]}
        {...textInputConfig}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  input: {
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 6,
    fontSize: 16,
  },
  label: {
    color: 'white',
    fontSize: 12,
    marginBottom: 6,
  },
  labelError: {
    color: 'red',
  },
  inputMultiLine: {
    textAlignVertical: 'top',
    minHeight: 100,
  },
  invalidInput: {
    borderColor: 'red',
    borderWidth: 3,
  },
});
