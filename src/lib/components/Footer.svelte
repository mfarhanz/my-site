<script lang="ts">
	import { Github, Linkedin, Mail } from 'lucide-svelte';
</script>

<footer class="w-full grid grid-cols-[1fr_auto_1fr] items-center py-[2vh] z-5 alt-text-sizing backdrop-blur-sm text-light-text-muted dark:text-dark-text-muted bg-light-background-trans dark:bg-dark-background-trans smooth-trans-8">
	<div></div>
	<p class="text-center">© {new Date().getFullYear()} Farhan Zia</p>
	<div class="flex justify-end px-[12vw]">
		<div class="flex items-center gap-[2vw] sm:gap-[1vw] md:gap-[1.4vw] lg:gap-[0.7vw]">
			<a 
				href="https://github.com/mfarhanz" 
				class="flex link-hover smooth-trans-2 hover:tilt-zoom-1"
				target="_blank" rel="noopener noreferrer"
				title="GitHub"
			>
				<Github class="icon-sizing-1" />
			</a>
			<a 
				href="https://www.linkedin.com/in/mfarhanz" 
				class="flex link-hover smooth-trans-2 hover:tilt-zoom-1"
				target="_blank" rel="noopener noreferrer"
				title="LinkedIn"
			>
				<Linkedin class="icon-sizing-1" />
			</a>
			<a 
				href="mailto:mfz.bin@gmail.com" 
				class="flex link-hover smooth-trans-2 hover:tilt-zoom-1"
				target="_blank" rel="noopener noreferrer"
				title="Mail"
			>
				<Mail class="icon-sizing-1" />
			</a>
		</div>
	</div>
</footer>
