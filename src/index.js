/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 */
import { useForm } from "./composables/useForm.js";
import { useAuth } from "./composables/useAuth.js";

import AdminLayout from "./layouts/AdminLayout.vue";
import AuthLoginView from "./views/auth/login.vue";

function deepMerge(target, source) {
	for (const key in source) {
		if (source[key] instanceof Object && key in target) {
			Object.assign(source[key], deepMerge(target[key], source[key]));
		}
	}
	Object.assign(target || {}, source);
	return target;
}

function extendConf (conf, api) {
	conf.boot.push('~@upsoftware/quasar-app-extension-admin/src/boot/axios.js');

	const defaultConfig = {
		api: {
			url: 'http://127.0.0.1:8000/api/v1',
			endpoint: {
				login: 'auth/login',
				register: 'auth/register'
			}
		},
		otp: {
			login: true,
			register: true,
			reset: true
		},
		login: {
			rememberMe: false
		}
	};

	conf.framework = conf.framework || {};
	conf.framework.config = conf.framework.config || {};

	const userConfig = conf.framework.config['@upsoftware/admin'] || {};
	conf.framework.config['@upsoftware/admin'] = deepMerge(defaultConfig, userConfig);

	conf.boot.push('~@upsoftware/quasar-app-extension-admin/src/boot/config.js');
	conf.boot.push('~@upsoftware/quasar-app-extension-admin/src/boot/components.js');

	if (!api.hasVite) {
		conf.build.transpileDependencies.push(/\\@upsoftware[\\/]quasar-app-extension-admin[\\/]src/);
		conf.build.transpileDependencies.push(/\\@upsoftware[\\/]quasar-app-extension-admin/);
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

	conf.build.alias = {
		...conf.build.alias,
		'@upsoftware/admin': api.resolve.src('')
	};

	conf.css.push('~@upsoftware/quasar-app-extension-admin/src/assets/scss/components.scss');
}

export default function (api) {
	api.compatibleWith('quasar', '^2.0.0')
	api.extendQuasarConf(extendConf)
}

export function install (Vue) {
	Vue.component('AdminLayout', AdminLayout);
	Vue.component('AuthLoginView', AuthLoginView);
}

export { useForm, useAuth, AuthLoginView, AdminLayout };
