import { getToast, Toasts } from "~/types/ui/Notification";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { like_id, state } = body as {
		like_id: number;
		state: number;
	};

	const db = useDatabase();

	await db.sql`UPSERT INTO like (status) VALUES (${state}) WHERE id = ${like_id}`;

	return {
		status: 200,
		body: {
			success: true,
			notification: getToast(Toasts.SUCCESS, "Вы создали новый пост!"),
		},
	};
});
