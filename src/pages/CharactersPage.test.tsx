import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { CharactersPage } from '@pages/CharactersPage'
import * as swapi from '@api/swapi'
import type { SwapiPerson } from '@app-types/swapi'

vi.mock('@api/swapi')

const mockPerson: SwapiPerson = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: '',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: '',
  edited: '',
  url: 'https://swapi.py4e.com/api/people/1/',
}

describe('CharactersPage', () => {
  beforeEach(() => {
    vi.mocked(swapi.getPeople).mockResolvedValue({
      count: 1,
      next: null,
      previous: null,
      results: [mockPerson],
    })
  })

  it('loads and shows character list', async () => {
    render(
      <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        <MemoryRouter initialEntries={['/']}>
          <CharactersPage />
        </MemoryRouter>
      </QueryClientProvider>,
    )
    expect(await screen.findByText('Characters')).toBeInTheDocument()
    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument()
  })
})
