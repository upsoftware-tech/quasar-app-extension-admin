import UpsoftBox from './../components/Box/index.vue';
import UpsoftForm from './../components/Form/index.vue';
import UpsoftFormText from './../components/Form/Field/Text.vue';
import UpsoftFromPassword from './../components/Form/Field/Password.vue';

import UpsoftAdminLayout from './../layouts/AdminLayout.vue';

export default ({ app }) => {
	app.component('UpsoftBox', UpsoftBox);
	app.component('UpsoftForm', UpsoftForm);
	app.component('UpsoftFormText', UpsoftFormText);
	app.component('UpsoftFormPassword', UpsoftFromPassword);
	app.component('UpsoftAdminLayout', UpsoftAdminLayout);
}
