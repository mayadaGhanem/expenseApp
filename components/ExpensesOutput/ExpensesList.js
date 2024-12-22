import React from 'react';
import {FlatList} from 'react-native';
import ExpenseItem from './ExpenseItem';

export default function ExpensesList({data}) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ExpenseItem item={item} />}  // Passing the `item` correctly
      keyExtractor={item => item.id}
    />
  );
}
