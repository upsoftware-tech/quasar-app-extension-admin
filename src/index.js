/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 */
import { useForm } from "./composables/useForm.js";
import { useAuth } from "./composables/useAuth.js";

function extendConf (conf, api) {
	conf.boot.push('~@upsoftware/quasar-app-extension-admin/src/boot/components.js');
	if (!api.hasVite) {
		conf.build.transpileDependencies.push(/\\@upsoftware[\\/]quasar-app-extension-admin[\\/]src/);
	} else {
		conf.build.vitePlugins = conf.build.vitePlugins || [];
		conf.build.vitePlugins.push({
			name: 'quasar-admin-extension',
			config(config) {
				config.resolve = config.resolve || {};
				config.resolve.alias = config.resolve.alias || {};
				config.resolve.alias['@upsoftware/admin'] = api.resolve.src('');
			}
		});
	}
	conf.css.push('~@upsoftware/quasar-app-extension-admin/src/assets/scss/components.scss');
}

export default function (api) {
	api.compatibleWith('quasar', '^2.0.0')
	api.extendQuasarConf(extendConf)
}

export { useForm, useAuth };
