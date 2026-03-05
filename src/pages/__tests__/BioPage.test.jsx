import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import BioPage from '../BioPage'

describe('BioPage', () => {
  test('renders tabbed modules and switches tabs', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/housewife/3']}>
        <Routes>
          <Route path="/housewife/:id" element={<BioPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Teresa Giudice')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Controversies' }))
    expect(screen.getByRole('heading', { name: 'Controversies' })).toBeInTheDocument()
  })
})
