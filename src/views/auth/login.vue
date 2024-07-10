<template>
	<upsoft-form>
		{{ form }}
		<upsoft-form-text v-model="form.email" label="Adres e-mail" />
		<upsoft-form-password v-model="form.password" label="Hasło" />
		<upsoft-button>Zaloguj się</upsoft-button>
	</upsoft-form>
</template>

<script setup>
import { useAuthLogin } from "../../composables/useAuthLogin.js";

const { form } = useAuthLogin();
</script>