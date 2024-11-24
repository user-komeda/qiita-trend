import { render } from '@testing-library/react'
import React from 'react'

import NormalItemList from './NormalItemList'

describe('NormalItemList', () => {
  it('renders a list of 12 months', () => {
    const { getAllByRole } = render(<NormalItemList />)
    const items = getAllByRole('listitem')
    expect(items).toHaveLength(12)
    items.forEach((item, index) => {
      expect(item.textContent).toBe(`${index + 1}月`)
    })
  })
})
