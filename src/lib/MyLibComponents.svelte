<script>
	import { Dtl } from '@kazkadien/svelte';
	import Prism from 'prismjs';
	import { MY_COMPONENTS } from '../data/constants';

	const snippets = MY_COMPONENTS.map(({ name, code }) => {
		return { name, snippet: Prism.highlight(code, Prism.languages.markup, 'markup') };
	});

	const code = `
	import { Field, BoxField, BoxFieldEntry } from "@kazkadien/svelte";
	// import { Btn } from "@kazkadien/svelte";
	`;
	let html = Prism.highlight(code, Prism.languages.javascript, 'javascript');
</script>

<h3 class="tac">~ Use ~</h3>

<section class="">
	<pre class="language-javascript">
		{@html html}
	</pre>
</section>

<h3 class="tac">~ Or Components ~</h3>

<div class="dtl-group alpha">
	{#each snippets as val}
		<Dtl heading={val.name}>
			<pre class="language-html">
        {@html val.snippet}
      </pre>
		</Dtl>
	{/each}
</div>

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
		background-color: var(--bg1);
	}
</style>
