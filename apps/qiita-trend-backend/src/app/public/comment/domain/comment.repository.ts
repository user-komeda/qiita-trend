import { CommentSchemaType } from '@qiita-trend/schema'

/**
 *CommentRepository
 */
export interface CommentRepository {
  /**
   *記事についているコメントすべて取得
   */
  getItemComment(id: string): Promise<CommentSchemaType>
}
/** CommentRepositorySymbol */
export const CommentRepository = Symbol('CommentRepository')
