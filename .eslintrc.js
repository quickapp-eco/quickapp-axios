module.exports = {
  extends: ['airbnb-base', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
    jest: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  rules: {
    'class-methods-use-this': 'off',
    'comma-dangle': 'off',
    'global-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'no-useless-escape': 'off',
    'prefer-object-spread': 'off',
    'prefer-template': 'off',
    'no-empty': 'off',
    'func-names': 'off',
    'import/no-unresolved': [2, {'ignore': ['@system.fetch']}]
  }
};
