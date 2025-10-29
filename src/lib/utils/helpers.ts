/* eslint-disable svelte/no-navigation-without-resolve */
import { goto } from '$app/navigation';

export function randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function makeBlankImage(fixedW = -1, fixedH = -1, minW = 240, maxW = 480, minH = 140, maxH = 320) {
    const w = fixedW < 0 ? Math.floor(Math.random() * (maxW - minW + 1)) + minW : fixedW;
    const h = fixedH < 0 ? Math.floor(Math.random() * (maxH - minH + 1)) + minH : fixedH;
    const color = `hsl(${Math.floor(Math.random() * 360)}, 20%, 85%)`;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="100%" height="100%" fill="${color}" rx="12" ry="12" />
  </svg>`;

    return {
        src: "data:image/svg+xml;base64," + btoa(svg),
        width: w,
        height: h
    };
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

export function runViewTransition(to: string) {
    if (document.startViewTransition) {
        document.startViewTransition(() => goto(to));
    } else {
        goto(to);
    }
}

import { onNavigate } from '$app/navigation';
export const preparePageTransition = () => {
	onNavigate(async (navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
};
