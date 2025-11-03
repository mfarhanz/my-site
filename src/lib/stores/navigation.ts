// import { derived } from 'svelte/store';
// import { navigating } from '$app/stores';

// let timer: ReturnType<typeof setTimeout> | null = null;

// export const navigationIsDelayed = derived(navigating, ($navigating, set) => {
// 	// clear any previous timer when navigating changes
// 	if (timer) clearTimeout(timer);

// 	if ($navigating) {
// 		// wait before signaling "true"
// 		timer = setTimeout(() => set(true), 500);
// 	} else {
// 		// navigation finished — immediately hide
// 		set(false);
// 	}
// });


