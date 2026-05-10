import { cookies } from 'next/headers'
import { describe, expect, vi, beforeEach, test } from 'vitest'

import { POST } from '@/app/api/logout/route'
import { deleteSession } from '@/app/util/session'

vi.mock(import('next/headers'), () => ({
  cookies: vi.fn<typeof cookies>(),
}))

vi.mock(import('@/app/util/session'), () => ({
  deleteSession: vi.fn<typeof deleteSession>(),
}))

describe('logout API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('sessionIdが存在する場合、セッションを削除し、クッキーをクリアすること', async () => {
    expect.hasAssertions()

    const mockCookieStore = {
      get: vi
        .fn<(key: string) => { value: string } | undefined>()
        .mockReturnValue({ value: 'test-session-id' }),
    }
    vi.mocked(cookies).mockResolvedValue(
      mockCookieStore as unknown as Awaited<ReturnType<typeof cookies>>,
    )

    const response = await POST()

    expect(deleteSession).toHaveBeenCalledWith('test-session-id')
    expect(response.status).toBe(204)
  })

  test('sessionIdが存在しない場合、deleteSessionを呼び出さないこと', async () => {
    expect.hasAssertions()

    const mockCookieStore = {
      get: vi
        .fn<(key: string) => { value: string } | undefined>()
        .mockReturnValue(undefined),
    }
    vi.mocked(cookies).mockResolvedValue(
      mockCookieStore as unknown as Awaited<ReturnType<typeof cookies>>,
    )

    const response = await POST()

    expect(deleteSession).not.toHaveBeenCalled()
    expect(response.status).toBe(204)
  })
})
