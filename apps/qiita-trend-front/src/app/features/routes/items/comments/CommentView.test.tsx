import { CommentSchemaType } from '@qiita-trend/schema'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import '@testing-library/jest-dom'

import { CommentView } from '@/app/features/routes/items/comments/CommentView'

const createComment = (
  override?: Partial<CommentSchemaType[number]>,
): CommentSchemaType[number] => ({
  body: 'This is a comment body',
  created_at: '2026-05-01T00:00:00+09:00',
  id: 'comment-id',
  rendered_body: '<p>This is a comment body</p>',
  updated_at: '2026-05-01T00:00:00+09:00',
  user: {
    description: null,
    facebook_id: null,
    followees_count: 1,
    followers_count: 1,
    github_login_name: null,
    id: 'test-user',
    items_count: 1,
    linkedin_id: null,
    location: null,
    name: 'Test User',
    organization: null,
    permanent_id: 1,
    profile_image_url: 'https://example.com/test-user.png',
    team_only: false,
    twitter_screen_name: null,
    website_url: null,
  },
  ...override,
})

describe('comment view component', () => {
  test('renders comment information', () => {
    expect.hasAssertions()

    render(<CommentView comment={createComment()} />)

    expect(screen.getByText('@test-user')).toBeInTheDocument()
    expect(screen.getByText('(Test User)')).toBeInTheDocument()
    expect(screen.getByText('2026-05-01T00:00:00+09:00')).toBeInTheDocument()
    expect(screen.getByText('This is a comment body')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  test('renders avatar image when user has profile image', () => {
    expect.hasAssertions()

    render(<CommentView comment={createComment()} />)

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://example.com/test-user.png',
    )
    expect(screen.queryByText('T')).not.toBeInTheDocument()
  })

  test('renders avatar fallback initial when user does not have profile image', () => {
    expect.hasAssertions()

    const comment = createComment({
      user: {
        ...createComment().user,
        profile_image_url: '',
      },
    })

    render(<CommentView comment={comment} />)

    expect(screen.getByText('T')).toBeInTheDocument()
  })

  test('does not render user name when name is empty', () => {
    expect.hasAssertions()

    const comment = createComment({
      user: {
        ...createComment().user,
        name: '',
      },
    })

    render(<CommentView comment={comment} />)

    expect(screen.getByText('@test-user')).toBeInTheDocument()
    expect(screen.queryByText('(Test User)')).not.toBeInTheDocument()
  })
})
