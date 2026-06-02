import { Controller, Get, Param } from '@nestjs/common'
import { ItemsSchemaType } from '@qiita-trend/schema'

import { TagId } from '@/form/tagId/tagId'
import { TagsItemService } from '@/public/tags-item/domain/tagsItem.service'

/**
 *TagsItemController.
 */
@Controller('')
export class TagsItemController {
  constructor(private readonly tagsItemService: TagsItemService) {}
  /**
   *tagから記事を取得
   *
   * @param id - tagId
   */
  @Get()
  getItemsFromTag(@Param() id: TagId): Promise<ItemsSchemaType> {
    return this.tagsItemService.getItemsFromTag(id.tagId)
  }
}
