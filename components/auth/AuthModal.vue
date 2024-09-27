<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const username = ref("");
const password = ref("");
const email = ref("");

const userStore = useUserStore();

const tab = ref(0);
</script>

<template>
	<Modal
		v-if="userStore.currentUser.id === 0"
		label="Вход"
		:title="tab === 0 ? 'Войти' : 'Регистрация'"
	>
		<template #body>
			<UButtonGroup>
				<UButton
					label="Вход"
					@click="tab = 0"
					:color="tab === 0 ? 'primary' : 'gray'"
				/>
				<UButton
					label="Регистрация"
					@click="tab = 1"
					:color="tab === 1 ? 'primary' : 'gray'"
				/>
			</UButtonGroup>
			<TitledBlock title="Имя пользователя и пароль">
				<UInput
					placeholder="Яйцеварис..."
					type="text"
					v-model="username"
				/>
				<UInput
					placeholder="Валар_моргулис_123"
					type="password"
					v-model="password"
				/>
			</TitledBlock>
			<UInput
				type="email"
				v-if="tab === 1"
				placeholder="kaban@gmail.com"
				v-model="email"
			/>
		</template>
		<template #actions>
			<UButton
				v-if="tab === 0"
				@click="userStore.signIn(username, password)"
				label="Войти"
				color="primary"
			/>
			<UButton
				v-if="tab === 1"
				@click="userStore.signUp(username, email, password)"
				label="Зарегистрироваться"
				color="primary"
			/>
		</template>
	</Modal>
</template>
