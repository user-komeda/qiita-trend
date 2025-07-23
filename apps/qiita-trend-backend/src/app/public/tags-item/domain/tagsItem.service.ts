import { Inject, Injectable } from '@nestjs/common'

import { TagsItemRepository } from '@/public/tags-item/domain/tagsItem.repository'
import { ItemsData } from '@/types/itemsData'

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
  getItemsFromTag(id: string): Promise<ItemsData[]> {
    return this.tagsItemRepository.getItemsFromTag(id)
  }
}
