import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, test } from 'vitest'

import TagList from '@/app/features/routes/items/TagList'

describe('tag_list component', () => {
  test('renders the correct number of tags', () => {
    expect.hasAssertions()

    const tags = ['tag1', 'tag2', 'tag3']
    render(<TagList tagList={tags} />)
    const chips = screen.getAllByRole('listitem')

    expect(chips).toHaveLength(tags.length)
  })

  test('renders the correct tag labels', () => {
    expect.hasAssertions()

    const tags = ['tag1', 'tag2', 'tag3']
    render(<TagList tagList={tags} />)
    tags.forEach((tag) => {
      expect(screen.getByText(tag).textContent).toBe(tag)
    })
  })
})
