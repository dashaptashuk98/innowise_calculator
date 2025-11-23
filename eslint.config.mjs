import js from '@eslint/js'
import typescriptParser from '@typescript-eslint/parser'

export default [
  {
    // Для JavaScript файлов
    files: ['**/*.js'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
  {
    // Для TypeScript файлов
    files: ['**/*.ts'],
    ...js.configs.recommended,
    languageOptions: {
      parser: typescriptParser, // Добавляем TypeScript парсер
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'warn',
      'no-undef': 'off', // Отключаем для TS, т.к. проверяет типы
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
]
