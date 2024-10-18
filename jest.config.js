const config = {
    coverageThreshold: {
        global: {
            branches: 60,
            functions: 60,
            lines: 60,
            statements: 60,
        },
    },
    setupFiles: ['<rootDir>/jest.setup.js'],  // Cargar el archivo de setup
};

module.exports = config;