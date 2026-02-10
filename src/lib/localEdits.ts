import type { EditablePersonFields } from '@app-types/swapi'

const storagePrefix = 'swapi-character-edits'

const buildKey = (id: string): string => `${storagePrefix}:${id}`

export const getLocalEdits = (id: string): EditablePersonFields | null => {
  const raw = localStorage.getItem(buildKey(id))
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as EditablePersonFields
  } catch {
    return null
  }
}

export const saveLocalEdits = (
  id: string,
  data: EditablePersonFields,
): void => {
  localStorage.setItem(buildKey(id), JSON.stringify(data))
}

export const clearLocalEdits = (id: string): void => {
  localStorage.removeItem(buildKey(id))
}
