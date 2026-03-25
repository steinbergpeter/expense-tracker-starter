import { useState } from 'react'
import AddTransaction from './AddTransaction'
import './App.css'
import Summary from './Summary'
import transactionData from './transactionData'
import TransactionList from './TransactionList'

function App() {
  const [transactions, setTransactions] = useState(transactionData);
  const addTrans = (t) => setTransactions([...transactions, t])
  const deleteTransaction = (id) => setTransactions(transactions.filter(t => t.id !== id))

  return (
    <div className="app">
      <h1>Finance Tracker</h1>
      <p className="subtitle">Track your income and expenses</p>

      <Summary transactions={transactions} />
      <AddTransaction onAdd={addTrans} />
      <TransactionList transactions={transactions} onDelete={deleteTransaction} />
    </div>
  );
}

export default App
