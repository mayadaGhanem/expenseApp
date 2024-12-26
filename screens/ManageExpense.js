import React, {useContext, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import ColorsPalette from '../constants/colors.json';
import IconButton from '../components/IconButton';
import {ExpenseContext} from '../store/context-store';
import ExpenseForm from '../components/ManageExpense/Expenseform';

export default function ManageExpense({route, navigation}) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const expenseCtx = useContext(ExpenseContext);
  const selectedExpense = expenseCtx.expenses.find(
    item => item.id === expenseId,
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function handleDeleteExpense() {
    expenseCtx.deleteExpense(expenseId);
    handleCloseModal();
  }
  function handleCancelExpense() {
    handleCloseModal();
  }
  function handleConfirmExpense(data) {

    if (isEditing) {
      expenseCtx.updateExpense(expenseId, data);
    } else {
      expenseCtx.addExpense(data);
    }
    handleCloseModal();
  }

  function handleCloseModal() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        handleCancelExpense={handleCancelExpense}
        handleConfirmExpense={handleConfirmExpense}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        defaultExpense={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name={'trash'}
            color={'red'}
            size={36}
            onPress={handleDeleteExpense}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsPalette.primary900,
    padding: 24,
  },
  deleteContainer: {
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: 'white',
    marginTop: 6,
    padding: 5,
  },
});
