import { darkMode } from '$lib/stores/theme';

export function toggleTheme() {
	darkMode.update((v) => !v);
}
