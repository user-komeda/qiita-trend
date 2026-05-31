/* eslint-disable max-lines */

import { CommentSchemaType } from '@qiita-trend/schema'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import '@testing-library/jest-dom'

import { BASE_URL, GET_ITEM_COMMENTS_URL } from '@/app/const/path'
import { Comments } from '@/app/features/routes/items/comments/Comments'
import fetchWithJwt, { type FetchWithJwtResult } from '@/app/util/fetchWithJwt'
import replaceUrlParameter from '@/app/util/replaceUrlParameter'

type FetchWithJwtMock = <T>(
  path: string,
  init?: RequestInit,
) => Promise<FetchWithJwtResult<T>>

const fetchWithJwtMock = vi.hoisted(() => vi.fn<FetchWithJwtMock>())

vi.mock(import('@/app/util/fetchWithJwt'), () => ({
  default: fetchWithJwtMock as typeof fetchWithJwt,
}))

const createComment = (
  override?: Partial<CommentSchemaType[number]>,
): CommentSchemaType[number] => ({
  body: 'First comment body',
  created_at: '2026-05-01T00:00:00+09:00',
  id: 'comment-id-1',
  rendered_body: '<p>First comment body</p>',
  updated_at: '2026-05-01T00:00:00+09:00',
  user: {
    description: null,
    facebook_id: null,
    followees_count: 1,
    followers_count: 1,
    github_login_name: null,
    id: 'first-user',
    items_count: 1,
    linkedin_id: null,
    location: null,
    name: 'First User',
    organization: null,
    permanent_id: 1,
    profile_image_url: 'https://example.com/first-user.png',
    team_only: false,
    twitter_screen_name: null,
    website_url: null,
  },
  ...override,
})

// eslint-disable-next-line max-lines-per-function
describe('comments component', () => {
  beforeEach(() => {
    fetchWithJwtMock.mockReset()
  })

  const comments: CommentSchemaType = [
    createComment(),
    createComment({
      body: 'Second comment body',
      created_at: '2026-05-02T00:00:00+09:00',
      id: 'comment-id-2',
      rendered_body: '<p>Second comment body</p>',
      updated_at: '2026-05-02T00:00:00+09:00',
      user: {
        ...createComment().user,
        id: 'second-user',
        name: '',
        permanent_id: 2,
        profile_image_url: 'https://example.com/second-user.png',
      },
    }),
  ]

  test('renders first fetched comment when fetch succeeds', async () => {
    expect.hasAssertions()

    fetchWithJwtMock.mockResolvedValueOnce({
      ok: true,
      data: comments,
    })

    render(await Comments({ id: 'item-id' }))

    expect(screen.getByText('@first-user')).toBeInTheDocument()
    expect(screen.getByText('(First User)')).toBeInTheDocument()
    expect(screen.getByText('2026-05-01T00:00:00+09:00')).toBeInTheDocument()
    expect(screen.getByText('First comment body')).toBeInTheDocument()
  })

  test('renders second fetched comment when fetch succeeds', async () => {
    expect.hasAssertions()

    fetchWithJwtMock.mockResolvedValueOnce({
      ok: true,
      data: comments,
    })

    render(await Comments({ id: 'item-id' }))

    expect(screen.getByText('@second-user')).toBeInTheDocument()
    expect(screen.getByText('2026-05-02T00:00:00+09:00')).toBeInTheDocument()
    expect(screen.getByText('Second comment body')).toBeInTheDocument()
    expect(screen.queryByText('()')).not.toBeInTheDocument()
  })

  test('renders comment post area when fetch succeeds', async () => {
    expect.hasAssertions()

    fetchWithJwtMock.mockResolvedValueOnce({
      ok: true,
      data: comments,
    })

    render(await Comments({ id: 'item-id' }))

    expect(screen.getByText('コメントする')).toBeInTheDocument()
    expect(screen.getByText('米田')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('テキストを入力')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'プレビュー' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '投稿する' })).toBeInTheDocument()
  })

  test('calls the correct comments API endpoint', async () => {
    expect.hasAssertions()

    fetchWithJwtMock.mockResolvedValueOnce({
      ok: true,
      data: comments,
    })

    render(await Comments({ id: 'item-id' }))

    expect(fetchWithJwtMock).toHaveBeenCalledWith(
      replaceUrlParameter(
        `${BASE_URL}${GET_ITEM_COMMENTS_URL}`,
        ':itemId',
        'item-id',
      ),
    )
  })

  test('renders error alert when fetch fails', async () => {
    expect.hasAssertions()

    fetchWithJwtMock.mockResolvedValueOnce({
      ok: false,
      message: 'Failed to fetch comments',
    })

    render(await Comments({ id: 'item-id' }))

    expect(screen.getByText('Failed to fetch comments')).toBeInTheDocument()
  })
})
