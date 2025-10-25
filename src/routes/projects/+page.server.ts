import type { Project } from '$lib/types/project'

export async function load({ fetch }) {
	const response = await fetch('/api/projects')
	const projects: Project[] = await response.json()
	return { projects }
}
