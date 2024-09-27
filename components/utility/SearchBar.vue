<script setup lang="ts">
import { postSorts, SortOrder } from "~/types/ui/PostSort";
import { postFilters } from "~/types/ui/PostFilter";

const postsStore = usePostsStore();
const searchStore = useSearchStore();

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
			v-model="searchStore.query"
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

		<div v-if="isSearchExpanded">
			<div class="flex gap-2 select-none tags-card">
				<UBadge
					class="cursor-pointer"
					v-for="tag in postsStore.tags"
					:color="searchStore.isTagSelected(tag) ? 'primary' : 'gray'"
					@click="searchStore.selectTag(tag)"
					:label="tag.title"
				/>
			</div>

			<div class="flex gap-2 select-none">
				<UBadge
					class="cursor-pointer"
					v-for="filter in postFilters"
					:color="
						searchStore.selectedFilter.id === filter.id
							? 'primary'
							: 'gray'
					"
					@click="searchStore.selectedFilter = filter"
					:label="filter.title"
				/>
			</div>

			<div class="flex gap-2 select-none">
				<UBadge
					class="cursor-pointer"
					v-for="sort in postSorts"
					:color="
						searchStore.selectedSorts.some((s) => s.id === sort.id)
							? 'primary'
							: 'gray'
					"
					@click="searchStore.toggleSort(sort)"
					:label="sort.title"
				/>
				<button
					v-for="sort in searchStore.selectedSorts"
					@click="searchStore.changeSortOrder(sort)"
				>
					{{ sort.title }}:
					{{
						sort.sortOrder === SortOrder.DESC
							? "Descending"
							: "Ascending"
					}}
				</button>
			</div>
		</div>
	</div>
</template>
