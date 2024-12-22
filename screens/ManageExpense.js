import React, {useContext, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import ColorsPalette from '../constants/colors.json';
import IconButton from '../components/IconButton';
import Button from '../components/Button';
import {ExpenseContext} from '../store/context-store';

export default function ManageExpense({route, navigation}) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const expenseCtx = useContext(ExpenseContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  handleCloseModal();
  function handleDeleteExpense() {
    expenseCtx.deleteExpense(expenseId);
    handleCloseModal();
  }
  function handleCancelExpense() {
    handleCloseModal();
  }
  function handleConfirmExpense() {
    handleCloseModal();
  }

  function handleCloseModal() {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={styles.actionContainer}>
        <Button mode="flat" style={styles.button} onPress={handleCancelExpense}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleConfirmExpense}>
          {isEditing ? 'Confirm' : 'Add'}
        </Button>
      </View>
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
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: 'white',
    marginTop: 6,
    padding: 5,
  },
});
