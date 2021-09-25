<script>
	/** @typedef { import("../typings/types").Field } Field*/
	/** @typedef { import("../typings/types").Attributes } Attributes*/
	import { Field } from '@kazkadien/svelte';
	import attrs from '../data/attrs';

	const TYPES = Object.keys(attrs).sort();
	/** @type {Field} */
	export let field;

	/** @type {Attributes} */
	let xx;

	$: {
		xx = attrs[field.type];
		/* todo: reset props ? */
	}
</script>

<div class="entry">
	<div class="block top alpha">
		<Field label="LABEL">
			<input class="f-label" type="text" bind:value={field.label} required />
		</Field>

		<Field label="type">
			<select bind:value={field.type} required>
				{#each TYPES as val}
					<option value={val}>{val}</option>
				{/each}
			</select>
		</Field>

		{#if xx.value && !['radio', 'checkbox'].includes(field.type)}
			<Field label="value">
				{#if ['date'].includes(field.type)}
					<input type="date" bind:value={field.value} />
				{:else}
					<input type="text" bind:value={field.value} />
				{/if}
			</Field>
		{/if}

		{#if xx.placeholder}
			<Field label="placeholder">
				<input type="text" bind:value={field.placeholder} placeholder=". . ." />
			</Field>
		{/if}
	</div>

	<div class="block bottom beta">
		{#if ['radio', 'checkbox', 'select'].includes(field.type)}
			<Field label="*values (comma separated)">
				<input
					class="values"
					type="text"
					placeholder="Green,Red,Yellow"
					bind:value={field.value}
					size="36"
				/>
			</Field>
		{/if}

		{#if xx.size}
			<Field label="size">
				<input type="number" bind:value={field.size} step="1" min="0" />
			</Field>
		{/if}

		{#if xx.max}
			<Field label="max">
				{#if field.type === 'date'}
					<input
						class="date-holder"
						type="string"
						bind:value={field.max}
						placeholder="2021-01-01"
					/>
				{:else}
					<input type="number" bind:value={field.max} step="1" min="0" />
				{/if}
			</Field>
		{/if}

		{#if xx.min}
			<Field label="min">
				{#if field.type === 'date'}
					<input
						class="date-holder"
						type="string"
						bind:value={field.min}
						placeholder="2021-01-01"
					/>
				{:else}
					<input type="number" bind:value={field.min} step="1" min="0" />
				{/if}
			</Field>
		{/if}

		{#if xx.step}
			<Field label="step">
				<input type="number" bind:value={field.step} />
			</Field>
		{/if}

		{#if xx.maxlength}
			<Field label="maxlength">
				<input type="number" bind:value={field.maxlength} step="1" min="0" />
			</Field>
		{/if}

		{#if xx.minlength}
			<Field label="minlength">
				<input type="number" bind:value={field.minlength} step="1" min="0" />
			</Field>
		{/if}

		{#if xx.rows}
			<Field label="rows">
				<input type="number" bind:value={field.rows} step="1" min="0" />
			</Field>
		{/if}

		{#if xx.cols}
			<Field label="cols">
				<input type="number" bind:value={field.cols} step="1" min="0" />
			</Field>
		{/if}

		{#if xx.pattern}
			<Field label="pattern">
				<input class="pattern" type="text" bind:value={field.pattern} list="patterns" />
			</Field>
		{/if}

		{#if xx.accept}
			<Field label="accept">
				<input class="pattern" type="text" bind:value={field.accept} list="accepts" />
			</Field>
		{/if}

		{#if xx.multiple}
			<Field label="multiple">
				<select bind:value={field.multiple} class:trussy={field.multiple}>
					{#each [true, false] as val}
						<option value={val}>{val}</option>
					{/each}
				</select>
			</Field>
		{/if}

		{#if xx.required}
			<Field label="required">
				<select bind:value={field.required} class:trussy={field.required}>
					{#each [true, false] as val}
						<option value={val}>{val}</option>
					{/each}
				</select>
			</Field>
		{/if}
	</div>
</div>

<style>
	.entry {
		display: grid;
		gap: 2rem;
	}

	.block {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	select.trussy {
		/* background-color: hsla(var(--alpha-hsl), 0.25); */
		color: var(--accent-text);
	}

	[type='number'] {
		max-width: 8ch;
	}

	[type='text'] {
		max-width: 20ch;
	}

	input.pattern {
		max-width: none;
	}

	input.values {
		max-width: none;
	}

	input.date-holder {
		max-width: 10ch;
	}
	input.f-label {
		color: var(--accent-text) !important;
	}
</style>
