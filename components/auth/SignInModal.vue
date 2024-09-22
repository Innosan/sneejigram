<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const username = ref("");
const password = ref("");

const userStore = useUserStore();
</script>

<template>
	<Modal label="Войти" title="Вход">
		<template #body>
			<UInput placeholder="Яйцеварис..." type="text" v-model="username" />
			<UInput placeholder="Пароль" type="password" v-model="password" />
		</template>
		<template #actions>
			<UButton
				@click="userStore.signIn(username, password)"
				label="Войти"
				color="primary"
			/>
		</template>
	</Modal>
</template>

<style scoped></style>
