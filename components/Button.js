import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import ColorsPalette from '../constants/colors.json';

export default function Button({children, onPress, style, mode}) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => pressed && styles.pressed}>
        <View
          style={[
            styles.buttonContainer,
            mode === 'flat' && styles.flatButtonContainer,
          ]}>
          <Text
            style={[
              styles.textButton,
              mode === 'flat' && styles.textFlatButton,
            ]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: ColorsPalette.primary800,
    padding: 6,
    borderRadius: 4,
  },
  flatButtonContainer: {
    backgroundColor: 'transparent',
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
  },
  textFlatButton: {
    color: ColorsPalette.primary50,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: ColorsPalette.primary100,
    borderRadius: 4,

  },
});
