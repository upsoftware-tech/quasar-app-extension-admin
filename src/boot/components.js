import UpsoftBox from './../components/Box/index.vue';

import UpsoftAdminLayout from './../layouts/AdminLayout.vue';

export default ({ app }) => {
	app.component('UpsoftBox', UpsoftBox);
	app.component('UpsoftAdminLayout', UpsoftAdminLayout);
}
