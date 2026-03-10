// This file is loaded BEFORE every test file (see vite.config.js → test.setupFiles).
// It extends Vitest's built-in `expect` with DOM-specific matchers
// such as .toBeInTheDocument(), .toHaveTextContent(), etc.
import '@testing-library/jest-dom';
