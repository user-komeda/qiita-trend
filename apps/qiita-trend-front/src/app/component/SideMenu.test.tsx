import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, test } from 'vitest'

import SideMenu from '@/app/component/SideMenu'

describe('sideMenu Component', () => {
  test('子コンポーネントをレンダリングすること', () => {
    expect.hasAssertions()

    const child = <div data-testid="child">Side Menu Content</div>

    render(<SideMenu childComponent={child} />)

    expect(screen.getByTestId('child')).toBeDefined()
    expect(screen.getByText('Side Menu Content')).toBeDefined()
  })

  test('正しいaria-labelを持っていること', () => {
    expect.hasAssertions()

    render(<SideMenu childComponent={<div />} />)

    expect(screen.getByLabelText('mailbox folders')).toBeDefined()
  })
})
