import { getToast, Toasts } from "~/types/ui/Notification";
import { guestUser, Permission, User } from "~/types/data/User";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { username, password, email } = body as {
		username: string;
		email: string;
		password: string;
	};

	const db = useDatabase();

	const { rows: foundUser } =
		await db.sql`SELECT id FROM user WHERE username = ${username} OR email = ${email}`;

	if (foundUser?.length !== 0) {
		return {
			status: 401,
			body: {
				success: false,
				user: null,
				notification: getToast(
					Toasts.ERROR,
					"Пользователь с таким именем или почтой уже существует!",
				),
			},
		};
	} else {
		await db.sql`INSERT INTO user (username, email, password, role_id) VALUES (${username}, ${email}, ${password}, 2)`;

		return {
			status: 200,
			body: {
				success: true,
				user: guestUser,
				notification: getToast(Toasts.SUCCESS, "Успешная регистрация!"),
			},
		};
	}
});
