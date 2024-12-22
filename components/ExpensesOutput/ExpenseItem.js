import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import ColorsPalette from '../../constants/colors.json';
import {formatDate} from '../../util/formatDate';
import {useNavigation} from '@react-navigation/native';

function ExpenseItem({item}) {
  const navigation = useNavigation();
  function handlePressExpenseItem() {
    navigation.navigate('ManageExpense', {
      expenseId: item.id,
    });
  }
  return (
    <Pressable onPress={handlePressExpenseItem}>
      <View style={styles.expensesItem}>
        <View>
          <Text style={[styles.TextBase, styles.description]}>
            {item.description}
          </Text>
          <Text style={styles.TextBase}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  expensesItem: {
    padding: 8,
    verticalAlign: 12,
    backgroundColor: ColorsPalette.primary50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    margin: 8,
  },
  TextBase: {
    color: ColorsPalette.primary800,
  },
  description: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  amountContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  amount: {
    color: ColorsPalette.primary900,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default ExpenseItem;
