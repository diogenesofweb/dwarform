<script>
	import { ThemeSelect, Dropdown, Icon } from '@kazkadien/svelte';
	import Name from './Name.svelte';
</script>

<div id="header">
	<section class="fsb">
		<div class="fce ">
			<Name />
		</div>

		<Dropdown accent="" iconOnly alignRight hoverable>
			<Icon name="brightness_low" slot="dropbtn" />
			<ThemeSelect heading="Theme" />
		</Dropdown>
	</section>
</div>

<style>
	#header {
		background-color: var(--bg-darkest);
		padding: 1.15rem var(--rsx);
	}

	section {
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
