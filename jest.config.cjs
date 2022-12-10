module.exports = {
	testEnvironment: 'jest-environment-jsdom',
	setupFiles: ['./jest.setup.js'],
	// transformIgnorePatterns sirve para que no se transformen los imports
	transformIgnorePatterns: [],
};
