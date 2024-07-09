import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
	app.config.globalProperties.$upsoftwareAdmin = app.config.globalProperties.$q.config['@upsoftware/admin'];
});
