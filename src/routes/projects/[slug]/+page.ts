import { loadContentBySlug } from '$lib/utils/content';
import { projectsStore } from '$lib/stores/projects';
import type { Project } from '$lib/types/project';
import { get } from 'svelte/store';

export async function load({ params }) {
    const content = get(projectsStore);
    const project: Project | undefined = content?.find(p => p.slug === params.slug);
    return loadContentBySlug('projects', params.slug, { image: project?.image, slug: params.slug });
}
