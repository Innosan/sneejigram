import { getToast, Toasts } from "~/types/ui/Notification";
import { Post, Comment } from "~/types/data/Post";

export default defineEventHandler(async (event) => {
	const db = useDatabase();

	// Fetch posts with their user, comments, and likes using JOIN
	const { rows: posts } = await db.sql`
    SELECT
      post.id AS post_id,
      post.content AS post_content,
      post.created_at AS post_created_at,
      user.id AS user_id,
      user.username AS user_username,
      user.email AS user_email,
      comment.id AS comment_id,
      comment.content AS comment_content,
      comment.created_at AS comment_created_at,
      comment_user.id AS comment_user_id,
      comment_user.username AS comment_user_username,
      comment_user.email AS comment_user_email,
      like.id AS like_id,
      like_user.id AS like_user_id,
      like_user.username AS like_user_username,
      like_user.email AS like_user_email
    FROM post
    JOIN user ON post.user = user.id
    LEFT JOIN comment ON comment.post = post.id
    LEFT JOIN user AS comment_user ON comment.user = comment_user.id
    LEFT JOIN like ON like.post = post.id
    LEFT JOIN user AS like_user ON like.user = like_user.id
  `;

	if (posts?.length === 0) {
		return {
			status: 401,
			body: {
				success: false,
				posts: null,
				notification: getToast(Toasts.INFO, "Постов нет!"),
			},
		};
	}

	// Process the results to structure them as needed
	const postsMap = new Map<number, Post>();

	posts.forEach((row) => {
		if (!postsMap.has(row.post_id)) {
			postsMap.set(row.post_id, {
				id: row.post_id,
				content: row.post_content,
				likes: 0,
				author: {
					id: row.user_id,
					username: row.user_username,
				},
				comments: [],
			});
		}

		const post = postsMap.get(row.post_id)!;

		if (
			row.comment_id &&
			!post.comments.some((comment) => comment.id === row.comment_id)
		) {
			post.comments.push({
				id: row.comment_id,
				content: row.comment_content,
				user: {
					id: row.comment_user_id,
					username: row.comment_user_username,
				},
				createAt: row.comment_created_at,
			});
		}

		if (!post.likeIds) {
			post.likeIds = new Set<number>();
		}

		if (row.like_id && !post.likeIds.has(row.like_id)) {
			post.likeIds.add(row.like_id);
			post.likes += 1;
		}
	});

	return {
		status: 200,
		body: {
			success: true,
			posts: Array.from(postsMap.values()).map((post) => {
				delete post.likeIds;
				return post;
			}),
			notification: getToast(Toasts.SUCCESS, "Посты найдены!"),
		},
	};
});
