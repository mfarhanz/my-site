import { loadContentBySlug } from '$lib/utils/content';
import { notesStore } from '$lib/stores/notes';
import type { Note } from '$lib/types/note';
import { get } from 'svelte/store';

export async function load({ params }) {
    const content = get(notesStore);
    const note: Note | undefined = content?.find(p => p.slug === params.slug);
    return loadContentBySlug('notes', params.slug, { image: note?.image });
}
