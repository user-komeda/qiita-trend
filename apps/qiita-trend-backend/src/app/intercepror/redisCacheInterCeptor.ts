import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, from, of, switchMap, tap } from 'rxjs'

import { RedisStore } from '@/app/redisStore'

const DEFAULT_PUBLIC_CACHE_TTL_SECONDS = 60 * 60 * 24

@Injectable()
export class RedisCacheInterceptor implements NestInterceptor {
  constructor(private readonly redisStore: RedisStore) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{
      method: string
      url: string
    }>()

    if (!this.shouldCache(request.method, request.url)) {
      return next.handle()
    }

    const cacheKey = this.buildCacheKey(request.url)

    return from(this.redisStore.get(cacheKey)).pipe(
      switchMap((cachedValue) => {
        if (cachedValue) {
          return of(JSON.parse(cachedValue))
        }

        return next.handle().pipe(
          tap((responseBody) => {
            void this.redisStore.set(cacheKey, JSON.stringify(responseBody), {
              EX: DEFAULT_PUBLIC_CACHE_TTL_SECONDS,
            })
          }),
        )
      }),
    )
  }

  private shouldCache(method: string, url: string): boolean {
    if (method !== 'GET') {
      return false
    }
    return !url.startsWith('/login')
  }

  private buildCacheKey(url: string): string {
    return `public-response-cache:${url}`
  }
}
