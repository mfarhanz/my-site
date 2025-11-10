<script lang="ts">
	import ContentCard from '$lib/components/ContentCard.svelte';
	import ContentSection from '$lib/components/ContentSection.svelte';
	import type { Project } from '$lib/types/project';

	export let data;
	$: projects = (data.projects ?? []).map((proj: Project) => ({
		src: proj.image,
		title: proj.title,
		description: proj.description ?? '',
		tags: proj.tags ?? [],
		route: `/projects/${proj.slug}`
	}));
</script>

<section
	class="section smooth-trans-8 gap-[4vh] bg-light-background pb-[8vh] pt-[9vh] text-light-text dark:bg-dark-background dark:text-dark-text"
>
	<h1 class="title-font title-sizing smooth-trans-8 font-bold">Projects</h1>
	{#if projects && projects.length > 0}
		<ContentSection items={projects} />
	{:else}
		<ContentCard
			item={{
				src: '/misc/static_2.gif',
				title: '404',
				description: 'No Projects Found',
				tags: ['', '', '']
			}}
		/>
	{/if}
</section>
