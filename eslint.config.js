// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import a11yPlugin from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules'],
  },

  // JS recommended
  js.configs.recommended,

  // TS recommended
  tseslint.configs.recommended[0],

  {
    languageOptions: {
      globals: {
        ...globals.browser, // Include browser globals
      },
    },

    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': a11yPlugin,
    },

    rules: {
      // react-hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // react rules
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // jsx-a11y
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',

      'no-unused-vars': 'off', // Disable base ESLint rule
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_', // Ignore variables starting with _
          argsIgnorePattern: '^_', // Ignore function arguments starting with _
          ignoreRestSiblings: true, // Ignore rest siblings in destructuring
        },
      ],
    },

    settings: {
      react: { version: 'detect' },
    },
  },

  // Prettier
  prettier
);
