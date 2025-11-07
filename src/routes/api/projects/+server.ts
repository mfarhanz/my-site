import fs from 'fs'
import matter from 'gray-matter'
import { json } from '@sveltejs/kit'
import type { Project } from '$lib/types/project'
import type { MarkdownModule } from '$lib/types/module'

let cached: Project[] | null = null;

async function getAllContent() {
    const paths = import.meta.glob<MarkdownModule<Omit<Project, 'slug'>>>('../../../content/projects/*.md', { eager: true })
    const entries: Project[] = []

    const banners = import.meta.glob('/src/lib/assets/projects/*.{png,jpg,jpeg,bmp,gif,webm}', {
        eager: true,
        import: 'default'
    }) as Record<string, string>

    for (const path in paths) {
        const file = paths[path]
        const slug = path.split('/').at(-1)?.replace('.md', '')

        let metadata: Omit<Project, 'slug'> | undefined

        if (file.metadata) {
            metadata = file.metadata
        } else if (slug) {
            const absPath = `src/content/projects/${slug}.md`
            const content = fs.readFileSync(absPath, 'utf-8')
            metadata = matter(content).data as Omit<Project, 'slug'>
        }
        
        if (metadata?.published && slug) {
            const match = Object.entries(banners).find(([path]) =>
                path.includes(`${slug}.`)
            )
            const image = match ? match[1] : undefined
            entries.push({ ...metadata, slug, image })
        }
    }

    entries.sort(
        (a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
    )

    return entries;
}

export async function GET() {
    if (!cached) cached = await getAllContent();
    return json(cached);
}
