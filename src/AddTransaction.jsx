import { useState } from 'react'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

const defaultForm = { description: "", amount: "", type: "expense", category: "food" };

function AddTransaction({ onAdd }) {
  const [form, setForm] = useState(defaultForm);

  const handleReset = () => setForm(defaultForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) return;

    onAdd({
      id: Date.now(),
      description: form.description,
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: new Date().toISOString().split('T')[0],
    });

    handleReset();
  };

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select name="category" value={form.category} onChange={handleChange}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <div style={{ width: '100%', display: 'flex', gap: '8px' }}>
          <button type="button" onClick={handleReset} style={{ background: '#666' }}>Reset</button>
          <button
            type="submit"
            disabled={!form.description || !form.amount}
            style={(!form.description || !form.amount) ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
          >Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddTransaction;
