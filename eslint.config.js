// eslint.config.js
module.exports = [
    {
        ignores: ["coverage",".sonar"],
        rules: {
            "complexity":["warn", 5],
            semi: "error",
            "prefer-const": "error"
        }
    }
];
