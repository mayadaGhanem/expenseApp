import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function Error({message}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>Error!!</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  continue: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
