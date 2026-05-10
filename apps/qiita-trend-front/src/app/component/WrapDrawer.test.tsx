import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, vi, test } from 'vitest'

import WrapDrawer from '@/app/component/WrapDrawer'

vi.mock(import('@/app/features/component/drawer/AccordionMenu'), () => ({
  default: () => <div data-testid="accordion-menu">Accordion Menu</div>,
}))

describe('wrapDrawer Component', () => {
  test('accordionMenuをレンダリングすること', () => {
    expect.hasAssertions()

    render(<WrapDrawer />)

    expect(screen.getByTestId('accordion-menu')).toBeDefined()
  })
})
