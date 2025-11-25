import { dev } from '$app/environment';

interface Site {
	name: string;
	url: string;
	description: string;
	tags: string[];
	seo: {
		author: string;
        worksFor?: {
            name: string | null;
            url: string | null;
        };
		location: {
			city: string;
			region: string;
			country: string;
		};
	};
	out: {
		github: string;
		linkedin: string;
	};
}

const Site: Site = {
	name: 'Farhan Zia',
	url: dev ? 'http://localhost:5173' : 'https://mfarhanz.pages.dev',
	description: 'Farhan Zia - personal portfolio website. Projects, experiments, and web dev experiments.',
	tags: [
		'Farhan Zia',
		'Portfolio',
		'Web Development',
		'SvelteKit',
		'TailwindCSS',
		'JavaScript',
		'Front-end Developer'
	],
	seo: {
		author: 'Farhan Zia',
        worksFor: {
			name: null,
			url: null
		},
		location: {
			city: 'Toronto',
			region: 'Ontario',
			country: 'Canada'
		}
	},
	out: {
		github: 'https://github.com/mfarhanz',
		linkedin: 'https://www.linkedin.com/in/mfarhanz/',
	}
};

export default Site;
