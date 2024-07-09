import {boot} from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

export default boot(({ app }) => {

	const apiUrl = app.config.globalProperties.$q.config['@upsoftware/admin'].api.url;

	const api = axios.create({ baseURL: apiUrl });

	app.config.globalProperties.$axios = axios
	app.config.globalProperties.$api = api
});

export { api }
