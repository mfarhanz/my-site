import type { SvelteComponentTyped } from 'svelte'

export interface MarkdownModule<T = Record<string, unknown>> {
	default: typeof SvelteComponentTyped
	metadata?: T
}
