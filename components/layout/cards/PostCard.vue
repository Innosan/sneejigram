<script setup lang="ts">
import type { Post } from "~/types/data/Post";
import { CardSizes } from "~/types/ui/CardSizes";

const props = defineProps({
	post: {
		type: Object as PropType<Post>,
		required: true,
	},
});

const userStore = useUserStore();
const isDisabled = computed(() => userStore.currentUser.role.id === 3);

const likesDislikes = computed(() => {
	const likes = props.post.likes.filter((like) => like.status === 1);
	const selfLike = likes.find(
		(like) => like.user.id === userStore.currentUser.id,
	);

	const dislikes = props.post.likes.filter((dislike) => dislike.status === 0);
	const selfDislike = dislikes.find(
		(dislike) => dislike.user.id === userStore.currentUser.id,
	);

	return {
		likes: {
			list: likes,
			length: likes.length.toString(),
			self: selfLike,
		},
		dislikes: {
			list: dislikes,
			length: dislikes.length.toString(),
			self: selfDislike,
		},
	};
});
</script>

<template>
	<UCard :ui="CardSizes.sm">
		<p class="opacity-70 underline text-sm">{{ post.author.username }}</p>
		<div class="flex gap-2">
			<UBadge v-for="tag in post.tags" :label="tag.title" />
		</div>
		<p>{{ post.content }}</p>
		<template #footer>
			<div class="flex gap-4">
				<UTooltip
					:text="
						likesDislikes.likes.list
							.map((like) => like.user.username)
							.join(', ') || 'Никто не оценил'
					"
				>
					<UButton
						:icon="
							likesDislikes.likes.self
								? 'i-heroicons-hand-thumb-up-solid'
								: 'i-heroicons-hand-thumb-up'
						"
						color="gray"
						:disabled="isDisabled"
						:label="likesDislikes.likes.length"
						variant="ghost"
					/>
				</UTooltip>
				<UTooltip
					:text="
						likesDislikes.dislikes.list
							.map((dislike) => dislike.user.username)
							.join(', ') || 'Сегодня без негатива'
					"
				>
					<UButton
						:icon="
							likesDislikes.dislikes.self
								? 'i-heroicons-hand-thumb-down-solid'
								: 'i-heroicons-hand-thumb-down'
						"
						color="gray"
						:disabled="isDisabled"
						:label="likesDislikes.dislikes.length"
						variant="ghost"
					/>
				</UTooltip>

				<UInput v-if="!isDisabled" placeholder="Оставить комментарий" />
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
