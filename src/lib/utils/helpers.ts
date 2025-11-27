export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomItem<T>(items: T[]): T | undefined {
    if (items.length === 0) return undefined;
    const index = randomBetween(0, items.length - 1);
    return items[index];
}

export function createShufflePicker<T>(items: T[]) {    // modification of shuffle bag/fisher yates algorithm
    let bag = [...items];      // working bag

    function pick(): T {
        if (bag.length === 0) {
            // reset once we've shown everything
            bag = [...items];
        }
        // pick a random element from the working copy
        const index = randomBetween(0, bag.length - 1);
        const item = bag[index];
        // remove it so it can't repeat until reset
        bag.splice(index, 1);
        return item;
    }

    return { pick };
}

export function addStringToSet(set: string[], value: string) {
    const val = value.trim();
    if (val && !set.map((t) => t.toLowerCase()).includes(val.toLowerCase())) {
        set.push(val);
    }
}

export function removeStringFromSet(set: string[], value: string) {
    const idx = set.findIndex((s) => s.toLowerCase() === value.toLowerCase());
    if (idx !== -1) set.splice(idx, 1);
}

export function mergeObjects<T extends object>(merged: T, ...rest: unknown[]): T {
    for (const obj of rest) {
        if (obj && typeof obj === 'object') {
            Object.assign(merged, obj);
        }
    }
    return merged;
}

import { goto } from '$app/navigation';
export function navigateTo(route?: string ) {
    if (!route) return;
    // eslint-disable-next-line svelte/no-navigation-without-resolve
    goto(route);
}

export function navigateBack() {
    history.back();
}

export function isTouchDevice(): boolean {
    return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
}

import { toast } from 'svelte-sonner';
export function debounce<T extends unknown[]>(fn: (...args: T) => void, delay = 300) {
    let inDebounce = false;
    let endsAt = 0;
    return (...args: T) => {
        const now = Date.now();
        if (inDebounce) {
            const remaining = Math.ceil((endsAt - now) / 1000);
            toast(`Please try again in ${remaining > 0 ? remaining : 0}s`);
            return;
        }

        inDebounce = true;
        endsAt = now + delay;
        fn(...args);
        setTimeout(() => {
            inDebounce = false;
        }, delay);
    };
}

export function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (
            node &&
            !node.contains(target) &&
            !target.closest('#menu-toggle') &&
            !event.defaultPrevented
        ) {
            node.dispatchEvent(new CustomEvent('click_outside'))
        }
    }

    document.addEventListener('click', handleClick, true)
    return {
        destroy() {
            document.removeEventListener('click', handleClick, true)
        }
    }
}

type DateStyle = Intl.DateTimeFormatOptions['dateStyle']
export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en', short = false) {
    const dateToFormat = new Date(date.replaceAll('-', '/'));
    if (short) {
		const formatter = new Intl.DateTimeFormat(locales, {
			month: 'short',
			year: 'numeric'
		});
		return formatter.format(dateToFormat);
	}
    const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
    return dateFormatter.format(dateToFormat);
}

import { onNavigate } from '$app/navigation';
export const prepareViewTransition = () => {
    onNavigate((navigation) => {
        if (!document.startViewTransition) return;

        if (navigation.to?.url.pathname === navigation.from?.url.pathname) return;

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });
};

import { beforeNavigate, afterNavigate } from '$app/navigation';
import { onDestroy } from 'svelte';
export function setupNavigationHandler(
    fn: typeof beforeNavigate | typeof afterNavigate,
    check: (fromUrl?: string, toUrl?: string) => boolean,
    setter: (val: boolean) => void
) {
    // capture cleanup function from the listener
    const unsubscribe = (fn(({ from, to }) => {
        const fromUrl = from?.url?.pathname;
        const toUrl = to?.url?.pathname;
        setter(check(fromUrl, toUrl));
    }) as unknown) as (() => void) | undefined;

    onDestroy(() => {
        // remove listener on destroy
        unsubscribe?.();
    });

    return unsubscribe;
}

import { API_BASE } from '$lib/config/constants';
import type { Project } from '$lib/types/project';
export async function getLastUpdatedTimesForProjects(projects: Project[]) {
    const entries = await Promise.all(
        projects.map(async (proj) => {
            // default creation date if no GitHub link found
            let created_at: string | undefined = '1970-01-01T00:00:00Z';
            // find the link object with text === 'Github'
            const repoLink = proj.links?.find((link) => link.text.toLowerCase() === 'github');
            if (repoLink?.url) {
                const match = repoLink.url.match(/github\.com\/[^/]+\/([^/]+)/i);
                const repoName = match ? match[1] : null;
                if (repoName) {
                    try {
                        const controller = new AbortController();
                        const timeout = setTimeout(() => controller.abort(), 10000);
                        const res = await fetch(`${API_BASE}/github/repo?name=${repoName}`, {
                            signal: controller.signal
                        });

                        clearTimeout(timeout);

                        if (res.ok) {
                            const data = await res.json();
                            created_at = data.created_at ?? created_at;
                        } else {
                            console.error(`Failed for ${proj.title}:`, res.status, res.statusText);
                        }
                    } catch (err) {
                        console.error(`Error fetching ${proj.title}:`, err);
                    }
                }
            }

            return { slug: proj.slug, created_at };
        })
    );

    return entries;
}

import type { ContentItem } from '$lib/types/content';
export function filterObjectsByTags(items: ContentItem[], tags: string[]): ContentItem[] {
    if (tags.length === 0) return items;

    const lowerTags = tags.map(tag => tag.toLowerCase());
    return items.filter(item => {
        const itemTagsLower = item.tags?.map(tag => tag.toLowerCase()) ?? [];
        return lowerTags.every(filterTag =>
            itemTagsLower.some(itemTag =>
                itemTag.includes(filterTag) || filterTag.includes(itemTag)
            )
        );
    });
}
