import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import ChronologyPage from '../ChronologyPage'

describe('ChronologyPage', () => {
  test('renders role legend and matrix header', () => {
    render(
      <MemoryRouter>
        <ChronologyPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Franchise Cast Matrix')).toBeInTheDocument()
    expect(screen.getByText('full-time')).toBeInTheDocument()
    expect(screen.getByText('spouse/partner')).toBeInTheDocument()
  })
})
