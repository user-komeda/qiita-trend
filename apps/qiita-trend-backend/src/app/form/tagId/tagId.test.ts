import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface'
import { plainToInstance } from 'class-transformer'
import { ValidationOptions, validate } from 'class-validator'
import { describe, test, expect } from 'vitest'

import { CURRENT_VALIDATION_ERROR, ZERO } from '@/const'
import { TagId } from '@/form/tagId/tagId'
import { getErrorForCheckIsEmpty } from '@/utils/getValidationErrorMessage'

const testCase1 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const tagId: TagId = plainToInstance(TagId, {
    tagId: 'wifi',
  })
  const errors = await validate(tagId, option)

  expect(errors).toHaveLength(ZERO)

  return true
}
const testCase2 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const tagId: TagId = plainToInstance(TagId, {
    tagId: '',
  })
  const errors = await validate(tagId, option)

  expect(errors).not.toHaveLength(ZERO)
  expect(getErrorForCheckIsEmpty(errors[CURRENT_VALIDATION_ERROR])).toBe(
    'tagId should not be empty',
  )

  return true
}
const testCase3 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const tagId: TagId = plainToInstance(TagId, {
    tagId: null,
  })
  const errors = await validate(tagId, option)

  expect(errors).not.toHaveLength(ZERO)
  expect(getErrorForCheckIsEmpty(errors[CURRENT_VALIDATION_ERROR])).toBe(
    'tagId should not be empty',
  )

  return true
}
const testCase4 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const tagId = plainToInstance(TagId, {
    tagId: undefined,
  })
  const errors = await validate(tagId, option)

  expect(errors).not.toHaveLength(ZERO)
  expect(getErrorForCheckIsEmpty(errors[CURRENT_VALIDATION_ERROR])).toBe(
    'tagId should not be empty',
  )

  return true
}

describe('tagIdValidation', () => {
  const option: ValidatorOptions = {
    stopAtFirstError: true,
    forbidUnknownValues: false,
  }

  test('should complete validation', async () => {
    expect.hasAssertions()
    await expect(testCase1(option)).resolves.toBe(true)
  })

  test('should throw error when itemsId is empty', async () => {
    expect.hasAssertions()
    await expect(testCase2(option)).resolves.toBe(true)
  })

  test('should throw error when itemsId is null', async () => {
    expect.hasAssertions()
    await expect(testCase3(option)).resolves.toBe(true)
  })

  test('should throw error when itemsId is undefined', async () => {
    expect.hasAssertions()
    await expect(testCase4(option)).resolves.toBe(true)
  })
})
