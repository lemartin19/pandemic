const globals = require('globals');
const js = require('@eslint/js');
const prettier = require('eslint-config-prettier');
const typescript = require('@typescript-eslint/parser');
const tseslint = require('typescript-eslint');
const reactPlugin = require('eslint-plugin-react');

module.exports = tseslint.config(
  // Base ESLint recommended rules
  tseslint.configs.recommended,

  // Prettier integration
  prettier,

  // Custom configuration for UI
  {
    files: ['pandemic-ui/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
    },
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
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Error prevention
      'no-console': 'error',
      'no-debugger': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^__' }],
      'react/display-name': 'error',

      // Best practices
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'error',

      // Style (not covered by Prettier)
      'no-multiple-empty-lines': ['error', { max: 1 }],

      ...reactPlugin.configs.recommended.rules,
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
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^__' }],

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
  }
);
