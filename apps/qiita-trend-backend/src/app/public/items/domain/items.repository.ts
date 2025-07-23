import { ItemsData } from '@/types/itemsData'

/**
 *ItemsRepository
 */
export interface ItemsRepository {
  /**
   *すべての記事を取得
   */
  getItems(startDate: string, endDate: string): Promise<ItemsData[]>
}

/** ItemsRepositorySymbol  */
export const ItemsRepository = Symbol('ItemsRepository')
