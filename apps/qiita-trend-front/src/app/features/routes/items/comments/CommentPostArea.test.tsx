import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import '@testing-library/jest-dom'

import { CommentPostArea } from '@/app/features/routes/items/comments/CommentPostArea'

describe('comment post area component', () => {
  test('renders comment post area header', () => {
    expect.hasAssertions()

    render(<CommentPostArea />)

    expect(screen.getByText('米田')).toBeInTheDocument()
    expect(screen.getByText('コメントする')).toBeInTheDocument()
  })

  test('renders comment post form', () => {
    expect.hasAssertions()

    render(<CommentPostArea />)

    expect(screen.getByPlaceholderText('テキストを入力')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'プレビュー' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '投稿する' })).toBeInTheDocument()
    expect(screen.getByText('0B / 100MB')).toBeInTheDocument()
  })
})
