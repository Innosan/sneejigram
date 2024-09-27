import type { User } from "~/types/data/User";

export type Like = {
	id: number;
	user: Partial<User>;
	post: number;
	status: number;
};
