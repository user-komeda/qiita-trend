import { Inject, Injectable } from '@nestjs/common'
import { ItemsSchemaType } from '@qiita-trend/schema'

import { TagsItemRepository } from '@/public/tags-item/domain/tagsItem.repository'

/**
 *TagsItemService
 */
@Injectable()
export class TagsItemService {
  constructor(
    @Inject(TagsItemRepository)
    private readonly tagsItemRepository: TagsItemRepository,
  ) {}
  /**
   *tagから記事を取得
   *
   * @param id - tagId
   */
  getItemsFromTag(id: string): Promise<ItemsSchemaType> {
    return this.tagsItemRepository.getItemsFromTag(id)
  }
}
