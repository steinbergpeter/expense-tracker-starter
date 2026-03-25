# list-clis — Design Spec

**Date:** 2026-03-25

## Overview

A standalone bash script installed at `~/.local/bin/list-clis` that scans `$PATH`, identifies known developer CLIs, and displays them organized by category — mirroring the manual process of listing PATH directories, deduplicating, and categorizing by hand.

## Architecture

Single bash script, no external dependencies.

**Flow:**
1. Split `$PATH` into directories
2. For each directory, iterate files that are executable (`-x -f`)
3. Deduplicate by name — first occurrence wins (respects PATH priority order)
4. Pass each name through `categorize()` — a `case` statement with glob patterns
5. Append matched tools to per-category output buffers
6. Print categories in fixed display order, skipping empty ones

## Categorization

Uses a `categorize()` function with a bash `case` statement and glob patterns. Tools matching no pattern are silently skipped (curated output only — no "Uncategorized" bucket).

| Category | Glob Patterns |
|---|---|
| AI & Editors | `claude`, `cursor`, `code`, `console-ninja` |
| Version Control | `git`, `git-*`, `gh`, `hub-tool`, `scalar` |
| JavaScript / Node | `node`, `npm`, `npx*`, `nvm`, `n`, `pnpm`, `yarn`, `bun`, `corepack`, `tsc`, `tsserver`, `ts-node*`, `ts-script`, `nodemon`, `ncu`, `npm-check-updates`, `eslint`, `prettier`, `jest`, `create-vite`, `serve`, `json-server`, `express-*` |
| Python | `python3*`, `pip3*`, `uv`, `uvx`, `sphinx-*` |
| Go | `go`, `gofmt`, `god` |
| Rust | `rustc`, `cargo*`, `rustfmt`, `clippy-*`, `rust-*`, `rustdoc` |
| Database | `psql*`, `pg_*`, `postgres*`, `pscale`, `createdb*`, `dropdb*`, `pgbench*`, `vacuumdb*`, `reindexdb*` |
| Containers & Cloud | `docker*`, `kubectl*`, `railway`, `ngrok` |
| Build Tools | `cmake`, `cpack`, `ctest`, `ninja`, `protoc*`, `make`, `automake*`, `autoconf*`, `aclocal*` |
| Package Managers | `brew` |
| Utilities | `jq`, `tmux`, `htop`, `openssl`, `op`, `z3`, `pa11y`, `swig*` |

## Output Format

```
── AI & Editors
  claude
  code
  console-ninja
  cursor

── Version Control
  gh
  git
  ...
```

- Category header: `── Category Name`
- Tools indented 2 spaces, sorted alphabetically within each category
- Blank line between categories

## Installation

Script placed at `~/.local/bin/list-clis` with executable permissions (`chmod +x`). Already on `$PATH` via `~/.local/bin`.
