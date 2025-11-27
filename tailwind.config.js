import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "./node_modules/@sveltejs/kit/**/*.{js,ts}",
    ],
    theme: {
        extend: {
            colors: {
                light: {
                    background: '#ebddff',
                    'background-trans': '#ddd0f088',
                    'background-button': '#c5afec88',
                    drawer: '#d1c2ec33',
                    text: '#2c254d',
                    'text-muted': '#6f6785',
                    'text-highlighted': '#5031ff',
                    primary: '#8b5cf6',
                    secondary: '#a68ef0',
                    accent: '#7c3aed',
                    highlighted: '#8b5cf675',
                    'scroll-thumb': '#a68ef0',
                    'scroll-track': '#ddd0f0',
                    'scroll-hover': '#936df2',
                    'glow-accent': '#7c3aed82',
                },

                dark: {
                    background: '#0e0820',
                    'background-trans': '#1a0f3366',
                    'background-button': '#2a1b4dcc',
                    drawer: '#2a1b4d66',
                    text: '#eae8ff',
                    'text-muted': '#a8a2c6',
                    'text-highlighted': '#aaf4ffdb',
                    primary: '#a78bfa',
                    secondary: '#8b5cf6',
                    accent: '#22d3ee',
                    highlighted: '#362b6b',
                    'scroll-thumb': '#8b5cf6',
                    'scroll-track': '#0e0820',
                    'scroll-hover': '#a78bfa',
                    'glow-accent': '#22d3eeff',
                },
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        "code::before": { content: '""' },  // remove backticks from parsed <code> elements
						"code::after": { content: '""' },
                        color: theme('colors.light.text'),
                        lineHeight: 1.8,
                        maxWidth: '100%',
                        a: {
                            color: theme('colors.light.accent'),
                            textDecoration: 'none',
                            '&:hover': { color: theme('colors.light.highlighted') }
                        },
                        li: {
                            lineHeight: 1.5,
                        },
                        h1: {
                            color: theme('colors.light.primary'),
                            fontWeight: '400',
                            marginBottom: '1em',
                        },
                        h2: {
                            color: theme('colors.light.primary'),
                            fontWeight: '400',
                            marginBottom: '0.6em',
                        },
                        h3: {
                            color: theme('colors.light.primary'),
                            fontWeight: '400',
                        },
                        strong: {
                            color: theme('colors.light.text'),
                            fontWeight: '750',
                        },
                    }
                },
                invert: {
                    css: {
                        color: theme('colors.dark.text'),
                        a: {
                            color: theme('colors.dark.accent'),
                            '&:hover': { color: theme('colors.dark.text-highlighted') }
                        },
                        h1: {
                            color: theme('colors.dark.primary'),
                        },
                        h2: {
                            color: theme('colors.dark.primary'),
                        },
                        h3: {
                            color: theme('colors.dark.primary'),
                        },
                        strong: {
                            color: theme('colors.dark.text'),
                        },
                    }
                }
            }),
            screens: {
                'portrait-lg': {'raw': '(min-height: 1080px) and (max-width: 1079px)'}  // large portrait screens
            }
        },
    },
    plugins: [typography],
};
