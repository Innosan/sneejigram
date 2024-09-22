import { getToast, Toasts } from "~/types/ui/Notification";
import { Permission, User } from "~/types/data/User";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { username, password } = body as {
		username: string;
		password: string;
	};

	const db = useDatabase();

	const { rows: foundUser } =
		await db.sql`SELECT id, username, email, role_id FROM user WHERE username = ${username} AND password = ${password}`;

	if (foundUser?.length === 0) {
		return {
			status: 401,
			body: {
				success: false,
				user: null,
				notification: getToast(
					Toasts.ERROR,
					"Неверное имя пользователя или пароль!",
				),
			},
		};
	} else {
		const { rows: permissions } =
			await db.sql`SELECT resource, permission  FROM access_control_matrix WHERE role_id = ${foundUser[0].role_id} `;

		const user: User = {
			id: foundUser[0].id,
			username: foundUser[0].username,
			email: foundUser[0].email,
			role: {
				id: foundUser[0].role_id,
				permissions: permissions as Permission[],
			},
		};

		return {
			status: 200,
			body: {
				success: true,
				user: user,
				notification: getToast(Toasts.SUCCESS, "Успешный вход!"),
			},
		};
	}
});
