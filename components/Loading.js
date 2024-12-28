import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={20} color={'white'} />
    </View>
  );
}

const styles = StyleSheet.create({
  continue: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
