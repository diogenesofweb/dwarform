<script context="module">
	export const router = false;
</script>

<script>
	import '../css/prism.css';

	import { Btn, Modal } from '@kazkadien/svelte';

	import ManageFormModal from '$lib/ManageFormModal.svelte';
	import Preview from '$lib/Preview.svelte';
	import DataLists from '$lib/DataLists.svelte';
	import MenuBoard from '$lib/MenuBoard.svelte';
	import MyLibComponents from '$lib/MyLibComponents.svelte';
	import MyCSS from '$lib/MyCSS.svelte';
	import SwitchForms from '$lib/SwitchForms.svelte';

	import { tech, styledBy, componentize, fields } from '../store/store';

	let modal_is_open = false;
	let is_update = false;

	function onCreateNewForm() {
		modal_is_open = true;
		is_update = false;
	}

	function onUpdateForm() {
		modal_is_open = true;
		is_update = true;
	}
</script>

<svelte:head>
	<title>Dwarform</title>
	<meta
		name="description"
		content="Generate Svelte, Vue, HTML code snippets for making forms with Bootstrap, Bulma or custom CSS"
	/>
	<link rel="canonical" href="https://dwarform.delphic.top/" />
</svelte:head>

<DataLists />

{#if modal_is_open}
	<Modal on:close={() => (modal_is_open = false)}>
		<ManageFormModal on:close={() => (modal_is_open = false)} {is_update} />
	</Modal>
{/if}

<div class="container alpha">
	<aside>
		<div class="btns">
			<SwitchForms />
			<Btn accent="beta" filled on:click={onUpdateForm} text="update form" />
			<span class="tac">~</span>
			<Btn accent="alpha" filled on:click={onCreateNewForm} text="create new form" />
		</div>

		<MenuBoard />

		{#if $tech === 'Svelte' && $styledBy === 'Kazkadien' && $componentize}
			<MyLibComponents />
		{/if}

		{#if $tech === 'Svelte' && $styledBy === 'Kazkadien' && !$componentize}
			<MyCSS />
		{/if}

		{#if $tech !== 'Svelte' && $styledBy === 'Kazkadien'}
			<MyCSS />
		{/if}
	</aside>

	<main>
		{#if $fields.length}
			<Preview />
		{:else}
			<p>empty ...</p>
		{/if}
	</main>
</div>

<style>
	.container {
		display: grid;
		/* padding-top: 5rem; */
		--clr: var(--accent-opac-05);
		--border: 3px double var(--clr);

		border-top: var(--border);
		border-bottom: var(--border);

		max-width: 2400px;
		margin: 0 auto;
		/* background-color: aqua; */
	}

	aside {
		padding-inline: var(--rsx);
		padding-bottom: 4rem;
		border-bottom: var(--border);
		min-width: 0;
	}

	@media only screen and (min-width: 1200px) {
		.container {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}

		aside {
			border-bottom: none;
			border-right: var(--border);
		}
	}

	aside,
	main {
		padding-top: 4rem;
	}

	.btns {
		display: grid;
		gap: 1rem;
		padding: 3rem var(--rsx);
		border-radius: 1rem;
		border: 1px solid var(--line);
	}
</style>
