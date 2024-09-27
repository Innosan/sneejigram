import type { Post } from "~/types/data/Post";
import type { Tag } from "~/types/data/Tag";

export const usePostsStore = defineStore("posts-store", () => {
	const toast = useToast();

	const posts = useState("posts", () => [] as Post[]);
	const foundPosts = useState("found-posts", () => [] as Post[]);

	const tags = useState("tags", () => [] as Tag[]);
	const selectedTags = useState("selected-tags", () => [] as Tag[]);

	// Search related

	const query = ref("");

	const isTagSelected = computed(() => (tag: Tag) => {
		return selectedTags.value.some((t) => t.id === tag.id);
	});

	const search = () => {
		foundPosts.value = posts.value.filter((post) => {
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
	};

	const selectTag = (tag: Tag) => {
		const index = selectedTags.value.findIndex((t) => t.id === tag.id);

		if (index === -1) {
			selectedTags.value.push(tag);
		} else {
			selectedTags.value.splice(index, 1);
		}
	};

	watch(
		[query, selectedTags],
		() => {
			search();
		},
		{ deep: true },
	);

	/**
	 * Server requests
	 */
	const getPosts = async () => {
		const response = await useFetch("/api/posts/posts");

		if (response.data.value.status === 200) {
			posts.value = response.data.value.body.posts;
			foundPosts.value = posts.value;
		}
	};

	// Posts

	const createPost = async (userId: number, content: string) => {
		const created_at = new Date();
		const post = {
			user_id: userId,
			content: content,
			created_at: created_at.toString(),
		};

		const response = await $fetch("/api/posts/post", {
			method: "POST",
			body: { ...post },
		});

		toast.add(response.body.notification);
		await getPosts();
	};

	// Tags

	const getTags = async () => {
		const response = await $fetch("/api/posts/tags");

		if (response.status === 200) {
			tags.value = response.body.tags;
		}
	};

	return {
		posts,
		getPosts,
		createPost,

		tags,
		isTagSelected,
		getTags,

		query,
		foundPosts,
		selectedTags,
		selectTag,
		search,
	};
});
