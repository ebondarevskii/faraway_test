import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '@components/SearchBar'

describe('SearchBar', () => {
  it('renders input and search/clear buttons', () => {
    render(<SearchBar initialValue="" onSearch={vi.fn()} />)
    expect(screen.getByPlaceholderText('Search by name')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
  })

  it('calls onSearch with value on submit', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()
    render(<SearchBar initialValue="" onSearch={onSearch} />)
    await user.type(screen.getByPlaceholderText('Search by name'), 'luke')
    await user.click(screen.getByRole('button', { name: /search/i }))
    expect(onSearch).toHaveBeenCalledWith('luke')
  })
})
