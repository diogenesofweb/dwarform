<script>
	import { BoxField, BoxFieldEntry, Btn, Field } from '@kazkadien/svelte';

	import { fields } from '../store/store';

	function handleSubmit(e) {
		console.log('some values may be incorrect');
		const formData = new FormData(e.target);
		// @ts-ignore
		const form = Object.fromEntries(formData);
		console.log(form);
	}
</script>

<form id="x-form" class="form alpha" on:submit|preventDefault={handleSubmit}>
	<div class="field-group focus-with-in">
		<h3 class="tac">~ FORM ~</h3>
		{#each $fields as field (field.id)}
			<!--  -->
			{#if ['checkbox', 'radio'].includes(field.type)}
				<BoxField label={field.label} rows>
					{#each field.value.split(',') as val}
						<BoxFieldEntry type={field.type === 'radio' ? 'radio' : 'checkbox'} label={val}>
							<input
								name={field.label.replaceAll(' ', '_')}
								type={field.type === 'radio' ? 'radio' : 'checkbox'}
								value={val}
								required={field.required}
							/>
						</BoxFieldEntry>
					{/each}
				</BoxField>
				<!--  -->
			{:else}
				<Field label={field.label}>
					<!--  -->
					{#if field.type === 'select'}
						<select
							name={field.label.replaceAll(' ', '_')}
							size={field.size}
							multiple={field.multiple}
							required={field.required}
						>
							{#each field.value.split(',') as val}
								<option value={val}>{val}</option>
							{/each}
						</select>
						<!--  -->
					{:else if field.type === 'textarea'}
						<textarea
							name={field.label.replaceAll(' ', '_')}
							rows={field.rows}
							cols={field.cols}
							minlength={field.minlength}
							maxlength={field.maxlength}
							placeholder={field.placeholder}
							required={field.required}
						/>
						<!--  -->
					{:else}
						<input
							name={field.label.replaceAll(' ', '_')}
							value={field.value}
							type={field.type}
							size={field.size}
							min={field.min}
							max={field.max}
							step={field.step}
							minlength={field.minlength}
							maxlength={field.maxlength}
							placeholder={field.placeholder}
							pattern={field.pattern}
							multiple={field.multiple}
							required={field.required}
						/>
					{/if}
				</Field>
			{/if}
		{/each}
		<div class="fce" style="margin: 3rem 0 1rem;">
			<Btn accent="alpha" classic type="submit" title="console.log" />
		</div>
	</div>
</form>

<style>
	/* section {
		padding-top: 2rem;
	} */
	.form {
		padding: 1rem;
		margin: 0 auto;
		width: min(100%, 80ch);
	}
	form .field-group {
		/* background-color: var(--bg-darker); */
		display: grid;
		gap: 2rem;
	}
</style>
