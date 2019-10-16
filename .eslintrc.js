module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    es6: true,
    jest: true,
  },
  extends: ['plugin:react-native/all', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'jsx-a11y', 'import'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/jsx-one-expression-per-line': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/sort-styles': 'off',
    'global-require': 'off',
    'react-native/no-raw-text': 'off',
    'react/forbid-prop-types': 'off',
    'react-native/no-inline-styles': 'off',
    'array-callback-return': 'off',
    'react-native/split-platform-components': 'off',
    'max-len': [
      'error',
      {
        code: 90,
        ignorePattern: '^import\\s.+\\sfrom\\s.+;$',
        ignoreUrls: true,
      },
    ],
    'no-console': 0,
    'implicit-arrow-linebreak': 0,
    'react/prop-types': 0,
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': { rootPathSuffix: 'src' },
    },
    react: {
      version: 'detect',
    },
  },
};
