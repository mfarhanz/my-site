<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { blur, fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';

	let { children, data } = $props();
	let pathname = $derived(data.pathname);

	const duration = 200;
	const delay = duration + 100;
	const offset = 10;
	const opacity = 0.2;
	const amount = 15;
	const easingIn = cubicIn;
	const easingOut = cubicOut;

	const transitions = {
		fly: {
			in: { delay: delay, duration: duration, easing: easingOut, y: -offset, opacity: opacity },
			out: { duration: duration, easing: easingIn, y: offset, opacity: opacity }
		},
		blur: {
			in: { delay: delay, duration: duration, easing: easingOut, amount: amount, opacity: opacity },
			out: { duration: duration, easing: easingIn, amount: amount, opacity: opacity }
		}
	};
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
</svelte:head>

<div
	class="smooth-trans-8 min-h-fit min-w-fit overflow-clip bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text"
>
	<Navbar />
	{#if /^\/projects\/[^/]+/.test(pathname)}
		<!-- No blur or keying for project page routes -->
		<main class="smooth-trans-8 min-h-screen">
			{@render children?.()}
		</main>
	{:else}
		{#key pathname}
			<main
				in:blur={transitions.blur.in}
				out:blur={transitions.blur.out}
				class="smooth-trans-8 min-h-screen"
			>
				{@render children?.()}
			</main>
		{/key}
	{/if}

	<Footer />
</div>
