<script>
	import '@kazkadien/svelte/css/all.css';

	import '../css/app.css';
	import '../css/custom-colors.css';
	import '../css/customize-kaz.css';

	import AppHeader from '$lib/AppHeader.svelte';
	import AppFooter from '$lib/AppFooter.svelte';
</script>

<div id="view">
	<AppHeader />

	<div>
		<slot />
	</div>

	<AppFooter />
</div>

<style>
	#view {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr auto;
	}
</style>
