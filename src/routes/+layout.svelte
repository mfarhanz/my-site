<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	// import { darkMode } from '$lib/stores/theme';

	// ✅ Get slotted children correctly in Svelte 5
	let children;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-fit min-w-fit bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text smooth-trans-8">
	<Navbar />
	<main class="min-h-screen smooth-trans-8">
		<slot />
	</main>
	<Footer />
</div>

