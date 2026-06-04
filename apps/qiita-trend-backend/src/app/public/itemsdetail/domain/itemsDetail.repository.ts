import { ItemsDetailSchemaType } from '@qiita-trend/schema'

/**
 *ItemsDetailRepository
 */
export interface ItemsDetailRepository {
  /**
   *特定の記事を取得
   */
  getDetailItems(id: string): Promise<ItemsDetailSchemaType>
}
/** ItemsDetailRepository */
export const ItemsDetailRepository = Symbol('ItemsDetailRepository')
