import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        academic: {
          primary: '#2563eb',
          soft: '#dbeafe',
          canvas: '#fafaf9'
        }
      }
    }
  },
  plugins: []
} satisfies Config;
