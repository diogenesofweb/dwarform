<script>
	/** @typedef { import("../typings/types").Field } Field*/

	import { Btn, Icon } from '@kazkadien/svelte';
	import FieldEntry from '$lib/FieldEntry.svelte';

	import { fields } from '../store/store';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let is_update = false;

	function makeField() {
		/** @type {Field} */
		const field = {
			id: Math.random(),

			type: 'text',
			label: '',
			value: '',
			required: false,

			size: null,

			maxlength: null,
			minlength: null,

			max: null,
			min: null,
			step: null,

			rows: 10,
			cols: 30,

			accept: null,
			// checked: null,
			multiple: false,
			pattern: null,
			placeholder: null
		};

		return field;
	}

	// console.log(JSON.stringify(makeField()));

	let fieldEntries = is_update ? [...$fields] : [makeField()];

	function handleSubmit() {
		// console.log(fieldEntries);
		fields.set(fieldEntries);
		dispatch('close');
	}

	function onAdd(idx) {
		// console.log({ idx });
		fieldEntries.splice(idx + 1, 0, makeField());
		fieldEntries = fieldEntries;
	}

	function onDelete(idx) {
		// console.log({ idx });
		fieldEntries.splice(idx, 1);
		fieldEntries = fieldEntries;

		if (!fieldEntries.length) fieldEntries = [makeField()];
	}
</script>

<form class="form alpha" on:submit|preventDefault={handleSubmit}>
	<div class="fsb header">
		<h1>{is_update ? 'Update' : 'Compose'}</h1>

		<Btn accent="danger" classic icony on:click={() => dispatch('close')}>
			<Icon name="close" />
		</Btn>
	</div>

	{#each fieldEntries as field, i (field.id)}
		<div class="my-field">
			<FieldEntry {field} />

			<div class="btns">
				<Btn accent="danger" classic icony on:click={() => onDelete(i)}>
					<Icon name="remove" />
				</Btn>

				<Btn accent="gamma" classic icony on:click={() => onAdd(i)}>
					<Icon name="add" />
				</Btn>
			</div>
		</div>
	{/each}

	<div class="fce" style="margin: 5rem 0;">
		<Btn classic type="submit">Done</Btn>
	</div>
</form>

<style>
	.form {
		width: min(100%, 1024px);
		background-color: var(--bg);
		border-radius: 1rem;
	}

	.header {
		padding: 0.33rem var(--rsx);
		border-bottom: 2px solid var(--line);
	}

	.my-field {
		padding: 1rem var(--rsx);
		border-bottom: 3px dotted var(--line);

		display: grid;
		gap: 1.5rem;
	}

	.btns {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}

	@media only screen and (min-width: 940px) {
		.my-field {
			grid-template-columns: 1fr auto;
		}

		.btns {
			flex-direction: column;
		}
	}
</style>
