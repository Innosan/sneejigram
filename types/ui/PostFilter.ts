export type PostFilter = {
	id: number;
	title: string;
	value: string;
	icon?: string;
};

export const postFilters: PostFilter[] = [
	{
		id: 1,
		title: "Мои",
		value: "my",
		icon: "i-heroicons-user-20",
	},
	{
		id: 2,
		title: "Понравившиеся",
		value: "liked",
		icon: "i-heroicons-heart-20",
	},
];
