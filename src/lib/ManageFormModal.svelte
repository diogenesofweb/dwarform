<script>
	/** @typedef { import("../typings/types").Field } Field*/

	import { Btn, Field, Icon } from '@kazkadien/svelte';
	import FieldEntry from '$lib/FieldEntry.svelte';

	import { fields, forms, activeForm } from '../store/store';

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

	let formName = '';

	function handleSubmit() {
		// console.log(fieldEntries);
		fields.set(fieldEntries);
		is_update ? update() : create();

		dispatch('close');
	}

	function create() {
		console.log('create', formName);
		activeForm.set(formName);
		forms.update((prev) => [...prev, formName]);
		localStorage.setItem(formName, JSON.stringify(fieldEntries));

		const savedForms = localStorage.getItem('FORMS');
		let saved = [];
		if (savedForms) {
			saved = JSON.parse(savedForms);
		}
		localStorage.setItem('FORMS', JSON.stringify([...saved, formName]));
	}

	function update() {
		console.log('update', $activeForm);
		localStorage.setItem($activeForm, JSON.stringify(fieldEntries));
	}

	function removeForm() {
		const formToDel = $activeForm;
		console.log('remove', formToDel);

		forms.update((prev) => prev.filter((f) => f !== formToDel));
		localStorage.removeItem(formToDel);

		activeForm.set($forms[0]);

		const savedForms = JSON.parse(localStorage.getItem('FORMS')) || [];
		let toSave = savedForms.filter((f) => f !== formToDel);

		localStorage.setItem('FORMS', JSON.stringify(toSave));

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

	{#if !is_update}
		<div class="form-name">
			<Field label="Form Name" accent="gamma">
				<input type="text" bind:value={formName} />
			</Field>
		</div>
	{/if}

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

	<div class="fse g1 rpx" style="margin: 5rem 0;">
		<Btn classic type="submit">Done</Btn>
		{#if is_update}
			<Btn classic accent="danger" on:click={removeForm}>Delete Form</Btn>
		{/if}
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

	.form-name {
		padding: 1.5rem var(--rsx) 2rem;
		background-color: var(--bg-darker);
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
