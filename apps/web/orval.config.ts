import { defineConfig } from 'orval';

export default defineConfig({
  iuroadmap: {
    input: {
      target: '../../services/api-gateway/swagger-spec.json',
    },
    output: {
      mode: 'tags-split',
      target: 'src/generated/api.ts',
      schemas: 'src/generated/model',
      client: 'react-query',
      mock: false,
    },
  },
});
