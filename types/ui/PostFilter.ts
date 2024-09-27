export type PostFilter = {
	id: number;
	title: string;
	value: string;
	icon?: string;
};

export const postFilters: PostFilter[] = [
	{
		id: 1,
		title: "Все",
		value: "all",
		icon: "i-heroicons-menu-20",
	},
	{
		id: 2,
		title: "Мои",
		value: "my",
		icon: "i-heroicons-user-20",
	},
	{
		id: 3,
		title: "Понравившиеся",
		value: "liked",
		icon: "i-heroicons-heart-20",
	},
];
