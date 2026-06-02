import { Controller, Get, Param } from '@nestjs/common'
import { CommentSchemaType } from '@qiita-trend/schema'

import { ItemsId } from '@/form/itemsId/itemsId'
import { CommentService } from '@/public/comment/domain/comment.service'

/**
 *CommentController
 */
@Controller('')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  /**
   *記事についているコメントをすべて取得
   *
   * @param id - 記事のid
   */
  @Get()
  getItemComment(@Param() id: ItemsId): Promise<CommentSchemaType> {
    return this.commentService.getItemComment(id.itemsId)
  }
}
