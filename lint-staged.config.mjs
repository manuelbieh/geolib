export default {
    'src/*.{js,ts}': [
        'prettier --write',
        'eslint --fix',
        'vitest related --run --passWithNoTests',
    ],
    // tsc ignores tsconfig.json when it gets file names, so the whole
    // project is checked instead
    'src/*.ts': () => 'tsc --noEmit',
};
