# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server at http://localhost:5173
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview production build
npm run lint      # ESLint
```

No test framework is configured.

## Architecture

Single-page React app (no routing, no backend, no database). All state lives in `src/App.jsx` via `useState`.

**Data model**: Transactions are objects stored in a state array with fields: description, amount (stored as numbers via `parseFloat`), type (`income`/`expense`), category, date (ISO string), id (timestamp).

**Rendering flow**: App.jsx → filters transactions by type/category → computes summary totals (income, expenses, balance) → renders summary cards, add-transaction form, and filtered transaction table.

**AddTransaction form state**: Uses a single `useState` object (`form`) with a module-level `defaultForm` constant for resets, and a single `handleChange` handler using `e.target.name` — not separate state variables per field.

**TransactionList**: Includes a search bar (debounced) and sortable column headers.

**Project context**: This is a starter project from a Claude Code course (codewithmosh.com). Originally contained bugs (amounts as strings, missing delete functionality) and poor UI — these have been progressively fixed as course exercises.
