const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tests/tsconfig.json')

module.exports = {
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/',
	}),
	testTimeout: 30000,
	testRegex: [
		'(/__tests__/.*|(\\.|/)(spec))\\.ts$',
	],
	testPathIgnorePatterns: [
		'<rootDir>/src/',
		'<rootDir>/node_modules/',
	],
	transform: {
		'^.+\\.ts?$': ['ts-jest', {
			tsconfig: './tests/tsconfig.json',
		}],
	},
}
