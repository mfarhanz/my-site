import { loadContentBySlug } from '$lib/utils/content';
import type { Note } from '$lib/types/note';

export async function load({ params, parent }) {
    const { notes } = await parent();
    const note: Note | undefined = (notes as Note[])?.find(p => p.slug === params.slug);
    return loadContentBySlug('notes', params.slug, { 
        image: note?.image, 
        slug: params.slug 
    });
}