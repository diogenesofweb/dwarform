<script>
	import Prism from 'prismjs';

	import { Btn, Toast } from '@kazkadien/svelte';
	import MyIcon from '$lib/MyIcon.svelte';
	import { generateCode } from '../utils/generateCode';
	import { tech, styledBy, snippets, fields } from '../store/store';

	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	let toast = '';
	let code = '';
	let prismHTML = '';

	async function onCopyToClipboard() {
		try {
			await navigator.clipboard.writeText(code);
			// console.log('onCopyToClipboard');
			dispatch('copied');
		} catch (error) {
			console.error(error);
			toast = 'Something went wrong :( !';
		}
	}

	onMount(() => {
		if ($tech === 'HTML') {
			code = $snippets.script + $snippets.template + $snippets.info;
		} else {
			let holder = generateCode({ form: $fields, tech: $tech, styledBy: $styledBy });
			code = holder.script + holder.template + holder.info;
		}

		prismHTML = Prism.highlight(code, Prism.languages.markup, 'markup');
		// console.log(prismHTML);
	});
</script>

{#if toast}
	<Toast
		accent="danger"
		closable={false}
		autoclose={3000}
		iconName="info"
		title="Error"
		body={toast}
		on:close={() => (toast = '')}
	/>
{/if}

<div class="card">
	<div class="header rpx">
		<Btn accent="gamma" outlined colored on:click={onCopyToClipboard}>
			<MyIcon name="content_copy" />
			<span>Copy To Clipboard</span>
		</Btn>

		<Btn accent="danger" outlined icony classic on:click={() => dispatch('close')}>
			<MyIcon name="close" />
		</Btn>
	</div>

	<div class="content">
		<pre class="language-html">
{@html prismHTML}
    </pre>
	</div>
</div>

<style>
	.card {
		background-color: var(--bg);
		border-radius: 1rem;
		border: 1px solid var(--line);

		--w: calc(100vw - 4rem);
		width: min(var(--w), 120ch);
	}

	@media only screen and (min-width: 740px) {
		.card {
			width: min(80vw, 120ch);
		}
	}

	.header {
		border-bottom: 1px solid var(--line);
		padding-block: 1.5rem;
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 2rem;
		background-color: var(--bg-darkest);
		border-radius: 1rem 1rem 0 0;
	}

	.content {
		padding: 1rem;
		overflow: hidden;
		border-radius: 0 0 1rem 1rem;
		/* background-color: var(--bg-darker); */
	}

	:global(html.dark) .content {
		background-color: var(--bg-darker);
	}

	pre {
		padding: 1rem 1.5rem 3rem;
		/* background-color: rgba(0, 255, 255, 0.151); */
	}
</style>
