import axios from 'axios';
const BASE_URL = 'https://react-native-app-1075a-default-rtdb.firebaseio.com/';

export async function fetchExpenses() {
  const response = await axios.get(BASE_URL + 'expenses.json');
  const expenses = [];
  for (const key in response.data) {
    const newExpense = {
      id: key,
      ...response.data[key],
    };
    expenses.push(newExpense);
  }
  return expenses.reverse();
}

export async function addExpense(expenseData) {
  const response = await axios.post(BASE_URL + 'expenses.json', expenseData);
  return response.name;
}

export function updateExpense(id, expensesData) {
  axios.patch(BASE_URL + `expenses/${id}.json`, expensesData);
}

export function deleteExpense(id) {
  axios.delete(BASE_URL + `expenses/${id}.json`);
}
