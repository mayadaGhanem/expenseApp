import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ColorsPalette from '../../constants/colors.json';

export default function expensesSummary({expenses, expensesPeriod}) {
  const expensesSum = expenses.reduce(
    (prev, current) => prev + current.amount,
    0,
  );
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{expensesPeriod} </Text>
      <Text style={styles.amount}>${expensesSum.toFixed(2)} </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: ColorsPalette.primary50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    margin: 8,
  },
  period: {
    color: ColorsPalette.primary800,
    fontSize: 12,
  },
  amount: {
    color: ColorsPalette.primary900,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
