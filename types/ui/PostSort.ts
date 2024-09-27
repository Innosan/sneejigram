export type PostSort = {
	id: number;
	title: string;
	value: string;
	order: SortOrder;
	icon: string;
};

export enum SortOrder {
	ASC = "asc",
	DESC = "desc",
}

export const postSorts: PostSort[] = [
	{
		id: 1,
		title: "По новизне",
		value: "new",
		order: SortOrder.DESC,
		icon: "i-heroicons-sparkles-20",
	},
	{
		id: 2,
		title: "По лайкам",
		value: "likes",
		order: SortOrder.DESC,
		icon: "i-heroicons-hand-thumb-up-20",
	},
	{
		id: 3,
		title: "По комментариям",
		value: "comments",
		order: SortOrder.DESC,
		icon: "i-heroicons-chat-bubble-bottom-center-text-20",
	},
];
