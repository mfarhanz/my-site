export interface Project {
	title: string
	slug: string
	description?: string
	date?: string
	repo?: string
	tags?: string[]
	published?: boolean
	links?: {
		text: string
		url: string
	}[]
    image?: string
}
