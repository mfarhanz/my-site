import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const getInitialTheme = () => {
	if (!browser) return false;
	const saved = localStorage.getItem('theme');
	if (saved) return saved === 'dark';
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const darkMode = writable(getInitialTheme());

darkMode.subscribe((value) => {
	if (!browser) return;
	const root = document.documentElement;
	if (value) {
		root.classList.add('dark');
		localStorage.setItem('theme', 'dark');
	} else {
		root.classList.remove('dark');
		localStorage.setItem('theme', 'light');
	}
});
