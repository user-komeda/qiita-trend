import { Inject, Injectable } from '@nestjs/common'

import { CommentRepository } from '@/public/comment/domain/comment.repository'

/**
 *CommentService
 */
@Injectable()
export class CommentService {
  constructor(
    @Inject(CommentRepository)
    private readonly commentRepository: CommentRepository,
  ) {}
  /**
   *記事についているコメントをすべて取得
   *
   * @param id - 記事id
   */
  getItemComment(id: string): Promise<string[]> {
    return this.commentRepository.getItemComment(id)
  }
}
