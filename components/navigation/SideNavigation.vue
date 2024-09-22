<script setup lang="ts">
import { navigation } from "~/utils/navigation";
import { CardSizes } from "~/types/ui/CardSizes";
import Modal from "~/components/utility/Modal.vue";
import SignInModal from "~/components/auth/SignInModal.vue";

const userStore = useUserStore();
</script>

<template>
	<div class="flex flex-col gap-2">
		<div class="flex flex-col gap-2">
			<UButton
				v-if="userStore.currentUser.id !== 0"
				label="Current user"
				icon="i-heroicons-user"
				type="link"
				color="gray"
			/>
			<SignInModal v-else />
			<UButton label="Выдать базу" color="white" />
		</div>
		<UCard :ui="CardSizes.sm" class="hidden md:block">
			<template #header>
				<UVerticalNavigation :links="navigation" />
			</template>
			<UVerticalNavigation :links="socials" />
			<template #footer>
				<ClientOnly>
					<div class="flex gap-2 items-center">
						<ColorSwitch />
						<ThemeSwitch />
					</div>
				</ClientOnly>
			</template>
		</UCard>
	</div>
</template>
