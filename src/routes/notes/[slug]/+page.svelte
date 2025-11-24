<script lang="ts">
	import type { Note } from '$lib/types/note';
	import { CalendarDays } from 'lucide-svelte';
	import { formatDate, setupNavigationHandler } from '$lib/utils/helpers';
	import { beforeNavigate, afterNavigate } from '$app/navigation';

	let { data }: { data: { content: any; meta: Note } } = $props();
	let shouldTag = $state(false);	// for separating element specific page view transitions with main page transition

	setupNavigationHandler(
		beforeNavigate,
		(from, to) =>
			!!(from?.startsWith('/notes/') && from.length > '/notes/'.length && to === '/notes'),
		(val) => (shouldTag = val)
	);

	setupNavigationHandler(
		afterNavigate,
		(from, to) =>
			!!(from === '/notes' && to?.startsWith('/notes/') && to.length > '/notes/'.length),
		(val) => (shouldTag = val)
	);
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<section
	class="section grid-responsive pb-[10vh] pt-[9vh] smooth-trans-8"
>
	{#if data.meta}
		<div class="flex flex-col items-start justify-center gap-[1.7vh] text-left">
			<header
				class="mb-[4vh] w-full border-b-[0.3vh] border-light-text/10 pb-[6vh] dark:border-dark-text/20"
			>
				<h1 
					style={shouldTag ? `--tag:${data.meta.slug}-title` : undefined}
					class="pb-[2vh] font-semibold text-light-primary dark:text-dark-primary"
				>
					{data.meta.title}
				</h1>
				<p
					class="text-sizing-0 smooth-trans-8 flex items-center gap-[2vw] pb-[0.5vh] text-light-text-muted dark:text-dark-text-muted sm:gap-[0.7vw] sm:pb-[1vh] md:pb-[0.8vh] lg:pb-[0.7vh]"
				>
					<CalendarDays class="icon-sizing-1" />
					{formatDate(data.meta.date ?? '')}
				</p>

				{#if data.meta.tags?.length}
					<div class="flex flex-wrap gap-[1.9vw] pt-[1vh] sm:gap-[0.7vw]">
						{#each data.meta.tags as tag}
							<span
								style={`--tag:${data.meta.slug}-${tag}-tag`}
								class="text-sizing-0 smooth-trans-8 rounded-full bg-light-accent/20 px-[3vw] py-1 text-light-accent dark:bg-dark-accent/20 dark:text-dark-accent sm:px-[1vw]"
							>
								{tag}
							</span>
						{/each}
					</div>
				{/if}
			</header>
			<div class="code-light code-dark smooth-trans-8 prose w-full dark:prose-invert">
				{@render data.content()}
			</div>
		</div>
	{:else}
		<p class="mt-10 text-center text-light-text-muted dark:text-dark-text-muted">Note not found.</p>
	{/if}
</section>
