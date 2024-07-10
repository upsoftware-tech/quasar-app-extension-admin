import {boot} from 'quasar/wrappers';
import axios from 'axios';

const defaultApiUrl = 'http://127.0.0.1:8000/v1/';

let api;

export default boot(({ app }) => {
	const apiUrl = app.config.globalProperties.$q.config['@upsoftware/admin']?.api?.url || defaultApiUrl;

	// Tworzenie instancji axios z URL z konfiguracji
	api = axios.create({ baseURL: apiUrl });

	// Rejestracja instancji axios w globalnych właściwościach Vue
	app.config.globalProperties.$axios = axios;
	app.config.globalProperties.$api = api;

	// Logowanie, aby sprawdzić URL
	console.log('API URL:', apiUrl);
});

export { api };
