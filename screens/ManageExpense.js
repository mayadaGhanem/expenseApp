import React, {useContext, useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ColorsPalette from '../constants/colors.json';
import IconButton from '../components/IconButton';
import {ExpenseContext} from '../store/context-store';
import ExpenseForm from '../components/ManageExpense/Expenseform';
import {addExpense, deleteExpense, updateExpense} from '../util/http';
import Error from '../components/Error';
import Loading from '../components/Loading';

export default function ManageExpense({route, navigation}) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const expenseCtx = useContext(ExpenseContext);
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(true);
  const selectedExpense = expenseCtx.expenses.find(
    item => item.id === expenseId,
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function handleDeleteExpense() {
    try {
      expenseCtx.deleteExpense(expenseId);
      deleteExpense(expenseId);
      handleCloseModal();
    } catch (e) {
      setLoading(false);
      setError('Error occurred can not delete expense !!');
    }
  }
  function handleCancelExpense() {
    handleCloseModal();
  }
  async function handleConfirmExpense(data) {
    try {
      if (isEditing) {
        updateExpense(expenseId, data);
        expenseCtx.updateExpense(expenseId, data);
      } else {
        const id = await addExpense(data);
        expenseCtx.addExpense({...data, id});
      }
      handleCloseModal();
    } catch (e) {
      setLoading(false);
      setError('Error occurred can not save expense !!');
    }
  }

  function handleCloseModal() {
    navigation.goBack();
  }
  if (error && !isLoading) {
    return <Error message={error} />;
  }
  if (isLoading) {
    return <Loading />;
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
