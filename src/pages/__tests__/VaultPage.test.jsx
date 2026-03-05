import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import VaultPage from '../VaultPage'

describe('VaultPage', () => {
  test('renders facet filtering shell', () => {
    render(
      <MemoryRouter>
        <VaultPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Knowledge Vault')).toBeInTheDocument()
    expect(screen.getByText('Filters')).toBeInTheDocument()
    expect(screen.getByLabelText('Show labeled rumors')).toBeInTheDocument()
  })
})
