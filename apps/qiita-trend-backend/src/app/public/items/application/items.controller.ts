import { Controller, DefaultValuePipe, Get, Param, Query } from '@nestjs/common'
import {
  ItemsDetailSchemaType,
  PaginatedItemsSchemaType,
} from '@qiita-trend/schema'

import { ItemsId } from '@/form/itemsId/itemsId'
import { ItemsService } from '@/public/items/domain/items.service'
import { ItemsDetailService } from '@/public/itemsdetail/domain/itemsDetail.service'

/**
 *ItemsController
 */
@Controller()
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly itemsDetailService: ItemsDetailService,
  ) {}

  @Get()
  getAllItems(
    @Query('startDate')
    startDate: string,

    @Query('endDate')
    endDate: string,
    @Query('page', new DefaultValuePipe('1'))
    page: string,
  ): Promise<PaginatedItemsSchemaType> {
    return this.itemsService.getItems(startDate, endDate, page)
  }

  /**
   *特定の記事を取得
   *
   * @param id - 記事id
   */
  @Get(':itemsId')
  getItem(@Param() id: ItemsId): Promise<ItemsDetailSchemaType> {
    return this.itemsDetailService.getDetailItems(id.itemsId)
  }
}
