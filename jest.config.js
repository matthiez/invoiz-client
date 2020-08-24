module.exports = {
    bail: 1,
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./jest.setup.ts'],
    testEnvironment: 'node',
    verbose: false,
};