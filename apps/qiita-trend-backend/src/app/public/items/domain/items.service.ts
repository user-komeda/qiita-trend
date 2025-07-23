import { Inject, Injectable } from '@nestjs/common'

import { ItemsRepository } from '@/public/items/domain/items.repository'
import { ItemsData } from '@/types/itemsData'

/**
 *ItemsService
 */
@Injectable()
export class ItemsService {
  constructor(
    @Inject(ItemsRepository) private readonly itemsRepository: ItemsRepository,
  ) {}
  /**
   *すべての記事を取得
   *
   * @param startDate - startDate
   *
   * @param endDate - endDate
   *
   * @returns - ItemsData[]
   */
  async getItems(startDate: string, endDate: string): Promise<ItemsData[]> {
    return this.itemsRepository.getItems(startDate, endDate)
  }
}
