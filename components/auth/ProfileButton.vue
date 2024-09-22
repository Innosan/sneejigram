<script setup lang="ts">
const userStore = useUserStore();

const items = [
	[
		{
			label: "Ваш профиль",
			icon: "i-heroicons-user-solid",
		},
		{
			label: "Активность",
			icon: "i-heroicons-chart-pie-20-solid",
		},
	],
	[
		{
			label: "Создать пост",
			icon: "i-heroicons-pencil-20-solid",
			click: () => {
				console.log("Edit");
			},
		},
	],
	[
		{
			label: "Выйти",
			icon: "i-heroicons-arrow-left-start-on-rectangle-solid",
			click: () => {
				userStore.signOut();
			},
		},
	],
];
</script>

<template>
	<UDropdown
		v-if="userStore.currentUser.id !== 0"
		:items="items"
		:popper="{ placement: 'bottom-start' }"
	>
		<UButton
			label="Меню"
			icon="i-heroicons-bars-3-solid"
			class="w-full"
			type="link"
			color="gray"
		/>
	</UDropdown>
</template>
