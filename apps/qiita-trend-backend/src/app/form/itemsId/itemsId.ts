import { IsNotEmpty, Length, Matches } from 'class-validator'

import { QIITA_ITEM_ID_LENGTH } from '@/const'

/**
 *itemsIdValidationクラス
 */
export class ItemsId {
  /**
   *itemsId
   */
  @Matches(RegExp('^[0-9a-z]+$'))
  @Length(QIITA_ITEM_ID_LENGTH, QIITA_ITEM_ID_LENGTH)
  @IsNotEmpty()
  readonly itemsId: string
}
