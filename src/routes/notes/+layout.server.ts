import type { Note } from '$lib/types/note'

export async function load({ fetch }) {
    const response = await fetch('/api/notes')
    const notes: Note[] = await response.json()
    return { notes }
}
