module.exports = {
  'parser': 'babel-eslint',
  'extends': ['airbnb', 'plugin:prettier/recommended'],
  'env': {
    'browser': true
  },
  'rules': {
    'no-nested-ternary': 0,
    'react/jsx-curly-spacing': 0,
    'react/no-multi-comp': 0,
    'react/jsx-no-bind': 0,
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'jsx-a11y/no-static-element-interactions': 0,
    'class-methods-use-this': 0,
    'react/no-unused-prop-types': 1,
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
    'jsx-a11y/label-has-for': 1,

    'no-await-in-loop': 0,
    'no-restricted-syntax': [2,
      {
        'selector': 'ForInStatement',
        'message': 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
      },
      {
        'selector': 'LabeledStatement',
        'message': 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
      },
      {
        'selector': 'WithStatement',
        'message': '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
      }
    ],
    'no-return-assign': [2, 'except-parens'],

    // These rules are fixable automatically with `--fix` option.
    'comma-dangle': 0,
    'function-paren-newline': 0,
    'implicit-arrow-linebreak': 0,
    'indent': 0,
    'lines-between-class-members': 0,
    'no-multi-spaces': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'semi-style': 0,
    'react/jsx-indent': 0,
    'react/jsx-tag-spacing': 0,
    'react/jsx-wrap-multilines': 0,
    'react/jsx-max-props-per-line': 0,
    'react/jsx-closing-tag-location': 0,
    'react/jsx-curly-brace-presence': 0,
    'react/jsx-one-expression-per-line': 0,

    // TODO: Fix or disable
    'react/require-default-props': 1,
    'react/destructuring-assignment': 1,
    'react/no-find-dom-node': 1,
    'react/no-array-index-key': 1,
    'react/button-has-type': 1,
    'jsx-a11y/click-events-have-key-events': 1,
    'jsx-a11y/no-noninteractive-tabindex': 1,
    'jsx-a11y/role-has-required-aria-props': 1,
    'jsx-a11y/anchor-is-valid': 1,
    'jsx-a11y/interactive-supports-focus': 1,
    'jsx-a11y/label-has-associated-control': 1
  }
};