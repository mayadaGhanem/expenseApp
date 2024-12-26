import React from 'react';
import {StyleSheet, View} from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import ColorsPalette from '../../constants/colors.json';
import {Text} from 'react-native';

export default function ExpensesOutput({
  expenses,
  expensesPeriod,
  fallbackText,
}) {
  let content = <Text style={styles.fallbackText}>{fallbackText}</Text>;
  if (expenses.length > 0) {
    content = <ExpensesList data={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} expensesPeriod={expensesPeriod} />
      {content}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: ColorsPalette.primary300,
  },
  fallbackText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});
