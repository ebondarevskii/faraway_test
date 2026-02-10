import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getLocalEdits, saveLocalEdits, clearLocalEdits } from '@lib/localEdits'
import type { EditablePersonFields } from '@app-types/swapi'

const mockEdits: EditablePersonFields = {
  name: 'Luke',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
}

describe('localEdits', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    })
  })

  it('getLocalEdits returns null when nothing stored', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(null)
    expect(getLocalEdits('1')).toBeNull()
  })

  it('getLocalEdits returns parsed data when valid JSON', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(mockEdits))
    expect(getLocalEdits('1')).toEqual(mockEdits)
  })

  it('saveLocalEdits and clearLocalEdits use prefixed key', () => {
    saveLocalEdits('5', mockEdits)
    expect(localStorage.setItem).toHaveBeenCalledWith('swapi-character-edits:5', expect.any(String))
    clearLocalEdits('5')
    expect(localStorage.removeItem).toHaveBeenCalledWith('swapi-character-edits:5')
  })
})
