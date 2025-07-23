import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, test } from 'vitest'

import NormalItemList from '@/app/features/component/drawer/NormalItemList'

describe('normal_item_list component', () => {
  test('renders a list of 12 months', () => {
    expect.hasAssertions()

    render(<NormalItemList />)
    const items = screen.getAllByRole('listitem')

    expect(items).toHaveLength(12)

    items.forEach((item, index) => {
      expect(item.textContent).toBe(`${(index + 1).toString()}月`)
    })
  })
})
