<script lang="ts">
	import { getProjects } from '$lib/utils/helpers';

	export let count: number = 5; // default to 5 for Home page
	const images = getProjects(count);
</script>

<div class="columns-1 gap-[2vw] space-y-6 sm:space-y-[3vh] md:columns-2 lg:columns-3">
	{#each images as img}
		<div
			class={`flex break-inside-avoid flex-col gap-4 overflow-hidden rounded-[3vh] p-[3vw] sm:gap-[1.2vw] md:p-[2vw] lg:p-[1vw] mx-auto max-h-full max-w-full bg-light-background-button dark:bg-dark-background-button shadow-md backdrop-blur-md smooth-trans-${img.transition}`}
		>
			<div class={`h-auto w-full overflow-hidden rounded-[20%] smooth-trans-${img.transition}`}>
				<img src={img.src} alt="project" class="h-full w-full rounded-xl object-cover" />
			</div>

			<div
				class={`text-sizing-1 text-light-text dark:text-dark-text smooth-trans-${img.transition}`}
			>
				{img.description}
			</div>

			<div class="mt-auto flex flex-wrap gap-[1vw] sm:gap-[0.5vw]">
				{#each img.tags as tag}
					<span
						class="text-sizing-0 smooth-trans-8 rounded-full bg-light-accent/20 px-[3vw] py-1 text-light-accent dark:bg-dark-accent/20 dark:text-dark-accent sm:px-[1vw]"
					>
						{tag}
					</span>
				{/each}
			</div>
		</div>
	{/each}
</div>
