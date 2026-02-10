import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getPeople, getPerson, getPersonId, SWAPI_BASE_URL } from '@api/swapi'

const { mockGet } = vi.hoisted(() => ({ mockGet: vi.fn() }))
vi.mock('axios', () => ({
  default: { create: () => ({ get: mockGet }) },
}))

describe('swapi', () => {
  describe('getPersonId', () => {
    it('extracts id from person url', () => {
      expect(getPersonId(`${SWAPI_BASE_URL}/people/1/`)).toBe('1')
      expect(getPersonId('/people/42/')).toBe('42')
    })

    it('throws on invalid url', () => {
      expect(() => getPersonId('/films/1/')).toThrow('Invalid person url')
    })
  })

  describe('getPeople', () => {
    beforeEach(() => mockGet.mockReset())

    it('calls API and returns data', async () => {
      const data = {
        count: 1,
        next: null,
        previous: null,
        results: [{ name: 'Luke Skywalker', url: `${SWAPI_BASE_URL}/people/1/` }],
      }
      mockGet.mockResolvedValue({ data })
      const result = await getPeople(1, 'luke')
      expect(mockGet).toHaveBeenCalledWith('/people/', { params: { page: 1, search: 'luke' } })
      expect(result).toEqual(data)
    })
  })

  describe('getPerson', () => {
    beforeEach(() => mockGet.mockReset())

    it('fetches person by id', async () => {
      const person = { name: 'Luke', url: `${SWAPI_BASE_URL}/people/1/` }
      mockGet.mockResolvedValue({ data: person })
      const result = await getPerson('1')
      expect(mockGet).toHaveBeenCalledWith('/people/1/')
      expect(result).toEqual(person)
    })
  })
})
