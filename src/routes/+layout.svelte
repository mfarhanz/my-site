<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
    import FloatingWords from '$lib/components/FloatingWords.svelte';
    import { Toaster } from "$lib/components/ui/sonner";
    import { backgroundEffectEnabled } from '$lib/stores/background-effect';
	import { prepareViewTransition } from '$lib/utils/helpers';
    import Site from '$lib/config/common';
    import { page } from '$app/stores';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
    import { onMount } from 'svelte';
    

	let { children, data } = $props();
	let pathname = $derived(data.pathname);
    let title = $derived([Site.name, ...$page.url.pathname.split('/').slice(1)].filter(Boolean).join(' - '));
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
	<link rel="icon" href="/favicon.png" />
    <title>{title}</title>
    <meta name="description" content={Site.description} />

    <!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={Site.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={Site.url + $page.url.pathname} />
	<meta property="og:image" content={`${Site.url}/og-image.png`} />
	<meta property="og:site_name" content={Site.name} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={Site.description} />
	<meta name="twitter:image" content={`${Site.url}/og-image.png`} />

	<!-- Misc SEO -->
	<meta name="author" content={Site.seo.author} />
	<meta name="keywords" content={Site.tags.join(', ')} />
	<meta name="robots" content="index, follow" />
	<meta name="geo.region" content={Site.seo.location.region} />
	<meta name="geo.placename" content={Site.seo.location.city} />
	<link rel="canonical" href={Site.url + $page.url.pathname} />

    <!-- JSON-LD Person Schema -->
	{@html `<script type="application/ld+json">
		${JSON.stringify({
			'@context': 'https://schema.org',
			'@type': ['Person', 'ProfilePage'],
			name: Site.seo.author,
			url: Site.url,
			description: Site.description,
			worksFor: {
				'@type': 'Organization',
				name: Site.seo.worksFor?.name,
				url: Site.seo.worksFor?.url
			},
			address: {
				'@type': 'PostalAddress',
				addressLocality: Site.seo.location.city,
				addressRegion: Site.seo.location.region,
				addressCountry: 'CA'
			},
			sameAs: Object.values(Site.out),
			mainEntity: { '@type': 'Person', name: Site.seo.author },
			identifier: Site.url
		})}
	</script>`} 
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
