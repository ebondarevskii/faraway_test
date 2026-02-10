import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

vi.mock('@api/swapi', () => ({
  getPeople: vi.fn().mockResolvedValue({
    count: 0,
    next: null,
    previous: null,
    results: [],
  }),
  getPerson: vi.fn(),
  getPersonId: (url: string) => {
    const m = url.match(/\/people\/(\d+)\/?$/)
    if (!m) throw new Error('Invalid person url')
    return m[1]
  },
}))

function renderApp(initialEntry = '/') {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('App', () => {
  it('shows characters list at /', async () => {
    renderApp('/')
    expect(await screen.findByText('Characters')).toBeInTheDocument()
  })

  it('shows not found for unknown route', () => {
    renderApp('/unknown')
    expect(screen.getByText('Page not found')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /go to characters/i })).toHaveAttribute('href', '/')
  })
})
