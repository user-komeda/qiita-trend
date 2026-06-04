import { Inject, Injectable } from '@nestjs/common'
import { PaginatedItemsSchemaType } from '@qiita-trend/schema'

import { ItemsRepository } from '@/public/items/domain/items.repository'

/**
 *ItemsService
 */
@Injectable()
export class ItemsService {
  constructor(
    @Inject(ItemsRepository) private readonly itemsRepository: ItemsRepository,
  ) {}

  async getItems(
    startDate: string,
    endDate: string,
    page: string,
  ): Promise<PaginatedItemsSchemaType> {
    return this.itemsRepository.getItems(startDate, endDate, page)
  }
}
