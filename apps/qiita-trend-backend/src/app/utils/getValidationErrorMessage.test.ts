import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface'
import { plainToInstance } from 'class-transformer'
import { ValidationOptions, validate } from 'class-validator'
import { describe, expect, test } from 'vitest'

import { CURRENT_VALIDATION_ERROR } from '@/const'
import { ItemsId } from '@/form/itemsId/itemsId'
import {
  getErrorForCheckIsEmpty,
  getErrorForCheckLength,
  getErrorForCheckMather,
} from '@/utils/getValidationErrorMessage'

const testCase1 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const itemsId: ItemsId = plainToInstance(ItemsId, {
    itemsId: 'cf465d271171cba8bd5',
  })
  const errors = await validate(itemsId, option)
  const errorMessage = getErrorForCheckLength(errors[CURRENT_VALIDATION_ERROR])

  expect(errorMessage).toBe(
    'itemsId must be longer than or equal to 20 characters',
  )

  return true
}
const testCase2 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const itemsId: ItemsId = plainToInstance(ItemsId, {
    itemsId: '',
  })
  const errors = await validate(itemsId, option)
  const errorMessage = getErrorForCheckLength(errors[CURRENT_VALIDATION_ERROR])

  expect(errorMessage).toBe('')

  return true
}
const testCase3 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const itemsId: ItemsId = plainToInstance(ItemsId, { itemsId: '' })
  const errors = await validate(itemsId, option)
  const errorMessage = getErrorForCheckIsEmpty(errors[CURRENT_VALIDATION_ERROR])

  expect(errorMessage).toBe('itemsId should not be empty')

  return true
}
const testCase4 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const itemsId: ItemsId = plainToInstance(ItemsId, {
    itemsId: 'cf465d271171cba8bd5',
  })
  const errors = await validate(itemsId, option)
  const errorMessage = getErrorForCheckIsEmpty(errors[CURRENT_VALIDATION_ERROR])

  expect(errorMessage).toBe('')

  return true
}
const testCase5 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const itemsId: ItemsId = plainToInstance(ItemsId, {
    itemsId: 'Cf465d271171cba8bd51',
  })
  const errors = await validate(itemsId, option)
  const errorMessage = getErrorForCheckMather(errors[CURRENT_VALIDATION_ERROR])

  expect(errorMessage).toBe(
    'itemsId must match /^[0-9a-z]+$/ regular expression',
  )

  return true
}
const testCase6 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const itemsId: ItemsId = plainToInstance(ItemsId, {
    itemsId: 'cf465d271171cba8bd5',
  })
  const errors = await validate(itemsId, option)
  const errorMessage = getErrorForCheckMather(errors[CURRENT_VALIDATION_ERROR])

  expect(errorMessage).toBe('')

  return true
}

describe('getValidationErrorMessage', () => {
  const option: ValidatorOptions = {
    stopAtFirstError: true,
    forbidUnknownValues: false,
  }

  test('should complete get error message for check length', async () => {
    expect.hasAssertions()
    await expect(testCase1(option)).resolves.toBe(true)
  })

  test('should complete get error message for check length different error', async () => {
    expect.hasAssertions()
    await expect(testCase2(option)).resolves.toBe(true)
  })

  test('should complete get error message for check isEmpty', async () => {
    expect.hasAssertions()
    await expect(testCase3(option)).resolves.toBe(true)
  })

  test('should complete get error message for check isEmpty different error', async () => {
    expect.hasAssertions()
    await expect(testCase4(option)).resolves.toBe(true)
  })

  test('should complete get error message for check match', async () => {
    expect.hasAssertions()
    await expect(testCase5(option)).resolves.toBe(true)
  })

  test('should complete get error message for check match different error', async () => {
    expect.hasAssertions()
    await expect(testCase6(option)).resolves.toBe(true)
  })
})
