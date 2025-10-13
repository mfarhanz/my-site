<script lang="ts">
	import { Github, Linkedin, Mail } from 'lucide-svelte';
	import { randomBetween, getProjects } from '$lib/utils/helpers';
	import ProjectsSection from '$lib/components/ProjectsSection.svelte'

	// // import all image/gif assets
	// const allImages = import.meta.glob('$lib/assets/p{1,2,3,4,5,6,7,8,9,10,11,12}.{png,jpg,jpeg,bmp,gif}', {
	// 	eager: true,
	// 	import: 'default'
	// }) as Record<string, string>

	// // build grouped structure like:
	// // { p1: { image: '...', gif: '...' }, p2: {...}, ... }
	// const grouped: Record<string, { image?: string; gif?: string }> = {}

	// for (const [path, url] of Object.entries(allImages)) {
	// 	const match = path.match(/p(\d+)\.(\w+)$/)
	// 	if (!match) continue
	// 	const [, num, ext] = match
	// 	const key = `p${num}`

	// 	if (ext === 'gif') grouped[key] = { ...grouped[key], gif: url }
	// 	else grouped[key] = { ...grouped[key], image: url }
	// }

	// // pick either the gif or image for each p1–p7	(just doing this for testing)
	// const images = Array.from({ length: 12 }, (_, i) => {
	// 	const key = `p${i + 1}`
	// 	const { image, gif } = grouped[key] || {}
	// 	const chosen =
	// 	gif && image ? (Math.random() < 0.5 ? gif : image) : gif || image || ''
	// 	return { src: chosen }
	// })

	const images = getProjects(5)
</script>

<section class="pt-[9vh] pb-[10vh] section grid-responsive smooth-trans-8 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
	<div class="flex flex-col justify-center items-start text-left gap-4">
		<h1 class="title-sizing font-bold smooth-trans-8">
			Hey , I'm <span class="text-light-primary dark:text-dark-primary">Farhan!</span>
		</h1>

		<p class="text-sizing-2 text-light-text/80 dark:text-dark-text/80 w-full md:w-[90%] lg:w-[85%] smooth-trans-8">
            I'm a developer who loves building creative web experiences using
            <span class="text-light-primary dark:text-dark-primary"> SvelteKit</span>,
            <span class="text-light-primary dark:text-dark-primary"> TypeScript</span>, and
            <span class="text-light-primary dark:text-dark-primary"> TailwindCSS</span>.
        </p>

		<div class="flex items-center gap-6 sm:gap-[2vw]">
			<a href="#" class="icon-button smooth-trans-2 hover:tilt-zoom-1">
				<Github size="clamp(1rem, 2vw, 10rem)" />
			</a>
			<a href="#" class="icon-button smooth-trans-2 hover:tilt-zoom-1">
				<Linkedin size="clamp(1rem, 2vw, 10rem)" />
			</a>
			<a href="#" class="icon-button smooth-trans-2 hover:tilt-zoom-1">
				<Mail size="clamp(1rem, 2vw, 10rem)" />
			</a>
		</div>
	</div>
</section>

<!-- <section class="pb-5 section smooth-trans-8 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
  <h2 class="subtitle-sizing-2 font-medium mb-[2vh] smooth-trans-8">
    Things I've Made...
  </h2>

  <div class="columns-1 md:columns-2 lg:columns-3 gap-[2vw] space-y-6 sm:space-y-[3vh]">
    {#each images as img, i}
      <div
        class={`break-inside-avoid backdrop-blur-md bg-light-background-button dark:bg-dark-background-button rounded-[2vh] overflow-hidden shadow-md p-[3vw] md:p-[2vw] lg:p-[1vw] flex flex-col gap-4 sm:gap-[1.2vw] smooth-trans-${randomBetween(
          1,
          10
        )} max-h-full max-w-full mx-auto`}
      >
        <div
          class={`w-full h-auto overflow-hidden rounded-[20%] smooth-trans-${randomBetween(
            1,
            10
          )}`}
        >
          <img
            src={img.src}
            alt="placeholder"
            class="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div
          class={`text-sizing-1 text-light-text dark:text-dark-text smooth-trans-${randomBetween(
            1,
            10
          )}`}
        >
          {i % 2 === 0
            ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            : i % 3 === 0
            ? "Lorema, vel consectetur lacus Lorem ipsum dolor consectetur adipiscing elita elita. Vivamus eleifend maximus elita. Vivamus eleifend maximus. Vivamus amet, consectetur consectetur adipiscing elita. Vivamus eleifend maximus urna ipsum dolor sit amet, consectetur adipiscing elit Nulla facilisi. Curabitur vulputateelita. Vivamus eleifend"
            : i % 4 === 0
            ? "Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elita. Vivamus eleifend maximus urna."
            : i % 5 === 0
            ? "Lorem ipsum dolor sit."
            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit amet, consectetur adipiscing elit."}
        </div>

        <div class="flex flex-wrap gap-[1vw] sm:gap-[0.5vw] mt-auto">
          {#each ['SvelteKit', 'TypeScript', 'Tailwind', 'Vite', 'Node']
            .slice(0, Math.floor(Math.random() * 4) + 2) as tag}
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
</section> -->

<h2 class="section subtitle-sizing-2 font-medium mb-[2vh] smooth-trans-8">
    Some Stuff I've Made...
</h2>
<ProjectsSection count={4} />

