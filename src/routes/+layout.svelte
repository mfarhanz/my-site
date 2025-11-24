<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
    import FloatingWords from '$lib/components/FloatingWords.svelte';
    import { Toaster } from "$lib/components/ui/sonner";
    import { backgroundEffectEnabled } from '$lib/stores/background-effect';
	import { prepareViewTransition } from '$lib/utils/helpers';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
    import { onMount } from 'svelte';

	let { children, data } = $props();
	let pathname = $derived(data.pathname);
	let htmlElement: HTMLElement | null;
	
	prepareViewTransition();

    onMount(() => {
        if (typeof window !== 'undefined') {
            htmlElement = document.documentElement;
            // ensure initial load is at the top instantly (no auto smooth scroll)
            // window.scrollTo(0, 0);   // dont need this i think
        }
    });

    beforeNavigate(({ type }) => {
        if (typeof window === 'undefined' || !htmlElement) return;
        // if navigating via back/forward, temporarily disable any CSS smooth scroll
        if (type === 'popstate') {
            htmlElement.style.scrollBehavior = 'auto';
        }
    });

    afterNavigate(({ type }) => {
        if (typeof window === 'undefined' || !htmlElement) return;
        // if we are coming from a link click, instantly scroll to the top (0,0)
        if (type !== 'popstate') {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant' 
            });
        }
        // restore the default scroll-behavior after the transition/scroll is complete
        htmlElement.style.scrollBehavior = ''; // resets to default/CSS-defined value
    });
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
    <title>Farhan Zia</title>
</svelte:head>

<div
	class="smooth-trans-6 min-h-fit min-w-fit overflow-clip text-light-text bg-light-background dark:bg-dark-background dark:text-dark-text"
>
    <FloatingWords enabled={$backgroundEffectEnabled} />
	<Navbar />
    <Toaster
        toastOptions={{
            unstyled: true,
            class: "snackbar text-sizing-0 subtitle-font smooth-trans-3"
          }}
    />
	{#key pathname}
		<main style="view-transition-name: main" class="main smooth-trans-6">
			{@render children?.()}
		</main>
	{/key}
	<Footer />
</div>
