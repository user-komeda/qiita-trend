import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RouterModule, Routes } from '@nestjs/core'

import { AdminModule } from '@/admin/admin.module'
import { CommentModule } from '@/public/comment/comment.module'
import { ItemsModule } from '@/public/items/items.module'
import { LoginModule } from '@/public/login/login.module'
import { PublicModule } from '@/public/public.module'
import { TagModule } from '@/public/tag/tag.module'
import { TagsItemModule } from '@/public/tags-item/tagsItens.module'
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
    PublicModule,
    AdminModule,
    RouterModule.register(routes),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
  ],
})
export class AppModule {}
