import { render } from '@testing-library/react'
import React from 'react'
import { expect, test } from 'vitest'

import TagList from './TagList'

test('renders the correct number of tags', () => {
  const tags = ['tag1', 'tag2', 'tag3']
  const { getAllByRole } = render(<TagList tagList={tags} />)
  const chips = getAllByRole('listitem')
  expect(chips).toHaveLength(tags.length)
})

test('renders the correct tag labels', () => {
  const tags = ['tag1', 'tag2', 'tag3']
  const { getByText } = render(<TagList tagList={tags} />)
  tags.forEach((tag) => {
    expect(getByText(tag).textContent).toBe(tag)
  })
})
