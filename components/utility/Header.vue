<script lang="ts" setup>
const appConfig = useAppConfig();
</script>

<template>
	<header class="flex justify-between items-center gap-4">
		<div class="flex flex-col">
			<div
				class="hover:scale-105 select-none transition-all flex items-center gap-2 font-black text-2xl text-nowrap text-primary"
			>
				<UIcon name="i-fluent-emoji-high-contrast-boar" />
				<h1>{{ appConfig.appName }}</h1>
				<UIcon
					class="-scale-x-100"
					name="i-fluent-emoji-high-contrast-boar"
				/>
			</div>
			<p class="font-bold text-primary-500 text-sm">Кабанья платформа</p>
		</div>
	</header>
</template>
