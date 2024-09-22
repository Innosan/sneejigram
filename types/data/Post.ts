import type { User } from "~/types/data/User";

export type Post = {
	id: number;
	content: string;
	likes: number;
	author: Partial<User>;
	comments: Comment[];
};
