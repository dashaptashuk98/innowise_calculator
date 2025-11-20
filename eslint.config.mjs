import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      eqeqeq: 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'prefer-arrow-callback': 'error',
      indent: 'off',
      'object-curly-spacing': 'off',
      'prefer-template': 'off',
    },
  },
  {
    ignores: ['node_modules/', 'dist/', 'build/', 'css/'],
  },
]
