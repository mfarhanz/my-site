<script lang="ts">
	import type { ContentItem } from '$lib/types/content';
	import { randomBetween, setupNavigationHandler, formatDate } from '$lib/utils/helpers';
	import { beforeNavigate, afterNavigate } from '$app/navigation';

	let { item }: { item: ContentItem } = $props();
	let shouldTag = $state(false); // for separating element specific page view transitions with main page transition
	
	const isImage = () =>
		!!item.src &&
		(	item.src.startsWith('data:image/') ||
			item.src.endsWith('.png') ||
			item.src.endsWith('.jpg') ||
			item.src.endsWith('.gif') ||
			item.src.endsWith('.webp')	);

	setupNavigationHandler(
		beforeNavigate,
		(from, to) =>
			!!(
				(from === '/projects' && to?.startsWith('/projects/') && to.length > '/projects/'.length) ||
				(from === '/notes' && to?.startsWith('/notes/') && to.length > '/notes/'.length)
			),
		(val) => (shouldTag = val)
	);

	setupNavigationHandler(
		afterNavigate,
		(from, to) =>
			!!(
				(from?.startsWith('/projects/') &&
					from.length > '/projects/'.length &&
					to === '/projects') ||
				(from?.startsWith('/notes/') && from.length > '/notes/'.length && to === '/notes')
			),
		(val) => (shouldTag = val)
	);
</script>

<div
	role="button"
	tabindex="0"
	onclick={() => item.callback?.()}
	onkeydown={(e) => e.key === 'Enter' && item.callback?.()}
	class={`smooth-trans-3 mx-auto flex max-h-full cursor-pointer break-inside-avoid flex-col gap-[1.5vh] 
			overflow-hidden rounded-[3vh] bg-light-background-button p-[4vw] shadow-md backdrop-blur-md hover:scale-[1.07] 
			active:scale-[0.98] dark:bg-dark-background-button sm:gap-[1.3vh] md:gap-[1.5vh] md:p-[2vw] lg:p-[1vw]`}
>
	{#if item.src}
		<div
			class={`h-auto w-full overflow-hidden rounded-[20%] smooth-trans-${randomBetween(1, 10)}`}
			style={shouldTag ? `--tag:${item.route?.split('/').pop()}` : undefined}
		>
			{#if isImage()}
				<img
					src={item.src}
					alt="content"
					loading="lazy"
					decoding="async"
					class="smooth-trans-8 h-full w-full rounded-xl object-cover"
				/>
			{:else}
				<iframe
					src={item.src}
					frameborder="0"
					allowfullscreen
					title="easteregg"
					class="block rounded-xl"
				></iframe>
			{/if}
		</div>
	{/if}

	{#if item.title || item.date}
		<div class="flex w-full items-center justify-between">
			<div
				style={shouldTag ? `--tag:${item.route?.split('/').pop()}-title` : undefined}
				class="subtitle-sizing-0 title-font font-medium text-light-primary dark:text-dark-primary 
						smooth-trans-{randomBetween(1,10)}"
			>
				{item.title}
			</div>
			{#if item.date}
				<div class="alt-text-sizing opacity-60">
					{formatDate(item.date.split('T')[0] ?? '', undefined, undefined, true)}
				</div>
			{/if}
		</div>
	{/if}

	<div
		class={`text-sizing-1 text-left text-light-text dark:text-dark-text smooth-trans-${randomBetween(1, 10)}`}
	>
		{item.description}
	</div>

	<div class="mt-auto flex flex-wrap gap-[1vw] sm:gap-[0.5vw]">
		{#each item.tags as tag}
			<span
				style={shouldTag ? `--tag:${item.route?.split('/').pop()}-${tag}-tag` : undefined}
				class="text-sizing-0 smooth-trans-8 rounded-full bg-light-accent/20 px-[3vw] py-1 text-light-accent dark:bg-dark-accent/20 dark:text-dark-accent sm:px-[1vw] sm:py-[0.2vh] md:px-[1.5vw] md:py-[0.5vh] lg:px-[1.2vw] lg:py-[0.3vh]"
			>
				{tag}
			</span>
		{/each}
	</div>
</div>
