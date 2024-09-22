<script setup lang="ts">
import { CardSizes } from "~/types/ui/CardSizes";

const props = defineProps({
	label: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: false,
	},
	icon: {
		type: String,
		required: false,
	},
});

const isOpen = ref(false);
</script>

<template>
	<UButton @click="isOpen = true" :label="label" :icon="icon" />
	<UModal v-model="isOpen">
		<UCard :ui="CardSizes.sm">
			<template #header>
				<div class="flex justify-between items-center">
					<p class="font-bold">{{ title }}</p>
					<UButton
						@click="isOpen = false"
						icon="i-heroicons-x-mark"
						variant="ghost"
						color="gray"
					/>
				</div>
			</template>
			<div class="flex flex-col gap-4">
				<slot name="body" />
			</div>
			<template #footer>
				<slot name="actions" />
			</template>
		</UCard>
	</UModal>
</template>
