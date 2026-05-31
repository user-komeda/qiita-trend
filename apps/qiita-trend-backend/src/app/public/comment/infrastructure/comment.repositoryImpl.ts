import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { CommentSchema, CommentSchemaType } from '@qiita-trend/schema'
import { lastValueFrom, map } from 'rxjs'
import * as v from 'valibot' // 1.31 kB

import { CommentRepository } from '@/public/comment/domain/comment.repository'

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
  async getItemComment(id: string): Promise<CommentSchemaType> {
    return await lastValueFrom(
      this.httpService.get(this.buildUrl(id)).pipe(
        map((response) => {
          console.log(response.data)
          return v.parse(CommentSchema, response.data)
        }),
      ),
    )
  }

  private buildUrl(id: string): string {
    return `https://qiita.com/api/v2/items/${id}/comments?per_page=100`
  }
}
