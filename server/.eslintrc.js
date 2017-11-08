// .eslintrc.js
module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
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
        "no-console": "off",
        "no-unused-vars": "warn",
        "linebreak-style": "off",
        "comma-dangle": [
            "error",
            "never"
        ]
    },
    "parserOptions": {
        "sourceType": "module"
    }
};