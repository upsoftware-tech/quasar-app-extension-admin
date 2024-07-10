import {useForm} from "./useForm.js";

export function useAuthLogin() {
    const form = useForm({
        email: '',
        password: '',
        remember_me: false
    });

    return { form }
}