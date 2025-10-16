<script lang="ts">
  import { clickOutside } from '$lib/utils/helpers'
	import { darkMode } from '$lib/stores/theme';
	import { toggleTheme } from '$lib/utils/themeToggle';
    import { Sun, Moon, Menu, X} from 'lucide-svelte';
    import { page } from '$app/stores';

	const navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'Projects', href: '/projects' },
    { name: 'Notes', href: '/notes' },
		{ name: 'Contact', href: '/contact' }
	];

	let menuOpen = false;
</script>

<nav class="sticky w-full flex items-center justify-between top-0 z-50 px-[12vw] py-[1.5vh] md:py-[1vh] lg:py-[2.2vh] backdrop-blur bg-light-background-trans dark:bg-dark-background-trans smooth-trans-8">
  <a
    href="/"
    class="font-bold subtitle-sizing-1 site-title-font pr-4 text-light-primary dark:text-dark-primary smooth-trans-8"
  >
    Farhan Zia
  </a>

  <div class="flex items-center gap-[2vw]">
    <!-- Desktop Nav -->
    <ul
      class="hidden sm:flex flex-row sm:items-center button-text-sizing text-light-text dark:text-dark-text gap-[1vw]"
    >
      {#each navLinks as link}
        <li class="flex w-full sm:w-auto">
          <a
            href={link.href}
            class="nav-link button-text-font smooth-trans-2 hover:tilt-zoom-1"
            class:active={$page.url.pathname === link.href}
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
        class="p-2 smooth-trans-2 hover:tilt-zoom-1"
        aria-label="Toggle theme"
      >
        {#if $darkMode}
          <Moon class="text-dark-text icon-sizing-2" />
        {:else}
          <Sun class="text-light-text icon-sizing-2" />
        {/if}
      </button>

      <button
        id="menu-toggle"
        class="sm:hidden rounded-md icon-button smooth-trans-2"
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
  class={`sm:hidden flex fixed top-0 right-0 z-40 h-full backdrop-blur-sm bg-light-drawer dark:bg-dark-drawer smooth-trans-3 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
>
  <div class="flex flex-col items-end gap-4 p-8 mt-20 button-text-sizing text-light-text dark:text-dark-text">
    {#each navLinks as link}
      <a
        href={link.href}
        class="nav-link button-text-font w-full text-center smooth-trans-2 tilt-zoom-0"
        class:active={$page.url.pathname === link.href}
      >
        {link.name}
      </a>
    {/each}
  </div>
</div>