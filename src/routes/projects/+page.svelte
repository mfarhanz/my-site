<script lang="ts">
    import ContectSection from '$lib/components/ContentSection.svelte';
	import { projectsStore } from '$lib/stores/projects';
    import type { Project } from '$lib/types/project'

	// let { data } = $props();
	// const projects: ContentItem[] = data.projects.map((p) => ({
	// 	src: p.image,
	// 	description: p.description ?? 'No description available.',
	// 	tags: p.tags ?? [],
	// 	route: `/projects/${p.slug}`
	// }));

	export let data;
	// initialize the store if empty or null
	projectsStore.update((current) => (current && current.length ? current : (data.projects ?? [])));
	$: projects = ($projectsStore ?? []).map((p: Project) => ({
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
