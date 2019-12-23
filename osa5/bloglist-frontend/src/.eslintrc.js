module.exports = {
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true,
    'jest': true,
  },
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
        'error',
        2
    ],
    'linebreak-style': [
        'error',
        'windows'
    ],
    'quotes': [
        'error',
        'single'
    ],
    'semi': [
        'error',
        'never'
    ]
  }
}