import { writable } from 'svelte/store'
import type { Project } from '$lib/types/project'

export const projectsStore = writable<Project[] | null>(null)
