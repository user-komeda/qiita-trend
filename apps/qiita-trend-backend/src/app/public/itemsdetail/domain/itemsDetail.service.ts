import { Inject, Injectable } from '@nestjs/common'

import { ItemsDetailRepository } from '@/public/itemsdetail/domain/itemsDetail.repository'
import { ItemsData } from '@/types/itemsData'

/**
 *ItemsDetailService
 */
@Injectable()
export class ItemsDetailService {
  constructor(
    @Inject(ItemsDetailRepository)
    private readonly itemsDetailRepository: ItemsDetailRepository,
  ) {}
  /**
   *特定の記事を取得
   *
   * @param id - 記事ID
   */
  getDetailItems(id: string): Promise<ItemsData> {
    return this.itemsDetailRepository.getDetailItems(id)
  }
}
