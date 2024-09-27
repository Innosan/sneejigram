import { getToast, Toasts } from "~/types/ui/Notification";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { user_id, content, created_at } = body as {
		user_id: number;
		created_at: string;
		content: string;
	};

	const db = useDatabase();

	await db.sql`INSERT INTO post (user, content, created_at) VALUES (${user_id}, ${content}, ${created_at})`;

	return {
		status: 200,
		body: {
			success: true,
			notification: getToast(Toasts.SUCCESS, "Вы создали новый пост!"),
		},
	};
});
