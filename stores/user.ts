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
		) => {};

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

		return {
			currentUser,
			signIn,
		};
	},
	{
		persist: persistOptions.cookieDefault,
	},
);
