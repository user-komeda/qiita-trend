import { CommentSchemaType } from '@qiita-trend/schema'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import '@testing-library/jest-dom'

import { CommentViewArea } from '@/app/features/routes/items/comments/CommentViewArea'

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

describe('comment view area component', () => {
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
        name: 'Second User',
        permanent_id: 2,
        profile_image_url: 'https://example.com/second-user.png',
      },
    }),
  ]

  test('renders first comment', () => {
    expect.hasAssertions()

    render(<CommentViewArea comments={comments} />)

    expect(screen.getByText('@first-user')).toBeInTheDocument()
    expect(screen.getByText('(First User)')).toBeInTheDocument()
    expect(screen.getByText('First comment body')).toBeInTheDocument()
  })

  test('renders second comment', () => {
    expect.hasAssertions()

    render(<CommentViewArea comments={comments} />)

    expect(screen.getByText('@second-user')).toBeInTheDocument()
    expect(screen.getByText('(Second User)')).toBeInTheDocument()
    expect(screen.getByText('Second comment body')).toBeInTheDocument()
  })
})
