/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        heading: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['Lato', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#4A5568',
        secondary: '#718096',
        accent: '#3182ce',
        background: '#f7fafc',
        foreground: '#2d3748',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.foreground'),
            a: {
              color: theme('colors.accent'),
              '&:hover': { color: theme('colors.accent', '#2b6cb0') },
            },
            h1: { color: theme('colors.primary'), fontWeight: '700' },
            h2: { color: theme('colors.primary'), fontWeight: '600' },
            h3: { color: theme('colors.primary'), fontWeight: '500' },
            blockquote: {
              borderLeftColor: theme('colors.accent'),
              color: theme('colors.secondary'),
              fontStyle: 'italic',
            },
            'ul > li::before': { backgroundColor: theme('colors.accent') },
            code: {
              backgroundColor: theme('colors.background'),
              color: theme('colors.secondary'),
              borderRadius: '0.25rem',
              padding: '0.25rem',
            },
            pre: {
              backgroundColor: theme('colors.foreground'),
              color: theme('colors.background'),
              borderRadius: '0.5rem',
              padding: '1rem',
            },
            table: {
              width: '100%',
              marginTop: '1rem',
              marginBottom: '1rem',
              textAlign: 'left',
              borderCollapse: 'collapse',
            },
            thead: {
              borderBottom: '2px solid ' + theme('colors.secondary'),
              backgroundColor: theme('colors.background'),
            },
            th: {
              padding: '0.75rem',
              fontWeight: '600',
              color: theme('colors.foreground'),
            },
            td: {
              padding: '0.75rem',
              borderTop: '1px solid ' + theme('colors.secondary'),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
