export default defineNuxtConfig({
	devtools: { enabled: true },

	modules: [
		"@nuxt/ui",
		"@formkit/auto-animate/nuxt",
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt",
	],

	nitro: {
		experimental: {
			database: true,
		},
	},

	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
	],

	css: ["~/assets/styles/main.css"],
});
