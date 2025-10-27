import { error } from '@sveltejs/kit';
import { mergeObjects } from '$lib/utils/helpers'
import type { MarkdownModule } from '$lib/types/module';

const projectModules = import.meta.glob<MarkdownModule<Record<string, unknown>>>('/src/content/projects/*.md', { eager: true })
const noteModules = import.meta.glob<MarkdownModule<Record<string, unknown>>>('/src/content/notes/*.md', { eager: true })

export async function loadContentBySlug<T extends unknown[]>(
	folder: 'projects' | 'notes',
	slug: string,
	...kwargs: T
) {
	try {
		const modules = folder === 'projects' ? projectModules : noteModules
		const key = Object.keys(modules).find((path) => path.includes(`${slug}.md`))

		if (!key) throw new Error(`No content found for slug: ${slug}`)

		const content = modules[key]!
		return {
			content: content.default,
			meta: mergeObjects(content.metadata ?? {}, ...kwargs)
		}
	} catch (e) {
		error(404, `Failed to load ${folder}/${slug}: ${e}`)
	}
}
