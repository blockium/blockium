/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dts from 'vite-plugin-dts';
import { join } from 'path';
// import { externalizeDeps } from 'vite-plugin-externalize-deps';
import getSrcInputs from '../vite.config.utils';
// @ts-expect-error: untyped.
import postprocess from '@stadtlandnetz/rollup-plugin-postprocess';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/i18n',

  plugins: [
    react(),
    nxViteTsPaths(),
    dts({
      entryRoot: 'src',
      tsconfigPath: join(__dirname, 'tsconfig.lib.json'),
    }),

    // Remove external dependencies from the bundle.
    // externalizeDeps(),

    // Remove import for external dependencies at the index files only.
    // In the postprocess pluging, the index.ts files start with "export...",
    // followed by the imports of external libs which can be dropped.
    postprocess((param: { code: string; sourceMap: string; format: string }) =>
      param.code.startsWith('export') ? [[/import [^;]*/, '']] : [],
    ),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  esbuild: {
    minifyIdentifiers: false,
  },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: '../../dist/libs/i18n',
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    target: 'es2017',
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'i18n',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ['es'],
    },
    rollupOptions: {
      // This will split code into different files, for tree shaking.
      input: getSrcInputs(__dirname),
      output: {
        // This will split code into different files, for tree shaking.
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
      // External packages that should not be bundled into your library.
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'i18next',
        'i18next-browser-languagedetector',
        'i18next-http-backend',
        'react-i18next',
      ],
    },
  },

  test: {
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/libs/i18n',
      provider: 'v8',
    },
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: './vitest.config.ts',
  },
});
