import React, {useContext, useEffect, useState} from 'react';
import ExpensesOutput from '../components/ExpensesOutput';
import {ExpenseContext} from '../store/context-store';
import Error from '../components/Error';
import Loading from '../components/Loading';
import {fetchExpenses} from '../util/http';

export default function RecentExpenses() {
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(true);
  const expensesCtx = useContext(ExpenseContext);
  const today = new Date(); // Get today's date

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7); // Subtract 7 days from today

  const recentExpenses = expensesCtx.expenses.filter(item => {
    const itemDate = new Date(item.date); // Convert the item date string to a Date object
    return itemDate >= sevenDaysAgo && itemDate <= today;
  });
  async function getAllExpenses() {
    try {
      const data = fetchExpenses();
      expensesCtx.setExpenses(data);
    } catch (e) {
      setLoading(false);
      setError('Error occurred can not save expense !!');
    }
  }
  useEffect(() => {
    getAllExpenses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (error && !isLoading) {
    return <Error message={error} />;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText={'No Expenses found recently !!'}
    />
  );
}
