/**
 * PostCSS Configuration
 *
 * Tailwind CSS v4 runs as a PostCSS plugin under Next.js (there's no
 * bundler-native plugin like @tailwindcss/vite for webpack/Turbopack).
 */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
