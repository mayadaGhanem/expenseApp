import React, {createContext, useReducer} from 'react';

export const ExpenseContext = createContext({
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: id => {},
  expenses: [],
});
const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'Car Insurance',
    amount: 294.67,
    date: new Date('2021-03-03'),
  },
  {
    id: 'e2',
    description: 'New TV',
    amount: 799.49,
    date: new Date('2024-04-12'),
  },
  {
    id: 'e3',
    description: 'Car Insurance',
    amount: 294.67,
    date: new Date('2024-12-05'),
  },
  {
    id: 'e4',
    description: 'New TV',
    amount: 799.49,
    date: new Date('2024-12-10'),
  },
  {
    id: 'e5',
    description: 'Car Insurance',
    amount: 294.67,
    date: new Date('2024-12-22'),
  },
  {
    id: 'e6',
    description: 'New TV',
    amount: 799.49,
    date: new Date('2024-12-20'),
  },
  {
    id: 'e7',
    description: 'Mayaa',
    amount: 799.49,
    date: new Date('2024-12-18'),
  },
];
const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXPENSES': {
      return action.payload;
    }
    case 'ADD': {
      return [...state, action.payload];
    }
    case 'DELETE': {
      return state.filter(item => item.id !== action.payload);
    }
    case 'UPDATE': {
      const updatedState = state.map(item => {
        if (item.id === action.payload.id) {
          return {...item, ...action.payload.expense}; // Create a new object with updated values
        }
        return item; // Return the original item unchanged
      });

      return updatedState;
    }
    default: {
      return state;
    }
  }
};
export function ExpenseContextProvider({children}) {
  const [expenseState, dispatch] = useReducer(expenseReducer, []);
  function addExpense(newExpense) {
    dispatch({
      type: 'ADD',
      payload: newExpense,
    });
  }
  function setExpenses(expenses) {
    dispatch({type: 'SET_EXPENSES', payload: expenses});
  }
  function deleteExpense(id) {
    dispatch({type: 'DELETE', payload: id});
  }
  function updateExpense(id, expense) {
    dispatch({type: 'UPDATE', payload: {id, expense}});
  }

  const value = {
    expenses: expenseState,
    addExpense,
    deleteExpense,
    updateExpense,
    setExpenses,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}
