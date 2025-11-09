<script lang="ts">
	import type { Project } from '$lib/types/project';
	import { formatDate, setupNavigationHandler } from '$lib/utils/helpers';
	import { CalendarDays, Github, ExternalLink } from 'lucide-svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';

	let { data }: { data: { content: any; meta: Project; pathname: any } } = $props();
	let shouldTag = $state(false);

	setupNavigationHandler(
		beforeNavigate,
		(from, to) =>
			!!(from?.startsWith('/projects/') && from.length > '/projects/'.length && to === '/projects'),
		(val) => (shouldTag = val)
	);

	setupNavigationHandler(
		afterNavigate,
		(from, to) =>
			!!(from === '/projects' && to?.startsWith('/projects/') && to.length > '/projects/'.length),
		(val) => (shouldTag = val)
	);
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

{#if data.meta.image}
	<div class="relative overflow-hidden">
		<div
			class="smooth-trans-8 h-[25vh] w-full bg-light-background dark:bg-dark-background sm:h-[60vh] md:h-[70vh] lg:h-[60vh]"
		>
			<img
					src={data.meta.image}
					alt={data.meta.title}
					style={shouldTag ? `--tag:${data.meta.slug}` : undefined}
					class="smooth-trans-8 absolute left-1/2 h-[25vh] -translate-x-1/2 object-cover opacity-80 dark:opacity-50 sm:h-[60vh] md:h-[70vh] lg:h-[60vh]"
				/>
			<div
				class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-light-background dark:to-dark-background"
			></div>
		</div>
	</div>
{:else}
	<div
		class="smooth-trans-8 h-[5vh] w-full bg-light-background dark:bg-dark-background sm:h-[60vh] md:h-[7vh] lg:h-[7vh]"
	></div>
{/if}

<section
	class="section grid-responsive smooth-trans-8 bg-light-background pb-[10vh] text-light-text dark:bg-dark-background dark:text-dark-text"
>
	{#if data.meta}
		<div class="flex flex-col items-start justify-center gap-[1.7vh] text-left">
			<header
				class="relative mb-[4vh] w-full border-b-[0.3vh] border-light-text/10 pb-[6vh] dark:border-dark-text/20"
			>
				<div class="relative z-10">
					<h1 class="pb-[2vh] font-semibold text-light-primary dark:text-dark-primary">
						{data.meta.title}
					</h1>
					<p
						class="text-sizing-0 smooth-trans-2 flex items-center gap-[2vw] pb-[0.5vh] text-light-text-muted dark:text-dark-text-muted sm:gap-[0.7vw] sm:pb-[1vh] md:pb-[0.8vh] lg:pb-[0.7vh]"
					>
						<CalendarDays class="icon-sizing-1" />
						{formatDate(data.meta.date ?? '')}

						{#if data.meta.links?.length}
							<span
								class="smooth-trans-2 ml-[4vw] flex items-center gap-[2.5vw] sm:ml-[1vw] md:ml-[3vw] md:gap-[1.5vw] lg:ml-[2vw] lg:gap-[1.3vw]"
							>
								{#each data.meta.links as link}
									{@const Icon = link.text.toLowerCase().includes('github') ? Github : ExternalLink}
									<a
										href={link.url}
										target="_blank"
										rel="noopener noreferrer"
										class="smooth-trans-2 hover:tilt-zoom-1 flex items-center gap-[1vw] hover:text-light-primary dark:hover:text-dark-primary sm:gap-[0.5vw]"
										title={link.text}
									>
										<Icon class="icon-sizing-1" />
									</a>
								{/each}
							</span>
						{/if}
					</p>

					{#if data.meta.tags?.length}
						<div class="flex flex-wrap gap-[1.9vw] pt-[1vh] sm:gap-[0.7vw]">
							{#each data.meta.tags as tag}
								<span
									class="text-sizing-0 smooth-trans-8 rounded-full bg-light-accent/20 px-[3vw] py-1 text-light-accent dark:bg-dark-accent/20 dark:text-dark-accent sm:px-[1vw]"
								>
									{tag}
								</span>
							{/each}
						</div>
					{/if}
				</div>
			</header>
			<div class="code-light code-dark smooth-trans-8 prose relative z-10 w-full dark:prose-invert">
				{#key data.meta.slug}
					{@render data.content()}
				{/key}
			</div>
		</div>
	{:else}
		<p class="mt-10 text-center text-light-text-muted dark:text-dark-text-muted">
			Project not found.
		</p>
	{/if}
</section>
