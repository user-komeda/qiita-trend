import { ItemsSchemaType } from '@qiita-trend/schema'

/**
 *TagsItemRepository
 */
export interface TagsItemRepository {
  /**
   *tagから記事を取得
   */
  getItemsFromTag(id: string): Promise<ItemsSchemaType>
}
/** TagsItemRepository */
export const TagsItemRepository = Symbol('TagsItemRepository')
