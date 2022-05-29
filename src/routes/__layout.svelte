<script>
	import '@kazkadien/svelte/css/all.css';

	import '../css/app.css';
	// import '../css/custom-colors.css';
	import '../css/customize-kaz.css';

	import AppHeader from '$lib/AppHeader.svelte';
	import AppFooter from '$lib/AppFooter.svelte';
	import StopWar from '$lib/StopWar.svelte';
	import { AppWrapper } from '@kazkadien/svelte';
</script>

<AppWrapper>
	<svg id="icons" style="display: none">
		<symbol id="code">
			<path
				d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
			/>
		</symbol>
		<!-- <symbol id="settings"> -->
		<!-- </symbol> -->
	</svg>

	<div id="view" class="alpha">
		<AppHeader />

		<div>
			<slot />
		</div>

		<AppFooter />
	</div>

	<StopWar />
</AppWrapper>

<style>
	:global(#svelte) {
		position: relative;
	}

	#view {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr auto;
	}
</style>
