import { ItemsSchemaType } from '@qiita-trend/schema'

/**
 *ItemsRepository
 */
export interface ItemsRepository {
  /**
   *すべての記事を取得
   */
  getItems(
    startDate: string,
    endDate: string,
    page: string,
  ): Promise<ItemsSchemaType>
}

/** ItemsRepositorySymbol  */
export const ItemsRepository = Symbol('ItemsRepository')
