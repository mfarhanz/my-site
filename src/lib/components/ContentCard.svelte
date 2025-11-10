<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ContentItem } from '$lib/types/content';
	import { randomBetween, setupNavigationHandler } from '$lib/utils/helpers';
	import { beforeNavigate, afterNavigate } from '$app/navigation';

	let { item }: { item: ContentItem } = $props();
	let shouldTag = $state(false);	// for separating element specific page view transitions with main page transition

	setupNavigationHandler(
		beforeNavigate,
		(from, to) =>
			!!((from === '/projects' && to?.startsWith('/projects/') && to.length > '/projects/'.length) ||
				(from === '/notes' && to?.startsWith('/notes/') && to.length > '/notes/'.length)),
		(val) => (shouldTag = val)
	);

	setupNavigationHandler(
		afterNavigate,
		(from, to) =>
			!!((from?.startsWith('/projects/') && from.length > '/projects/'.length && to === '/projects') ||
				(from?.startsWith('/notes/') && from.length > '/notes/'.length && to === '/notes')),
		(val) => (shouldTag = val)
	);

	function openContentPage() {
		if (!item.route) return;
		goto(item.route!);
	}
</script>

<div
	role="button"
	tabindex="0"
	data-sveltekit-noscroll
	onclick={openContentPage}
	onkeydown={(e) => e.key === 'Enter' && openContentPage()}
	class={`smooth-trans-3 mx-auto flex max-h-full max-w-full cursor-pointer break-inside-avoid flex-col overflow-hidden 
			rounded-[3vh] bg-light-background-button p-[3vw] shadow-md backdrop-blur-md hover:scale-[1.07] active:scale-[0.98] dark:bg-dark-background-button 
			gap-[1.5vh] sm:gap-[1.3vh] md:gap-[1.5vh] p-[4vw] md:p-[2vw] lg:p-[1vw]`}
>
	{#if item.src}
		<div
			class={`h-auto w-full overflow-hidden rounded-[20%] smooth-trans-${randomBetween(1, 10)}`}
			style={shouldTag ? `--tag:${item.route?.split('/').pop()}` : undefined}
		>
			<img
					src={item.src}
					alt="project"
					loading="lazy"
					decoding="async"
					class="smooth-trans-8 h-full w-full rounded-xl object-cover"
				/>
		</div>
	{/if}

	<div
		style={shouldTag ? `--tag:${item.route?.split('/').pop()}-title` : undefined}
		class={`subtitle-sizing-0 title-font font-medium text-light-primary dark:text-dark-primary smooth-trans-${randomBetween(1, 10)}`}
	>
		{item.title}
	</div>

	<div
		class={`text-sizing-1 text-light-text dark:text-dark-text smooth-trans-${randomBetween(1, 10)}`}
	>
		{item.description}
	</div>

	<div class="mt-auto flex flex-wrap gap-[1vw] sm:gap-[0.5vw]">
		{#each item.tags as tag}
			<span
				style={shouldTag ? `--tag:${item.route?.split('/').pop()}-${tag}-tag` : undefined}
				class="text-sizing-0 smooth-trans-8 rounded-full bg-light-accent/20 px-[3vw] py-1 text-light-accent dark:bg-dark-accent/20 dark:text-dark-accent sm:px-[1vw]"
			>
				{tag}
			</span>
		{/each}
	</div>
</div>
