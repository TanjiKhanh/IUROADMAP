import { defineConfig } from 'orval';

export default defineConfig({
  iuroadmapApi: {
    input: {
      target: '../../services/api-gateway/swagger-spec.json',
    },
    output: {
      mode: 'tags-split',
      target: 'src/generated/endpoints/api.ts',
      schemas: 'src/generated/models',
      client: 'react-query',
      mock: false,
    },
  },
  iuroadmapZod: {
    input: {
      target: '../../services/api-gateway/swagger-spec.json',
    },
    output: {
      mode: 'tags-split',
      target: 'src/generated/zod/zod.ts',
      client: 'zod',
      fileExtension: '.zod.ts',
    },
  },
});
