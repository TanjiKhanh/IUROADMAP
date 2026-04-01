import { ExecutionContext } from '@nestjs/common';
export type CacheKeyFactory = (ctx: ExecutionContext) => string;
/**
 * Decorator that sets the caching key used to store/retrieve cached items for
 * Web sockets or Microservice based apps.
 *
 * For example:
 * `@CacheKey('events')`
 *
 * @param key string naming the field to be used as a cache key
 *
 * @see [Caching](https://docs.nestjs.com/techniques/caching)
 *
 * @publicApi
 */
export declare const CacheKey: (key: string | CacheKeyFactory) => import("@nestjs/common").CustomDecorator<string>;
