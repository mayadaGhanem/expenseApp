import React, {useContext} from 'react';
import ExpensesOutput from '../components/ExpensesOutput';
import {ExpenseContext} from '../store/context-store';

export default function AllExpenses() {
  const expenseCtx = useContext(ExpenseContext);

  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expenseCtx.expenses}
    />
  );
}
