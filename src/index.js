/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 */
import {useForm} from "./composables/useForm.js";
import {useAuth} from "./composables/useAuth.js";

function extendConf (conf, api) {
	conf.boot.push('~@upsoftware/quasar-app-extension-admin/src/boot/config.js');

	// Dodaj opcje konfiguracyjne do obiektu conf
	conf.framework = conf.framework || {};
	conf.framework.config = conf.framework.config || {};

	const userConfig = conf.framework.config['@upsoftware/admin'] || {
		api: {
			url: 'http://127.0.0.1:8000/',
			endpoint: {
				login: 'auth/login',
				register: 'auth/register'
			}
		},
		otp: {
			login: true,
			register: true,
			reset: true
		}
	};

	conf.framework.config['@upsoftware/admin'] = userConfig;

	// Logowanie, aby upewnić się, że konfiguracja jest ustawiona
	console.log('conf.framework.config["@upsoftware/admin"]:', conf.framework.config['@upsoftware/admin']);

	conf.boot.push('~@upsoftware/quasar-app-extension-admin/src/boot/components.js');
	if (!api.hasVite) {
		conf.build.transpileDependencies.push(/\\@upsoftware[\\/]quasar-app-extension-admin[\\/]src/);
		conf.build.transpileDependencies.push(/lodash/);
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
