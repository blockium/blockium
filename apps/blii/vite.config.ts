/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

const manualChunks = (id: string) => {
  // console.log(id);

  if (id.includes('node_modules')) {
    return id.toString().split('node_modules/')[1].split('/')[0].toString();
  }

  if (id.includes('libs')) {
    return 'app-lib';
  }

  if (id.includes('src')) {
    return 'app';
  }

  // VERY IMPORTANT: Theorically, there is nothing more to return.
  // However, without this, it will unlikely return errors like:
  // - "Uncaught TypeError: 'X' is not a function" or
  // - "Uncaught ReferenceError: Cannot access 'W' before initialization"
  return 'vendor';
};

export default defineConfig({
  cacheDir: '../../node_modules/.vite/blii',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  esbuild: {
    minifyIdentifiers: true,
  },

  build: {
    target: 'es2017',
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },

  test: {
    globals: true,
    cache: { dir: '../../node_modules/.vitest' },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
