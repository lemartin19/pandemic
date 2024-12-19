const globals = require('globals');
const js = require('@eslint/js');
const prettier = require('eslint-config-prettier');
const typescript = require('@typescript-eslint/parser');

module.exports = [
  // Base ESLint recommended rules
  js.configs.recommended,

  // Prettier integration
  prettier,

  // Custom configuration for UI
  {
    files: ['pandemic-ui/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescript,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        React: true,
        JSX: true,
      },
    },
    rules: {
      // Error prevention
      'no-console': 'error',
      'no-debugger': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^__' }],

      // Best practices
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'error',

      // Style (not covered by Prettier)
      'no-multiple-empty-lines': ['error', { max: 1 }],
    },
  },

  // Custom configuration for server
  {
    files: ['pandemic-server/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescript,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      // Error prevention
      'no-console': 'error',
      'no-debugger': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^__' }],

      // Best practices
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'error',

      // Style (not covered by Prettier)
      'no-multiple-empty-lines': ['error', { max: 1 }],
    },
  },

  // Custom configuration for test files
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescript,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        ...globals.jest,
      },
    },
  },
];
