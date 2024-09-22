import type { User } from "~/types/data/User";

export type Comment = {
	id: number;
	content: string;
	user: Partial<User>;
	createAt: string;
};
