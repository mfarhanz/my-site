import { writable } from 'svelte/store';
import type { Note } from '$lib/types/note';

export const notesStore = writable<Note[] | null>(null);
