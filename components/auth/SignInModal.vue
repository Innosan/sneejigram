<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const username = ref("");
const password = ref("");

const userStore = useUserStore();
</script>

<template>
	<Modal v-if="userStore.currentUser.id === 0" label="Войти" title="Вход">
		<template #body>
			<TitledBlock title="Имя пользователя и пароль">
				<UInput
					placeholder="Яйцеварис..."
					type="text"
					v-model="username"
				/>
				<UInput
					placeholder="Пароль"
					type="password"
					v-model="password"
				/>
			</TitledBlock>
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
