<script setup lang="ts">
import { CardSizes } from "~/types/ui/CardSizes";

const userStore = useUserStore();
const postsStore = usePostsStore();

const items = [
	[
		{
			label: userStore.currentUser.username,
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
				isOpen.value = true;
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

const isOpen = ref(false);
const content = ref("");
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

	<UModal v-model="isOpen">
		<UCard :ui="CardSizes.sm">
			<template #header>
				<p class="text-xl font-bold">Новый пост</p>
			</template>

			<UInput placeholder="Снял бы шляпу, но увы..." v-model="content" />

			<template #footer>
				<div class="flex gap-2">
					<UButton
						label="Опубликовать"
						icon="i-heroicons-pencil-20-solid"
						color="primary"
						@click="
							() => {
								postsStore.createPost(
									userStore.currentUser.id,
									content,
								);

								isOpen = false;
								content = '';
							}
						"
					/>
					<UButton
						label="Закрыть"
						icon="i-heroicons-x-mark"
						color="gray"
						@click="isOpen = false"
					/>
				</div>
			</template>
		</UCard>
	</UModal>
</template>
