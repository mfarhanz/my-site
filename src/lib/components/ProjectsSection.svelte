<script lang="ts">
  import { getProjects } from '$lib/utils/helpers'

  export let count: number = 5 // default to 5 for Home page
  const images = getProjects(count)
</script>

<div class="columns-1 md:columns-2 lg:columns-3 gap-[2vw] space-y-6 sm:space-y-[3vh]">
{#each images as img}
    <div
    class={`break-inside-avoid backdrop-blur-md bg-light-background-button dark:bg-dark-background-button rounded-[2vh] overflow-hidden shadow-md p-[3vw] md:p-[2vw] lg:p-[1vw] flex flex-col gap-4 sm:gap-[1.2vw] smooth-trans-${img.transition} max-h-full max-w-full mx-auto`}
    >
    <div class={`w-full h-auto overflow-hidden rounded-[20%] smooth-trans-${img.transition}`}>
        <img src={img.src} alt="project" class="w-full h-full object-cover rounded-xl" />
    </div>

    <div class={`text-sizing-1 text-light-text dark:text-dark-text smooth-trans-${img.transition}`}>
        {img.description}
    </div>

    <div class="flex flex-wrap gap-[1vw] sm:gap-[0.5vw] mt-auto">
        {#each img.tags as tag}
        <span
            class="px-[3vw] sm:px-[1vw] py-1 rounded-full text-sizing-0 bg-light-accent/20 dark:bg-dark-accent/20 text-light-accent dark:text-dark-accent smooth-trans-8"
        >
            {tag}
        </span>
        {/each}
    </div>
    </div>
{/each}
</div>
