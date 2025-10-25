// import type { Project } from '$lib/types/project'

// export interface MarkdownModule {
// 	default: unknown
// 	metadata?: Omit<Project, 'slug'>
// }


import type { SvelteComponentTyped } from 'svelte'

export interface MarkdownModule<T = Record<string, unknown>> {
	default: typeof SvelteComponentTyped
	metadata?: T
}
