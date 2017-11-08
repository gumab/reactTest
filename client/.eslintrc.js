// .eslintrc.js
module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jquery": true
    },
    "plugins": [
      "react"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        "indent": [
            "error",
            4,
            { "SwitchCase": 1 }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-var": "error",
        "no-console": "warn",
        "no-unused-vars": "warn",
        "no-useless-escape": "off",
        "linebreak-style": "off",
        "comma-dangle": [
            "error",
            "never"
        ],
        "react/prop-types":"off"
    },
    "parserOptions": {
        "sourceType": "module"
    },
    "globals": {
        "daum": true
    }
};