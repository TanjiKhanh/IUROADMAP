import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: './placeholder.yaml', // Replace with your actual swagger URL
    output: {
      mode: 'tags-split',
      target: 'src/generated',
      schemas: 'src/generated/models',
      client: 'react-query',
      override: {
        mutator: {
          path: 'src/client/custom-instance.ts',
          name: 'customInstance',
        },
        zod: {
          generate: true,
        },
      },
    },
  },
});
