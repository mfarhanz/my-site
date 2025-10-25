<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ContentItem } from '$lib/types/content';
	import { randomBetween } from '$lib/utils/helpers';
	export let item: ContentItem;

	function openContentPage() {
		if (item.route) goto(item.route);
	}
</script>

<div
	role="button"
	tabindex="0"
	on:click={openContentPage}
	on:keydown={(e) => e.key === 'Enter' && openContentPage()}
	class={`smooth-trans-3 mx-auto flex max-h-full max-w-full break-inside-avoid flex-col gap-4 overflow-hidden 
			rounded-[3vh] bg-light-background-button p-[3vw] shadow-md backdrop-blur-md hover:scale-[1.07] active:scale-[0.98] dark:bg-dark-background-button 
			sm:gap-[1.2vw] md:p-[2vw] lg:p-[1vw]`}
>
	{#if item.src}
		<div class={`h-auto w-full overflow-hidden rounded-[20%] smooth-trans-${randomBetween(1, 10)}`}>
			<img src={item.src} alt="project" class="h-full w-full rounded-xl object-cover" />
		</div>
	{/if}

	<div
		class={`text-sizing-1 text-light-text dark:text-dark-text smooth-trans-${randomBetween(1, 10)}`}
	>
		{item.description}
	</div>

	<div class="mt-auto flex flex-wrap gap-[1vw] sm:gap-[0.5vw]">
		{#each item.tags as tag}
			<span
				class="text-sizing-0 smooth-trans-8 rounded-full bg-light-accent/20 px-[3vw] py-1 text-light-accent dark:bg-dark-accent/20 dark:text-dark-accent sm:px-[1vw]"
			>
				{tag}
			</span>
		{/each}
	</div>
</div>
