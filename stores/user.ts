import { guestUser } from "~/types/data/User";

export const useUserStore = defineStore(
	"user-store",
	() => {
		const toast = useToast();
		const currentUser = useState("current-user", () => guestUser);

		const signUp = async (
			username: string,
			email: string,
			password: string,
		) => {
			const response = await $fetch("/api/auth/signUp", {
				method: "POST",
				body: { username, email, password },
			});

			if (response.status === 200) {
				await signIn(username, password);
			} else {
				toast.add(response.body.notification);
			}
		};

		const signIn = async (username: string, password: string) => {
			const response = await $fetch("/api/auth/signIn", {
				method: "POST",
				body: { username, password },
			});

			if (response.status === 200) {
				currentUser.value = response.body.user;
			}

			toast.add(response.body.notification);
		};

		const signOut = () => {
			currentUser.value = guestUser;
		};

		const setLike = async (
			user_id: number,
			like_id: number,
			post_id: number,
			state: number,
		) => {
			const response = await $fetch("/api/posts/setLikeState", {
				method: "POST",
				body: {
					like_id: like_id,
					user_id: user_id,
					post_id: post_id,
					state: state,
				},
			});
		};

		return {
			currentUser,
			signUp,
			signIn,
			signOut,
		};
	},
	{
		persist: persistOptions.cookieDefault,
	},
);
