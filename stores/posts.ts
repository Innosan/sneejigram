import type { Post } from "~/types/data/Post";

export const usePostsStore = defineStore("posts-store", () => {
	const posts = useState("posts", () => [] as Post[]);

	const getPosts = async () => {
		const response = await useFetch("/api/posts");

		if (response.data.value.status === 200) {
			posts.value = response.data.value.body.posts;
		}
	};

	return {
		posts,
		getPosts,
	};
});
