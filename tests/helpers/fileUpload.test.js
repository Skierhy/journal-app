import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

// configuración de cloudinary
cloudinary.config({
	cloud_name: 'skierhy',
	api_key: '228261153839341',
	api_secret: 'Ye5CchL7OVomVg1jsSRAXR4Jyuk',
	secure: true,
});

describe('Pruebas en fileUpload', () => {
	test('debe de subir el archivo correctamente a cloudinary', async () => {
		// url de la imagen
		const imageUrl =
			'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';
		// convertir la imagen a un archivo
		const resp = await fetch(imageUrl);
		// blob es un archivo binario
		const blob = await resp.blob();
		// crear un archivo con el nombre foto.jpg
		const file = new File([blob], 'foto.jpg');
		// usar la función fileUpload
		const url = await fileUpload(file);
		// hacer un expect de la url
		console.log(url);
		expect(typeof url).toBe('string');

		// realizar la limpieza de la imagen
		// separa la url por /
		const segments = url.split('/');
		// separa el nombre del archivo por .jpg
		const imageId = segments[segments.length - 1].replace('.jpg', '');
		// borra la imagen
		const cloudResp = await cloudinary.api.delete_resources(
			['journal-app/' + imageId],
			// saber que sera una imagen
			{
				resource_type: 'image',
			}
		);
		// console.log({ cloudResp })
	});

	test('debe de retornar null', async () => {
		const file = new File([], 'foto.jpg');
		const url = await fileUpload(file);
		expect(url).toBe(null);
	});
});
