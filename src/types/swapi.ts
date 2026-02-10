export type SwapiPerson = {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

export type SwapiListResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export type EditablePersonFields = Pick<
  SwapiPerson,
  | 'name'
  | 'height'
  | 'mass'
  | 'hair_color'
  | 'skin_color'
  | 'eye_color'
  | 'birth_year'
  | 'gender'
>
