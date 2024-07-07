/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 */

function extendConf (conf, api) {
	conf.boot.push('~@upsoftware/quasar-app-extension-admin/src/boot/components.js');
	if (!api.hasVite) {
		conf.build.transpileDependencies.push(/\\@upsoftware[\\/]quasar-app-extension-admin[\\/]src/);
	}
	conf.css.push('~@upsoftware/quasar-app-extension-admin/src/assets/scss/components.scss');
}

export default function (api) {
	api.compatibleWith('quasar', '^2.0.0')
	api.extendQuasarConf(extendConf)
}
