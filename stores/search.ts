import type { Tag } from "~/types/data/Tag";
import { postFilters } from "~/types/ui/PostFilter";
import { type PostSort, SortOrder } from "~/types/ui/PostSort";

export const useSearchStore = defineStore("search-store", () => {
	const userStore = useUserStore();
	const postsStore = usePostsStore();

	const query = ref("");
	const selectedFilter = ref(postFilters[0]);
	const selectedTags = ref([] as Tag[]);
	const selectedSorts = ref([] as PostSort[]);

	const isTagSelected = computed(() => (tag: Tag) => {
		return selectedTags.value.some((t) => t.id === tag.id);
	});

	const search = () => {
		let filteredPosts = postsStore.posts.filter((post) => {
			const matchesQuery = post.content
				.toLowerCase()
				.includes(query.value.toLowerCase());
			const matchesTags =
				selectedTags.value.length === 0 ||
				selectedTags.value.every((tag) =>
					post.tags.some((postTag) => postTag.id === tag.id),
				);
			return matchesQuery && matchesTags;
		});

		if (selectedFilter.value.value === "my") {
			filteredPosts = filteredPosts.filter(
				(post) => post.author.id === userStore.currentUser.id,
			);
		} else if (selectedFilter.value.value === "liked") {
			filteredPosts = filteredPosts.filter((post) =>
				post.likes.some(
					(like) => like.user.id === userStore.currentUser.id,
				),
			);
		}

		selectedSorts.value.forEach((sort) => {
			if (sort.value === "new") {
				filteredPosts.sort((a, b) =>
					sort.sortOrder === SortOrder.DESC
						? new Date(b.created_at).getTime() -
						  new Date(a.created_at).getTime()
						: new Date(a.created_at).getTime() -
						  new Date(b.created_at).getTime(),
				);
			} else if (sort.value === "likes") {
				filteredPosts.sort((a, b) =>
					sort.sortOrder === SortOrder.DESC
						? b.likes.length - a.likes.length
						: a.likes.length - b.likes.length,
				);
			} else if (sort.value === "comments") {
				filteredPosts.sort((a, b) =>
					sort.sortOrder === SortOrder.DESC
						? b.comments.length - a.comments.length
						: a.comments.length - b.comments.length,
				);
			}
		});

		postsStore.foundPosts = filteredPosts;
	};

	const selectTag = (tag: Tag) => {
		const index = selectedTags.value.findIndex((t) => t.id === tag.id);

		if (index === -1) {
			selectedTags.value.push(tag);
		} else {
			selectedTags.value.splice(index, 1);
		}
	};

	const toggleSort = (sort: PostSort) => {
		const index = selectedSorts.value.findIndex((s) => s.id === sort.id);

		if (index === -1) {
			selectedSorts.value.push(sort);
		} else {
			selectedSorts.value.splice(index, 1);
		}
	};

	const changeSortOrder = (sort: PostSort) => {
		const index = selectedSorts.value.findIndex((s) => s.id === sort.id);

		if (index !== -1) {
			selectedSorts.value[index].sortOrder =
				selectedSorts.value[index].sortOrder === SortOrder.DESC
					? SortOrder.ASC
					: SortOrder.DESC;
		}
	};

	watch(
		[query, selectedTags, selectedFilter, selectedSorts],
		() => {
			search();
		},
		{ deep: true },
	);

	return {
		query,
		selectedFilter,
		selectedTags,
		selectedSorts,
		isTagSelected,
		search,
		selectTag,
		toggleSort,
		changeSortOrder,
	};
});
