/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
    bail: 1,
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.test.json'
        }
    },
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./jest.setup.ts'],
    testEnvironment: 'node',
    verbose: false,
};