import { Inject, Injectable } from '@nestjs/common'
import { ItemsDetailSchemaType } from '@qiita-trend/schema'

import { ItemsDetailRepository } from '@/public/itemsdetail/domain/itemsDetail.repository'

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
  getDetailItems(id: string): Promise<ItemsDetailSchemaType> {
    return this.itemsDetailRepository.getDetailItems(id)
  }
}
