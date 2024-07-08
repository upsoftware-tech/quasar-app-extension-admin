import { api } from 'boot/axios';

async function callApi(url, method, data, errors) {

	try {
		const request = await api({
			url: url,
			method: method,
			data: data
		});

		Object.keys(errors).forEach(key => {
			delete errors[key];
		});
		Object.assign(errors, []);

		return request;

	} catch (error) {

		Object.keys(errors).forEach(key => {
			delete errors[key];
		});

		if (error.response && error.response.status === 422) {
			if (errors.value) {
				errors.value = error.response.data.errors;
			}
			else {
				Object.assign(errors, error.response.data.errors);
			}
		} else {
			console.error('An error occurred:', error);
		}
		throw error;
	}
}

export { callApi }
