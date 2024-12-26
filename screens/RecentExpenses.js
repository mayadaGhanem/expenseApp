import React, {useContext} from 'react';
import ExpensesOutput from '../components/ExpensesOutput';
import {ExpenseContext} from '../store/context-store';

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpenseContext);
  const today = new Date(); // Get today's date

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7); // Subtract 7 days from today

  const recentExpenses = expensesCtx.expenses.filter(item => {
    const itemDate = new Date(item.date); // Convert the item date string to a Date object
    return itemDate >= sevenDaysAgo && itemDate <= today;
  });
  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText={'No Expenses found recently !!'}
    />
  );
}
