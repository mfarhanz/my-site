<script lang="ts">
	import ContectSection from '$lib/components/ContentSection.svelte';
	import type { Project } from '$lib/types/project';

	export let data;
	$: projects = (data.projects ?? []).map((p: Project) => ({
		src: p.image,
		description: p.description ?? 'No description available.',
		tags: p.tags ?? [],
		route: `/projects/${p.slug}`
	}));
</script>

<section
	class="section smooth-trans-8 gap-[4vh] bg-light-background pb-[8vh] pt-[9vh] text-light-text dark:bg-dark-background dark:text-dark-text"
>
	<h1 class="title-font title-sizing smooth-trans-8 font-bold">Projects</h1>
	<ContectSection items={projects} />
</section>
