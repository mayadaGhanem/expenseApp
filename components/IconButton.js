import React from 'react';
import {Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function IconButton({name, size, color, onPress}) {
  return (
    <Pressable onPress={onPress}>
      <View>
        <Icon name={name} color={color} size={size} />
      </View>
    </Pressable>
  );
}
