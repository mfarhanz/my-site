<script lang="ts">
	import ContentCard from '$lib/components/ContentCard.svelte';
	import ContentSection from '$lib/components/ContentSection.svelte';
	import type { Note } from '$lib/types/note';

	export let data;
	$: notes = (data.notes ?? []).map((note: Note) => ({
		src: note.image,
		title: note.title,
		description: note.description ?? '',
		tags: note.tags ?? [],
		route: `/notes/${note.slug}`
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
				title: '404',
				description: 'Not Found',
				tags: ['', '', '']
			}}
		/>
	{/if}
</section>
