// import { goto } from '$app/navigation';

export function randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function mergeObjects<T extends object>(merged: T, ...rest: unknown[]): T {
    for (const obj of rest) {
        if (obj && typeof obj === 'object') {
            Object.assign(merged, obj);
        }
    }
    return merged;
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
export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
    const dateToFormat = new Date(date.replaceAll('-', '/'))
    const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle })
    return dateFormatter.format(dateToFormat)
}

import { onNavigate } from '$app/navigation';
export const preparePageTransition = () => {
    onNavigate((navigation) => {
        // If the browser doesn't support View Transitions, just let the SvelteKit transition run
        if (!document.startViewTransition) return;
        
        const indexPath = '/projects';
        const fromPath = navigation.from?.url.pathname ?? '';
        const toPath = navigation.to?.url.pathname ?? '';
        const isIndex = (path: string) => path === indexPath || path === indexPath + '/';
        const issSlug = (path: string) => path.startsWith(indexPath + '/') && path.length > indexPath.length + 1;
        // Check for the specific cross-fade routes:
        const isIndexToSlug = isIndex(fromPath) && issSlug(toPath);
        const isSlugToIndex = issSlug(fromPath) && isIndex(toPath);        

        // only run the View Transition for these two routes
        if (isIndexToSlug || isSlugToIndex) {       
            return new Promise((resolve) => {
                document.startViewTransition(async () => {
                    resolve(); // Resolve the promise right before the content change
                    await navigation.complete; // Wait for SvelteKit to update the DOM
                });
            });
        }
    });
};
