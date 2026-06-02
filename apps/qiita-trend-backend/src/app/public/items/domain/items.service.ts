import { Inject, Injectable } from '@nestjs/common'
import { ItemsSchemaType } from '@qiita-trend/schema'

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
  ): Promise<ItemsSchemaType> {
    return this.itemsRepository.getItems(startDate, endDate, page)
  }
}
