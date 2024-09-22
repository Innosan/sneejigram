<script setup lang="ts">
import { usePostsStore } from "~/stores/posts";

const postsStore = usePostsStore();
postsStore.getPosts();
</script>

<template>
	<div class="w-full flex flex-col gap-8">
		<div v-for="post in postsStore.posts" class="flex flex-col gap-2">
			<PostCard :post="post" />
		</div>
	</div>
</template>
