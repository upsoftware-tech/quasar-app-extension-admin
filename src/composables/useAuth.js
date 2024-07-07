import { ref } from 'vue';

export function useAuth() {
	const user = {

	};

	const authenticated = ref(false);

	return {
		authenticated,
		user
	}
}
