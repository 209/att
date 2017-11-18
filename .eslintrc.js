const eslintrc = {
  extends:       [
    'eslint-config-airbnb',
  ],
  env:           {
    browser: true,
    node:    true,
    jasmine: true,
    jest:    true,
    es6:     true,
  },
  parser:        'babel-eslint',
  parserOptions: {
    ecmaVersion:  6,
    ecmaFeatures: {
      jsx:                          true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins:       [
    'markdown',
    'react',
    'babel',
  ],
  rules:         {
    'func-names':                              0,
    'arrow-body-style':                        0,
    'arrow-parens':                            ["error", "as-needed"],
    'react/sort-comp':                         0,
    'react/prop-types':                        0,
    'react/jsx-first-prop-new-line':           0,
    'react/jsx-filename-extension':            [
      1,
      {
        extensions: [
          '.js',
          '.jsx',
          '.md',
        ],
      },
    ],
    'import/extensions':                       0,
    'import/no-unresolved':                    0,
    'import/no-extraneous-dependencies':       0,
    'import/prefer-default-export':            0,
    'no-param-reassign':                       0,
    'no-return-assign':                        0,
    'max-len':                                 0,
    'consistent-return':                       0,
    'no-redeclare':                            0,
    'react/require-extension':                 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-has-content':             0,
    'react/no-danger':                         0,
    'import/no-named-as-default':              0,
    'react/prefer-stateless-function':         0,
    'comma-dangle':                            [
      'error',
      'always-multiline',
    ],
    'key-spacing':                             [
      2,
      {
        'multiLine': {
          'beforeColon': false,
          'afterColon':  true,
        },
        'align':     {
          'beforeColon': false,
          'afterColon':  true,
          'on':          'value',
          'mode':        'minimum',
        },
      },
    ],
    'indent':                                  [
      'error',
      2,
      {
        'VariableDeclarator': {
          'var':   2,
          'let':   2,
          'const': 3,
        },
        'MemberExpression':   1,
        'ObjectExpression':   1,
      },
    ],
    "react/jsx-indent":                        [1, 50],
    "react/require-default-props":             0,
    "react/forbid-prop-types":                 0
  },
};

module.exports = eslintrc;
