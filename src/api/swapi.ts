import axios from 'axios'
import type { SwapiListResponse, SwapiPerson } from '@app-types/swapi'

const SWAPI_BASE_URL = 'https://swapi.py4e.com/api'

const apiClient = axios.create({
  baseURL: SWAPI_BASE_URL,
})

export const getPeople = async (
  page: number,
  search: string,
): Promise<SwapiListResponse<SwapiPerson>> => {
  const response = await apiClient.get<SwapiListResponse<SwapiPerson>>(
    '/people/',
    {
      params: {
        page,
        search: search.trim() || undefined,
      },
    },
  )
  return response.data
}

export const getPerson = async (id: string): Promise<SwapiPerson> => {
  const response = await apiClient.get<SwapiPerson>(`/people/${id}/`)
  return response.data
}

export const getPersonId = (personUrl: string): string => {
  const match = personUrl.match(/\/people\/(\d+)\/?$/)
  if (!match) {
    throw new Error('Invalid person url')
  }
  return match[1]
}
