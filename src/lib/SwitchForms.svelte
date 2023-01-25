<script>
	import { Field } from '@kazkadien/svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import example from '../data/example';

	import { forms, activeForm, fields } from '../store/store';

	onMount(() => {
		const savedForms = localStorage.getItem('FORMS');
		if (savedForms)
			forms.update((prev) => {
				return [...prev, ...JSON.parse(savedForms)];
			});
	});

	$: {
		// console.log($activeForm);
		if (browser) {
			if ($activeForm === 'example') {
				fields.set(example);
			} else {
				const f = localStorage.getItem($activeForm);
				// console.log(f);
				if (f) {
					fields.set(JSON.parse(f));
				}
			}
		}
	}
</script>

<form class="form v2" on:submit|preventDefault>
	<Field label="My forms:">
		<select bind:value={$activeForm}>
			{#each $forms as val}
				<option value={val}>{val}</option>
			{/each}
		</select>
	</Field>
</form>
