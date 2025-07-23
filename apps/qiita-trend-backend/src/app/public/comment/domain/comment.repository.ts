/**
 *CommentRepository
 */
export interface CommentRepository {
  /**
   *記事についているコメントすべて取得
   */
  getItemComment(id: string): Promise<string[]>
}
/** CommentRepositorySymbol */
export const CommentRepository = Symbol('CommentRepository')
