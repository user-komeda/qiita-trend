import { Module } from '@nestjs/common'

import { CommentModule } from '@/public/comment/comment.module'
import { ItemsModule } from '@/public/items/items.module'
import { LoginModule } from '@/public/login/login.module'
import { TagModule } from '@/public/tag/tag.module'
import { TagsItemModule } from '@/public/tags-item/tagsItens.module'

const publicModuleMetadata = {
  imports: [ItemsModule, CommentModule, TagModule, TagsItemModule, LoginModule],
}

/**
 *PublicModule
 */
@Module(publicModuleMetadata)
export class PublicModule {}
