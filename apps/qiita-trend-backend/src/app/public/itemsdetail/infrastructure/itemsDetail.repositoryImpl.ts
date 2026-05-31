import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ItemsDetailSchema, ItemsDetailSchemaType } from '@qiita-trend/schema'
import { lastValueFrom, map } from 'rxjs'
import * as v from 'valibot' // 1.31 kB

import { ItemsDetailRepository } from '@/public/itemsdetail/domain/itemsDetail.repository'
import { ItemsData } from '@/types/itemsData'

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
  async getDetailItems(id: string): Promise<ItemsData> {
    return await lastValueFrom(
      this.httpService.get(this.buildUrl(id)).pipe(
        map((response) => {
          const parsedData = v.parse(ItemsDetailSchema, response.data)
          return this.convertResponseData(parsedData)
        }),
      ),
    )
  }

  private buildUrl(id: string): string {
    return `https://qiita.com/api/v2/items/${id}`
  }

  private convertResponseData(data: ItemsDetailSchemaType): ItemsData {
    const tag = data.tags.map((tag) => {
      return tag.name
    })

    return {
      body: data.body,
      id: data.id,
      likesCount: data.likes_count,
      private: data.private,
      reactionsCount: data.reactions_count,
      stocksCount: data.stocks_count,
      tags: tag,
      title: data.title,
      url: data.url,
      pageViewsCount: data.page_views_count,
    }
  }
}
