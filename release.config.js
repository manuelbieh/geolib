module.exports = {
    branches: ['master'],
    // Only verify GitHub and git — skip npm verify since OIDC token
    // is only available during publish, not during whoami checks
    verifyConditions: ['@semantic-release/github', '@semantic-release/git'],
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'conventionalcommits',
                releaseRules: [
                    { breaking: true, release: 'major' },
                    { revert: true, release: 'patch' },
                    { type: 'feat', release: 'minor' },
                    { type: 'feature', release: 'minor' },
                    { type: 'fix', release: 'patch' },
                    { type: 'bugfix', release: 'patch' },
                    { type: 'hotfix', release: 'patch' },
                    { type: 'chore', release: 'patch' },
                    { type: 'perf', release: 'patch' },
                    { type: 'refactor', release: 'patch' },
                    { type: 'improvement', release: 'patch' },
                    { type: 'revert', release: 'patch' },
                    { type: 'style', release: 'patch' },
                    { type: 'docs', release: 'patch' },
                    { type: 'test', release: 'patch' },
                    { type: 'ci', release: false },
                    { type: 'build', release: false },
                    { type: 'release', release: false },
                    { scope: 'no-release', release: false },
                ],
            },
        ],
        [
            '@semantic-release/release-notes-generator',
            {
                preset: 'conventionalcommits',
                presetConfig: {
                    types: [
                        { type: 'feat', section: 'Features' },
                        { type: 'feature', section: 'Features' },
                        { type: 'fix', section: 'Fixes' },
                        { type: 'bugfix', section: 'Fixes' },
                        { type: 'hotfix', section: 'Fixes' },
                        { type: 'chore', section: 'Improvements' },
                        { type: 'perf', section: 'Improvements' },
                        { type: 'refactor', section: 'Improvements' },
                        { type: 'improvement', section: 'Improvements' },
                        { type: 'style', section: 'Improvements' },
                        { type: 'docs', section: 'Docs' },
                        { type: 'ci', section: 'Internals', hidden: true },
                        { type: 'build', section: 'Internals', hidden: true },
                        { type: 'release', section: 'Internals', hidden: true },
                    ],
                },
            },
        ],
        '@semantic-release/changelog',
        ['@semantic-release/npm', { npmPublish: true }],
        '@semantic-release/github',
        [
            '@semantic-release/git',
            {
                message:
                    'release: ${nextRelease.version} - <%= new Date().toISOString() %> [skip ci]\n\n<%= nextRelease.notes %>',
            },
        ],
    ],
};
