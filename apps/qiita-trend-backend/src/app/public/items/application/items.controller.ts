import { Controller, Get, Param, Query } from '@nestjs/common'

import { ItemsId } from '@/form/itemsId/itemsId'
import { ItemsService } from '@/public/items/domain/items.service'
import { ItemsDetailService } from '@/public/itemsdetail/domain/itemsDetail.service'
import { ItemsData } from '@/types/itemsData'

/**
 *ItemsController
 */
@Controller()
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly itemsDetailService: ItemsDetailService,
  ) {}

  /**
   *getAllItems
   *
   * @param startDate - startDate
   *
   * @param endDate - endDate
   *
   * @returns - ItemsData[]
   */
  @Get()
  getAllItems(
    @Query('startDate')
    startDate: string,
    @Query('endDate')
    endDate: string,
  ): Promise<ItemsData[]> {
    return this.itemsService.getItems(startDate, endDate)
  }

  /**
   *特定の記事を取得
   *
   * @param id - 記事id
   */
  @Get(':itemsId')
  getItem(@Param('') id: ItemsId): Promise<ItemsData> {
    return this.itemsDetailService.getDetailItems(id.itemsId)
  }
}
