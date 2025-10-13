/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ Still needed for class-based dark mode
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/@sveltejs/kit/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#ccb4f0ff',
          'background-trans': '#ddd0f088',
          'background-button': '#d1c2ec88',
          drawer: '#d1c2ec33',
          text: '#2c254d',
          'text-muted': '#6f6785',
          'text-highlighted': '#ffebbc',
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
      }


    },
  },
};
