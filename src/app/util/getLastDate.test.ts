import { expect, test } from 'vitest'

import getLastDate from './getLastDate'

test('should return 31 for January', () => {
  expect(getLastDate(2023, 1)).toBe(31)
})

test('should return 28 for February in a non-leap year', () => {
  expect(getLastDate(2023, 2)).toBe(28)
})

test('should return 30 for April', () => {
  expect(getLastDate(2023, 4)).toBe(30)
})

test('should return 29 for February in a leap year', () => {
  expect(getLastDate(2024, 2)).toBe(29)
})
test('should return 29 for December in a leap year', () => {
  expect(getLastDate(2024, 12)).toBe(31)
})
