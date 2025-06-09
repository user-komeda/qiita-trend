import { expect, test } from 'vitest'

import replaceUrlParameter from './replaceUrlParameter'
test('should replace the key with the value in the URL', () => {
  const url = 'https://example.com/page/:id'
  const key = ':id'
  const value = '123'
  const result = replaceUrlParameter(url, key, value)
  expect(result).toBe('https://example.com/page/123')
})

test('should return the same URL if the key is not found', () => {
  const url = 'https://example.com/page/:id'
  const key = ':tag'
  const value = '123'
  const result = replaceUrlParameter(url, key, value)
  expect(result).toBe(url)
})
