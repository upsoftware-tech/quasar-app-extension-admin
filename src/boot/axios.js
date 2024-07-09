import {boot} from 'quasar/wrappers';
import axios from 'axios';

const defaultApiUrl = 'http://127.0.0.1:8000/v1/';

const api = axios.create({ baseURL: defaultApiUrl });

export default boot(({ app }) => {
	api.defaults.baseURL = app.config.globalProperties.$q.config['@upsoftware/admin'].api.url || defaultApiUrl;
	
	app.config.globalProperties.$axios = axios;
	app.config.globalProperties.$api = api;
});

export { api };
