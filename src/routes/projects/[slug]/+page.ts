import { loadContentBySlug } from '$lib/utils/content';
import type { Project } from '$lib/types/project';

export async function load({ params, parent }) {
    const { projects } = await parent();
    const project: Project | undefined = (projects as Project[])?.find(p => p.slug === params.slug);
    return loadContentBySlug('projects', params.slug, { 
        image: project?.image, 
        slug: params.slug 
    });
}
