<script setup lang="ts">
import { navigation } from "~/utils/navigation";
import { CardSizes } from "~/types/ui/CardSizes";
</script>

<template>
	<div class="flex flex-col gap-2">
		<div class="flex flex-col gap-2">
			<ProfileButton />
			<SignInModal />
		</div>
		<UCard :ui="CardSizes.sm" class="hidden md:block">
			<template #header>
				<UVerticalNavigation :links="navigation" />
			</template>

			<UVerticalNavigation :links="socials" />
		</UCard>
	</div>
</template>
