import type { NotificationColor } from "#ui/types";

export enum Toasts {
	SUCCESS,
	ERROR,
	INFO,
}

export interface Notification {
	title: string;
	color: NotificationColor;
	icon: string;
	description?: string;
}

export const getToast = (
	type: Toasts,
	description?: string,
): Partial<Notification> => {
	switch (type) {
		case Toasts.SUCCESS:
			return {
				title: "Ура!",
				color: "green",
				icon: "i-heroicons-check-circle",
				description,
			};
		case Toasts.ERROR:
			return {
				title: "Произошла ошибка!",
				color: "red",
				icon: "i-heroicons-x-circle",
				description: description + ". Попробуйте еще раз.",
			};
		case Toasts.INFO:
			return {
				title: "Что-то новое!",
				color: "blue",
				icon: "i-heroicons-information-circle",
				description,
			};
		default:
			return {
				title: "Уведомление",
				color: "gray",
				icon: "i-heroicons-bell",
				description: "Это уведомление.",
			};
	}
};
