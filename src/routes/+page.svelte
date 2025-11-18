<script lang="ts">
	import { Github, Linkedin, Mail } from 'lucide-svelte';
</script>

<section
	class="section grid-responsive pb-[10vh] pt-[9vh] smooth-trans-8"
>
	<div class="flex flex-col items-start justify-center gap-[1.7vh] text-left">
		<h1 class="title-font title-sizing smooth-trans-8 font-bold">
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
				class="icon-button link-hover smooth-trans-2 hover:tilt-zoom-1 flex items-center gap-[1vw] sm:gap-[0.5vw]"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Github class="icon-sizing-1" />
				<span class="text-sizing-0 link-hover smooth-trans-2 text-light-text dark:text-dark-text"
					>GitHub</span
				>
			</a>

			<div class="h-[2vh] w-px bg-light-text/30 dark:bg-dark-text/30"></div>

			<a
				href="https://www.linkedin.com/in/mfarhanz"
				class="icon-button link-hover smooth-trans-2 hover:tilt-zoom-1 flex items-center gap-[1vw] sm:gap-[0.5vw]"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Linkedin class="icon-sizing-1" />
				<span
					class="text-sizing-0 link-hover smooth-trans-2 text-center text-light-text dark:text-dark-text"
					>LinkedIn</span
				>
			</a>

			<div class="h-[2vh] w-px bg-light-text/30 dark:bg-dark-text/30"></div>

			<a
				href="mailto:mfz.bin@gmail.com"
				class="icon-button link-hover smooth-trans-2 hover:tilt-zoom-1 flex items-center"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Mail class="icon-sizing-1" />
			</a>
		</div>
	</div>
</section>

<section class="section gap-[4vh] pb-[8vh] smooth-trans-8">
	<h2 class="subtitle-font subtitle-sizing-2 font-medium">About Me</h2>

	<div
		class="smooth-trans-8 flex flex-col-reverse items-center justify-between gap-[5vh] md:flex-row md:items-start"
	>
		<div
			class="text-sizing-2 smooth-trans-8 w-full leading-relaxed text-light-text/80 dark:text-dark-text/80 md:w-3/4"
		>
			<p class="mb-[2vh]">
				I'm passionate about building beautiful, performant web experiences that combine creativity
				with precision. My focus is on crafting thoughtful user interfaces, experimenting with
				interactions, and pushing what's possible on the web.
			</p>
			<p>
				When I'm not coding, I enjoy learning new technologies, exploring design concepts, and
				contributing to open-source projects. I believe great design and code go hand in hand — both
				require curiosity, care, and iteration.
			</p>
		</div>

		<div class="flex w-[50%] justify-center md:-mt-[4vh] md:w-[40%] md:justify-end">
			<img
				src="https://avatars.githubusercontent.com/u/51290906?v=4"
				alt="My Github avatar"
				title="My Github avatar"
				style:--tag="github-avatar"
				class="avatar smooth-trans-8 aspect-square w-[40vw] sm:w-[70vw] md:w-[35vw] lg:w-[70vw] max-w-[300px] sm:max-w-[23vw] rounded-full object-cover shadow-lg"
			/>
		</div>
	</div>
</section>
