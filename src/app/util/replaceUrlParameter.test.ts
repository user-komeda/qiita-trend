import { describe, test } from 'vitest'
import { expect } from 'vitest'

import replaceUrlParameter from '@/app/util/replaceUrlParameter'

describe(replaceUrlParameter, () => {
  test('should replace the key with the value in the URL', () => {
    expect.hasAssertions()

    const url = 'https://example.com/page/:id'
    const key = ':id'
    const value = '123'
    const result = replaceUrlParameter(url, key, value)

    expect(result).toBe('https://example.com/page/123')
  })

  test('should return the same URL if the key is not found', () => {
    expect.hasAssertions()

    const url = 'https://example.com/page/:id'
    const key = ':tag'
    const value = '123'
    const result = replaceUrlParameter(url, key, value)

    expect(result).toBe(url)
  })
})
