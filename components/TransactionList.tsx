import React from 'react'
import { Transaction } from '@/types/transactions';
import getTransactions from '@/app/actions/getTransactions';
import TransactionItem from './TransactionItem';

const TransactionList = async () => {

  const { transactions, error } = await getTransactions();

  if (error) {
    return <p className="error">{error}</p>
  }
  
  return (
    <>
      <h3>History:</h3>
      <ul className="list">
        {transactions && transactions.map((transaction: Transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction}/>
        ))}
      </ul>
    </>
  )
}

export default TransactionList;
