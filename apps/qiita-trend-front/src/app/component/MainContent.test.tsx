import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, test } from 'vitest'

import MainContent from '@/app/component/MainContent'

describe('mainContent Component', () => {
  test('子コンポーネントをレンダリングすること', () => {
    expect.hasAssertions()

    const child = <div data-testid="child">Child Content</div>

    render(<MainContent childComponent={child} />)

    expect(screen.getByTestId('child')).toBeDefined()
    expect(screen.getByText('Child Content')).toBeDefined()
  })
})
