import { reactive } from 'vue';
import { callApi } from "./../boot/api.js";
import cloneDeep from 'lodash/cloneDeep';

export default function useForm(params, options = {}) {

	let transform = (data) => data

	let defaults = typeof params === 'object' ? cloneDeep(params) : cloneDeep(data())

	return reactive({
		...params,
		data() {
			return (Object.keys(defaults)).reduce((carry, key) => {
				carry[key] = this[key]
				return carry
			}, {});
		},
		transform(callback) {
			transform = callback
			return this
		},
		processed: false,
		clearErrors() {
			this.errors = {}
		},
		errors: {},
		reset() {
			this.clearErrors();
			this.processed = false;
			Object.assign(this, defaults)
		},
		async submit(method, url, options = {}) {
			const data = transform(this.data())

			const _options = {
				onSuccess: async (data) => {
					this.clearErrors();
					return options.onSuccess ? await options.onSuccess(data) : null;
				},
				onError: async (error) => {
					return options.onError ? await options.onError(error) : null;
				},
			}

			try {
				this.processed = true;
				const request = await callApi(url, method, data, this.errors);
				await _options.onSuccess(request.data);
			} catch(e) {
				await _options.onError(e);
			}
			this.processed = false;
		},
		post(url, options = {}) {
			this.submit('post', url, options)
		},
		get(url, options = {}) {
			this.submit('get', url, options)
		},
		put(url, options = {}) {
			this.submit('put', url, options)
		},
		patch(url, options = {}) {
			this.submit('patch', url, options)
		},
		delete(url, options = {}) {
			this.submit('delete', url, options)
		}
	})
}
