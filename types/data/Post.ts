import type { User } from "~/types/data/User";
import type { Comment } from "~/types/data/Comment";
import type { Like } from "~/types/data/Like";
import type { Tag } from "~/types/data/Tag";

export type Post = {
	id: number;
	content: string;
	likes: Like[];
	author: Partial<User>;
	comments: Comment[];
	tags: Tag[];
};
