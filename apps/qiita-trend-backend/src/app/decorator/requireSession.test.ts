import { describe, expect, test } from 'vitest'

import { RequireSession } from './requireSession'

import { REQUIRE_SESSION } from '@/const'

describe(RequireSession, () => {
  test('should set the REQUIRE_SESSION metadata to true', () => {
    expect.hasAssertions()

    const decorator = RequireSession()
    const target = (): void => {
      // do nothing
    }

    decorator(target)
    const metadata = Reflect.getMetadata(REQUIRE_SESSION, target) as boolean

    expect(metadata).toBe(true)
  })
})
