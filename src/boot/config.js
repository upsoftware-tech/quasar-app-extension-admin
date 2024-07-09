import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
	app.config.globalProperties.$upsoftware = app.config.globalProperties.$q.config.upsoftware;
});
