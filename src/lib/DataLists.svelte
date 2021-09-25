<script>
	import { ACCEPT, PATTERNS } from '../data/constants';
</script>

<datalist id="patterns">
	{#each PATTERNS as p}<option value={p} />{/each}
</datalist>

<datalist id="accepts">
	{#each ACCEPT as a}<option value={a} />{/each}
</datalist>
