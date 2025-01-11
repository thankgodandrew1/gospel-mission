import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

type Theme = {
  colors: {
    [key: string]: string;
  };
};

export default {
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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      typography: (theme: Theme) => ({
        DEFAULT: {
          css: {
            color: theme.colors.gray['700'],
            a: {
              color: theme.colors.blue['600'],
              '&:hover': { color: theme.colors.blue['800'] },
            },
            h1: { color: theme.colors.gray['900'], fontWeight: '700' },
            h2: { color: theme.colors.gray['900'], fontWeight: '600' },
            h3: { color: theme.colors.gray['900'], fontWeight: '500' },
            blockquote: {
              borderLeftColor: theme.colors.blue['500'],
              color: theme.colors.gray['900'],
              fontStyle: 'italic',
            },
            'ul > li::before': { backgroundColor: theme.colors.blue['500'] },
            code: {
              backgroundColor: theme.colors.gray['100'],
              color: theme.colors.red['600'],
              borderRadius: '0.25rem',
              padding: '0.25rem',
            },
            pre: {
              backgroundColor: theme.colors.gray['800'],
              color: theme.colors.white,
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
              borderBottom: '2px solid ' + theme.colors.gray['200'],
              backgroundColor: theme.colors.gray['100'],
            },
            th: {
              padding: '0.75rem',
              fontWeight: '600',
              color: theme.colors.gray['900'],
            },
            td: {
              padding: '0.75rem',
              borderTop: '1px solid ' + theme.colors.gray['200'],
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
} satisfies Config;
