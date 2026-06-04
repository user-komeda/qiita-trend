import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, test } from 'vitest'

import TagList from '@/app/features/routes/items/TagList'

describe('tag_list component', () => {
  test('renders the correct number of tags', () => {
    expect.hasAssertions()

    const tags = [
      { name: 'tag1', versions: [] },
      { name: 'tag2', versions: [] },
      { name: 'tag3', versions: [] },
    ]
    render(<TagList tagList={tags} />)
    const chips = screen.getAllByRole('listitem')

    expect(chips).toHaveLength(tags.length)
  })

  test('renders the correct tag labels', () => {
    expect.hasAssertions()

    const tags = [
      { name: 'tag1', versions: [] },
      { name: 'tag2', versions: [] },
      { name: 'tag3', versions: [] },
    ]
    render(<TagList tagList={tags} />)
    tags.forEach((tag) => {
      expect(screen.getByText(tag.name).textContent).toBe(tag.name)
    })
  })
})
