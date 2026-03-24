import { useState } from 'react'
import './App.css'
import transactionData from './transactionData'
import Summary from './Summary'
import AddTransaction from './AddTransaction'
import TransactionList from './TransactionList'

function App() {
  const [transactions, setTransactions] = useState(transactionData);

  return (
    <div className="app">
      <h1>Finance Tracker</h1>
      <p className="subtitle">Track your income and expenses</p>

      <Summary transactions={transactions} />
      <AddTransaction onAdd={(t) => setTransactions([...transactions, t])} />
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App
