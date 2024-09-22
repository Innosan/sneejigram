import type { User } from "~/types/data/User";
import type { Comment } from "~/types/data/Comment";

export type Post = {
	id: number;
	content: string;
	likes: number;
	author: Partial<User>;
	comments: Comment[];
};
