import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        include: ['**/*.test.ts', '**/*.test.tsx'],
        // Exclude worktrees from test runs - they have their own test configs
        exclude: ['**/node_modules/**', '**/marga1/**'],
        // Use an absolute path so Vitest resolves the setup file correctly regardless of cwd
        setupFiles: [path.resolve(__dirname, 'vitest.setup.ts')],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './'),
        },
    },
});
