module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 9,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    },
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  plugins: ["react"],
  rules: {
    "no-unused-vars": "warn",
    "no-unused-expressions": "warn",
    "react/jsx-key": "warn",
    "no-useless-escape": "warn",
    "no-unreachable": "warn",
    "react/prop-types": "warn",
    "react/jsx-no-duplicate-props": "warn",
    "react/no-unescaped-entities": "warn",
    "no-undef": "warn"
  }
};
