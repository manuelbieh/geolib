import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        include: ['src/**/*.test.{js,ts}'],
        // All functions are pure, so test files can safely share workers
        isolate: false,
    },
});
