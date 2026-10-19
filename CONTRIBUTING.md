# Contributing to Dev Jangid's Engineering Portfolio

Thank you for your interest in contributing to this open-source engineering portfolio and system telemetry station!

## 🌿 Branching Strategy

- `main`: Production-ready, stable codebase deployed live to Vercel.
- `feat/<feature-name>`: New interactive widgets, pages, or tools.
- `fix/<bug-name>`: Bug fixes or responsiveness patches.
- `docs/<doc-name>`: Documentation, architecture updates, or guides.

## 📝 Commit Conventions

We adhere to the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` Introduces a new feature or interactive component.
- `fix:` Patches a bug, layout glitch, or edge case.
- `docs:` Documentation, README, or markdown updates.
- `test:` Adds or updates Vitest automated test suites.
- `perf:` Performance optimizations or memory enhancements.
- `ci:` GitHub Actions CI/CD workflows or script tooling.

## 🧪 Verification Checklist Before Submitting a PR

1. **Type Check**: Ensure zero TypeScript errors:
   ```bash
   npx tsc --noEmit
   ```
2. **Automated Test Suite**: Verify that all Vitest unit tests pass:
   ```bash
   npm test -- --run
   ```
3. **Production Bundle Verification**:
   ```bash
   npm run build
   ```

## 📬 Questions & Contact

For inquiries or suggestions, reach out via [jangid.dev20@gmail.com](mailto:jangid.dev20@gmail.com) or submit a GitHub Issue.
