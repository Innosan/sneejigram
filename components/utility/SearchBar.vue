<script setup lang="ts">
const postsStore = usePostsStore();

const isFocused = ref(false);
const isSearchExpanded = ref(false);

const handleClickOutside = (event: MouseEvent) => {
	const input = document.querySelector("input");
	const tagsCard = document.querySelector(".tags-card");
	const expandedSearchBar = document.querySelector(".expanded-search-bar");

	if (
		input &&
		!input.contains(event.target as Node) &&
		tagsCard &&
		!tagsCard.contains(event.target as Node) &&
		expandedSearchBar &&
		!expandedSearchBar.contains(event.target as Node)
	) {
		isSearchExpanded.value = false;
	}
};

onMounted(() => {
	document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
	document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
	<div
		:class="isSearchExpanded ? 'p-4 ring-1 ring-gray-700 rounded-lg' : ''"
		class="transition-all flex-col expanded-search-bar flex gap-4 w-full"
	>
		<UInput
			v-model="postsStore.query"
			@focus="
				() => {
					isFocused = true;
					isSearchExpanded = true;
				}
			"
			@blur="isFocused = false"
			placeholder="Поиск постов"
			icon="i-heroicons-magnifying-glass"
		/>

		<div class="flex gap-2 select-none tags-card" v-if="isSearchExpanded">
			<UBadge
				class="cursor-pointer"
				v-for="tag in postsStore.tags"
				:color="postsStore.isTagSelected(tag) ? 'primary' : 'gray'"
				@click="postsStore.selectTag(tag)"
				:label="tag.title"
			/>
		</div>
	</div>
</template>
