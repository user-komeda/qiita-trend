import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ItemsDetailSchema, ItemsDetailSchemaType } from '@qiita-trend/schema'
import { lastValueFrom, map } from 'rxjs'
import * as v from 'valibot' // 1.31 kB

import { ItemsDetailRepository } from '@/public/itemsdetail/domain/itemsDetail.repository'

/**
 *ItemsDetailRepositoryImpl
 */
@Injectable()
export class ItemsDetailRepositoryImpl implements ItemsDetailRepository {
  constructor(private readonly httpService: HttpService) {}
  /**
   *特定の記事を取得
   *
   * @param id - 記事ID
   */
  async getDetailItems(id: string): Promise<ItemsDetailSchemaType> {
    return await lastValueFrom(
      this.httpService.get(this.buildUrl(id)).pipe(
        map((response) => {
          return v.parse(ItemsDetailSchema, response.data)
        }),
      ),
    )
  }

  private buildUrl(id: string): string {
    return `https://qiita.com/api/v2/items/${id}`
  }
}
