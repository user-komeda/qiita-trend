import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface'
import { plainToInstance } from 'class-transformer'
import { ValidationOptions, validate } from 'class-validator'
import { describe, test, expect } from 'vitest'

import { CURRENT_VALIDATION_ERROR, ZERO } from '@/const'
import { ItemsId } from '@/form/itemsId/itemsId'
import {
  getErrorForCheckIsEmpty,
  getErrorForCheckLength,
  getErrorForCheckMather,
} from '@/utils/getValidationErrorMessage'

const testCase1 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const itemsId: ItemsId = plainToInstance(ItemsId, {
    itemsId: 'cf465d271171cba8bd51',
  })

  const errors = await validate(itemsId, option)

  expect(errors).toHaveLength(ZERO)

  return true
}
const testCase2 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const itemsId = plainToInstance(ItemsId, {
    itemsId: '',
  })
  const errors = await validate(itemsId, option)

  expect(errors).not.toHaveLength(ZERO)
  expect(getErrorForCheckIsEmpty(errors[CURRENT_VALIDATION_ERROR])).toBe(
    'itemsId should not be empty',
  )

  return true
}
const testCase3 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const itemsId = plainToInstance(ItemsId, {
    itemsId: null,
  })
  const errors = await validate(itemsId, option)

  expect(errors).not.toHaveLength(ZERO)
  expect(getErrorForCheckIsEmpty(errors[CURRENT_VALIDATION_ERROR])).toBe(
    'itemsId should not be empty',
  )

  return true
}
const testCase4 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const itemsId = plainToInstance(ItemsId, {
    itemsId: undefined,
  })
  const errors = await validate(itemsId, option)

  expect(errors).not.toHaveLength(ZERO)
  expect(getErrorForCheckIsEmpty(errors[CURRENT_VALIDATION_ERROR])).toBe(
    'itemsId should not be empty',
  )

  return true
}
const testCase5 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const itemsId = plainToInstance(ItemsId, {
    itemsId: 'cf465d271171cba8bd511',
  })
  const errors = await validate(itemsId, option)

  expect(errors).not.toHaveLength(ZERO)
  expect(getErrorForCheckLength(errors[CURRENT_VALIDATION_ERROR])).toBe(
    'itemsId must be shorter than or equal to 20 characters',
  )

  return true
}
const testCase6 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const itemsId = plainToInstance(ItemsId, {
    itemsId: 'cf465d271171cba8bd5',
  })
  const errors = await validate(itemsId, option)

  expect(errors).not.toHaveLength(ZERO)
  expect(getErrorForCheckLength(errors[CURRENT_VALIDATION_ERROR])).toBe(
    'itemsId must be longer than or equal to 20 characters',
  )

  return true
}
const testCase7 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const itemsId = plainToInstance(ItemsId, {
    itemsId: 'Cf465d271171cba8bd51',
  })
  const errors = await validate(itemsId, option)

  expect(errors).not.toHaveLength(ZERO)
  expect(getErrorForCheckMather(errors[CURRENT_VALIDATION_ERROR])).toBe(
    'itemsId must match /^[0-9a-z]+$/ regular expression',
  )

  return true
}
const testCase8 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const itemsId = plainToInstance(ItemsId, {
    itemsId: 'Cf465d271171cba8bd51',
  })
  const errors = await validate(itemsId, option)

  expect(errors).not.toHaveLength(ZERO)
  expect(getErrorForCheckMather(errors[CURRENT_VALIDATION_ERROR])).toBe(
    'itemsId must match /^[0-9a-z]+$/ regular expression',
  )

  return true
}

describe('itemsIdValidation', () => {
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

  test('should throw error when itemsId is greater than 20', async () => {
    expect.hasAssertions()
    await expect(testCase5(option)).resolves.toBe(true)
  })

  test('should throw error when itemsId is less than 20', async () => {
    expect.hasAssertions()
    await expect(testCase6(option)).resolves.toBe(true)
  })

  test('should throw error when itemsId not match regExp', async () => {
    expect.hasAssertions()
    await expect(testCase7(option)).resolves.toBe(true)
  })

  test('should throw error when itemsId not match regExp2', async () => {
    expect.hasAssertions()
    await expect(testCase8(option)).resolves.toBe(true)
  })
})
