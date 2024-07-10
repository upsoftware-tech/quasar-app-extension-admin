import { boot } from 'quasar/wrappers';
import axios from 'axios';

const defaultApiUrl = 'http://127.0.0.1:8000/v1/';

const api = axios.create({ baseURL: defaultApiUrl });

export default boot(({ app }) => {
	const apiUrl = app.config.globalProperties.$q.config['@upsoftware/admin'].api.url || defaultApiUrl;

	api.defaults.baseURL = apiUrl;
	console.log(apiUrl);

	// Rejestracja instancji axios w globalnych właściwościach Vue
	app.config.globalProperties.$axios = axios;
	app.config.globalProperties.$api = api;
});

export { api };
