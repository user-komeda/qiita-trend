import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { lastValueFrom, map } from 'rxjs'
import * as v from 'valibot' // 1.31 kB

import { CommentRepository } from '@/public/comment/domain/comment.repository'
import { CommentSchemaType, schema } from '@/public/comment/schema'

/**
 *CommentRepositoryImpl
 */
@Injectable()
export class CommentRepositoryImpl implements CommentRepository {
  constructor(private readonly httpService: HttpService) {}
  /**
   *記事についているコメントをすべて取得
   *
   * @param id - 記事id
   */
  async getItemComment(id: string): Promise<string[]> {
    return await lastValueFrom(
      this.httpService.get(this.buildUrl(id)).pipe(
        map((response) => {
          const parsedData = v.parse(schema, response.data)
          return this.convertData(parsedData)
        }),
      ),
    )
  }

  private buildUrl(id: string): string {
    return `https://qiita.com/api/v2/items/${id}/comments?per_page=100`
  }

  private convertData(dataList: CommentSchemaType): string[] {
    return dataList.map((data) => {
      return data.body
    })
  }
}
