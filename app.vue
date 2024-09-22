<script setup lang="ts">
import { useSettingsStore } from "~/stores/settings";

const settingsStore = useSettingsStore();
const appConfig = useAppConfig();
const route = useRoute();

appConfig.ui.primary = settingsStore.primaryColor;
</script>

<template>
	<div>
		<Header />
		<div class="page-container items-start pt-6" v-auto-animate>
			<SideNavigation />
			<NuxtPage :key="route" />
		</div>

		<UNotifications />
	</div>
</template>
