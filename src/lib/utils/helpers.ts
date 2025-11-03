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

