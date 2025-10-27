<script lang="ts">
	import { formatDate } from '$lib/utils/helpers';
	import type { Project } from '$lib/types/project';
	import { CalendarDays } from 'lucide-svelte';
	
	let { data }: { data: { content: any; meta: Project } } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<section
	class="section grid-responsive smooth-trans-8 bg-light-background pb-[10vh] pt-[9vh] text-light-text dark:bg-dark-background dark:text-dark-text"
>
	{#if data.meta}
		<div class="flex flex-col items-start justify-center gap-[1.7vh] text-left">
			<header class="mb-[4vh] pb-[6vh] w-full border-b-[0.3vh] border-light-text/10 dark:border-dark-text/20">
				<h1 class="pb-[2vh] font-semibold text-light-primary dark:text-dark-primary">
					{data.meta.title}
				</h1>
				<p
					class="text-sizing-0 flex items-center pb-[0.5vh] sm:pb-[1vh] md:pb-[0.8vh] lg:pb-[0.7vh] gap-[2vw] sm:gap-[0.7vw] text-light-text-muted dark:text-dark-text-muted smooth-trans-8"
				>
					<CalendarDays class="icon-sizing-1" />
					{formatDate(data.meta.date ?? '')}
				</p>

				{#if data.meta.tags?.length}
					<div class="flex flex-wrap pt-[1vh] gap-[1.9vw] sm:gap-[0.7vw]">
						{#each data.meta.tags as tag}
							<span
								class="text-sizing-0 smooth-trans-8 rounded-full bg-light-accent/20 px-[3vw] sm:px-[1vw] py-1 text-light-accent dark:bg-dark-accent/20 dark:text-dark-accent"
							>
								{tag}
							</span>
						{/each}
					</div>
				{/if}
			</header>
			<div class="w-full prose dark:prose-invert code-light code-dark smooth-trans-8">
				<svelte:component this={data.content} />
			</div>
		</div>
	{:else}
		<p class="mt-10 text-center text-light-text-muted dark:text-dark-text-muted">
			Project not found.
		</p>
	{/if}
</section>
