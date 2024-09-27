<script setup lang="ts">
const postsStore = usePostsStore();
const userStore = useUserStore();

postsStore.getPosts();
postsStore.getTags();
</script>

<template>
	<div class="flex flex-col w-full gap-2">
		<UAlert
			v-if="userStore.currentUser.role.id === 3"
			size="xs"
			variant="subtle"
			icon="i-heroicons-exclamation-circle-solid"
			title="Гости не могут оставлять комментарии и ставить лайки!"
		></UAlert>

		<SearchBar />

		<div class="w-full flex flex-col gap-8">
			<div
				v-for="post in postsStore.foundPosts"
				class="flex flex-col gap-2"
			>
				<PostCard :post="post" />
			</div>
		</div>

		<UAlert
			v-if="postsStore.foundPosts.length === 0"
			size="xs"
			variant="subtle"
			icon="i-heroicons-information-circle-solid"
			title="По вашему запросу ничего не найдено"
		></UAlert>
	</div>
</template>
