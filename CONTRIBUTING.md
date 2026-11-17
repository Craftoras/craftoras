# Contributing to Craftoras

First off, thank you for considering contributing to Craftoras! It's people like you who make open source such a great community.

All types of contributions are encouraged and valued. See below for details on how to get started.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Workflow](#development-workflow)
  - [Branch Naming](#branch-naming)
  - [Commit Conventions](#commit-conventions)
- [Pull Request Guidelines](#pull-request-guidelines)

---

## Code of Conduct

This project and everyone participating in it is governed by the [Craftoras Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior following the guidelines in the document.

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to ensure the problem hasn't already been reported.

When creating a bug report on GitHub, please include as much detail as possible:
- **Title**: A clear, descriptive summary of the issue.
- **Steps to reproduce**: Step-by-step instructions to recreate the behavior.
- **Expected vs Actual Behavior**: What you expected to happen vs what actually happened.
- **Environment**: OS version, browser, node/runtime version (if applicable).
- **Screenshots or Logs**: Stack traces, terminal output, or browser console errors.

### Suggesting Enhancements

Feature suggestions and enhancements are welcomed. When submitting an enhancement proposal:
- Use a clear and descriptive title.
- Provide a step-by-step explanation of the proposed feature or improvement.
- Explain why this enhancement would be useful to Craftoras users and contributors.

### Pull Requests

1. **Fork the repo** and create your branch from `main`.
2. If you've added code that should be tested, add unit/integration tests.
3. Ensure the test suite passes and code linter rules are satisfied.
4. Issue that pull request!

---

## Development Workflow

### Getting Started

1. Fork the repository: `https://github.com/Craftoras/craftoras`
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/craftoras.git
   cd craftoras
   ```
3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/Craftoras/craftoras.git
   ```

### Branch Naming

Use descriptive branch names:
- `feature/<short-description>` (e.g., `feature/product-catalog`)
- `fix/<short-description>` (e.g., `fix/auth-token-refresh`)
- `docs/<short-description>` (e.g., `docs/api-endpoints`)
- `refactor/<short-description>`

### Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `perf:` A code change that improves performance
- `test:` Adding missing tests or correcting existing tests
- `chore:` Changes to the build process or auxiliary tools and libraries

Example:
```bash
git commit -m "feat(catalog): add filter by handicraft category"
```

---

## Pull Request Guidelines

Before submitting a Pull Request, please ensure:

- [ ] Your code follows the project's code style and conventions.
- [ ] You have rebased your branch onto the latest `upstream/main`.
- [ ] Existing and new tests pass locally.
- [ ] Any relevant documentation has been updated.
- [ ] Your PR description clearly outlines the problem solved and changes introduced.

Thank you for contributing to Craftoras!
