import { IsNotEmpty } from 'class-validator'

/**
 *TagIdバリデーションクラス
 */
export class TagId {
  @IsNotEmpty()
  readonly tagId: string
}
