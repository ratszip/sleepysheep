module.exports = {
    root: true,

    env: {
        node: true
    },

    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],

    parserOptions: {
        parser: '@babel/eslint-parser'
    },

    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'eslint-disable-next-line': 'on'
    },

    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ]
}