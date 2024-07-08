/**
 * Quasar App Extension install script
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/install-api
 */

function installCoreModule(api) {
	api.extendJsonFile("quasar.extensions.json", {
		"upsoftware": {},
	});
}

export default function (api) {
	installCoreModule(api);
	api.compatibleWith('quasar', '^2.0.0')
}
