import { Module } from '@nestjs/common'

import { TagsItemController } from '@/public/tags-item/application/tagsItem.controller'
import { TagsItemRepository } from '@/public/tags-item/domain/tagsItem.repository'
import { TagsItemService } from '@/public/tags-item/domain/tagsItem.service'
import { TagsItemRepositoryImpl } from '@/public/tags-item/infrastructure/tagsItem.repositoryImpl'

const tagItemModuleMetadata = {
  controllers: [TagsItemController],
  providers: [
    TagsItemService,
    { provide: TagsItemRepository, useClass: TagsItemRepositoryImpl },
  ],
}

/**
 *TagsItemModule
 */
@Module(tagItemModuleMetadata)
export class TagsItemModule {}
