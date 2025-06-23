import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import jsdocPlugin from 'eslint-plugin-jsdoc'
import importPlugin from 'eslint-plugin-import'
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      jsdoc: jsdocPlugin,
      import: importPlugin
    },
    rules: {
      // 1. No semicolons
      'semi': ['error', 'never'],

      // 2. Require type annotations on variables
      '@typescript-eslint/typedef': [
        'error',
        {
          variableDeclaration: true,
          parameter: true,
          propertyDeclaration: true,
          memberVariableDeclaration: true
        }
      ],

      // 3. Enforce spacing in type annotations
      '@typescript-eslint/type-annotation-spacing': ['error'],

      // 4. Functions must be arrow functions
      'func-style': ['error', 'expression'],

      // 4. Require JSDoc comments on functions (arrow functions included)
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            ArrowFunctionExpression: true
          }
        }
      ],
      'jsdoc/require-description': 'error',

      // 5. Require 2 new lines after imports
      'import/newline-after-import': ['error', { count: 2 }],

      // 6. All functions must have explicit return types (includes void)
      '@typescript-eslint/explicit-function-return-type': ['error'],

      // 7. Blank line between functions
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'function', next: 'function' }
      ],

      // 8. Max line length 90 characters
      'max-len': ['error', { code: 90 }],

      // 9. Prefer template literals for string interpolation
      'prefer-template': 'error',

      // Disallow template curly in strings (forces actual template literal)
      'no-template-curly-in-string': 'error'
    },
    settings: {
      jsdoc: {
        mode: 'typescript'
      }
    }
  },
  tseslint.configs.recommended,
]);
