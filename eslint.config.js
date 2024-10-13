// eslint.config.js
module.exports = [
    {
        ignores: ["coverage/*"],
        rules: {
            "complexity":["warn", 5],
            semi: "error",
            "prefer-const": "error"
        }
    }
];
