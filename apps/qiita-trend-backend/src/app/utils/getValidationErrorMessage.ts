import { ValidationError } from '@nestjs/common/interfaces/external/validation-error.interface'

/**
 *validationErrorの際のメッセージ取得(文字数エラー)
 *
 * @param errors - error
 */
export const getErrorForCheckLength = (errors: ValidationError): string => {
  if (!errors.constraints?.isLength) {
    return ''
  }
  return errors.constraints.isLength
}

/**
 *validationErrorの際のメッセージ取得(nullエラー)
 *
 * @param errors - error
 */
export const getErrorForCheckIsEmpty = (errors: ValidationError): string => {
  if (!errors.constraints?.isNotEmpty) {
    return ''
  }

  return errors.constraints.isNotEmpty
}

/**
 *validationErrorの際のメッセージ取得(正規表現エラー)
 *
 * @param errors - error
 */
export const getErrorForCheckMather = (errors: ValidationError): string => {
  if (!errors.constraints?.matches) {
    return ''
  }
  return errors.constraints.matches
}
