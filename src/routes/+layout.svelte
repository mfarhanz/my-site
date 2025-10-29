<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { blur, fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';

	import { beforeNavigate } from '$app/navigation';

	let { children, data } = $props();
	let pathname = $derived(data.pathname);

	let previousPath = $state<string | null>(null);
	beforeNavigate((nav) => {
		previousPath = nav.from?.url?.pathname ?? null;
	});

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

	const isProjectDetail = (path: string) => /^\/projects\/[^/]+$/.test(path);

	function shouldSkipTransition(current: string, previous: string | null) {
		if (!previous) return false;
		let res =
			(current === '/projects' && isProjectDetail(previous)) ||
			(isProjectDetail(current) && previous === '/projects');
		console.log(current, previous, res);
		return res;
	}
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
</svelte:head>

<div
	class="smooth-trans-8 min-h-fit min-w-fit overflow-clip bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text"
>
	<Navbar />
	{#if shouldSkipTransition(pathname, previousPath)}
		{#key pathname}
			<main class="smooth-trans-8 min-h-screen">
				{@render children?.()}
			</main>
		{/key}
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
