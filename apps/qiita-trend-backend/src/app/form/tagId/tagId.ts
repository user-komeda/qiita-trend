import { IsNotEmpty, Matches, NotEquals } from 'class-validator'

/**
 *TagIdバリデーションクラス
 */
export class TagId {
  @IsNotEmpty()
  @Matches(/\S/)
  @NotEquals('null')
  @NotEquals('undefined')
  readonly tagId: string
}
