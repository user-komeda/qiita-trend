import { IsNotEmpty } from 'class-validator'

/**
 *TagIdバリデーションクラス
 */
export class TagId {
  /**
   *tagId
   */
  @IsNotEmpty()
  readonly tagId: string
}
