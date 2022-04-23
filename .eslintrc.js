module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended', // 添加 prettier 插件
    'plugin:jest/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
    'no-plusplus': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.vue']
    },
    'import/resolver': {
      typescript: {
        // always try to resolve types under `<root>@types`
        // directory even it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true,

        // Choose from one of the "project" configs
        // below or omit to use <root>/tsconfig.json by default

        // use <root>/path/to/folder/tsconfig.json
        project: '/'
      }
    }
  }
}
