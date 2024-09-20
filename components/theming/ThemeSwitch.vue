<template>
	<ClientOnly>
		<UToggle
			color="primary"
			size="xl"
			on-icon="i-heroicons-moon-20-solid"
			off-icon="i-heroicons-sun-20-solid"
			variant="ghost"
			aria-label="Theme"
			v-model="isDark"
		/>

		<template #fallback>
			<div class="w-8 h-8" />
		</template>
	</ClientOnly>
</template>

<script setup>
const colorMode = useColorMode();

const isDark = computed({
	get() {
		return colorMode.value === "dark";
	},
	set() {
		colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
	},
});
</script>
