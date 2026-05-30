import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { TagItemsSchema, TagItemsSchemaType } from '@qiita-trend/schema'
import { lastValueFrom, map } from 'rxjs'
import * as v from 'valibot' // 1.31 kB

import { TagsItemRepository } from '@/public/tags-item/domain/tagsItem.repository'
import { ItemsData } from '@/types/itemsData'

/**
 *TagsItemRepositoryImpl
 */
@Injectable()
export class TagsItemRepositoryImpl implements TagsItemRepository {
  constructor(private readonly httpService: HttpService) {}
  /**
   *tagから記事を取得
   *
   * @param id - tagId
   */
  async getItemsFromTag(id: string): Promise<ItemsData[]> {
    return await lastValueFrom(
      this.httpService.get(this.buildUrl(id)).pipe(
        map((response) => {
          const parsedData = v.parse(TagItemsSchema, response.data)
          return this.convertResponseData(parsedData)
        }),
      ),
    )
  }

  private buildUrl(id: string): string {
    return `https://qiita.com/api/v2/items?per_page=100&query=tags:${id}`
  }

  private convertResponseData(dataList: TagItemsSchemaType): ItemsData[] {
    return dataList.map((data) => {
      const tag = data.tags.map((tag) => {
        return tag.name
      })
      /**
       *result
       */
      const result: ItemsData = {
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
      return result
    })
  }
}
