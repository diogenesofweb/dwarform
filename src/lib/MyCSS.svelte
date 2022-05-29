<script>
	import Prism from 'prismjs';
	const code = `
  import '@kazkadien/svelte/css/colors.css';
  import '@kazkadien/svelte/css/global-vars.css';
  import '@kazkadien/svelte/css/reset.css';
	import '@kazkadien/svelte/css/form.css'
	// import '@kazkadien/svelte/css/button.css'

  // or
  import '@kazkadien/svelte/css/all.css'
	`;
	let html = Prism.highlight(code, Prism.languages.javascript, 'javascript');
</script>

<h3 class="tac">~ CSS ~</h3>
<section>
	<pre class="language-javascript">
		{@html html}
	</pre>
</section>

<style>
	h3 {
		margin: 4rem 0 2rem;
	}

	section {
		padding: 0 var(--rsx);
		border-radius: 1rem;
		border: 1px solid var(--line);
	}

	:global(html.dark) section {
		background-color: var(--bg2);
	}
</style>
