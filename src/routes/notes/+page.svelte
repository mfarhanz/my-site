<script lang="ts">
	import ContentCard from '$lib/components/ContentCard.svelte';
	import ContentSection from '$lib/components/ContentSection.svelte';
	import type { Note } from '$lib/types/note';
	import { navigateTo } from '$lib/utils/helpers';

	export let data;
	
	$: notes = (data.notes ?? []).map((note: Note) => ({
		src: note.image,
		title: note.title,
		description: note.description ?? '',
		tags: note.tags ?? [],
		route: `/notes/${note.slug}`,
		callback: () => navigateTo(`/notes/${note.slug}`)
	}));
</script>

<svelte:head>
</svelte:head>

<section
	class="section gap-[4vh] pb-[8vh] pt-[9vh] text-light-text dark:text-dark-text smooth-trans-8"
>
	<h1 class="title-font title-sizing smooth-trans-8 font-bold">Notes & Stuff</h1>
	{#if notes && notes.length > 0}
		<ContentSection items={notes} />
	{:else}
		<ContentCard
			item={{
				src: '/misc/static_2.gif',
				title: '204',
				description: 'No Notes Available',
				tags: ['', '', '']
			}}
		/>
	{/if}
</section>
