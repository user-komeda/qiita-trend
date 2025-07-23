import { ItemsData } from '@/types/itemsData'

/**
 *ItemsDetailRepository
 */
export interface ItemsDetailRepository {
  /**
   *特定の記事を取得
   */
  getDetailItems(id: string): Promise<ItemsData>
}
/** ItemsDetailRepository */
export const ItemsDetailRepository = Symbol('ItemsDetailRepository')
