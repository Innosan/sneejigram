<script setup lang="ts">
import { navigation } from "~/utils/navigation";
import { CardSizes } from "~/types/ui/CardSizes";
</script>

<template>
	<div class="flex w-full md:w-fit flex-col gap-2">
		<div class="flex flex-col gap-2">
			<ProfileButton />
			<AuthModal />
		</div>
		<UCard :ui="CardSizes.sm">
			<template #header>
				<UVerticalNavigation :links="navigation" />
			</template>

			<UVerticalNavigation :links="socials" />
		</UCard>
	</div>
</template>
