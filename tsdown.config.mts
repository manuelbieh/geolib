import { defineConfig } from 'tsdown';

const shared = {
    entry: { index: 'src/index.ts' },
    target: 'es2020',
} as const;

export default defineConfig([
    {
        ...shared,
        // ESM for bundlers and modern Node.js, CommonJS for require()
        format: ['esm', 'cjs'],
        platform: 'neutral',
        fixedExtension: true,
        dts: true,
        publint: true,
        attw: { profile: 'strict', level: 'error' },
    },
    {
        ...shared,
        // Minified build for <script> tags. Exposes `window.geolib`.
        entry: { geolib: 'src/index.ts' },
        format: 'iife',
        globalName: 'geolib',
        platform: 'browser',
        minify: true,
        clean: false,
        dts: false,
    },
]);
