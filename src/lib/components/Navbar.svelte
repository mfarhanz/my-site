<script lang="ts">
	import { clickOutside } from '$lib/utils/helpers';
	import { backgroundEffectEnabled } from '$lib/stores/background-effect';
	import { darkMode } from '$lib/stores/theme';
	import { toggleTheme } from '$lib/utils/theme-toggle';
	import { Sun, Moon, Menu, X, Monitor, MonitorPlay } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { derived } from 'svelte/store';
	import { toast } from 'svelte-sonner';

	let menuOpen = false;
	const isHome = derived(page, ($page) => $page.url.pathname === '/');

	const navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'Notes', href: '/notes' },
		{ name: 'Contact', href: '/contact' }
	];

	function toggleBackgroundEffect() {
        backgroundEffectEnabled.update(v => !v);
		if ($backgroundEffectEnabled) toast('Background effects are ON');
		else toast('Background effects are OFF');
    }
</script>

<nav
	style:--tag="navbar"
	class="sticky top-0 z-50 flex w-full px-[12vw] py-[1.5vh] md:py-[1vh] lg:py-[2.2vh] items-center justify-between backdrop-blur bg-light-background-trans dark:bg-dark-background-trans smooth-trans-8"
>
	<div class="flex items-center gap-[1vw]">
		<img
			src="/ghavatar.webp"
			alt="Farhan"
			class="h-[28px] md:h-[33px] lg:h-[4.9vh] w-[28px] md:w-[33px] lg:w-[2.8vw] rounded-full object-cover shadow-md smooth-trans-8"
			style:--tag="profile-avatar"
			class:hidden={$isHome}
		/>

		<a
			href="/"
			style:--tag="site-title"
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

		<!-- Buttons (theme + effects + menu) -->
		<div class="flex items-center gap-3 text-light-text dark:text-dark-text">
			<button
				on:click={toggleBackgroundEffect}
				class="hidden sm:inline-flex smooth-trans-2 hover:tilt-zoom-1 p-2"
				aria-label="Toggle background effect"
				title="Toggle background effects"
			>
				{#if $backgroundEffectEnabled}
					<MonitorPlay class="icon-sizing-2" />
				{:else}
					<Monitor class="icon-sizing-2" />
				{/if}
			</button>

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
				class="smooth-trans-2 icon-button rounded-md sm:hidden"
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
	class={`sm:hidden smooth-trans-3 fixed right-0 top-0 z-40 flex h-full bg-light-drawer backdrop-blur-sm dark:bg-dark-drawer ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
>
	<div
		class="button-text-sizing mt-20 flex flex-col items-end gap-4 p-8 text-light-text dark:text-dark-text"
	>
		{#each navLinks as link}
			<a
				href={link.href}
				class="nav-link button-text-font smooth-trans-2 tilt-zoom-0 w-full text-center"
				class:active={$page.url.pathname === link.href}
				on:click|preventDefault={() => {
                    menuOpen = false;
                    goto(link.href);
                }}
			>
				{link.name}
			</a>
		{/each}
		
		<!-- Divider -->
		<div class="w-full my-3 h-[0.2vh] bg-light-highlighted dark:bg-dark-highlighted tilt-zoom-0 smooth-trans-2"></div>

		<button
			on:click={toggleBackgroundEffect}
			class="nav-link button-text-font smooth-trans-2 tilt-zoom-0 w-full text-center"
			class:active={$backgroundEffectEnabled}
		>Effects</button>
	</div>
</div>

<style>
	.glow-title {
		text-shadow:
			0 0 2px currentColor,
			0 0 5px color-mix(in srgb, currentColor 30%, transparent);
	}
</style>
