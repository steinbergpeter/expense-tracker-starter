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

**Data model**: Transactions are objects stored in a state array with fields: description, amount (stored as strings — known bug), type (`income`/`expense`), category.

**Rendering flow**: App.jsx → filters transactions by type/category → computes summary totals (income, expenses, balance) → renders summary cards, add-transaction form, and filtered transaction table.

**Project context**: This is a starter project from a Claude Code course (codewithmosh.com). The codebase intentionally contains bugs (e.g., amounts as strings instead of numbers, missing delete functionality despite `.delete-btn` CSS being present) and poor UI — these are meant to be discovered and fixed as course exercises.
