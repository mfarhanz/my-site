<script lang="ts">
	import { clickOutside } from '$lib/utils/helpers';
	import { darkMode } from '$lib/stores/theme';
	import { toggleTheme } from '$lib/utils/theme-toggle';
	import { Sun, Moon, Menu, X } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { derived } from 'svelte/store';

	let menuOpen = false;
	const isHome = derived(page, ($page) => $page.url.pathname === '/');

	const navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'Notes', href: '/notes' },
		{ name: 'Contact', href: '/contact' }
	];
</script>

<nav
	class="smooth-trans-8 sticky top-0 z-50 flex w-full items-center justify-between bg-light-background-trans px-[12vw] py-[1.5vh] backdrop-blur dark:bg-dark-background-trans md:py-[1vh] lg:py-[2.2vh]"
>
	<div class="flex items-center gap-3">
		<img
			src="https://avatars.githubusercontent.com/u/51290906?v=4"
			alt="Farhan"
			class="smooth-trans-8 h-[36px] w-[36px] rounded-full object-cover shadow-md md:h-[42px] md:w-[42px]"
			style:--tag="github-avatar"
			class:hidden={$isHome}
		/>

		<a
			href="/"
			class="subtitle-sizing-1 site-title-font smooth-trans-8 glow-title pr-4 font-bold text-light-primary dark:text-dark-primary"
		>
			Farhan Zia
		</a>
	</div>

	<div class="flex items-center gap-[2vw]">
		<!-- Desktop Nav -->
		<ul
			class="button-text-sizing hidden flex-row gap-[1vw] text-light-text dark:text-dark-text sm:flex sm:items-center"
		>
			{#each navLinks as link}
				<li class="flex w-full sm:w-auto">
					<a
						href={link.href}
						class="nav-link button-text-font cutout-tilt smooth-trans-3"
						class:active={$page.url.pathname === link.href}
						on:click|preventDefault={() => goto(link.href)}
					>
						{link.name}
					</a>
				</li>
			{/each}
		</ul>

		<!-- Buttons (theme + menu) -->
		<div class="flex items-center gap-3">
			<button
				on:click={toggleTheme}
				class="smooth-trans-2 hover:tilt-zoom-1 p-2"
				aria-label="Toggle theme"
			>
				{#if $darkMode}
					<Moon class="icon-sizing-2 text-dark-text" />
				{:else}
					<Sun class="icon-sizing-2 text-light-text" />
				{/if}
			</button>

			<button
				id="menu-toggle"
				class="icon-button smooth-trans-2 rounded-md sm:hidden"
				on:click={() => (menuOpen = !menuOpen)}
				aria-label="Toggle navigation menu"
			>
				{#if menuOpen}
					<X class="icon-sizing-2" />
				{:else}
					<Menu class="icon-sizing-2" />
				{/if}
			</button>
		</div>
	</div>
</nav>

<!-- Mobile Drawer -->
<div
	use:clickOutside
	on:click_outside={() => (menuOpen = false)}
	class={`smooth-trans-3 fixed right-0 top-0 z-40 flex h-full bg-light-drawer backdrop-blur-sm dark:bg-dark-drawer sm:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
>
	<div
		class="button-text-sizing mt-20 flex flex-col items-end gap-4 p-8 text-light-text dark:text-dark-text"
	>
		{#each navLinks as link}
			<a
				href={link.href}
				class="nav-link button-text-font smooth-trans-2 tilt-zoom-0 w-full text-center"
				class:active={$page.url.pathname === link.href}
				on:click|preventDefault={() => goto(link.href)}
			>
				{link.name}
			</a>
		{/each}
	</div>
</div>

<style>
	.glow-title {
		text-shadow:
			0 0 2px currentColor,
			0 0 5px color-mix(in srgb, currentColor 30%, transparent);
	}
</style>
