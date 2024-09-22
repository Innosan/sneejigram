export type User = {
	id: number;
	username: string;
	email: string;
	role: Role;
};

export type Role = {
	id: number;
	permissions: Permission[];
};

export type Permission = {
	resource: string;
	permission: string;
};

export const guestUser: User = {
	id: 0,
	username: "Гость",
	email: "",
	role: {
		id: 3,
		permissions: [],
	},
};
