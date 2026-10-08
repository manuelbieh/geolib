import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        include: ['src/**/*.test.{js,ts}'],
        // All functions are pure, so test files can safely share workers
        isolate: false,
        // Type tests (*.test-d.ts) are checked with tsc
        typecheck: {
            enabled: true,
            include: ['src/**/*.test-d.ts'],
        },
    },
});
