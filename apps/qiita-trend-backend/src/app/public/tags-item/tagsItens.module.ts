import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { TagsItemController } from '@/public/tags-item/application/tagsItem.controller'
import { TagsItemRepository } from '@/public/tags-item/domain/tagsItem.repository'
import { TagsItemService } from '@/public/tags-item/domain/tagsItem.service'
import { TagsItemRepositoryImpl } from '@/public/tags-item/infrastructure/tagsItem.repositoryImpl'
/**
 *TagsItemModule
 */
@Module({
  imports: [HttpModule],
  controllers: [TagsItemController],
  providers: [
    TagsItemService,
    { provide: TagsItemRepository, useClass: TagsItemRepositoryImpl },
  ],
})
export class TagsItemModule {}
