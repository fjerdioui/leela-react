module.exports = {
  root: true,
  env: {
    es6: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '/generated/**/*', // Ignore generated files.
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {
    'linebreak-style': [2, 'unix'],
    'prettier/prettier': ['error', { printWidth: 120 }, { singleQuote: true }],
    'max-len': ['error', { code: 120, ignoreComments: true }],
    quotes: ['error', 'single'],
    // quotes: ['error', 'double'],
    '@typescript-eslint/no-var-requires': 0,
    'no-undef': 0,
    'require-jsdoc': 0,
    'import/no-unresolved': 0,
    indent: ['error', 2],
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
