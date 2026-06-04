import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ItemsSchemaType, TagItemsSchema } from '@qiita-trend/schema'
import { lastValueFrom, map } from 'rxjs'
import * as v from 'valibot' // 1.31 kB

import { TagsItemRepository } from '@/public/tags-item/domain/tagsItem.repository'

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
  async getItemsFromTag(id: string): Promise<ItemsSchemaType> {
    return await lastValueFrom(
      this.httpService.get(this.buildUrl(id)).pipe(
        map((response) => {
          return v.parse(TagItemsSchema, response.data)
        }),
      ),
    )
  }

  private buildUrl(id: string): string {
    return `https://qiita.com/api/v2/items?per_page=100&query=tags:${id}`
  }
}
