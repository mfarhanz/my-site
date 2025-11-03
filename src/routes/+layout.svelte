<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	// import { cubicIn, cubicOut } from 'svelte/easing';

	let { children, data } = $props();
	let pathname = $derived(data.pathname);

	// const duration = 200;
	// const delay = duration + 100;
	// const opacity = 0.2;
	// const amount = 15;
	// const easingIn = cubicIn;
	// const easingOut = cubicOut;
	// const transition = {
	// 	in: { delay: delay, duration: duration, easing: easingOut, amount: amount, opacity: opacity },
	// 	out: { duration: duration, easing: easingIn, amount: amount, opacity: opacity }
	// };

	import { prepareViewTransition } from '$lib/utils/helpers';
	prepareViewTransition();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
</svelte:head>

<div
	class="smooth-trans-8 min-h-fit min-w-fit overflow-clip bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text"
>
	<Navbar />
	{#key pathname}
		<main style="view-transition-name: main" class="smooth-trans-8 min-h-screen">
			{@render children?.()}
		</main>
	{/key}
	<Footer />
</div>
