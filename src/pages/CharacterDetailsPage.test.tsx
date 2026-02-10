import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { CharacterDetailsPage } from '@pages/CharacterDetailsPage'
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

function renderDetails(id: string) {
  return render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter initialEntries={[`/people/${id}`]}>
        <Routes>
          <Route path="/people/:id" element={<CharacterDetailsPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('CharacterDetailsPage', () => {
  beforeEach(() => {
    vi.mocked(swapi.getPerson).mockResolvedValue(mockPerson)
  })

  it('loads and shows character with editable form', async () => {
    renderDetails('1')
    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument()
    expect(screen.getByText('Editable fields')).toBeInTheDocument()
  })
})
