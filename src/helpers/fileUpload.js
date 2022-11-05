export const fileUpload = async (file) => {
	if (!file) throw new Error('No hay archivo');
	const cloudUrl = 'https://api.cloudinary.com/v1_1/skierhy/upload';
	const formData = new FormData();
	formData.append('upload_preset', 'react-journal');
	formData.append('file', file);
	try {
		// fetch es una función nativa de javascript usa get por defecto
		const resp = await fetch(cloudUrl, {
			method: 'POST',
			body: formData,
		});
		if (!resp.ok) throw new Error('No se pudo subir el archivo');
		const cloudResp = await resp.json();
		return cloudResp.secure_url;
	} catch (error) {
		throw new Error(error.message);
	}
};
