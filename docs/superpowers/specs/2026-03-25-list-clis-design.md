# list-clis — Design Spec

**Date:** 2026-03-25

## Overview

A standalone bash script installed at `~/.local/bin/list-clis` that scans `$PATH`, identifies known developer CLIs using a comprehensive knowledge-driven pattern list, and displays them organized by category. The pattern list is broad enough that most common tools appear automatically when installed — no manual editing required for well-known CLIs.

## Architecture

Single bash script. Standard POSIX utilities (`chmod`, file tests, directory traversal) are the only dependencies — no external tools required.

**Flow:**
1. Split `$PATH` into directories
2. For each directory that exists and is accessible (`-d` test), iterate files that are executable (`-x -f`). Skip non-existent or unreadable PATH entries silently.
3. Deduplicate by bare filename — first occurrence wins (respects PATH priority order). Two files named `git` in different directories are treated as the same tool; the first one found is kept.
4. Pass each name through `categorize()` — a `case` statement using standard bash glob patterns (e.g. `git-*`, `cargo*`). Bare names like `brew` are exact matches. Returns a category string or empty string if unrecognized.
5. Append matched tool names to per-category buffers — implemented as a bash associative array (`declare -A`) keyed by category name, with values as newline-separated tool name strings.
6. Print categories in the fixed display order defined in the Categories section below, skipping any category whose buffer is empty. If no tools are recognized at all, the script exits silently with no output. Unrecognized binaries (including the `list-clis` script itself) are simply dropped — no exclusion list is needed.

## Categories & Display Order

Categories are printed in the order listed in this table. The `categorize()` case statement uses standard bash glob syntax; bare names are exact matches.

| # | Category | Patterns |
|---|---|---|
| 1 | AI & Editors | `claude`, `cursor`, `code`, `console-ninja`, `aider`, `copilot`, `cody`, `continue` |
| 2 | Version Control | `git`, `git-*`, `gh`, `hub`, `hub-tool`, `scalar`, `jj`, `fossil`, `svn`, `hg` |
| 3 | JavaScript / Node | `node`, `npm`, `npx*`, `nvm`, `pnpm`, `yarn`, `bun`, `deno`, `corepack`, `tsc`, `tsserver`, `ts-node*`, `ts-script`, `nodemon`, `ncu`, `npm-check-updates`, `eslint`, `prettier`, `jest`, `vitest`, `mocha`, `cypress`, `webpack`, `rollup`, `esbuild`, `parcel`, `vite`, `turbo`, `nx`, `create-vite`, `create-react-app`, `create-next-app`, `serve`, `json-server`, `express-*` |
| 4 | Python | `python`, `python3*`, `pip*`, `uv`, `uvx`, `pipenv`, `poetry`, `pyenv`, `conda`, `mamba`, `black`, `ruff`, `flake8`, `mypy`, `pylint`, `isort`, `pytest`, `sphinx-*` |
| 5 | Go | `go`, `gofmt`, `gopls`, `golangci-lint`, `air`, `goreleaser` |
| 6 | Rust | `rustc`, `rustup`, `rustfmt`, `rustdoc`, `cargo*`, `clippy-*`, `rust-*` |
| 7 | Ruby | `ruby`, `gem`, `bundle`, `bundler`, `rails`, `rake`, `rbenv`, `rvm`, `irb`, `pry` |
| 8 | JVM | `java`, `javac`, `mvn`, `gradle`, `kotlin`, `kotlinc`, `scala`, `sbt`, `groovy` |
| 9 | Database | `psql*`, `pg_*`, `postgres*`, `pscale`, `createdb*`, `dropdb*`, `pgbench*`, `vacuumdb*`, `reindexdb*`, `mysql`, `mysqldump`, `mariadb`, `sqlite3`, `redis-cli`, `mongosh`, `mongo` |
| 10 | Containers & Orchestration | `docker*`, `kubectl*`, `helm`, `k9s`, `kind`, `minikube`, `k3s`, `podman`, `buildah`, `skopeo`, `containerd` |
| 11 | Cloud & Infrastructure | `aws`, `gcloud`, `az`, `doctl`, `fly`, `flyctl`, `railway`, `heroku`, `terraform`, `tofu`, `pulumi`, `ansible*`, `vagrant`, `packer`, `vercel`, `netlify`, `wrangler`, `supabase` |
| 12 | Build Tools | `cmake`, `cpack`, `ctest`, `ninja`, `make`, `automake*`, `autoconf*`, `aclocal*`, `protoc*`, `bazel`, `meson`, `ant` |
| 13 | Package Managers | `brew`, `nix`, `snap`, `flatpak` |
| 14 | Utilities | `jq`, `yq`, `fzf`, `tmux`, `htop`, `btop`, `bat`, `eza`, `fd`, `rg`, `ngrok`, `openssl`, `op`, `stripe`, `z3`, `pa11y`, `swig*` |

**Notes on short/ambiguous patterns:**
- `op` (1Password CLI) is an intentional exact match — accepted as a known, well-established tool name.
- Single-character names like `n` (Node version manager) are excluded — too prone to false positives. `nvm` covers the version manager use case.

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
- No output if no recognized tools are found

## Installation

**Prerequisites:**
- `~/.local/bin` must exist and be on `$PATH`. On this machine, both are already true.

**Steps:**
1. Write script to `~/.local/bin/list-clis`
2. `chmod +x ~/.local/bin/list-clis`

The script is then immediately available as `list-clis` in any new shell session (and the current session, since `~/.local/bin` is already in `$PATH`).
