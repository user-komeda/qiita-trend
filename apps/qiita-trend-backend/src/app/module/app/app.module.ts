/* eslint-disable max-lines */
import { Controller, Get, Module } from '@nestjs/common'
import { RouterModule, Routes } from '@nestjs/core'

import { SharedHttpModule } from '../util/sharedHttp.module'
import { AdminModule } from '@/admin/admin.module'
import { AuthModule } from '@/app/module/auth/auth.module'
import { CommentModule } from '@/public/comment/comment.module'
import { ItemsModule } from '@/public/items/items.module'
import { LoginModule } from '@/public/login/login.module'
import { PublicModule } from '@/public/public.module'
import { TagModule } from '@/public/tag/tag.module'
import { TagsItemModule } from '@/public/tags-item/tagsItens.module'

interface HealthResponse {
  status: 'ok'
}

/* v8 ignore start */
/**
 * HealthController
 */
@Controller('health')
class HealthController {
  /**
   * ヘルスチェック
   *
   * @returns - health status
   */
  @Get()
  getHealth(): HealthResponse {
    return {
      status: 'ok',
    }
  }
}
/* v8 ignore stop */

const routes: Routes = [
  {
    path: '/admin',
    module: AdminModule,
  },
  {
    path: '/public',
    module: PublicModule,
    children: [
      {
        path: 'items',
        module: ItemsModule,
        children: [
          {
            path: ':itemsId/comments',
            module: CommentModule,
          },
        ],
      },
      {
        path: 'tags',
        module: TagModule,
        children: [
          {
            path: ':tagId/items',
            module: TagsItemModule,
          },
        ],
      },
      {
        path: 'login',
        module: LoginModule,
      },
    ],
  },
]

/**
 *AppModule
 */
@Module({
  imports: [
    SharedHttpModule,
    AuthModule,
    PublicModule,
    AdminModule,
    RouterModule.register(routes),
  ],
  controllers: [HealthController],
})
export class AppModule {}
