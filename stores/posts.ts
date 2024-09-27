import type { Post } from "~/types/data/Post";
import type { Tag } from "~/types/data/Tag";

export const usePostsStore = defineStore("posts-store", () => {
	const toast = useToast();

	const posts = useState("posts", () => [] as Post[]);
	const foundPosts = useState("found-posts", () => [] as Post[]);

	const tags = useState("tags", () => [] as Tag[]);

	const getPosts = async () => {
		const response = await useFetch("/api/posts/posts");

		if (response.data.value.status === 200) {
			posts.value = response.data.value.body.posts;
			foundPosts.value = posts.value;
		}
	};

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
		getTags,
		foundPosts,
	};
});
