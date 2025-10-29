<script lang="ts">
	import { Github, Linkedin, Mail } from 'lucide-svelte';
	// import ContentSection from '$lib/components/ContentSection.svelte';
</script>

<section
	class="section grid-responsive smooth-trans-8 bg-light-background pb-[10vh] pt-[9vh] text-light-text dark:bg-dark-background dark:text-dark-text"
>
	<div class="flex flex-col items-start justify-center gap-[1.7vh] text-left">
		<h1 class="font-bold title-font title-sizing smooth-trans-8">
			Hey! I'm <span class="text-light-primary dark:text-dark-primary">Farhan</span>
		</h1>

		<p
			class="text-sizing-2 smooth-trans-8 w-full text-light-text/80 dark:text-dark-text/80 md:w-[90%] lg:w-[85%]"
		>
			I'm a developer who loves building creative web experiences using
			<span class="text-light-primary dark:text-dark-primary"> SvelteKit</span>,
			<span class="text-light-primary dark:text-dark-primary"> TypeScript</span>, and
			<span class="text-light-primary dark:text-dark-primary"> TailwindCSS</span>.
		</p>
		<div class="flex items-center gap-3 sm:gap-[2vw]">
			<a 
				href="https://github.com/mfarhanz" 
				class="gap-[1vw] sm:gap-[0.5vw] flex items-center icon-button link-hover smooth-trans-2 hover:tilt-zoom-1"
				target="_blank" rel="noopener noreferrer"
			>
				<Github class="icon-sizing-2" />
				<span class="text-sizing-0 text-light-text dark:text-dark-text link-hover smooth-trans-2">GitHub</span>
			</a>

			<div class="h-[2vh] w-px bg-light-text/30 dark:bg-dark-text/30"></div>

			<a 
				href="https://www.linkedin.com/in/mfarhanz" 
				class="gap-[1vw] sm:gap-[0.5vw] flex items-center icon-button link-hover smooth-trans-2 hover:tilt-zoom-1"
				target="_blank" rel="noopener noreferrer"
			>
				<Linkedin class="icon-sizing-1" />
				<span class="text-sizing-0 text-center text-light-text dark:text-dark-text link-hover smooth-trans-2">LinkedIn</span>
			</a>

			<div class="h-[2vh] w-px bg-light-text/30 dark:bg-dark-text/30"></div>

			<a 
				href="mailto:mfz.bin@gmail.com" 
				class="flex items-center icon-button link-hover smooth-trans-2 hover:tilt-zoom-1"
				target="_blank" rel="noopener noreferrer"
			>
				<Mail class="icon-sizing-1" />
			</a>
		</div>
	</div>
</section>

<section class="section pb-[8vh] gap-[4vh]">
	<h2 class="font-medium subtitle-font subtitle-sizing-2">
		About Me
	</h2>
	<!-- <ContentSection items={projects} /> -->
</section>
