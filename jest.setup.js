import 'whatwg-fetch';
// import 'isomorphic-fetch';
import 'setimmediate';

require('dotenv').config({
	path: '.env.test',
});

// hacemos un mock de la función getEnvironments
// un mock es una función que se ejecuta en lugar de la original
jest.mock('./src/helpers/getEnvironments', () => ({
	getEnvironments: () => ({ ...process.env }),
}));
