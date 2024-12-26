import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Input from './Input';
import Button from '../Button';

export default function ExpenseForm({
  handleCancelExpense,
  handleConfirmExpense,
  submitButtonLabel,
  defaultExpense,
}) {
  const [formState, setFormState] = useState({
    amount: {
      value: defaultExpense ? defaultExpense.amount.toString() : '',
      isValid: true,
    },
    description: {
      value: defaultExpense ? defaultExpense.description : '',
      isValid: true,
    },
    date: {
      value: defaultExpense
        ? defaultExpense.date.toISOString().slice(0, 10)
        : '',
      isValid: true,
    },
  });
  function onChange(fieldName, value) {
    const tempState = {...formState};
    tempState.amount = value;
    setFormState(currentState => ({
      ...currentState,
      [fieldName]: {value, isValid: true},
    }));
  }

  function submitHandler() {
    const values = {
      amount: +formState.amount.value,
      description: formState.description.value,
      date: new Date(formState.date.value),
    };
    const isValidAmount =
      !isNaN(formState.amount.value) && formState.amount.value > 0;
    const isValidDate = formState.date.value.toString() !== 'Invalid Date';
    const isValidDescription = formState.description.value.trim().length > 0;
    if (!isValidAmount || !isValidDate || !isValidDescription) {
      setFormState(currentState => ({
        ...currentState,
        amount: {value: formState.amount.value, isValid: isValidAmount},
        date: {value: formState.date.value, isValid: isValidDate},
        description: {
          value: formState.description.value,
          isValid: isValidDescription,
        },
      }));
      return;
    }
    handleConfirmExpense(values);
  }

  return (
    <View>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label={'Amount'}
          isInValid={!formState.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: onChange.bind(this, 'amount'),
            value: formState.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label={'Date'}
          isInValid={!formState.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: onChange.bind(this, 'date'),
            value: formState.date.value,
          }}
        />
      </View>
      <Input
        label={'Description'}
        isInValid={!formState.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: onChange.bind(this, 'description'),
          value: formState.description.value,
        }}
      />
      <View style={styles.actionContainer}>
        <Button mode="flat" style={styles.button} onPress={handleCancelExpense}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    verticalAlign: 'top',
    marginVertical: 8,
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
});
