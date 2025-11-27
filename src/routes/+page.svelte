<script lang="ts">
	import { Github, Linkedin, Mail } from 'lucide-svelte';
</script>

<svelte:head>
</svelte:head>

<section class="section grid-responsive smooth-trans-8 pb-[10vh] pt-[9vh]">
	<div class="flex flex-col items-start justify-center gap-[1.7vh] text-left">
		<h1 class="title-font title-sizing smooth-trans-8 font-bold">
			Hey! I'm <span class="text-light-primary dark:text-dark-primary">Farhan</span>
		</h1>

		<p
			class="text-sizing-2 smooth-trans-8 w-full text-light-text/80 dark:text-dark-text/80 md:w-[90%] lg:w-[85%]"
		>
			Developer based in Toronto, spending my days building practical tools and webapps in <span
				class="text-light-primary dark:text-dark-primary">Python</span
			>
			and <span class="text-light-primary dark:text-dark-primary">TypeScript</span>, with the hope
			of making people's lives a bit easier.
		</p>

		<p
			class="pointer-fine:block text-sizing-3 mt-2 hidden select-none text-light-text/50
				blur-[8px] transition-all duration-300 hover:blur-[0px]
				dark:text-dark-text/50"
		>
			<em class="hover:blur-[0px]">
				I'm currently seeking opportunities — feel free to
				<a href="/contact" class="font-semibold text-light-primary dark:text-dark-primary">
					reach out
				</a>
				if my skills could be a good fit!
			</em>
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

<section class="section smooth-trans-8 gap-[4vh] pb-[8vh]">
	<h2 class="subtitle-font subtitle-sizing-2 font-medium">About Me</h2>

	<div
		class="smooth-trans-8 flex flex-col-reverse items-center justify-between gap-[5vh] md:flex-row md:items-start"
	>
		<div
			class="text-sizing-2 smooth-trans-8 w-full leading-relaxed text-light-text/80 dark:text-dark-text/80 md:w-3/4"
		>
			<p class="mb-[2vh]">
				I graduated from Memorial University in 2024 with a degree in computer science and have
				since focused on backend development and software engineering, occasionally diving into
				computer vision and data science.
			</p>
			<p class="mb-[2vh]">
				These days, I mostly build backend components with Python + Flask or Java + Spring Boot, and
				user interfaces with SvelteKit or React using TypeScript, Node.js, and TailwindCSS. For
				deployment and hosting, I rely on platforms like Vercel, Cloudflare Pages, and AWS.
			</p>

			<p>Outside of development, I enjoy cycling, questionable cooking, and gaming.</p>
		</div>

		<div class="flex w-[50%] justify-center md:-mt-[4vh] md:w-[40%] md:justify-end">
			<img
				src="/avatar.webp"
				alt="Avatar"
				class="avatar smooth-trans-8 aspect-square w-[40vw] max-w-[300px] rounded-full object-cover shadow-lg sm:w-[70vw] sm:max-w-[23vw] md:w-[35vw] lg:w-[70vw]"
			/>
		</div>
	</div>
</section>
