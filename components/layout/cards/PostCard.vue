<script setup lang="ts">
import type { Post } from "~/types/data/Post";
import { CardSizes } from "~/types/ui/CardSizes";

const props = defineProps({
	post: {
		type: Object as PropType<Post>,
		required: true,
	},
});
</script>

<template>
	<UCard :ui="CardSizes.sm">
		<p class="opacity-70 underline text-sm">{{ post.author.username }}</p>
		<p>{{ post.content }}</p>
		<template #footer>
			<div class="flex gap-4">
				<UButton
					icon="i-heroicons-heart-solid"
					color="gray"
					:label="post.likes.toString()"
					variant="ghost"
				/>

				<UInput placeholder="Оставить комментарий" />
			</div>
		</template>
	</UCard>

	<div class="flex flex-wrap gap-2">
		<div
			v-for="comment in post.comments"
			class="flex flex-col ring-1 ring-gray-200 dark:ring-gray-800 rounded-lg p-2"
		>
			<div class="flex gap-1 text-sm">
				<p>{{ comment.user.username }}</p>
				<p class="opacity-70">{{ comment.createAt }}</p>
			</div>
			<p class="font-bold">{{ comment.content }}</p>
		</div>
	</div>
</template>
