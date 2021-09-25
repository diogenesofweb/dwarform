<script>
	import { snippets, styledBy } from '../store/store';
	import '../css/bootstrap.css';
	import '../css/bulma.css';
	// import '../css/bootstrap.scss';
	// import '../css/bulma.scss';
</script>

<svelte:head>
	<script>
		function handleSubmit(e) {
			e.preventDefault();
			const formData = new FormData(e.target);
			const form = Object.fromEntries(formData);
			console.log(form);
		}
	</script>
</svelte:head>

<section class="tac">
	<h3 style="margin-top: 0;">~ Preview ~</h3>
</section>

<div id="preview">
	<div id={$styledBy.toLocaleLowerCase()} class="wrapper">
		{@html $snippets.template}
	</div>
</div>

<style>
	#preview {
		padding: 0 1rem;
		padding-bottom: 33vh;
	}

	.wrapper {
		max-width: 80ch;
		margin: 0 auto;
	}

	.wrapper :global(form.form .field-group) {
		display: grid;
		gap: 2rem;
		padding-bottom: 6rem !important;
	}
</style>
