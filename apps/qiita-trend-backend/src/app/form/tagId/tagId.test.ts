import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface'
import { plainToInstance } from 'class-transformer'
import { ValidationOptions, validate } from 'class-validator'
import { describe, expect, test } from 'vitest'

import { TagId } from './tagId'

import { CURRENT_VALIDATION_ERROR, ZERO } from '@/const'

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
  expect(errors[CURRENT_VALIDATION_ERROR].constraints).toBeDefined()

  return true
}
const testCase3 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const tagId: TagId = plainToInstance(TagId, {
    tagId: null,
  })
  const errors = await validate(tagId, option)

  expect(errors).not.toHaveLength(ZERO)
  expect(errors[CURRENT_VALIDATION_ERROR].constraints).toBeDefined()

  return true
}
const testCase4 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const tagId: TagId = plainToInstance(TagId, {
    tagId: undefined,
  })
  const errors = await validate(tagId, option)

  expect(errors).not.toHaveLength(ZERO)
  expect(errors[CURRENT_VALIDATION_ERROR].constraints).toBeDefined()

  return true
}
const testCase5 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const tagId: TagId = plainToInstance(TagId, {
    tagId: ' ',
  })
  const errors = await validate(tagId, option)

  expect(errors).not.toHaveLength(ZERO)
  expect(errors[CURRENT_VALIDATION_ERROR].constraints).toHaveProperty('matches')

  return true
}
const testCase6 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const tagId: TagId = plainToInstance(TagId, {
    tagId: 'null',
  })
  const errors = await validate(tagId, option)

  expect(errors).not.toHaveLength(ZERO)
  expect(errors[CURRENT_VALIDATION_ERROR].constraints).toHaveProperty(
    'notEquals',
  )

  return true
}
const testCase7 = async (option: ValidationOptions): Promise<boolean> => {
  expect.hasAssertions()

  const tagId: TagId = plainToInstance(TagId, {
    tagId: 'undefined',
  })
  const errors = await validate(tagId, option)

  expect(errors).not.toHaveLength(ZERO)
  expect(errors[CURRENT_VALIDATION_ERROR].constraints).toHaveProperty(
    'notEquals',
  )

  return true
}

describe('tagIdValidation', () => {
  const option: ValidatorOptions = {
    stopAtFirstError: true,
    forbidUnknownValues: false,
  }

  test('should instantiate TagId', () => {
    expect.hasAssertions()

    const instance = new TagId()

    expect(instance).toBeDefined()
  })

  test('should complete validation', async () => {
    expect.hasAssertions()
    await expect(testCase1(option)).resolves.toBe(true)
  })

  test('should throw error when tagId is empty', async () => {
    expect.hasAssertions()
    await expect(testCase2(option)).resolves.toBe(true)
  })

  test('should throw error when tagId is null', async () => {
    expect.hasAssertions()
    await expect(testCase3(option)).resolves.toBe(true)
  })

  test('should throw error when tagId is undefined', async () => {
    expect.hasAssertions()
    await expect(testCase4(option)).resolves.toBe(true)
  })

  test('should throw error when tagId is blank', async () => {
    expect.hasAssertions()
    await expect(testCase5(option)).resolves.toBe(true)
  })

  test('should throw error when tagId is null string', async () => {
    expect.hasAssertions()
    await expect(testCase6(option)).resolves.toBe(true)
  })

  test('should throw error when tagId is undefined string', async () => {
    expect.hasAssertions()
    await expect(testCase7(option)).resolves.toBe(true)
  })
})
