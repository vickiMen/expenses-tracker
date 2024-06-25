import React from 'react';
import Guest from '@/components/Guest';
import { currentUser } from '@clerk/nextjs/server';
import AddTransaction from '@/components/AddTransaction';
import Balance from '@/components/Balance';
import IncomeExpense from '@/components/IncomeExpense';
import TransactionList from '@/components/TransactionList';

const HomePage = async () => {
  const user = await currentUser();
  
  if (!user) {
    return <Guest />;
  }

  return (
    <main>
      <h1>Welcome, {user.firstName}</h1>
      <Balance />
      <IncomeExpense />
      <AddTransaction />
      <TransactionList />
    </main>
  )
}

export default HomePage
