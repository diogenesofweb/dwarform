<script>
	import { Btn, Modal, Snackbar, Field, BoxFieldEntry, BoxField } from '@kazkadien/svelte';
	import MyIcon from '$lib/MyIcon.svelte';
	import SnippetsModal from '$lib/SnippetsModal.svelte';

	import { TECH, STYLEDBY } from '../data/constants';
	import { tech, styledBy, componentize, structure } from '../store/store';

	let snack = '';

	let modal_is_open = false;

	function onCopied() {
		snack = 'Copied !';
		modal_is_open = false;
	}

	async function onShowMeCode() {
		modal_is_open = true;
	}
</script>

{#if snack}
	<Snackbar on:close={() => (snack = '')} accent="alpha" body={snack} iconName="check_circle" />
{/if}

{#if modal_is_open}
	<Modal on:close={() => (modal_is_open = false)}>
		<SnippetsModal on:close={() => (modal_is_open = false)} on:copied={onCopied} />
	</Modal>
{/if}

<form class="form" on:submit|preventDefault>
	<div class="field-group">
		<div class="selects">
			<Field label="Tech">
				<select bind:value={$tech}>
					{#each TECH as val}
						<option value={val}>{val}</option>
					{/each}
				</select>
			</Field>

			<Field label="Styled by">
				<select bind:value={$styledBy}>
					{#each STYLEDBY as val}
						<option value={val}>{val}</option>
					{/each}
				</select>
			</Field>

			<Field label="Structured">
				<input type="text" value={$structure} disabled size="8" />
			</Field>
		</div>

		{#if $tech === 'Svelte' && $styledBy === 'Kazkadien'}
			<BoxField>
				<BoxFieldEntry type="checkbox" label="componentize">
					<input type="checkbox" bind:checked={$componentize} />
				</BoxFieldEntry>
			</BoxField>
		{/if}

		<div class="fdc">
			<Btn accent="danger" filled on:click={onShowMeCode} text="">
				<b>Show me some code</b>
				<MyIcon name="code" />
			</Btn>
		</div>
	</div>
</form>

<style>
	form {
		margin-top: 4rem;
	}

	form .field-group {
		background-color: var(--bg-darker);
		display: grid;
		gap: 1rem;
		border-color: var(--line);
	}

	.selects {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr 1fr auto;
	}

	.fdc {
		margin-top: 2rem;
	}
</style>
