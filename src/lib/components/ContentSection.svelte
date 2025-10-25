<script lang="ts">
	import ContentCard from './ContentCard.svelte';
	import type { ContentItem } from '$lib/types/content';
	export let items: ContentItem[] = [];
</script>

<div class="columns-1 gap-[2vw] space-y-6 sm:space-y-[3vh] md:columns-2 lg:columns-3">
	{#each items as item}
		<ContentCard {item} />
	{/each}
</div>
