<script lang="ts">
	import ContentCard from '$lib/components/ContentCard.svelte';
	import ContentSection from '$lib/components/ContentSection.svelte';
	import { notesStore } from '$lib/stores/notes';
	import type { Note } from '$lib/types/note';

	export let data;
	notesStore.update((current) => (current && current.length ? current : (data.notes ?? [])));
	$: notes = ($notesStore ?? []).map((p: Note) => ({
		src: p.image,
		description: p.description ?? 'No description available.',
		tags: p.tags ?? [],
		route: `/notes/${p.slug}`
	}));
</script>

<section
	class="section smooth-trans-8 gap-[4vh] bg-light-background pb-[8vh] pt-[9vh] text-light-text dark:bg-dark-background dark:text-dark-text"
>
	<h1 class="title-font title-sizing smooth-trans-8 font-bold">Notes & Stuff</h1>
	{#if notes && notes.length > 0}
		<ContentSection items={notes} />
	{:else}
		<ContentCard
			item={{
				src: '/misc/static_2.gif',
				description: 'Nothing here yet...',
				tags: ['', '', '']
			}}
		/>
	{/if}
</section>
