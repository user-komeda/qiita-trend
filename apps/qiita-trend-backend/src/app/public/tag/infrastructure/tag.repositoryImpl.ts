import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { map, lastValueFrom } from 'rxjs'
import * as v from 'valibot' // 1.31 kB

import { TagRepository } from '@/public/tag/domain/tag.repository'
import { tagsSchema, TagsSchemaType } from '@/schema/tagsSchema'
import { TagData } from '@/types/tagData'

/**
 *TagRepositoryImpl
 */
@Injectable()
export class TagRepositoryImpl implements TagRepository {
  constructor(private readonly httpService: HttpService) {}
  /**
   *すべてのtagを取得
   */
  async getTags(): Promise<TagData[]> {
    return await lastValueFrom(
      this.httpService.get(this.buildUrl()).pipe(
        map((response) => {
          const parsedData = v.parse(tagsSchema, response.data)
          return this.convertResponseData(parsedData)
        }),
      ),
    )
  }

  private buildUrl(): string {
    return 'https://qiita.com/api/v2/tags?per_page=100&sort=count'
  }

  private convertResponseData(dataList: TagsSchemaType): TagData[] {
    return dataList.map((data) => {
      /**
       *result
       */
      const result: TagData = {
        id: data.id,
        iconUrl: data.icon_url,
        itemsCount: data.items_count,
      }
      return result
    })
  }
}
