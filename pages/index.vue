<script setup lang="ts">
import { CardSizes } from "~/types/ui/CardSizes.js";
</script>

<template>
	<div class="w-full flex flex-col gap-8">
		<div class="flex flex-col gap-2">
			<UCard :ui="CardSizes.sm">
				<p class="opacity-70 underline text-sm">Post creator</p>
				<p>Post content</p>
				<template #footer>
					<div class="flex gap-4">
						<UButton
							icon="i-heroicons-heart-solid"
							color="gray"
							label="4"
							variant="ghost"
						/>

						<UInput placeholder="Leave a comment" />
					</div>
				</template>
			</UCard>

			<div class="flex flex-wrap gap-2">
				<div
					class="flex flex-col ring-1 ring-gray-200 dark:ring-gray-800 rounded-lg p-2"
				>
					<div class="flex gap-1 text-sm">
						<p>Comment author</p>
						<p class="opacity-70">Comment date</p>
					</div>
					<p class="font-bold">Comment content</p>
				</div>
			</div>
		</div>
	</div>
</template>
