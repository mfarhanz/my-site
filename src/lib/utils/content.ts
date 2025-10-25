import { error } from '@sveltejs/kit';
import { mergeObjects } from '$lib/utils/helpers'

export async function loadContentBySlug<T extends unknown[]>(folder: 'projects' | 'notes', slug: string, ...kwargs: T) {
    try {
        const content = await import(`/src/content/${folder}/${slug}.md`);
        return {
            content: content.default,
            meta: mergeObjects(content.metadata, ...kwargs)
        };
    } catch (e) {
        error(404, `Failed to load ${folder}/${slug}: ${e}`);
    }
}
