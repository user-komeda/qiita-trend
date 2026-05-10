import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, test } from 'vitest'

import Header from '@/app/component/Header'

describe('header Component', () => {
  test('タイトルと子コンポーネントをレンダリングすること', () => {
    expect.hasAssertions()

    const title = 'Test Title'
    const child = <div data-testid="child">Child</div>

    render(<Header title={title} childComponent={child} />)

    expect(screen.getByText(title)).toBeDefined()
    expect(screen.getByTestId('child')).toBeDefined()
  })

  test('loginボタンが表示され、正しいリンク先を持っていること', () => {
    expect.hasAssertions()

    render(<Header title="Title" childComponent={<div />} />)

    const loginButton = screen.getByRole('link', { name: /login/i })

    expect(loginButton).toBeDefined()
    expect(loginButton.getAttribute('href')).toBe('/api/login')
  })
})
