import { getToast, Toasts } from "~/types/ui/Notification";
import { Tag } from "~/types/data/Tag";

export default defineEventHandler(async (event) => {
	const db = useDatabase();

	// Fetch posts with their user, comments, and likes using JOIN
	const { rows: tags } = await db.sql`
	SELECT * FROM tag ORDER BY title ASC
	`;

	if (tags?.length === 0) {
		return {
			status: 401,
			body: {
				success: false,
				tags: null,
				notification: getToast(Toasts.INFO, "Теги не найдены!"),
			},
		};
	}

	return {
		status: 200,
		body: {
			success: true,
			tags: tags as Tag[],
			notification: getToast(Toasts.SUCCESS, "Посты найдены!"),
		},
	};
});
