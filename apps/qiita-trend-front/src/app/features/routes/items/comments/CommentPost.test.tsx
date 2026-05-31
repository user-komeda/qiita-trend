import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import '@testing-library/jest-dom'

import { CommentPost } from '@/app/features/routes/items/comments/CommentPost'

describe('comment post component', () => {
  test('renders comment post form', () => {
    expect.hasAssertions()

    render(<CommentPost />)

    expect(screen.getByPlaceholderText('テキストを入力')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'プレビュー' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '投稿する' })).toBeInTheDocument()
    expect(screen.getByText('0B / 100MB')).toBeInTheDocument()
  })
})
