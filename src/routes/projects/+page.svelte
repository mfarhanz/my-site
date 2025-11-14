<script context="module" lang="ts">
	let lastUpdatedMap: Record<string, string> = {};
</script>

<script lang="ts">
	import ContentCard from '$lib/components/ContentCard.svelte';
	import ContentSection from '$lib/components/ContentSection.svelte';
	import type { Project } from '$lib/types/project';
	import {
		addStringToSet,
		removeStringFromSet,
		getLastUpdatedTimesForProjects,
		filterObjectsByTags,
		mapObjectToBlockObject
	} from '$lib/utils/helpers';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { onMount } from 'svelte';

	export let data;
	let selectedFilter: string | undefined;
	let filterTags: string[] = [];
	let newTagInput = '';
	let mounted = false;

	onMount(async () => {
		if (!lastUpdatedMap || Object.keys(lastUpdatedMap).length === 0) {
			const entries = await getLastUpdatedTimesForProjects(data.projects ?? []);
			// convert array of { slug, updated_at } to map
			lastUpdatedMap = entries.reduce(
				(acc, curr) => {
					acc[curr.slug] = curr.created_at ?? '1970-01-01T00:00:00Z';
					return acc;
				},
				{} as Record<string, string>
			);
		}

		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('filterTags');
			const hasSession = sessionStorage.getItem('appSessionStarted');
			if (hasSession && saved) {
				// if normal navigation, restore saved tags
				filterTags = JSON.parse(saved);
			} else {
				filterTags.length = 0; // if full reload, reset to default
				localStorage.setItem('filterTags', JSON.stringify(filterTags));
			}
			// mark session as active (persists until tab closed)
			sessionStorage.setItem('appSessionStarted', 'true');
			mounted = true;
		}
	});

	function remapProjects() {
		return mapObjectToBlockObject(
			data.projects ?? [],
			'image',
			'title',
			'description',
			'tags',
			(p) => `/projects/${p.slug}`
		);
	}

	$: if (mounted) {
		localStorage.setItem('filterTags', JSON.stringify(filterTags));
	}

	$: projects = (data.projects ?? []).map((proj: Project) => ({
		src: proj.image,
		title: proj.title,
		description: proj.description ?? '',
		tags: proj.tags ?? [],
		route: `/projects/${proj.slug}`
	}));

	$: {
		projects = remapProjects();
		if (selectedFilter === 'date') {
			const sorted = [...projects].sort((a, b) => {
				const slugA = a.route.split('/').pop()!;
				const slugB = b.route.split('/').pop()!;
				const dateA = new Date(lastUpdatedMap[slugA]).getTime();
				const dateB = new Date(lastUpdatedMap[slugB]).getTime();
				return dateB - dateA;
			});
			projects = sorted;
		} else if (selectedFilter === 'tags') {
			projects = filterObjectsByTags(projects, filterTags);
		}
	}
</script>

<section
	class="section smooth-trans-8 gap-[3vh] bg-light-background pb-[8vh] pt-[9vh] text-light-text dark:bg-dark-background dark:text-dark-text"
>
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<h1 class="title-font title-sizing smooth-trans-8 font-bold">Projects</h1>

		<div class="flex items-center gap-[2vw] md:gap-[1vw] lg:gap-[0.7vw]">
			<span class="button-text-sizing text-light-text-muted dark:text-dark-text-muted">
				Filter by:
			</span>
			<ToggleGroup.Root
				type="single"
				bind:value={selectedFilter}
				class="border-[0.1vw] border-dark-secondary"
			>
				<ToggleGroup.Item
					value="date"
					aria-label="Sort by Date"
					class="button-text-sizing toggle-group-item smooth-trans-3 border-r-[0.1vw]"
				>
					Date
				</ToggleGroup.Item>
				<ToggleGroup.Item
					value="tags"
					aria-label="Filter by Tags"
					class="button-text-sizing toggle-group-item smooth-trans-3"
				>
					Tags
				</ToggleGroup.Item>
			</ToggleGroup.Root>
		</div>
	</div>

	{#if selectedFilter === 'tags'}
		<div
			class="smooth-trans-4 flex flex-wrap items-center gap-[1.5vw] rounded-lg sm:gap-[0.8vw] lg:gap-[0.5vw]"
		>
			{#each filterTags as tag}
				<span
					class="text-sizing-0 smooth-trans-8 flex items-center rounded-full bg-light-primary/20 px-[3vw] py-1 text-light-primary dark:bg-dark-primary/20 dark:text-dark-primary sm:px-[1vw] sm:py-[0.2vh] md:px-[1.5vw] md:py-[0.5vh] lg:px-[1.2vw] lg:py-[0.3vh]"
				>
					{tag}
					<button
						on:click={() => {
							removeStringFromSet(filterTags, tag);
							filterTags = filterTags; // trigger svelte reactivity
						}}
						class="text-sizing-0 smooth-trans-2 ml-[2vw] flex cursor-pointer items-center justify-center rounded-full text-light-primary/80 hover:text-light-primary/100 dark:text-dark-primary/80 dark:hover:text-dark-primary/100 md:ml-[1vw] lg:ml-[1vw]"
						aria-label="Remove tag {tag}"
					>
						✕
					</button>
				</span>
			{/each}

			<input
				type="text"
				placeholder={filterTags.length === 0 ? 'Enter a tag to filter by...' : 'Add tag...'}
				class="text-sizing-1 input-field-sm smooth-trans-4"
				maxlength="32"
				bind:value={newTagInput}
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						addStringToSet(filterTags, newTagInput);
						filterTags = filterTags; // trigger svelte reactivity
						newTagInput = ''; // clear input
					}
				}}
			/>
		</div>
	{/if}

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
